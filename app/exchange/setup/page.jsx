import React from "react";

export default function ConnectYourAccount() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Connect Your Exchange Account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Please follow each step carefully to create and connect your trading API keys
          to Montelion in a secure way.
        </p>

        {/* Global security reminder */}
        <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm">
          <p className="font-medium text-amber-900">
            Never share your API keys in plain text. Montelion will never ask for your password.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* STEP 1 */}
        <Step
          number={1}
          title="Log in to your exchange account"
          description={
            <>
              <p>
                Log in to your cryptocurrency exchange account using your usual
                credentials on the official website or mobile application.
              </p>
              <p className="mt-1">
                Please make sure you are on the correct official domain before
                entering any personal information.
              </p>
            </>
          }
        />

        {/* STEP 2 */}
        <Step
          number={2}
          title="Open the API management page"
          description={
            <>
              <p>
                Go to the <strong>API Management</strong> or{" "}
                <strong>API Keys</strong> section of your exchange.
              </p>
              <p className="mt-1">
                This is usually found in the <strong>Profile</strong>,{" "}
                <strong>Security</strong>, or <strong>Settings</strong> menu.
              </p>
            </>
          }
        />

        {/* STEP 3 */}
        <Step
          number={3}
          title="Create a new API key"
          description={
            <>
              <p>
                Create a new API key dedicated exclusively to Montelion.
                If you are asked to choose a label, you may name it for
                example <strong>&quot;Montelion Trading&quot;</strong>.
              </p>
              <p className="mt-1">
                During creation, the exchange may ask you to confirm via 
                email and/or 2FA (Google Authenticator, SMS, etc.).
              </p>
            </>
          }
        />

        {/* STEP 4 */}
        <Step
          number={4}
          title="Set the correct permissions"
          description={
            <>
              <p>
                When configuring permissions for your new API key, please:
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Enable <strong>Read</strong> permission.</li>
                <li>Enable <strong>Trading</strong> (or <strong>Futures Trading</strong>) permission if required by Montelion.</li>
                <li>
                  <strong>Do not</strong> enable any withdrawal or transfer-related
                  permission.
                </li>
              </ul>
            </>
          }
        />

        {/* STEP 5 */}
        <Step
          number={5}
          title="Confirm and generate your API keys"
          description={
            <>
              <p>
                Confirm the creation of your API key by following the security
                procedures requested by your exchange (email code, 2FA, etc.).
              </p>
              <p className="mt-1">
                Once confirmed, the exchange will display your{" "}
                <strong>API Key</strong>, <strong>Secret Key</strong>, and on
                some platforms a <strong>Passphrase</strong>.
              </p>
            </>
          }
        />

        {/* STEP 6 – red warning box only with the required text */}
        <div className="relative flex gap-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-700">
            6
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-red-800">
              Critical security rule
            </h2>
            <p className="mt-2 text-sm text-red-900">
              Never enable the Withdraw permission. Keep your API access restricted.
            </p>
          </div>
        </div>

        {/* STEP 7 – save keys + reminder + no personal trading */}
        <Step
          number={7}
          title="Save your keys and respect the trading rules"
          description={
            <>
              <p>
                Carefully save your <strong>API Key</strong>,{" "}
                <strong>Secret Key</strong> and, if applicable, your{" "}
                <strong>Passphrase</strong> in a secure place. You will need to
                provide these details to Montelion after you click
                <strong> &quot;I&apos;ve created my API keys&quot;</strong> so
                that Montelion can trade on your account on your behalf.
              </p>
              <p className="mt-3 font-semibold text-gray-900">
                Once your API key is activated and connected to Montelion, it is
                strictly forbidden for you to use this account for your own
                personal trades.
              </p>
              <p className="mt-1 text-sm text-gray-700">
                If you execute personal trades on this connected account, your
                account may be closed permanently and your access to Montelion
                services may be terminated without notice.
              </p>
            </>
          }
        />
      </div>

      {/* Footer button example (optional) */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center rounded-lg border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
        >
          I&apos;ve created my API keys
        </button>
      </div>
    </div>
  );
}

type StepProps = {
  number: number;
  title: string;
  description: React.ReactNode;
};

function Step({ number, title, description }: StepProps) {
  return (
    <div className="relative flex gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
        {number}
      </div>
      <div>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        <div className="mt-1 text-sm text-gray-700">{description}</div>
      </div>
    </div>
  );
}
