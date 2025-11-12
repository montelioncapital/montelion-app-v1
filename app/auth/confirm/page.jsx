import { Suspense } from "react";
import ConfirmClient from "./ConfirmClient";

export const dynamic = "force-dynamic"; // pas de prerender
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="mc-card">
          <div className="mc-section">
            <h1 className="mc-title mb-2">Confirming…</h1>
            <p className="text-slate-400">Checking your link…</p>
          </div>
        </div>
      }
    >
      <ConfirmClient />
    </Suspense>
  );
}
