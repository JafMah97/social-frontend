"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileOverviewSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-full h-full flex flex-col justify-start items-center">
        {/* Cover Image */}
        <Skeleton className="w-full h-32 rounded-lg outline outline-neutral-500" />

        {/* Profile Image */}
        <Skeleton className="w-16 h-16 rounded-full absolute -top-1/2 -left-1/2 -translate-1/2" />

        {/* Username & Full Name */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <Skeleton className="w-24 h-4 rounded" />
          <Skeleton className="w-32 h-5 rounded" />
        </div>

        {/* Followers & Following */}
        <div className="flex flex-col justify-around w-full px-2 mt-4 gap-2">
          <div className="flex flex-row justify-center items-center space-x-2">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="w-10 h-3 rounded" />
            <Skeleton className="w-14 h-3 rounded" />
          </div>
          <div className="flex flex-row justify-center items-center space-x-2">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="w-10 h-3 rounded" />
            <Skeleton className="w-14 h-3 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
