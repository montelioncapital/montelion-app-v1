"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function OnboardingClient() {
  const router = useRouter();

  // Step: 1 = profile, 2 = phone, 3 = otp
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [userId, setUserId] = useState(null);

  // Step 1 — profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  // Step 2 — phone
  const [dialCode, setDialCode] = useState("+33");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [phoneE164, setPhoneE164] = useState("");
  const [sendingCode, setSendingCode] = useState(false);

  // Step 3 — OTP
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Resend timer
  const [timer, setTimer] = useState(60);

  // -------------------------
  // Load session + pre-fill profile
  // -------------------------
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const uid = session.user.id;
      setUserId(uid);

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, date_of_birth")
        .eq("id", uid)
        .maybeSingle();

      if (profile) {
        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setDob(profile.date_of_birth || "");
      }

      setLoading(false);
    })();
  }, [router]);

  // -------------------------
  // Step 1 — Submit profile
  // -------------------------
  async function handleProfileSubmit(e) {
    e.preventDefault();
    if (saving) return;

    setError("");
    setSaving(true);

    try {
      if (!firstName.trim() || !lastName.trim() || !dob.trim()) {
        throw new Error("Please fill in all fields.");
      }

      const { error: upsertErr } = await supabase.from("profiles").upsert(
        {
          id: userId,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          date_of_birth: dob.trim(),
        },
        { onConflict: "id" }
      );

      if (upsertErr) throw upsertErr;

      await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 2,
          completed: false,
        },
        { onConflict: "user_id" }
      );

      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  // -------------------------
  // Step 2 — Send code SMS
  // -------------------------
  async function handleSendCode(e) {
    e.preventDefault();
    if (sendingCode) return;

    setError("");
    setSendingCode(true);

    try {
      const local = phoneLocal.replace(/\D/g, "");
      if (!local) throw new Error("Please enter your mobile number.");

      const full = `${dialCode}${local}`;
      setPhoneE164(full);

      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: full }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code.");

      setStep(3);
      setTimer(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setSendingCode(false);
    }
  }

  // -------------------------
  // Step 3 — Verify OTP
  // -------------------------
  async function handleVerifyCode(e) {
    e.preventDefault();
    if (verifying) return;

    setError("");
    setVerifying(true);

    try {
      if (!/^\d{6}$/.test(otp)) throw new Error("Invalid code.");

      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneE164, code: otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid or expired code.");

      await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 3,
          completed: true,
        },
        { onConflict: "user_id" }
      );

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setVerifying(false);
    }
  }

  // -------------------------
  // OTP timer countdown
  // -------------------------
  useEffect(() => {
    if (step !== 3) return;
    if (timer <= 0) return;

    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [step, timer]);

  // -------------------------
  // Step 1 : PROFILE
  // -------------------------
  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">Loading…</div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Welcome</h1>
          <p className="text-slate-400 mb-8">Choose how you’d like to be addressed.</p>

          {error && (
            <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">First name</label>
              <input
                type="text"
                className="mc-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Last name</label>
              <input
                type="text"
                className="mc-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Date of birth</label>
              <input
                type="text"
                className="mc-input"
                placeholder="YYYY-MM-DD"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="mc-btn mc-btn-primary mt-4">
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------
  // Step 2 : PHONE NUMBER
  // -------------------------
  if (step === 2) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Enter your mobile number</h1>
          <p className="text-slate-400 mb-8">
            We’ll send you a 6-digit verification code to confirm your account.
          </p>

          {error && (
            <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSendCode} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">Mobile number</label>

              <div className="flex gap-2">
                <div className="relative w-28">
                  <select
                    className="mc-input w-full pl-3 pr-7 text-sm appearance-none"
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+33">+33</option>
                    <option value="+49">+49</option>
                    <option value="+39">+39</option>
                    <option value="+34">+34</option>
                    <option value="+31">+31</option>
                    <option value="+46">+46</option>
                    <option value="+41">+41</option>
                    <option value="+81">+81</option>
                    <option value="+82">+82</option>
                    <option value="+86">+86</option>
                    <option value="+91">+91</option>
                    <option value="+55">+55</option>
                    <option value="+52">+52</option>
                    <option value="+61">+61</option>
                    <option value="+7">+7</option>
                    <option value="+27">+27</option>
                    <option value="+65">+65</option>
                    <option value="+971">+971</option>
                  </select>

                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500 text-xs">
                    ▾
                  </span>
                </div>

                <input
                  type="tel"
                  className="mc-input flex-1"
                  placeholder="Your mobile number"
                  value={phoneLocal}
                  onChange={(e) => setPhoneLocal(e.target.value)}
                  required
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Enter your full mobile number without spaces.
              </p>
            </div>

            <button type="submit" className="mc-btn mc-btn-primary mt-4">
              {sendingCode ? "Sending…" : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------
  // Step 3 : OTP
  // -------------------------
  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-2">Enter 6-digit verification code</h1>
        <p className="text-slate-400 mb-8">
          Please enter the 6-digit code we sent to{" "}
          <span className="font-medium text-slate-100">
            {phoneE164 || `${dialCode}${phoneLocal}`}
          </span>
          .
        </p>

        {error && (
          <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">6-digit code</label>
            <input
              type="text"
              className="mc-input tracking-[0.3em] text-center"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              required
            />
          </div>

          <button type="submit" className="mc-btn mc-btn-primary mt-4" disabled={verifying}>
            {verifying ? "Verifying…" : "Verify"}
          </button>

          {/* Resend button with timer */}
          <button
            type="button"
            disabled={timer > 0}
            onClick={() => {
              setStep(2);
            }}
            className={`w-full mt-3 text-sm py-2 rounded-lg border ${
              timer > 0
                ? "border-slate-700 text-slate-600 cursor-not-allowed"
                : "border-slate-500 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
          </button>
        </form>
      </div>
    </div>
  );
}
