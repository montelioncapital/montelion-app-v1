export const dynamic = 'force-dynamic';
export const revalidate = false;

import { Suspense } from 'react';
import ConfirmClient from './ConfirmClient';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ConfirmClient />
    </Suspense>
  );
}
