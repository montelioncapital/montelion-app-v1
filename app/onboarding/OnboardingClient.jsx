"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function OnboardingClient() {
  const router = useRouter();

  // Step global: 1 = profil, 2 = téléphone
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [userId, setUserId] = useState(null);

  // Profil (step 1)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // texte "YYYY-MM-DD"

  // Téléphone (step 2)
  const [dialCode, setDialCode] = useState("+33");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [sendingCode, setSendingCode] = useState(false);

  // Au chargement : vérifier la session + pré-remplir si profil existe
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      setOk("");

      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();

      if (sessionErr) {
        setError(sessionErr.message || "Unable to get session.");
        setLoading(false);
        return;
      }

      const session = sessionData?.session;
      if (!session?.user) {
        // Pas connecté → retour login
        router.replace("/login");
        return;
      }

      const uid = session.user.id;
      setUserId(uid);

      // Récupérer le profil existant (si déjà partiellement rempli)
      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("first_name, last_name, date_of_birth")
        .eq("id", uid)
        .maybeSingle();

      if (profErr && profErr.code !== "PGRST116") {
        console.error(profErr);
        setError(profErr.message || "Unable to load profile.");
        setLoading(false);
        return;
      }

      if (profile) {
        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setDob(profile.date_of_birth || "");
      }

      // On pourrait plus tard lire onboarding_state.current_step ici
      // pour renvoyer directement sur l'étape 2 si besoin.

      setLoading(false);
    })();
  }, [router]);

  // Soumission du profil (Step 1)
  async function handleProfileSubmit(e) {
    e.preventDefault();
    if (!userId || saving) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (!firstName.trim() || !lastName.trim() || !dob.trim()) {
        setError("Please fill in all fields.");
        setSaving(false);
        return;
      }

      // Optionnel : petit check très simple sur la date
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dob.trim())) {
        setError("Please use the format YYYY-MM-DD for your date of birth.");
        setSaving(false);
        return;
      }

      // 1) Upsert dans profiles
      const { error: upsertErr } = await supabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            date_of_birth: dob.trim(),
          },
          { onConflict: "id" }
        );

      if (upsertErr) {
        throw upsertErr;
      }

      // 2) Mettre à jour l'état d'onboarding (step 1 terminé → current_step = 2)
      const { error: onboardingErr } = await supabase
        .from("onboarding_state")
        .upsert(
          {
            user_id: userId,
            current_step: 2,
            completed: false,
          },
          { onConflict: "user_id" }
        );

      if (onboardingErr) {
        throw onboardingErr;
      }

      // Pas de message "Profile saved successfully." → on passe direct à l'étape 2
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong, please try again.");
    } finally {
      setSaving(false);
    }
  }

  // Envoi du code SMS (Step 2)
  async function handleSendCode(e) {
    e.preventDefault();
    if (sendingCode) return;

    setError("");
    setOk("");
    setSendingCode(true);

    try {
      const local = phoneLocal.replace(/\D/g, ""); // garder que les chiffres
      if (!local) {
        setError("Please enter your mobile number.");
        setSendingCode(false);
        return;
      }

      const phoneE164 = `${dialCode}${local}`;

      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneE164 }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to send verification code.");
      }

      setOk("A verification code has been sent by SMS.");
      // Plus tard : redirection vers une page /onboarding/verify par exemple
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while sending the code.");
    } finally {
      setSendingCode(false);
    }
  }

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Welcome</h1>
          <p className="text-slate-400">Loading your profile…</p>
        </div>
      </div>
    );
  }

  // --------------------
  // Rendu Step 1 : Profil
  // --------------------
  if (step === 1) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Welcome</h1>
          <p className="text-slate-400 mb-8">
            Choose how you’d like to be addressed.
          </p>

          {error && (
            <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Pas de bannière de succès ici */}

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            {/* First name */}
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                First name
              </label>
              <input
                type="text"
                className="mc-input"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
              />
            </div>

            {/* Last name */}
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Last name
              </label>
              <input
                type="text"
                className="mc-input"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                required
              />
            </div>

            {/* Date of birth (input texte pour éviter l'icône noire) */}
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Date of birth
              </label>
              <input
                type="text"
                className="mc-input"
                placeholder="YYYY-MM-DD"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="mc-btn mc-btn-primary mt-4"
              disabled={saving}
            >
              {saving ? "Saving…" : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --------------------
  // Rendu Step 2 : Téléphone
  // --------------------
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

        {ok && (
          <div className="mb-4 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-3 py-2 rounded-lg">
            {ok}
          </div>
        )}

        <form onSubmit={handleSendCode} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Mobile number
            </label>

            <div className="flex gap-2">
              {/* Sélecteur d’indicatif (20 les plus utilisés, sans drapeaux) */}
              <select
                className="mc-input w-28"
                value={dialCode}
                onChange={(e) => setDialCode(e.target.value)}
              >
                <option value="+1">+1 (US / Canada)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+33">+33 (France)</option>
                <option value="+49">+49 (Germany)</option>
                <option value="+39">+39 (Italy)</option>
                <option value="+34">+34 (Spain)</option>
                <option value="+31">+31 (Netherlands)</option>
                <option value="+46">+46 (Sweden)</option>
                <option value="+41">+41 (Switzerland)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+82">+82 (South Korea)</option>
                <option value="+86">+86 (China)</option>
                <option value="+91">+91 (India)</option>
                <option value="+55">+55 (Brazil)</option>
                <option value="+52">+52 (Mexico)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+7">+7 (Russia)</option>
                <option value="+27">+27 (South Africa)</option>
                <option value="+65">+65 (Singapore)</option>
                <option value="+971">+971 (UAE)</option>
              </select>

              <input
                type="tel"
                className="mc-input flex-1"
                placeholder="Your mobile number"
                value={phoneLocal}
                onChange={(e) => setPhoneLocal(e.target.value)}
                autoComplete="tel"
                required
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Enter your full mobile number without spaces. We’ll send the
              verification code to this number by SMS.
            </p>
          </div>

          <button
            type="submit"
            className="mc-btn mc-btn-primary mt-4"
            disabled={sendingCode}
          >
            {sendingCode ? "Sending…" : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
