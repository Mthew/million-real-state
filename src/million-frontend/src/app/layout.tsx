import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Lato } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/features/header";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Million Luxury - Exclusive Real Estate",
  description:
    "Discover luxury properties with Million Luxury - Your gateway to exclusive real estate investments and dream homes.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased ${playfair.variable} ${lato.variable} ${GeistMono.variable}`}
      >
        <Header />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
