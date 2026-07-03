import { ProductGridSkeleton } from "@/components/shared/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogueLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Skeleton className="mb-2 h-4 w-40" />
      <Skeleton className="mb-8 h-9 w-64" />
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <Skeleton className="h-96 rounded-3xl" />
        <div className="space-y-6">
          <Skeleton className="h-11 w-full rounded-full" />
          <ProductGridSkeleton />
        </div>
      </div>
    </div>
  );
}
