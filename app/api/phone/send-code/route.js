import { NextResponse } from "next/server";
import twilio from "twilio";
import { createClient } from "@supabase/supabase-js";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(req) {
  try {
    const { phone, access_token } = await req.json();

    if (!phone || !access_token) {
      return NextResponse.json(
        { error: "Missing phone or access_token" },
        { status: 400 }
      );
    }

    // 1) On vérifie le token Supabase → récupère l’utilisateur
    const {
      data: { user },
      error: userErr,
    } = await supabaseAdmin.auth.getUser(access_token);

    if (userErr || !user) {
      console.error("Supabase getUser error:", userErr);
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 401 }
      );
    }

    // 2) On envoie le code via Twilio Verify
    const verification = await twilioClient.verify.v2
      .services(verifySid)
      .verifications.create({
        to: phone,
        channel: "sms",
      });

    // 3) On log l’envoi dans phone_verifications
    await supabaseAdmin.from("phone_verifications").insert({
      user_id: user.id,
      phone_e164: phone,
      twilio_sid: verification.sid,
      status: verification.status, // "pending"
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-code error:", err);
    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 }
    );
  }
}
