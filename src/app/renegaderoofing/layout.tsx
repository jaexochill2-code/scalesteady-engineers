import type { Metadata } from "next"
import { Inter } from "next/font/google"
import PlasmaOrb from "./components/PlasmaOrb"
import RenegadeLogo from "./components/RenegadeLogo"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-renegade",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Renegade Roofing | Partner Portal",
  description: "Renegade Roofing campaign management dashboard.",
}

export default function RenegadeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} font-[family-name:var(--font-inter-renegade)] min-h-screen relative selection:bg-[#4ADE80]/30 selection:text-[#064E3B] tracking-tight antialiased`}>
      <PlasmaOrb />

      {/* Minimal top bar - Logo + Profile circle only */}
      <nav className="absolute top-0 w-full px-8 py-6 flex items-center justify-between z-50">
        <RenegadeLogo />
        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center select-none">
          <span className="text-sm font-black text-slate-500">W</span>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 pt-28 px-8 max-w-7xl mx-auto h-full min-h-screen pb-20">
        {children}
      </main>
    </div>
  )
}
