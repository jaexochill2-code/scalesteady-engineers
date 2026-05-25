import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/client/SmoothScroll";
import Navigation from "@/components/server/Navigation";
import Footer from "@/components/server/Footer";

// Load premium editorial variable serif font
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// Load primary prose readable sans font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Load systems monospace technical data font
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pipeline Engineers — Revenue Infrastructure & Autonomous Deal Flow",
  description: "Stop renting volatile ad campaigns. Own the autonomous outbound infrastructure that acquires commercial contracts with mathematical certainty.",
  keywords: "Outbound Infrastructure, Sales Automation, Revenue Pipelines, B2B Acquisition, Systems Engineering",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-pipeline-white text-pipeline-black font-sans selection:bg-arc-orange selection:text-pipeline-white">
        
        {/* Active Global Smooth Scrolling */}
        <SmoothScroll>
          
          <Navigation />
          
          {/* Main Content Node — Offset by 88px header height to accommodate position: fixed */}
          <main className="flex-grow pt-[88px]">
            {children}
          </main>
          
          <Footer />
          
        </SmoothScroll>

      </body>
    </html>
  );
}
