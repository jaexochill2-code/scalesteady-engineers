import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
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
  title: "ScaleSteady | Outbound Engineers",
  description: "We build and manage the outbound infrastructure that fills your calendar with qualified meetings. No ad spend. No guesswork. Fully owned by you.",
  keywords: "Outbound Infrastructure, Sales Automation, Revenue Pipelines, B2B Acquisition, Outbound Engineers",
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
