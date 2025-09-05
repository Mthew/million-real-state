"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-foreground tracking-tight">
                Million Luxury
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6 xl:space-x-8">
              <Link
                href="/listings"
                className="text-foreground hover:text-accent transition-colors duration-200 px-3 py-2 text-sm xl:text-base font-medium tracking-wide"
              >
                Listings
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-accent transition-colors duration-200 px-3 py-2 text-sm xl:text-base font-medium tracking-wide"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-accent transition-colors duration-200 px-3 py-2 text-sm xl:text-base font-medium tracking-wide"
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-background inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-accent hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`block h-6 w-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-3 space-y-1 sm:px-6 bg-muted/50 backdrop-blur-sm">
          <Link
            href="/listings"
            className="text-foreground hover:text-accent block px-3 py-3 text-base font-medium transition-colors duration-200 rounded-md hover:bg-background/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Listings
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-accent block px-3 py-3 text-base font-medium transition-colors duration-200 rounded-md hover:bg-background/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-foreground hover:text-accent block px-3 py-3 text-base font-medium transition-colors duration-200 rounded-md hover:bg-background/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
