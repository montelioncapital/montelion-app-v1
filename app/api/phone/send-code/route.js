// app/api/phone/send-code/route.js
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

    // 💡 DEBUG : on log juste la présence (pas les valeurs)
    console.log("[Twilio ENV]", {
      hasAccountSid: !!TWILIO_ACCOUNT_SID,
      hasAuthToken: !!TWILIO_AUTH_TOKEN,
      hasVerifySid: !!TWILIO_VERIFY_SERVICE_SID,
    });

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
      return NextResponse.json(
        {
          error: "Twilio configuration missing on server",
          debug: {
            hasAccountSid: !!TWILIO_ACCOUNT_SID,
            hasAuthToken: !!TWILIO_AUTH_TOKEN,
            hasVerifySid: !!TWILIO_VERIFY_SERVICE_SID,
          },
        },
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
    console.error("[Twilio send-code error]", err);
    return NextResponse.json(
      {
        error: "Failed to send verification code",
        detail: err.message,
      },
      { status: 500 }
    );
  }
}
