"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function AccountSuspendedPage() {
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
          <h1 className="mc-title mb-3">Your account is temporarily suspended</h1>
          <p className="text-slate-400 mb-6">
            For security or compliance reasons, access to your Montelion
            account has been temporarily suspended. During this period, you
            cannot log in or request new trades.
          </p>

          <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 px-4 py-3 mb-6 text-sm text-amber-100">
            Our team may be reviewing recent activity on your account or
            requesting additional information. Please contact support so we
            can help you resolve this as quickly as possible.
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
            You will be notified by email as soon as your account status
            changes or if we need additional documents from you.
          </p>
        </div>
      </div>
    </div>
  );
}
