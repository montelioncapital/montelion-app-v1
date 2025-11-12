import { Suspense } from "react";
import ConfirmClient from "./ConfirmClient";

// 🔒 pas de SSG/ISR pour cette route
export const dynamic = "force-dynamic";
export const revalidate = false;

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ConfirmClient />
    </Suspense>
  );
}
