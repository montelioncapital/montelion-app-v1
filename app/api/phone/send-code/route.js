import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req) {
  try {
    const body = await req.json();
    const phone = body?.phone;

    if (!phone) {
      return NextResponse.json(
        { error: "Missing phone number" },
        { status: 400 }
      );
    }

    const {
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      TWILIO_VERIFY_SERVICE_SID,
    } = process.env;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
      console.error("Twilio env vars missing");
      return NextResponse.json(
        { error: "Server configuration error (Twilio)" },
        { status: 500 }
      );
    }

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const verification = await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phone,
        channel: "sms",
      });

    return NextResponse.json({
      ok: true,
      status: verification.status,
    });
  } catch (err) {
    console.error("Twilio send-code error:", err);
    return NextResponse.json(
      { error: "Unable to send verification code" },
      { status: 500 }
    );
  }
}
