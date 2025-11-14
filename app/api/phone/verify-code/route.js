// app/api/phone/verify-code/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import twilio from "twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    // ------------------------------
    // AUTH PAR COOKIES
    // ------------------------------
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

    // ------------------------------
    // LECTURE DU BODY
    // ------------------------------
    const body = await request.json();
    const { phone, code } = body || {};

    if (!phone || !code) {
      return NextResponse.json(
        { error: "Missing phone or code" },
        { status: 400 }
      );
    }

    // ------------------------------
    // ENV VARS TWILIO
    // ------------------------------
    const {
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      TWILIO_VERIFY_SERVICE_SID,
    } = process.env;

    const debug = {
      hasAccountSid: !!TWILIO_ACCOUNT_SID,
      hasAuthToken: !!TWILIO_AUTH_TOKEN,
      hasVerifySid: !!TWILIO_VERIFY_SERVICE_SID,
    };

    if (
      !TWILIO_ACCOUNT_SID ||
      !TWILIO_AUTH_TOKEN ||
      !TWILIO_VERIFY_SERVICE_SID
    ) {
      return NextResponse.json(
        { error: "Twilio configuration missing on server", debug },
        { status: 500 }
      );
    }

    // ------------------------------
    // TWILIO VERIFY CHECK
    // ------------------------------
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const verification = await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phone,
        code,
      });

    // 🔥 Twilio renvoie "approved" = code correct !
    if (verification.status === "approved") {
      return NextResponse.json({
        ok: true,
        status: verification.status,
        user_id: userId,
      });
    }

    return NextResponse.json(
      {
        ok: false,
        status: verification.status,
        error: "Invalid or expired code",
      },
      { status: 400 }
    );
  } catch (err) {
    console.error("Error in /api/phone/verify-code:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
