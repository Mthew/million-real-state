import { Header } from "@/components/header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-24 xl:py-32">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground mb-4 sm:mb-6 lg:mb-8 text-balance leading-tight tracking-tight">
              Exclusive Properties
            </h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-6 sm:mb-8 lg:mb-12 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto text-pretty leading-relaxed">
              Discover luxury real estate investments and dream homes curated
              for discerning clients
            </p>

            <div className="flex justify-center">
              <a
                href="/listings"
                className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-lg text-base lg:text-lg xl:text-xl font-medium transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View Properties
                <svg
                  className="ml-2 h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
