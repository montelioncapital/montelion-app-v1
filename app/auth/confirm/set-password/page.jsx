// app/auth/confirm/set-password/page.jsx
import { Suspense } from "react";
import SetPasswordClient from "./SetPasswordClient";

export const dynamic = "force-dynamic";
export const revalidate = false;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Chargement…</div>}>
      <SetPasswordClient />
    </Suspense>
  );
}
