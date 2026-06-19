import SmoothScroll from "@/components/client/SmoothScroll"
import Navigation from "@/components/server/Navigation"
import Footer from "@/components/server/Footer"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScroll>
      <Navigation />
      <main className="flex-grow pt-[80px]">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  )
}
