import { Suspense } from "react";
import ForgotPasswordClient from "./ForgotPasswordClient";

export const dynamic = "force-dynamic";
export const revalidate = false;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <ForgotPasswordClient />
    </Suspense>
  );
}
