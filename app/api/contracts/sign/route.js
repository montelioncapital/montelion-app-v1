// app/api/contracts/sign/route.js
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createClient } from "@supabase/supabase-js";
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

    // 2) Récupérer le access_token envoyé par le client
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    // 3) Client Supabase côté serveur avec le token
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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

    // 4) Profil + adresse
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

    // 5) Charger le template PDF
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

    // 6) Texte dans le PDF
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

    // Signature = NOM en bas
    page.drawText(lastName.toUpperCase(), {
      x: 300,
      y: 120,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // 7) Sauvegarder le PDF dans /public/contracts
    const contractsDir = path.join(process.cwd(), "public", "contracts");
    await fs.mkdir(contractsDir, { recursive: true });

    const fileName = `contract-${userId}-${Date.now()}.pdf`;
    const filePath = path.join(contractsDir, fileName);
    await fs.writeFile(filePath, pdfBytes);

    const publicUrl = `/contracts/${fileName}`;

    // 8) Enregistrer dans la table contracts
    const { error: insertError } = await supabase.from("contracts").insert({
      user_id: userId,
      status: "signed",
      pdf_url: publicUrl,
      signed_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error("contracts insert error:", insertError);
      // on ne bloque pas la signature
    }

    return NextResponse.json({ ok: true, pdfUrl: publicUrl });
  } catch (err) {
    console.error("/api/contracts/sign error:", err);
    return NextResponse.json(
      { error: "Unexpected error while signing the contract." },
      { status: 500 }
    );
  }
}
