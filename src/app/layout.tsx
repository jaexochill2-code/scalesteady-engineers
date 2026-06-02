import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/client/SmoothScroll";
import Navigation from "@/components/server/Navigation";
import Footer from "@/components/server/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// DM Sans: closest Google Fonts match to Google Sans -- single typeface throughout site
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["opsz"],
});

// JetBrains Mono: terminal/code elements only (phone notifications, tooltip mono)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
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
      className={`${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
