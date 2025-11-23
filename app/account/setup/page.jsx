// app/account/setup/page.jsx
"use client";

import { useRouter } from "next/navigation";

export default function AccountSetupPage() {
  const router = useRouter();

  const goToKeysForm = () => {
    router.push("/account/mt5");
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">
          Connect your Account
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mb-6">
          Follow these steps to securely connect your trading account so that
          Montelion can execute trades for you.
        </p>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
          <p className="text-xs text-slate-300">
            Never share your API keys in plain text. Montelion will never ask
            for your password.
          </p>

          {/* STEP 1 */}
          <div className="border border-slate-800 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-semibold mt-0.5">
                1
              </div>
              <div>
                <h2 className="text-sm font-semibold mb-1">
                  Log in to your exchange account
                </h2>
                <p className="text-xs text-slate-300">
                  Connect to your exchange (Bybit, Binance, etc.) using your
                  usual login method on the official website or app.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="border border-slate-800 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-semibold mt-0.5">
                2
              </div>
              <div>
                <h2 className="text-sm font-semibold mb-1">
                  Go to the API management section
                </h2>
                <p className="text-xs text-slate-300">
                  In your account settings, open the{" "}
                  <span className="font-medium text-slate-100">
                    API management
                  </span>{" "}
                  or{" "}
                  <span className="font-medium text-slate-100">
                    API keys
                  </span>{" "}
                  section to create a new API key.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="border border-slate-800 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-semibold mt-0.5">
                3
              </div>
              <div>
                <h2 className="text-sm font-semibold mb-1">
                  Create a new API key
                </h2>
                <p className="text-xs text-slate-300">
                  Choose a name like{" "}
                  <span className="font-medium text-slate-100">
                    Montelion Trading
                  </span>{" "}
                  so you can easily recognize this API key later.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="border border-slate-800 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-semibold mt-0.5">
                4
              </div>
              <div>
                <h2 className="text-sm font-semibold mb-1">
                  Restrict the permissions
                </h2>
                <p className="text-xs text-slate-300">
                  Only enable{" "}
                  <span className="font-medium text-slate-100">
                    read
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-slate-100">
                    trading
                  </span>{" "}
                  permissions so Montelion can analyze the market and execute
                  trades for you.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 5 */}
          <div className="border border-slate-800 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-semibold mt-0.5">
                5
              </div>
              <div>
                <h2 className="text-sm font-semibold mb-1">
                  Secure your IP and environment
                </h2>
                <p className="text-xs text-slate-300">
                  If your exchange allows it, restrict the API key to{" "}
                  <span className="font-medium text-slate-100">
                    trusted IPs
                  </span>{" "}
                  only and avoid using this key from unknown devices.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 6 - SECURITY WARNING */}
          <div className="border border-red-500/60 bg-red-500/10 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-semibold mt-0.5">
                6
              </div>
              <div>
                <h2 className="text-sm font-semibold mb-1">
                  Disable withdrawals
                </h2>
                <p className="text-xs text-red-100 font-medium">
                  Never enable the Withdraw permission. Keep your API access
                  restricted.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 7 - FINAL REMINDERS */}
          <div className="border border-slate-800 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-semibold mt-0.5">
                7
              </div>
              <div className="space-y-2">
                <h2 className="text-sm font-semibold">
                  Save and share your keys with Montelion
                </h2>
                <p className="text-xs text-slate-300">
                  Carefully save your{" "}
                  <span className="font-medium text-slate-100">API key</span>,{" "}
                  <span className="font-medium text-slate-100">
                    secret key
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-slate-100">
                    passphrase
                  </span>
                  . When you click{" "}
                  <span className="font-medium text-slate-100">
                    “I&apos;ve created my API keys”
                  </span>
                  , you will need to provide them so that Montelion can trade on
                  your account.
                </p>
                <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/40 rounded-xl px-3 py-2">
                  Once your API key is activated, it is strictly forbidden to
                  place personal trades on this account. If you do, your account
                  will be permanently closed from our service.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={goToKeysForm}
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 text-sm font-medium px-4 py-2.5 hover:bg-slate-100 transition"
            >
              I&apos;ve created my API keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
