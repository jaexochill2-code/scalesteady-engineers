import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono, Plus_Jakarta_Sans, Barlow_Semi_Condensed } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/client/SmoothScroll";
import Navigation from "@/components/server/Navigation";
import Footer from "@/components/server/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// High-contrast editorial serif -- authoritative, high-fashion, Ellevest-register
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// DM Sans: closest Google Fonts match to Google Sans (proprietary)
// Colophon Foundry -- optically corrected geometric grotesque, humanist proportions
// Variable font: one import covers 100-900 weight range
// Used by Linear, premium fintech, 2025-2026 B2B tier upgrade from Inter
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["opsz"],  // optical size axis for body vs display use
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Premium geometric sans for wordmark -- Futura's DNA, modern optical corrections
// Used by Vercel, Framer, premium B2B tier 2025-2026
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Barlow Semi Condensed: condensed ExtraBold -- engineering precision, industrial authority
// Angular + efficient letterforms match the geometric icon. Not in the startup font pool.
const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "ScaleSteady | Pipeline Engineers",
  description: "We build and manage the outbound infrastructure that fills your calendar with qualified meetings. No ad spend. No guesswork. Fully owned by you.",
  keywords: "Outbound Infrastructure, Sales Automation, Revenue Pipelines, B2B Acquisition, Pipeline Engineers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${plusJakarta.variable} ${barlowSemiCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">

        <SmoothScroll>
          <Navigation />
          <main className="flex-grow pt-[80px]">
            {children}
          </main>
          <Footer />
        </SmoothScroll>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
