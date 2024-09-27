import { Suspense } from "react";

export default function AvailabilityLayout({ children }: any) {
  return (
    <Suspense fallback={<div>Loading................</div>}>
      {children}
    </Suspense>
  );
}
