// app/api/phone/send-code/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import twilio from "twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // ---- AUTH PAR COOKIES ----
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

    // ---- INPUT ----
    const body = await req.json();
    const phone = body?.phone;

    if (!phone) {
      return NextResponse.json(
        { error: "Missing phone number" },
        { status: 400 }
      );
    }

    // ---- ENV VARS ----
    const {
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      TWILIO_VERIFY_SERVICE_SID,
    } = process.env;

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

    // ---- TWILIO SEND ----
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
      user_id: userId,
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
