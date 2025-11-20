// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const uid = session.user.id;

      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, status")
        .eq("id", uid)
        .maybeSingle();

      if (error) {
        console.error("Error loading profile:", error);
      } else {
        setProfile(data);
      }

      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Dashboard</h1>
          <p className="text-slate-400 text-sm">Loading your account…</p>
        </div>
      </div>
    );
  }

  const fullName =
    (profile?.first_name || profile?.last_name) ?
    `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() :
    "Your account";

  return (
    <div className="mc-card">
      <div className="mc-section max-w-3xl mx-auto text-left">
        <h1 className="mc-title mb-3">Welcome back</h1>
        <p className="text-slate-400 text-sm mb-6">
          {fullName}, your Montelion account is now active.
        </p>

        <div className="rounded-2xl border border-emerald-600/70 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100 mb-6">
          <p className="font-medium mb-1.5">Account status</p>
          <p className="text-emerald-100/90">
            Status: <span className="font-semibold capitalize">{profile?.status}</span>.
            You can now let Montelion trade on your connected account.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 text-xs text-slate-300 space-y-2">
          <p>
            This area will soon display your trading performance, risk metrics,
            and account activity. For now, your setup is complete and our team
            monitors your trading connection in the background.
          </p>
          <p>
            If you need to change your trading account or pause the service,
            please contact Montelion support.
          </p>
        </div>
      </div>
    </div>
  );
}
