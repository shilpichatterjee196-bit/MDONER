import React from 'react';

/**
 * Professional, subtle skeleton loader with slight orange brand warmth
 * Uses gentle opacity pulsing without harsh jarring shimmer.
 */
export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/80 dark:bg-slate-700/60 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-orange-50/40 before:to-transparent ${className}`}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-9 w-9 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-28 mt-2" />
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-14 w-full rounded-xl" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
      </div>
      <div className="pt-2 border-t border-slate-100 flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export function AlertCardSkeleton() {
  return (
    <div className="bg-white border-l-4 border-l-orange-400 border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}
