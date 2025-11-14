// app/contract/signed/page.jsx

export const metadata = {
  title: "Contract signed | Montelion Capital",
};

export default function ContractSignedPage() {
  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-3">Your contract has been signed</h1>
        <p className="text-slate-400 mb-6">
          Thank you. Your discretionary management agreement has been
          successfully signed and stored securely.
        </p>

        <div className="rounded-2xl border border-emerald-700/60 bg-emerald-950/20 px-5 py-4 text-sm text-emerald-200">
          <p className="font-medium mb-1">What happens next?</p>
          <ul className="list-disc list-inside text-xs text-emerald-100/90 space-y-1">
            <li>Montelion will review your file and contract details.</li>
            <li>
              You will receive an email if anything else is needed on your side.
            </li>
            <li>You can download your signed contract from your dashboard.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
