import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <Skeleton className="aspect-square w-full rounded-none bg-secondary/40" />
      
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Category & SKU */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Description */}
        <div className="space-y-1.5 py-1">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>

        {/* Bottom row: Price/Stock & View Button */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>

      {/* WhatsApp Action Strip Skeleton */}
      <Skeleton className="h-10 w-full rounded-none rounded-b-3xl" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
