"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function AccountDisabledPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      setLoading(false);
    })();
  }, [router]);

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Error signing out:", e);
    }
    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center px-4 md:px-0 py-10 md:py-16">
        <div className="mc-card">
          <div className="mc-section text-left">
            <h1 className="mc-title mb-2">Account status</h1>
            <p className="text-slate-400">Loading your information…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-4 md:px-0 py-10 md:py-16">
      <div className="mc-card max-w-xl w-full">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-3">Your account is disabled</h1>
          <p className="text-slate-400 mb-6">
            Access to your Montelion account has been permanently disabled.
            This can occur for compliance, security or contractual reasons.
          </p>

          <div className="rounded-xl border border-rose-500/40 bg-rose-500/5 px-4 py-3 mb-6 text-sm text-rose-200">
            If you believe this is a mistake or you would like more information
            about this decision, please contact Montelion Capital support.
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <a
              href="mailto:support@montelion-capital.com"
              className="mc-btn mc-btn-primary flex-1 text-center"
            >
              Contact support
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="mc-btn mc-btn-ghost flex-1"
            >
              Back to login
            </button>
          </div>

          <p className="mt-4 text-[11px] text-slate-500">
            For security reasons, trading activity and access to your client
            area are no longer available on this account.
          </p>
        </div>
      </div>
    </div>
  );
}
