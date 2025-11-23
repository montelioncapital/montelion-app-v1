import twilio from "twilio";

export async function POST(req) {
  const { phone, code } = await req.json();

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const check = await client.verify.v2.services(
      process.env.TWILIO_VERIFY_SERVICE_SID
    ).verificationChecks.create({
      to: phone,
      code: code,
    });

    if (check.status === "approved") {
      return Response.json({ success: true });
    }

    return Response.json({ success: false }, { status: 400 });

  } catch (err) {
    console.error(err);
    return Response.json({ success: false }, { status: 500 });
  }
}
