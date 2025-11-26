// app/api/contracts/sign/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export async function POST(req) {
  try {
    // 1) Body
    const { acceptedTerms } = await req.json().catch(() => ({}));

    if (!acceptedTerms) {
      return NextResponse.json(
        { error: "You must accept the agreement before signing." },
        { status: 400 }
      );
    }

    // 2) Récupération du token d'auth dans les headers
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    // 3) Client Supabase avec le JWT de l'utilisateur (RLS OK)
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("auth error", userError);
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    const userId = user.id;

    // 4) Charger les infos nécessaires pour pré-remplir le PDF
    const [{ data: profile }, { data: address }] = await Promise.all([
      supabase
        .from("profiles")
        .select("first_name, last_name, date_of_birth")
        .eq("id", userId)
        .maybeSingle(),
      supabase
        .from("addresses")
        .select("address_line, city, postal_code, country")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    if (!profile || !address) {
      console.error("profile or address missing:", { profile, address });
      return NextResponse.json(
        { error: "Missing profile or address data." },
        { status: 400 }
      );
    }

    const fullName = `${profile.first_name || ""} ${
      profile.last_name || ""
    }`.trim();
    const lastName = (profile.last_name || "").toUpperCase();
    const fullAddress = `${address.address_line}, ${address.postal_code} ${address.city}, ${address.country}`;

    // 5) Charger le template signé et remplir UNIQUEMENT la page 11
    const templatePath = path.join(
      process.cwd(),
      "public",
      "legal",
      "INVESTMENT-MANAGEMENT-AGREEMENT-SIGNED.pdf"
    );
    const templateBytes = await fs.readFile(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);

    const pages = pdfDoc.getPages();
    // Page 11 -> index 10
    const page = pages[10];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Date du jour (à côté de "Date :")
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    // Coords approximatives à droite de "Date :" (en haut de la page)
    page.drawText(dateStr, {
      x: 120,     // légèrement à droite de "Date :"
      y: 720,     // aligné sur la ligne "Date :"
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    // --- Bloc "For the Client" (en bas de page) ---
    // Name :
    page.drawText(fullName, {
      x: 150,     // à droite de "Name :"
      y: 210,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    // Address :
    page.drawText(fullAddress, {
      x: 150,     // à droite de "Address :"
      y: 195,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    // Signature : nom de famille en majuscule
    page.drawText(lastName, {
      x: 150,     // à droite de "Signature :"
      y: 180,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // 6) Upload dans le bucket Storage "contracts"
    const fileName = `contract-${userId}-${Date.now()}.pdf`;
    const storagePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("contracts")
      .upload(storagePath, pdfBytes, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.error("storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload contract PDF." },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("contracts")
      .getPublicUrl(storagePath);

    const publicUrl = publicUrlData?.publicUrl || null;

    // 7) Enregistrer dans la table contracts (best effort)
    const { error: insertError } = await supabase.from("contracts").insert({
      user_id: userId,
      status: "signed",
      pdf_url: publicUrl,
      signed_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error("contracts insert error:", insertError);
    }

    // 8) Mettre l’onboarding à l’étape 9 (best effort)
    const targetStep = 9;

    const { error: onboardingError } = await supabase
      .from("onboarding_state")
      .upsert(
        {
          user_id: userId,
          current_step: targetStep,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (onboardingError) {
      console.error("onboarding_state update error:", onboardingError);
    }

    const { error: profileStepError } = await supabase
      .from("profiles")
      .update({ current_step: targetStep })
      .eq("id", userId);

    if (profileStepError) {
      console.error("profiles current_step update error:", profileStepError);
    }

    // 9) Réponse OK
    return NextResponse.json({ ok: true, pdfUrl: publicUrl });
  } catch (err) {
    console.error("/api/contracts/sign error:", err);
    return NextResponse.json(
      { error: "Unexpected error while signing the contract." },
      { status: 500 }
    );
  }
}
