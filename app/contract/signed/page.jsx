"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function ContractSignedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();

      if (sessionErr || !sessionData?.session?.user) {
        router.replace("/login");
        return;
      }

      const userId = sessionData.session.user.id;

      // Récupérer le contrat
      const { data: contract, error: contractErr } = await supabase
        .from("contracts")
        .select("pdf_url")
        .eq("user_id", userId)
        .maybeSingle();

      if (contractErr || !contract?.pdf_url) {
        setError("We couldn’t find your signed contract.");
        setLoading(false);
        return;
      }

      // Créer une URL signée pour téléchargement (si bucket privé)
      const { data: signedUrlData, error: urlErr } = await supabase.storage
        .from("contracts")
        .createSignedUrl(contract.pdf_url, 60 * 60); // 1h

      if (urlErr || !signedUrlData?.signedUrl) {
        setError("Unable to generate a download link for your contract.");
        setLoading(false);
        return;
      }

      setDownloadUrl(signedUrlData.signedUrl);
      setLoading(false);
    })();
  }, [router]);

  return (
    <div className="mc-card">
      <div className="mc-section max-w-xl mx-auto text-left">
        <h1 className="mc-title mb-3">Thank you for your trust</h1>
        <p className="text-slate-400 mb-6">
          Your management mandate has been signed electronically and added to
          your Montelion file.
        </p>

        {loading && (
          <p className="text-slate-400 text-sm">Preparing your contract…</p>
        )}

        {error && (
          <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 mb-6 text-sm text-slate-300">
              <p className="mb-2">
                A PDF copy of your signed contract is stored securely in our
                systems.
              </p>
              <p className="text-xs text-slate-500">
                You can download it at any time for your personal records.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mc-btn mc-btn-primary"
                >
                  Download contract (PDF)
                </a>
              )}

              <button
                type="button"
                onClick={() => router.push("/")}
                className="mc-btn border border-slate-700 text-slate-300 text-sm hover:bg-slate-900"
              >
                Go to dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
