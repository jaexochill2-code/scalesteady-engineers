import Link from "next/link";
import Logo from "@/components/server/Logo";

export default function Home() {
  return (
    <div className="w-full bg-brand-cashmere min-h-screen">
      
      {/* SECTION 01 — HERO */}
      <section className="relative flex min-h-[90vh] items-center justify-center px-6 py-20 md:px-8 bg-brand-cashmere overflow-hidden">
        
        {/* Background grid line pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#d8e2d4_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70"></div>
        
        <div className="relative mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Node */}
          <div className="lg:col-span-7 space-y-8 text-left z-10">
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-brand-green">
              Revenue Infrastructure
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-brand-charcoal max-w-2xl">
              The engineers of your outbound <span className="italic font-normal text-brand-burgundy font-serif">deal flow</span>
            </h1>
            <p className="font-sans text-base md:text-lg leading-relaxed text-brand-charcoal/80 max-w-xl">
              Stop renting volatile ad campaigns that break the moment you stop paying. We install the permanent outbound infrastructure that gives your team total ownership of your pipeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-brand-green px-8 py-4 rounded-full font-sans text-sm font-semibold uppercase tracking-wider text-white hover:bg-brand-burgundy transition-all duration-300 transform active:scale-95 shadow-sm"
              >
                Book a discovery call
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center justify-center border border-brand-charcoal/30 px-8 py-4 rounded-full font-sans text-sm font-semibold uppercase tracking-wider text-brand-charcoal hover:bg-brand-pistachio/30 transition-colors duration-300"
              >
                Explore the pipeline
              </Link>
            </div>
            
            {/* Low friction subtext */}
            <p className="font-sans text-xs text-brand-charcoal/50 max-w-xs">
              A 15-minute technical audit. Blueprints included regardless of fit.
            </p>
          </div>
          
          {/* Right System Schematic (No Brackets, Production-Level UI) */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[380px] lg:h-[480px]">
            <div className="w-full max-w-md h-full border border-brand-pistachio/80 rounded-2xl bg-white p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-brand-pistachio/30 rounded-full blur-3xl"></div>
              
              <div className="flex justify-between items-center border-b border-brand-pistachio/60 pb-4 font-mono text-[9px] uppercase tracking-wider text-brand-charcoal/50">
                <span>Active Routing Relays</span>
                <span className="text-brand-green flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse"></span>
                  OPERATIONAL
                </span>
              </div>
              
              {/* Schematic flow */}
              <div className="my-auto space-y-6 relative py-4">
                
                {/* Flow Node 1: Sourcing */}
                <div className="flex items-center justify-between border border-brand-pistachio/50 p-3 rounded-lg bg-brand-cashmere/30">
                  <div className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-brand-green"></span>
                    <span className="font-mono text-xs text-brand-charcoal font-semibold">Intent Signals</span>
                  </div>
                  <span className="font-mono text-[10px] text-brand-charcoal/50">Permits / Clay / Reviews</span>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-center my-1">
                  <svg className="h-4 w-4 stroke-brand-green" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Flow Node 2: Horizontal relays */}
                <div className="flex items-center justify-between border border-brand-pistachio/50 p-3 rounded-lg bg-brand-cashmere/30">
                  <div className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-brand-green"></span>
                    <span className="font-mono text-xs text-brand-charcoal font-semibold">SMTP Sending Nodes</span>
                  </div>
                  <span className="font-mono text-[10px] text-brand-charcoal/50">50 Secondary Domains</span>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-center my-1">
                  <svg className="h-4 w-4 stroke-brand-green" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Flow Node 3: Target Inbox */}
                <div className="flex items-center justify-between border border-brand-green bg-brand-green/5 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-brand-green"></span>
                    <span className="font-mono text-xs text-brand-charcoal font-semibold">Primary Inbox Delivery</span>
                  </div>
                  <span className="font-mono text-[10px] text-brand-green font-bold">98.4% Rate</span>
                </div>

              </div>
              
              <div className="border-t border-brand-pistachio/60 pt-4 flex justify-between items-center font-mono text-[10px] text-brand-charcoal/50">
                <span>DNS Security: DMARC REJECT</span>
                <span>Warmup: Active</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 02 — AUTHORITY STRIP */}
      <section className="border-y border-brand-pistachio/50 bg-brand-pistachio/20 py-8 px-6 md:px-8 text-center">
        <div className="mx-auto w-full max-w-7xl">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-brand-charcoal/40 mb-6">
            Trusted by leaders in industrial and high-ticket services
          </span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale">
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
          <span className="font-mono text-xs uppercase tracking-widest text-brand-green">
            The Outbound Paradigm
          </span>
          <blockquote className="font-serif text-3xl md:text-5xl font-medium leading-snug text-brand-charcoal">
            "Most growth partners treat outbound outreach like a creative campaign. We treat it like <span className="italic font-normal text-brand-burgundy font-serif">structural engineering</span>. If your systems don't have built-in redundancy, automatic failure-safes, and clean data pipelines, they aren't systems. They are liabilities."
          </blockquote>
          <div className="pt-4">
            <span className="block font-mono text-xs uppercase tracking-widest text-brand-charcoal/50">Office of the Director • ScaleSteady</span>
          </div>
        </div>
      </section>

      {/* SECTION 04 — SERVICES INDEX */}
      <section className="px-6 py-24 md:px-8 bg-brand-pistachio/15 border-t border-brand-pistachio/40">
        <div className="mx-auto w-full max-w-7xl space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-green">Custom Operations Build</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-charcoal">The Revenue Pipelines</h2>
            </div>
            <p className="font-sans text-sm text-brand-charcoal/60 max-w-sm">
              We install three core infrastructure layers directly into your enterprise stack, giving you complete asset control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service Card 1 */}
            <div className="border border-brand-pistachio bg-white p-8 rounded-2xl flex flex-col justify-between h-[320px] transition-all hover:shadow-md hover:border-brand-green/40 group">
              <div className="space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-charcoal/30">01 / Infrastructure</span>
                <h3 className="font-serif text-2xl font-semibold text-brand-charcoal group-hover:text-brand-burgundy transition-colors">Outbound Email Engines</h3>
                <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                  Programmatic deployment of 50+ secondary sending domains, manual authentication (SPF/DKIM/DMARC), and custom tracking channels.
                </p>
              </div>
              <Link href="/services" className="font-mono text-xs uppercase tracking-wider text-brand-green inline-flex items-center space-x-2 group-hover:underline">
                <span>View Blueprint</span>
                <span>→</span>
              </Link>
            </div>

            {/* Service Card 2 */}
            <div className="border border-brand-pistachio bg-white p-8 rounded-2xl flex flex-col justify-between h-[320px] transition-all hover:shadow-md hover:border-brand-green/40 group">
              <div className="space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-charcoal/30">02 / Automation</span>
                <h3 className="font-serif text-2xl font-semibold text-brand-charcoal group-hover:text-brand-burgundy transition-colors">Operational Automation</h3>
                <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                  Clean middleware linkages routing positive email responses directly into your primary CRM, triggering instant booking follow-ups.
                </p>
              </div>
              <Link href="/services" className="font-mono text-xs uppercase tracking-wider text-brand-green inline-flex items-center space-x-2 group-hover:underline">
                <span>View Blueprint</span>
                <span>→</span>
              </Link>
            </div>

            {/* Service Card 3 */}
            <div className="border border-brand-pistachio bg-white p-8 rounded-2xl flex flex-col justify-between h-[320px] transition-all hover:shadow-md hover:border-brand-green/40 group">
              <div className="space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-charcoal/30">03 / Data Mining</span>
                <h3 className="font-serif text-2xl font-semibold text-brand-charcoal group-hover:text-brand-burgundy transition-colors">Data Mining & Scraping</h3>
                <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                  Real-time permit monitoring, Google review scraping, and recruitment triggers to target companies showing highly active buying intent.
                </p>
              </div>
              <Link href="/services" className="font-mono text-xs uppercase tracking-wider text-brand-green inline-flex items-center space-x-2 group-hover:underline">
                <span>View Blueprint</span>
                <span>→</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 05 — BIG METRIC PROOF */}
      <section className="bg-brand-burgundy text-brand-cashmere py-24 px-6 md:px-8 border-y border-neutral-900 relative overflow-hidden">
        {/* Glowing watermark of the S monogram behind the stats */}
        <div className="absolute -right-16 -bottom-16 h-80 w-80 opacity-5 pointer-events-none text-brand-gold">
          <Logo variant="monogram" size="lg" className="h-full w-full" />
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(rgba(83,122,68,0.15)_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
        <div className="mx-auto w-full max-w-7xl relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-green">Performance Audit</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">Data that commands respect</h2>
            <p className="font-sans text-sm text-brand-cashmere/70 leading-relaxed max-w-md">
              We do not measure campaign vanity metrics like impressions or views. We audit the only numbers that matter: deliverability, responses, and new booked assets.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            
            <div className="space-y-2 border-l border-neutral-800 pl-6">
              <span className="block font-mono text-5xl md:text-7xl font-bold text-brand-green tracking-tighter">98.4%</span>
              <span className="block font-mono text-xs uppercase tracking-widest text-brand-cashmere/40">Primary Inbox Placement</span>
              <p className="font-sans text-xs text-brand-cashmere/60 leading-relaxed mt-2">
                Programmatic scaling bypasses traditional ISP spam traps completely.
              </p>
            </div>

            <div className="space-y-2 border-l border-neutral-800 pl-6">
              <span className="block font-mono text-5xl md:text-7xl font-bold text-white tracking-tighter">+284%</span>
              <span className="block font-mono text-xs uppercase tracking-widest text-brand-cashmere/40">Average Deal-Flow Expansion</span>
              <p className="font-sans text-xs text-brand-cashmere/60 leading-relaxed mt-2">
                Net-new commercial deal flow triggered within 120 days of deployment.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 06 — THE ADVISORY / CONTACT CTA */}
      <section className="bg-brand-cashmere py-24 px-6 md:px-8">
        <div className="mx-auto w-full max-w-3xl text-center space-y-8">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-green">
            Technical Brief Reservation
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight">
            Schedule a technical blueprint brief
          </h2>
          <p className="font-sans text-base text-brand-charcoal/70 leading-relaxed max-w-xl mx-auto">
            Meet directly with our systems engineers. We will analyze your market space, map your target commercial contractors or clinics, and outline the exact secondary domain pipeline we’d install. Blueprints are yours to keep.
          </p>
          <div className="pt-6">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-brand-green px-10 py-4 rounded-full font-sans text-sm font-semibold uppercase tracking-wider text-white hover:bg-brand-burgundy transition-all duration-300 transform active:scale-95 shadow-sm"
            >
              Secure your slot
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
