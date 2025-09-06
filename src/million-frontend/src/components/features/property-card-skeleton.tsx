import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
  return (
    <div className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
        {/* Image Skeleton */}
        <div className="relative h-96 overflow-hidden flex-shrink-0">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Content Skeleton */}
        <div className="p-6 flex-grow flex flex-col">
          <Skeleton className="h-3 w-32 mb-2" />

          <Skeleton className="h-6 w-full mb-4" />

          <div className="flex items-center gap-4 mb-5">
            <Skeleton className="h-3 w-12" />
            <span className="text-muted-foreground/30">•</span>
            <Skeleton className="h-3 w-14" />
            <span className="text-muted-foreground/30">•</span>
            <Skeleton className="h-3 w-20" />
          </div>

          {/* Price Skeleton */}
          <div className="mt-auto">
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
