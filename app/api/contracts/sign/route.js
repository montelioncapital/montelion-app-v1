// app/api/contracts/sign/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { PDFDocument, StandardFonts } from "pdf-lib";

export const runtime = "nodejs";

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
    error: sessionErr,
  } = await supabase.auth.getSession();

  if (sessionErr) {
    return NextResponse.json(
      { error: sessionErr.message || "Unable to get session." },
      { status: 500 }
    );
  }

  if (!session?.user) {
    return NextResponse.json(
      { error: "Not authenticated." },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  // 1) Récupérer les données nécessaires (sans filtrer sur status)
  const [
    { data: profile, error: profileErr },
    { data: address, error: addrErr },
    { data: kyc, error: kycErr },
    { data: poa, error: poaErr },
  ] = await Promise.all([
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
    supabase.from("kyc_identities").select("doc_type").eq("user_id", userId).maybeSingle(),
    supabase.from("proof_of_address").select("doc_type").eq("user_id", userId).maybeSingle(),
  ]);

  if (profileErr || addrErr || kycErr || poaErr) {
    console.error("contract sign data errors", {
      profileErr,
      addrErr,
      kycErr,
      poaErr,
    });
    return NextResponse.json(
      { error: "Unable to load all required data for the contract." },
      { status: 400 }
    );
  }

  if (!profile || !address || !kyc || !poa) {
    return NextResponse.json(
      { error: "Missing data required to generate the contract." },
      { status: 400 }
    );
  }

  // 2) Générer un PDF simple avec pdf-lib
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 portrait
  const { height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 80;

  const fullName = `${profile.first_name || ""} ${
    profile.last_name || ""
  }`.trim();
  const signedAt = new Date().toISOString();

  page.drawText("Montelion Capital", {
    x: 60,
    y,
    size: 16,
    font: fontBold,
  });
  y -= 28;
  page.drawText("Discretionary Management Agreement (summary)", {
    x: 60,
    y,
    size: 13,
    font: fontBold,
  });

  y -= 40;
  page.drawText(`Client: ${fullName}`, {
    x: 60,
    y,
    size: 11,
    font,
  });
  y -= 18;
  page.drawText(`Date of birth: ${profile.date_of_birth}`, {
    x: 60,
    y,
    size: 11,
    font,
  });
  y -= 18;
  page.drawText(
    `Address: ${address.address_line}, ${address.postal_code} ${address.city}, ${address.country}`,
    {
      x: 60,
      y,
      size: 11,
      font,
    }
  );

  y -= 40;
  page.drawText(
    "By signing this agreement, the Client authorises Montelion Capital to",
    {
      x: 60,
      y,
      size: 10,
      font,
    }
  );
  y -= 14;
  page.drawText(
    "manage the Client's exchange account on a discretionary basis, within the",
    { x: 60, y, size: 10, font }
  );
  y -= 14;
  page.drawText(
    "limits and risk parameters defined in the full mandate and fee schedule.",
    { x: 60, y, size: 10, font }
  );

  y -= 40;
  page.drawText(`Signed electronically on: ${signedAt.slice(0, 10)}`, {
    x: 60,
    y,
    size: 10,
    font,
  });
  y -= 18;
  page.drawText(`Client: ${fullName}`, {
    x: 60,
    y,
    size: 10,
    font,
  });

  const pdfBytes = await pdfDoc.save();
  const pdfUint8 = new Uint8Array(pdfBytes);

  // 3) Upload dans le bucket "contracts"
  const fileName = `contract-${userId}-${Date.now()}.pdf`;
  const { data: uploadData, error: uploadErr } = await supabase.storage
    .from("contracts")
    .upload(fileName, pdfUint8, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploadErr) {
    console.error("upload error", uploadErr);
    return NextResponse.json(
      { error: "Failed to upload contract PDF." },
      { status: 500 }
    );
  }

  const pdfPath = uploadData?.path || fileName;

  // 4) Upsert dans public.contracts
  const { data: contractRow, error: upsertErr } = await supabase
    .from("contracts")
    .upsert(
      {
        user_id: userId,
        status: "signed",
        pdf_url: pdfPath,
        signed_at: signedAt,
      },
      { onConflict: "user_id" }
    )
    .select()
    .maybeSingle();

  if (upsertErr) {
    console.error("contracts upsert error", upsertErr);
    return NextResponse.json(
      { error: "Failed to save contract in database." },
      { status: 500 }
    );
  }

  // 5) Mettre à jour l'onboarding_step à 7 et completed = true
  await supabase.from("onboarding_state").upsert(
    {
      user_id: userId,
      current_step: 7,
      completed: true,
    },
    { onConflict: "user_id" }
  );

  return NextResponse.json({ ok: true, contract: contractRow });
}
