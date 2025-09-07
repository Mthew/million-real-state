import React from "react";
import Link from "next/link";

export const ListingsHero = () => {
  return (
    <div className="relative text-center mb-12 sm:mb-16 lg:mb-20">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 bg-gradient-to-b from-muted/20 via-transparent to-transparent rounded-3xl"></div>

      <div className="relative z-10 py-12 sm:py-16 lg:py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-foreground mb-6 sm:mb-8 lg:mb-10 text-balance leading-[0.9] tracking-tight">
          Exclusive
          <span className="block font-normal italic text-accent">
            Properties
          </span>
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground/80 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-pretty leading-relaxed font-light mb-8 sm:mb-10 lg:mb-12">
          Discover our meticulously curated collection of the world&apos;s most
          prestigious luxury real estate investments and architectural
          masterpieces
        </p>

        {/* Elegant divider */}
        <div className="flex items-center justify-center mb-8 sm:mb-10 lg:mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent w-24 sm:w-32 lg:w-48"></div>
          <div className="mx-4 w-1 h-1 bg-accent rounded-full"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent w-24 sm:w-32 lg:w-48"></div>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center">
            <div className="flex justify-center">
              <Link
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
