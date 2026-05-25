import Link from "next/link";
import Logo from "@/components/server/Logo";

export default function Home() {
  return (
    <div className="w-full bg-brand-cashmere min-h-screen">
      
      {/* SECTION 01 — HERO */}
      <section className="relative flex min-h-[90vh] items-center justify-center px-6 py-20 md:px-8 bg-brand-cashmere overflow-hidden">
        
        {/* Background grid line pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6e4de_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-80"></div>
        
        <div className="relative mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Node */}
          <div className="lg:col-span-7 space-y-8 text-left z-10">
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full font-bold">
              Outbound Infrastructure
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-brand-charcoal max-w-2xl">
              The engineers of your outbound <span className="italic font-normal text-brand-orange font-serif">deal flow</span>
            </h1>
            <p className="font-sans text-base md:text-lg leading-relaxed text-brand-charcoal/80 max-w-xl">
              Stop renting volatile ad campaigns that break the moment you stop paying. We install the permanent outbound infrastructure that gives your team total ownership of your pipeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-brand-orange px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-charcoal transition-all duration-300 transform active:scale-95 shadow-md shadow-brand-orange/20"
              >
                Book a discovery call
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center justify-center border-2 border-brand-charcoal/80 px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wider text-brand-charcoal hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-300 transform active:scale-95"
              >
                Explore the pipeline
              </Link>
            </div>
            
            {/* Low friction subtext */}
            <p className="font-sans text-xs text-brand-charcoal/50 max-w-xs font-semibold">
              A 15-minute technical audit. Blueprints included regardless of fit.
            </p>
          </div>
          
          {/* Right System Schematic (Clean, high-contrast, premium engineering look) */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[380px] lg:h-[480px]">
            <div className="w-full max-w-md h-full border-2 border-brand-border rounded-2xl bg-white p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-brand-orange/5 rounded-full blur-3xl"></div>
              
              <div className="flex justify-between items-center border-b border-brand-border pb-4 font-mono text-[9px] uppercase tracking-wider text-brand-charcoal/60 font-bold">
                <span>Active Routing Relays</span>
                <span className="text-brand-orange flex items-center gap-1.5 font-bold">
                  <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse"></span>
                  OPERATIONAL
                </span>
              </div>
              
              {/* Schematic flow */}
              <div className="my-auto space-y-6 relative py-4">
                
                {/* Flow Node 1: Sourcing */}
                <div className="flex items-center justify-between border-2 border-brand-border p-3.5 rounded-xl bg-brand-cashmere/40">
                  <div className="flex items-center space-x-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-orange"></span>
                    <span className="font-mono text-xs text-brand-charcoal font-bold">Intent Signals</span>
                  </div>
                  <span className="font-mono text-[10px] text-brand-charcoal/60 font-bold">Clay / Scraping</span>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-center my-1">
                  <svg className="h-5 w-5 stroke-brand-orange" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Flow Node 2: SMTP Nodes */}
                <div className="flex items-center justify-between border-2 border-brand-border p-3.5 rounded-xl bg-brand-cashmere/40">
                  <div className="flex items-center space-x-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-orange"></span>
                    <span className="font-mono text-xs text-brand-charcoal font-bold">SMTP Sending Nodes</span>
                  </div>
                  <span className="font-mono text-[10px] text-brand-charcoal/60 font-bold">50+ Managed Domains</span>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-center my-1">
                  <svg className="h-5 w-5 stroke-brand-orange" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Flow Node 3: Target Inbox */}
                <div className="flex items-center justify-between border-2 border-brand-orange bg-brand-orange/5 p-3.5 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-orange animate-pulse"></span>
                    <span className="font-mono text-xs text-brand-charcoal font-bold">Primary Inbox Delivery</span>
                  </div>
                  <span className="font-mono text-[10px] text-brand-orange font-extrabold">98.4% RATE</span>
                </div>

              </div>
              
              <div className="border-t border-brand-border pt-4 flex justify-between items-center font-mono text-[10px] text-brand-charcoal/50 font-bold">
                <span>DNS Security: DMARC REJECT</span>
                <span className="text-brand-orange">Warmup: Active</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 02 — AUTHORITY STRIP */}
      <section className="border-y border-brand-border bg-brand-border/10 py-8 px-6 md:px-8 text-center">
        <div className="mx-auto w-full max-w-7xl">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-6 font-bold">
            Trusted by leaders in industrial and high-ticket services
          </span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale contrast-125">
            <span className="font-serif text-lg font-bold tracking-widest text-brand-charcoal">TARRANT MECHANICAL INC.</span>
            <span className="font-serif text-lg font-bold tracking-widest text-brand-charcoal">AESTHETICS CLINIC GROUP</span>
            <span className="font-serif text-lg font-bold tracking-widest text-brand-charcoal">APEX LEASING CORP</span>
            <span className="font-serif text-lg font-bold tracking-widest text-brand-charcoal">FLOOR CONTRACTING SERVICES</span>
          </div>
        </div>
      </section>

      {/* SECTION 03 — MANIFESTO */}
      <section className="px-6 py-24 md:px-8 bg-brand-cashmere">
        <div className="mx-auto w-full max-w-4xl space-y-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-bold">
            The Outbound Paradigm
          </span>
          <blockquote className="font-serif text-3xl md:text-5xl font-bold leading-snug text-brand-charcoal">
            "Most growth partners treat outbound outreach like a creative campaign. We treat it like <span className="italic font-normal text-brand-orange font-serif">structural engineering</span>. If your systems don't have built-in redundancy, automatic failure-safes, and clean data pipelines, they aren't systems. They are liabilities."
          </blockquote>
          <div className="pt-4">
            <span className="block font-mono text-xs uppercase tracking-widest text-brand-charcoal/60 font-bold">Office of the Director • Pipeline Engineers</span>
          </div>
        </div>
      </section>

      {/* SECTION 04 — SERVICES INDEX */}
      <section className="px-6 py-24 md:px-8 bg-brand-border/10 border-t border-brand-border">
        <div className="mx-auto w-full max-w-7xl space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-bold">Custom Operations Build</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-charcoal">The Revenue Pipelines</h2>
            </div>
            <p className="font-sans text-sm text-brand-charcoal/70 max-w-sm font-medium">
              We install three core infrastructure layers directly into your enterprise stack, giving you complete asset control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service Card 1 */}
            <div className="border-2 border-brand-border bg-white p-8 rounded-2xl flex flex-col justify-between h-[340px] transition-all duration-300 hover:shadow-lg hover:border-brand-orange/60 group">
              <div className="space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold">01 / Infrastructure</span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal group-hover:text-brand-orange transition-colors">Outbound Email Engines</h3>
                <p className="font-sans text-sm text-brand-charcoal/75 leading-relaxed font-medium">
                  Programmatic deployment of 50+ secondary sending domains, manual authentication (SPF/DKIM/DMARC), and custom tracking channels.
                </p>
              </div>
              <Link href="/services" className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange inline-flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                <span>View Blueprint</span>
                <span>→</span>
              </Link>
            </div>

            {/* Service Card 2 */}
            <div className="border-2 border-brand-border bg-white p-8 rounded-2xl flex flex-col justify-between h-[340px] transition-all duration-300 hover:shadow-lg hover:border-brand-orange/60 group">
              <div className="space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold">02 / Automation</span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal group-hover:text-brand-orange transition-colors">Operational Automation</h3>
                <p className="font-sans text-sm text-brand-charcoal/75 leading-relaxed font-medium">
                  Clean middleware linkages routing positive email responses directly into your primary CRM, triggering instant booking follow-ups.
                </p>
              </div>
              <Link href="/services" className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange inline-flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                <span>View Blueprint</span>
                <span>→</span>
              </Link>
            </div>

            {/* Service Card 3 */}
            <div className="border-2 border-brand-border bg-white p-8 rounded-2xl flex flex-col justify-between h-[340px] transition-all duration-300 hover:shadow-lg hover:border-brand-orange/60 group">
              <div className="space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold">03 / Data Mining</span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal group-hover:text-brand-orange transition-colors">Data Mining & Scraping</h3>
                <p className="font-sans text-sm text-brand-charcoal/75 leading-relaxed font-medium">
                  Real-time permit monitoring, Google review scraping, and recruitment triggers to target companies showing highly active buying intent.
                </p>
              </div>
              <Link href="/services" className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange inline-flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                <span>View Blueprint</span>
                <span>→</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 05 — BIG METRIC PROOF (ENFORCING SIGNAL BLUE #1a3a5c BACKGROUND) */}
      <section className="bg-brand-blue text-brand-cashmere py-28 px-6 md:px-8 border-y-2 border-brand-blue-dark relative overflow-hidden shadow-inner">
        {/* Elegant watermark logo */}
        <div className="absolute -right-16 -bottom-16 h-80 w-80 opacity-5 pointer-events-none text-brand-orange">
          <Logo variant="monogram" size="lg" className="h-full w-full" />
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(rgba(232,84,26,0.1)_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-35"></div>
        <div className="mx-auto w-full max-w-7xl relative grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-orange bg-brand-orange/15 px-3.5 py-1 rounded-full font-bold">
              Performance Audit
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-white">
              Data that commands respect
            </h2>
            <p className="font-sans text-sm text-brand-cashmere/80 leading-relaxed max-w-md font-medium">
              We do not measure campaign vanity metrics like impressions or views. We audit the only numbers that matter: deliverability, responses, and new booked assets.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 border-l-2 border-brand-cashmere/10 pl-6 lg:pl-12">
            
            <div className="space-y-3">
              <span className="block font-mono text-6xl md:text-8xl font-extrabold text-brand-orange tracking-tighter">98.4%</span>
              <span className="block font-mono text-xs uppercase tracking-widest text-brand-cashmere/60 font-bold">[Primary Inbox Placement]</span>
              <p className="font-sans text-xs text-brand-cashmere/75 leading-relaxed font-medium">
                Programmatic scaling bypasses traditional ISP spam traps completely.
              </p>
            </div>

            <div className="space-y-3">
              <span className="block font-mono text-6xl md:text-8xl font-extrabold text-white tracking-tighter">+284%</span>
              <span className="block font-mono text-xs uppercase tracking-widest text-brand-cashmere/60 font-bold">[Deal-Flow Expansion]</span>
              <p className="font-sans text-xs text-brand-cashmere/75 leading-relaxed font-medium">
                Net-new commercial deal flow triggered within 120 days of deployment.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 06 — THE ADVISORY / CONTACT CTA */}
      <section className="bg-brand-cashmere py-28 px-6 md:px-8">
        <div className="mx-auto w-full max-w-3xl text-center space-y-8">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-bold">
            Technical Brief Reservation
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight">
            Schedule a technical blueprint brief
          </h2>
          <p className="font-sans text-base text-brand-charcoal/70 leading-relaxed max-w-xl mx-auto font-medium">
            Meet directly with our systems engineers. We will analyze your market space, map your target commercial contractors or clinics, and outline the exact secondary domain pipeline we’d install. Blueprints are yours to keep.
          </p>
          <div className="pt-6">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-brand-orange px-10 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-charcoal transition-all duration-300 transform active:scale-95 shadow-md shadow-brand-orange/20"
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
