// app/auth/confirm/page.jsx
import { Suspense } from "react";
import ConfirmClient from "./ConfirmClient";

export const dynamic = "force-dynamic";   // force le SSR
export const revalidate = false;          // pas de SSG/ISR

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Chargement…</div>}>
      <ConfirmClient />
    </Suspense>
  );
}
