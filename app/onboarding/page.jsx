// app/onboarding/page.jsx
import { Suspense } from "react";
import OnboardingClient from "./OnboardingClient";

export const dynamic = "force-dynamic";
export const revalidate = false;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-300">Loading…</div>}>
      <OnboardingClient />
    </Suspense>
  );
}
