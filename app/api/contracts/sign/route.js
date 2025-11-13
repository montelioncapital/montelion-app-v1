// app/api/contracts/sign/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  // 1) Auth user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = user.id;

  // 2) Charger profil
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("first_name, last_name, date_of_birth, country")
    .eq("id", userId)
    .maybeSingle();

  if (profileErr || !profile) {
    return NextResponse.json(
      { error: "Profile not found" },
      { status: 400 }
    );
  }

  // 3) Charger adresse (la plus récente)
  const { data: address, error: addrErr } = await supabase
    .from("addresses")
    .select("address_line, postal_code, city, country")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (addrErr || !address) {
    return NextResponse.json(
      { error: "Address not found" },
      { status: 400 }
    );
  }

  // Infos du client
  const fullName = `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
  const dob = profile.date_of_birth || "";
  const country = address.country || profile.country || "";
  const fullAddress = `${address.address_line || ""}\n${address.postal_code || ""} ${
    address.city || ""
  }`.trim();

  const signedAt = new Date();

  // 4) Génération du PDF (template factice)
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 50;
  let cursorY = height - margin;

  const drawText = (text, opts = {}) => {
    const {
      x = margin,
      y = cursorY,
      size = 11,
      bold = false,
      color = rgb(0.95, 0.97, 1),
    } = opts;

    const usedFont = bold ? fontBold : font;
    page.drawText(text, { x, y, size, font: usedFont, color });
    cursorY = y - size - 4;
  };

  // Header
  drawText("Montelion Capital – Discretionary Management Agreement", {
    size: 14,
    bold: true,
  });
  cursorY -= 10;

  drawText("This is a fictive contract template used for onboarding tests.", {
    size: 9,
    color: rgb(0.7, 0.75, 0.85),
  });
  cursorY -= 20;

  // Section: Client information
  drawText("Client information", { size: 12, bold: true });
  cursorY -= 6;

  drawText(`Name: ${fullName}`);
  drawText(`Date of birth: ${dob || "–"}`);
  drawText(`Country: ${country || "–"}`);
  drawText("Address:");
  fullAddress.split("\n").forEach((line) => drawText(`  ${line}`));
  cursorY -= 10;

  // Section: Agreement body (factice)
  drawText("Agreement summary", { size: 12, bold: true });
  cursorY -= 6;

  const paragraphs = [
    "You appoint Montelion Capital to manage your trading strategy on your own exchange account, using a read-only API key with no withdrawal permissions.",
    "You remain the sole owner and custodian of your assets at all times. You can revoke Montelion's access whenever you wish by disabling the API key on your exchange.",
    "Fees, risk disclosures and strategy details will be specified in the final production contract template.",
  ];

  const wrapText = (text, lineWidth) => {
    const words = text.split(" ");
    const lines = [];
    let current = "";

    for (const w of words) {
      const testLine = current ? `${current} ${w}` : w;
      const width = font.widthOfTextAtSize(testLine, 11);
      if (width > lineWidth) {
        lines.push(current);
        current = w;
      } else {
        current = testLine;
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  const maxTextWidth = width - margin * 2;

  paragraphs.forEach((p) => {
    const lines = wrapText(p, maxTextWidth);
    lines.forEach((l) => drawText(l));
    cursorY -= 6;
  });

  cursorY -= 15;

  // Section: Signature
  drawText("Electronic signature", { size: 12, bold: true });
  cursorY -= 6;

  drawText(
    `Signed electronically by: ${fullName || "________________"}`,
    { size: 11 }
  );
  drawText(
    `Signature date: ${signedAt.toISOString().slice(0, 10)}`,
    { size: 11 }
  );

  cursorY -= 20;

  drawText(
    "By signing electronically, you agree to the terms of this agreement.",
    { size: 10, color: rgb(0.75, 0.8, 0.9) }
  );

  const pdfBytes = await pdfDoc.save();

  // 5) Upload dans le bucket "contracts"
  const fileName = `contract-${userId}-${Date.now()}.pdf`;
  const filePath = `${userId}/${fileName}`;

  const { error: uploadErr } = await supabase.storage
    .from("contracts")
    .upload(filePath, pdfBytes, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadErr) {
    console.error(uploadErr);
    return NextResponse.json(
      { error: "Failed to upload contract PDF" },
      { status: 500 }
    );
  }

  // 6) Upsert dans la table contracts
  const { error: contractErr } = await supabase.from("contracts").upsert(
    {
      user_id: userId,
      status: "signed",
      pdf_url: filePath,
      signed_at: signedAt.toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (contractErr) {
    console.error(contractErr);
    return NextResponse.json(
      { error: "Failed to save contract row" },
      { status: 500 }
    );
  }

  // 7) Mettre à jour onboarding_state (step 8 par exemple)
  await supabase
    .from("onboarding_state")
    .upsert(
      { user_id: userId, current_step: 8, completed: false },
      { onConflict: "user_id" }
    );

  return NextResponse.json({ success: true, pdfPath: filePath });
}
