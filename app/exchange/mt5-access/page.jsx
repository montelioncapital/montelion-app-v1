// app/exchange/mt5-access/page.jsx
"use client";

import { useState } from "react";

export default function Mt5AccessPage() {
  const [form, setForm] = useState({
    login: "",
    password: "",
    server: "",
    brokerName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);

    try {
      // TODO: connexion Supabase ici plus tard
      // console.log pour l'instant
      console.log("Trading access submitted:", form);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to save access:", error);
      alert("An error occurred while saving your access. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mc-card">
      <div className="mc-section max-w-2xl mx-auto text-left">
        {/* HEADER */}
        <h1 className="mc-title mb-3">Connect Your Trading Account</h1>
        <p className="text-slate-400 text-sm mb-6">
          Please provide the details of the MetaTrader 5 account that Montelion
          will use for trading. Make sure the information is accurate to avoid
          connection issues.
        </p>

        {/* SECURITY NOTICE */}
        <div className="mb-8 rounded-2xl border border-amber-500/60 bg-amber-500/10 px-4 py-3 text-xs text-amber-100">
          <p className="font-medium mb-1.5">Security reminder</p>
          <p className="text-amber-100/90">
            Your trading credentials are encrypted and stored securely. Never
            share your MetaTrader login details via email, chat or screenshots.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* MT5 Login */}
          <div className="space-y-2">
            <label
              htmlFor="login"
              className="block text-xs font-medium text-slate-200"
            >
              MT5 Login ID
            </label>
            <input
              id="login"
              name="login"
              type="text"
              required
              value={form.login}
              onChange={handleChange}
              placeholder="e.g. 50234819"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-200"
            >
              MT5 Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Your MetaTrader 5 trading password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <p className="text-[11px] text-slate-500">
              If possible, use an{" "}
              <span className="font-medium text-slate-300">
                investor/read-only password
              </span>{" "}
              that still allows Montelion to trade according to your broker’s
              configuration.
            </p>
          </div>

          {/* Server */}
          <div className="space-y-2">
            <label
              htmlFor="server"
              className="block text-xs font-medium text-slate-200"
            >
              Trading server
            </label>
            <input
              id="server"
              name="server"
              type="text"
              required
              value={form.server}
              onChange={handleChange}
              placeholder="e.g. ICMarketsSC-Live19, FTMO-Demo, etc."
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <p className="text-[11px] text-slate-500">
              You can find the exact server name in your broker&apos;s MT5
              login email or inside the MetaTrader 5 terminal.
            </p>
          </div>

          {/* Broker name */}
          <div className="space-y-2">
            <label
              htmlFor="brokerName"
              className="block text-xs font-medium text-slate-200"
            >
              Broker name
            </label>
            <input
              id="brokerName"
              name="brokerName"
              type="text"
              required
              value={form.brokerName}
              onChange={handleChange}
              placeholder="e.g. IC Markets, FTMO, Eightcap..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Confirmation */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-[11px] text-slate-300 space-y-1.5">
            <p>
              By submitting this form, you confirm that you are the owner of the
              MetaTrader 5 account and authorize Montelion to connect and
              execute trades according to the agreed strategy.
            </p>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mc-btn mc-btn-primary min-w-[180px] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving your access..." : "Save my trading access"}
            </button>
          </div>

          {submitted && (
            <p className="text-[11px] text-emerald-400 pt-1">
              Your trading access has been recorded. You can safely close this
              page or go back to your dashboard.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
