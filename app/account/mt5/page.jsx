// app/account/mt5/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Mt5AccessPage() {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [brokerName, setBrokerName] = useState("");
  const [server, setServer] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load authenticated user and existing MT5 access data
  useEffect(() => {
    const loadSessionAndData = async () => {
      setLoadingSession(true);
      setError("");
      setSuccess("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        setError("You must be logged in to access this page.");
        setLoadingSession(false);
        return;
      }

      const uid = session.user.id;
      setUserId(uid);

      const { data, error: fetchError } = await supabase
        .from("mt5_access")
        .select("*")
        .eq("user_id", uid)
        .maybeSingle();

      if (fetchError) {
        console.error(fetchError);
        setError("Unable to load your MT5 access information.");
      } else if (data) {
        setBrokerName(data.broker_name || "");
        setServer(data.server || "");
        setPassword(data.password || "");
      }

      setLoadingSession(false);
    };

    loadSessionAndData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        user_id: userId,
        broker_name: brokerName,
        server,
        password,
      };

      const { error: upsertError } = await supabase
        .from("mt5_access")
        .upsert(payload, { onConflict: "user_id" });

      if (upsertError) {
        console.error(upsertError);
        setError("An error occurred while saving your MT5 access.");
      } else {
        setSuccess("Your MT5 access has been saved successfully.");
        router.push("/account/setup");
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error while saving your MT5 access.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020817] text-white">
        <p className="text-sm text-slate-300">Loading your account...</p>
      </div>
    );
  }

  if (error && !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020817] text-white">
        <div className="max-w-md w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm text-red-400 mb-4">{error}</p>
          <button
            type="button"
            onClick={() => router.push("/auth")}
            className="w-full rounded-xl px-4 py-2.5 text-sm font-medium bg-white text-slate-900 hover:bg-slate-100 transition"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <button
          type="button"
          onClick={() => router.push("/account/setup")}
          className="mb-6 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
        >
          ← Back to account setup
        </button>

        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Connect Your MT5 Account
        </h1>
        <p className="text-sm text-slate-300 mb-8 max-w-xl">
          Provide the login details of the MT5 account you want Montelion to
          trade on. Your credentials are encrypted and stored securely.
        </p>

        <form
          onSubmit={handleSave}
          className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5"
        >
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Broker name
            </label>
            <input
              type="text"
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
              placeholder="Ex: IC Markets, RoboForex..."
              className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              MT5 server
            </label>
            <input
              type="text"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              placeholder="Ex: ICMarkets-MT5-1"
              className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              MT5 password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2.5 pr-16 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 px-2 text-xs font-medium text-slate-400 hover:text-slate-100"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/40 rounded-xl px-3 py-2">
            Never share your MT5 credentials in plain text outside Montelion.
            Our team will never ask for your password via email, chat or social
            networks.
          </p>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/40 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          {success && (
            <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/40 rounded-xl px-3 py-2">
              {success}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 text-sm font-medium px-4 py-2.5 hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {saving ? "Saving..." : "Save and continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
