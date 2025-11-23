"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

/**
 * Mapping EXACT de ton tableau Google Sheets
 * (aucune modification, strictement ce que tu as donné)
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
      return "/contract/ready";

    case 8:
      return "/contract";

    case 9:
      return "/contract/signed?file=....";

    case 10:
      return "/get-started/advanced";

    case 11:
      return "/account/setup";

    case 12:
      return "/account/mt5";

    case 13:
      return "/get-started/review";

    case 14:
      return "/dashboard";

    case 15:
      return "/disabled";

    case 16:
      return "/suspended";

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

    // Connexion Supabase
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
      // Récupération de onboarding_state
      const { data: onboarding, error: onboardingErr } = await supabase
        .from("onboarding_state")
        .select("current_step, completed")
        .eq("user_id", userId)
        .maybeSingle();

      // Si pas d'entrée -> init à step 1
      if (!onboarding) {
        await supabase.from("onboarding_state").insert({
          user_id: userId,
          current_step: 1,
          completed: false,
        });

        router.push("/onboarding");
        return;
      }

      // STEP EXACT → URL EXACTE
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
      <div className="mb-8 text-left">
        <h1 className="mc-title">Sign in</h1>
      </div>

      {err ? <div className="mb-4 text-sm text-red-400">{err}</div> : null}
      {ok ? <div className="mb-4 text-sm text-emerald-400">{ok}</div> : null}

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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mc-btn mc-btn-primary w-full mt-3 disabled:opacity-60"
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
