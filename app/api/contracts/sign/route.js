// app/api/contracts/sign/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";

export async function POST(req) {
  try {
    // 1) Lire le body
    const { acceptedTerms } = await req.json().catch(() => ({}));

    if (!acceptedTerms) {
      return NextResponse.json(
        { error: "You must accept the agreement before signing." },
        { status: 400 }
      );
    }

    // 2) Récupérer l'utilisateur Supabase à partir des cookies
    const supabase = createRouteHandlerClient({ cookies });

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

    // 3) Charger les infos pour le PDF
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
      return NextResponse.json(
        { error: "Missing profile or address data." },
        { status: 400 }
      );
    }

    const fullName = `${profile.first_name || ""} ${
      profile.last_name || ""
    }`.trim();
    const lastName = profile.last_name || "";

    // 4) Charger le template PDF public/legal/montelion-discretionary-mandate.pdf
    const templatePath = path.join(
      process.cwd(),
      "public",
      "legal",
      "montelion-discretionary-mandate.pdf"
    );
    const templateBytes = await fs.readFile(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);

    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    // 5) Écrire quelques infos dans le PDF
    page.drawText(`Client: ${fullName}`, {
      x: 72,
      y: 700,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(
      `Address: ${address.address_line}, ${address.postal_code} ${address.city}, ${address.country}`,
      {
        x: 72,
        y: 685,
        size: 9,
        font,
        color: rgb(0, 0, 0),
      }
    );

    page.drawText(`Signed electronically on: ${dateStr}`, {
      x: 72,
      y: 140,
      size: 9,
      font,
      color: rgb(0, 0, 0),
    });

    // “Signature” = nom de famille
    page.drawText(lastName.toUpperCase(), {
      x: 300,
      y: 120,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // 6) Sauvegarder le PDF dans le bucket Supabase Storage "contracts"
    const fileName = `contract-${userId}-${Date.now()}.pdf`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("contracts") // 👈 nom du bucket
      .upload(`${userId}/${fileName}`, pdfBytes, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError || !uploadData) {
      console.error("storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Unable to store signed contract." },
        { status: 500 }
      );
    }

    // URL publique (ou signée) du fichier
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("contracts")
      .getPublicUrl(uploadData.path, { download: true });

    // Enregistrer dans la table contracts
    const { error: insertError } = await supabase.from("contracts").insert({
      user_id: userId,
      status: "signed",
      pdf_url: publicUrl,
      signed_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error("contracts insert error:", insertError);
      // on ne bloque pas pour autant
    }

    // 7) Mettre l’onboarding à l’étape 9
    // ⚠️ adapte le nom de la table / colonne si besoin
    const { error: onboardingError } = await supabase
      .from("onboarding_state")
      .upsert(
        {
          user_id: userId,
          current_step: 9,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (onboardingError) {
      console.error("onboarding update error:", onboardingError);
      // pareil, on ne bloque pas la réponse
    }

    // 8) OK → renvoyer l’URL du PDF
    return NextResponse.json({ ok: true, pdfUrl: publicUrl });
  } catch (err) {
    console.error("/api/contracts/sign error:", err);
    return NextResponse.json(
      { error: "Unexpected error while signing the contract." },
      { status: 500 }
    );
  }
}
