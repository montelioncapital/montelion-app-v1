// app/api/phone/send-code/route.js
import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    const phone = body?.phone;

    if (!phone) {
      return NextResponse.json(
        { error: "Missing 'phone' in body" },
        { status: 400 }
      );
    }

    // On récupère les variables d'environnement côté serveur
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!accountSid || !authToken || !verifyServiceSid) {
      console.error("Twilio env missing", {
        hasAccountSid: !!accountSid,
        hasAuthToken: !!authToken,
        hasVerifyServiceSid: !!verifyServiceSid,
      });

      return NextResponse.json(
        { error: "Twilio configuration missing on server" },
        { status: 500 }
      );
    }

    // On crée le client *dans* le handler, comme ça si ça throw on le catch
    const client = twilio(accountSid, authToken);

    // Appel à Twilio Verify
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({
        to: phone,
        channel: "sms",
      });

    // On renvoie un JSON propre
    return NextResponse.json({
      ok: true,
      sid: verification.sid,
      status: verification.status, // "pending" normalement
    });
  } catch (err) {
    console.error("Twilio send-code error:", err);

    return NextResponse.json(
      {
        error: "Twilio error",
        message: err.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
