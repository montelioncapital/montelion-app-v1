"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function OnboardingClient() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [userId, setUserId] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // YYYY-MM-DD

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
        // Pas connecté → retour à la page de login
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
        // PGRST116 = no rows found
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

      setLoading(false);
    })();
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userId || saving) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (!firstName.trim() || !lastName.trim() || !dob) {
        setError("Please fill in all fields.");
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
            date_of_birth: dob, // string 'YYYY-MM-DD' → type date en DB
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

      setOk("Profile saved successfully.");
      // 🔜 plus tard : router.push("/onboarding/phone");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong, please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Onboarding</h1>
          <p className="text-slate-400">Loading your profile…</p>
        </div>
      </div>
    );
  }

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
        {ok && (
          <div className="mb-4 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-3 py-2 rounded-lg">
            {ok}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Date of birth */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Date of birth
            </label>
            <input
              type="date"
              className="mc-input"
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
