"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

/**
 * Routing EXACT selon ton tableau current_step
 *
 * 0   -> get started
 * 1-6 -> onboarding
 * 7   -> get started avancé
 * 8   -> bridge "ready to sign"
 * 9   -> page de signature
 * 10  -> get started avancé
 * 11  -> start exchange create
 * 12  -> donner les codes MT5
 * 13  -> get started avancé
 * 14  -> dashboard actif
 * 15  -> compte désactivé
 * 16  -> compte suspendu
 */
function getRedirectForStep(step) {
  switch (step) {
    case 0:
      return "/get-started";

    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return "/onboarding";

    case 7:
    case 10:
    case 13:
      return "/get-started/advanced";

    case 8:
      return "/contract/ready";

    case 9:
      return "/contract";

    case 11:
      return "/exchange/start";

    case 12:
      return "/exchange/mt5";

    case 14:
      return "/dashboard";

    case 15:
      return "/account-disabled";

    case 16:
      return "/account-suspended";

    default:
      return "/get-started";
  }
}

export default function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    setLoading(true);

    // 1) Connexion Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pwd,
    });

    if (error) {
      setLoading(false);
      if (error.message?.toLowerCase().includes("invalid")) {
        setErr("Email ou mot de passe incorrect.");
      } else {
        setErr(error.message || "Impossible de se connecter.");
      }
      return;
    }

    const user = data?.user;
    if (!user) {
      setLoading(false);
      setErr("Impossible de récupérer votre session.");
      return;
    }

    setOk("Connexion réussie.");
    const userId = user.id;

    try {
      // 2) Récupérer l'état d'onboarding
      const { data: onboarding, error: onboardingErr } = await supabase
        .from("onboarding_state")
        .select("current_step, completed")
        .eq("user_id", userId)
        .maybeSingle();

      if (onboardingErr && onboardingErr.code !== "PGRST116") {
        console.error("onboarding_state error:", onboardingErr);
      }

      // 3) Si aucune ligne -> on initialise à step 1 et on envoie vers /onboarding
      if (!onboarding) {
        const { error: insertErr } = await supabase
          .from("onboarding_state")
          .insert({
            user_id: userId,
            current_step: 1,
            completed: false,
          });

        if (insertErr) {
          console.error("onboarding_state insert error:", insertErr);
          router.push("/get-started");
          return;
        }

        router.push("/onboarding");
        return;
      }

      const step = onboarding.current_step ?? 0;
      const redirectTo = getRedirectForStep(step);

      router.push(redirectTo);
    } catch (e) {
      console.error("Login redirect error:", e);
      router.push("/get-started");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Titre */}
      <div className="mb-8 text-left">
        <h1 className="mc-title">Sign in</h1>
      </div>

      {/* Messages */}
      {err ? <div className="mb-4 text-sm text-red-400">{err}</div> : null}
      {ok ? (
        <div className="mb-4 text-sm text-emerald-400">{ok}</div>
      ) : null}

      {/* Formulaire */}
      <form className="space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm text-slate-300">
          Email
          <input
            type="email"
            placeholder="you@example.com"
            className="mc-input mt-2"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            inputMode="email"
          />
        </label>

        <div>
          <div className="flex items-center justify-between text-sm text-slate-300">
            <label>Password</label>
            <a
              href="/auth/forgot-password"
              className="text-slate-400 hover:text-slate-300"
            >
              Forgot password?
            </a>
          </div>

          {/* Champ mot de passe + œil */}
          <div className="relative mt-2">
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="mc-input pr-11"
              autoComplete="current-password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? (
                // eye-off
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3l18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.09A10.94 10.94 0 0112 5c5.52 0 9 4.5 9 7-.23.83-1.07 2.19-2.54 3.53M6.53 6.53C4.51 7.74 3.23 9.3 3 12c0 2.5 3.48 7 9 7 1.21 0 2.34-.21 3.36-.6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // eye
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mc-btn mc-btn-primary w-full mt-3 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-left text-sm text-slate-500">
        Need help? Contact <a href="#">Montelion Capital Support</a>.
      </p>
    </>
  );
}
