import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton"


export default function AvailabilityLayout({ children }: any) {
  return (
    <Suspense fallback={<div>
      <Skeleton className=" h-[90vh] w-full bg-white"/>
    </div>}>
      {children}
    </Suspense>
  );
}
