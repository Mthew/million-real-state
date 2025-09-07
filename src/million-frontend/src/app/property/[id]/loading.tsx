export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="animate-pulse">
          {/* Back Navigation Skeleton */}
          <div className="h-6 bg-muted rounded w-32 mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery Skeleton */}
            <div className="lg:col-span-2 space-y-4">
              {/* Main Image */}
              <div className="aspect-[4/3] bg-muted rounded-lg"></div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-muted rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Property Information Skeleton */}
            <div className="space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </div>

              {/* Property Details Card */}
              <div className="p-6 bg-muted/30 rounded-lg space-y-4">
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </div>
                </div>
              </div>

              {/* Owner Information Card */}
              <div className="p-6 bg-muted/30 rounded-lg space-y-4">
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              </div>

              {/* Sales History Card */}
              <div className="p-6 bg-muted/30 rounded-lg space-y-4">
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="space-y-4">
                  {[...Array(2)].map((_, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-muted pl-4 space-y-2"
                    >
                      <div className="h-3 bg-muted rounded w-1/3"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <div className="h-3 bg-muted rounded w-1/4"></div>
                          <div className="h-3 bg-muted rounded w-1/3"></div>
                        </div>
                        <div className="flex justify-between">
                          <div className="h-3 bg-muted rounded w-1/4"></div>
                          <div className="h-3 bg-muted rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Button */}
              <div className="h-12 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
