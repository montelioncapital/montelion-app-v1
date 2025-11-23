"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function MT5AccessPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const [brokerName, setBrokerName] = useState("");
  const [server, setServer] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Vérification utilisateur connecté
  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      setUserId(session.user.id);
      setLoading(false);
    })();
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!brokerName || !server || !password) {
      alert("Please fill out all fields.");
      return;
    }

    if (!userId) return;

    // 👉 Enregistrement dans MT5_ACCOUNTS
    const { error: insertErr } = await supabase.from("mt5_accounts").upsert(
      {
        user_id: userId,
        broker_name: brokerName,
        server: server,
        password: password,
      },
      { onConflict: "user_id" }
    );

    if (insertErr) {
      console.error("Error saving MT5 access:", insertErr);
      alert("Unable to save data.");
      return;
    }

    // 👉 Mise à jour du current_step = 13
    const { error: stepErr } = await supabase.from("onboarding_state").upsert(
      {
        user_id: userId,
        current_step: 13,
        completed: false,
      },
      { onConflict: "user_id" }
    );

    if (stepErr) {
      console.error("Error updating step:", stepErr);
    }

    router.push("/get-started/review");
  }

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title">Loading…</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card max-w-2xl mx-auto">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-3">Connect your MT5 account</h1>
        <p className="text-slate-400 text-sm mb-8">
          Please provide the access details of the MT5 account that will be
          traded by Montelion. Make sure the information is correct before
          validating.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Broker Name */}
          <div>
            <label className="mc-label">Broker name</label>
            <input
              type="text"
              placeholder="Ex: IC Markets, Pepperstone…"
              className="mc-input"
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
            />
          </div>

          {/* MT5 Server */}
          <div>
            <label className="mc-label">MT5 server</label>
            <input
              type="text"
              placeholder="Ex: ICMarketsSC-Demo, Broker-MT5-Live"
              className="mc-input"
              value={server}
              onChange={(e) => setServer(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="mc-label">MT5 password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="mc-input pr-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-slate-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            These credentials are stored securely and used only to connect your MT5
            account to Montelion's trading infrastructure.
          </p>

          <button type="submit" className="mc-btn mc-btn-primary w-full">
            Save and continue
          </button>
        </form>
      </div>
    </div>
  );
}
