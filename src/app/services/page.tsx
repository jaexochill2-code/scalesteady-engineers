import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="w-full bg-brand-cashmere min-h-screen py-20 px-6 md:px-8">
      <div className="mx-auto max-w-7xl space-y-24">
        
        {/* HERO HEADER */}
        <div className="border-b border-brand-pistachio/50 pb-12 space-y-6 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-green">
            The Architectural Specifications
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight text-brand-charcoal">
            Our operational <span className="italic font-normal text-brand-burgundy font-serif">pipelines</span>
          </h1>
          <p className="font-sans text-base md:text-lg leading-relaxed text-brand-charcoal/80">
            We don't build generic marketing campaigns. We design and install custom, high-frequency owned infrastructure that delivers predictable deal flow straight to your sales team.
          </p>
        </div>

        {/* PIPELINE DEEP DIVES */}
        <div className="space-y-32">
          
          {/* Service 01 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-green">01 / Infrastructure</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal">Outbound Email Engines</h2>
              <div className="h-0.5 w-16 bg-brand-green"></div>
            </div>
            
            <div className="lg:col-span-8 space-y-6 font-sans text-base text-brand-charcoal/70 leading-relaxed">
              <p>
                To generate cold outbound at scale without burning your primary corporate domain, we build an isolated horizontal ecosystem. We register 50+ secondary domains, programmatically map identical DNS records, and coordinate sending loads to mimic natural organic writing.
              </p>
              
              {/* Specs Box */}
              <div className="bg-brand-pistachio/15 border border-brand-pistachio p-6 rounded-xl space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-brand-charcoal font-semibold">Engine Compliance Protocol</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-brand-charcoal/80">
                  <li>● Programmatic SPF injection</li>
                  <li>● Manual 2048-bit DKIM keying</li>
                  <li>● Strict DMARC reject paths</li>
                  <li>● Dedicated custom tracking domains</li>
                  <li>● 21-day warmup pre-flights</li>
                  <li>● Rotating SMTP send nodes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service 02 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-green">02 / Automation</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal">System Integration & CRM</h2>
              <div className="h-0.5 w-16 bg-brand-green"></div>
            </div>
            
            <div className="lg:col-span-8 space-y-6 font-sans text-base text-brand-charcoal/70 leading-relaxed">
              <p>
                Building a lead engine is only half the battle. We engineer the operational plumbing that automatically listens for positive client replies, filters out auto-responders via NLP/AI classification, and pushes high-ticket consultations straight into your CRM or scheduling app (Calendly/HubSpot).
              </p>
              
              <div className="bg-brand-pistachio/15 border border-brand-pistachio p-6 rounded-xl space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-brand-charcoal font-semibold">Automation Integrations</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-brand-charcoal/80">
                  <li>● Automated lead scoring</li>
                  <li>● Live response classifiers</li>
                  <li>● Zap-free mid-stack APIs</li>
                  <li>● Direct CRM webhook integration</li>
                  <li>● Double-optin SMS schedulers</li>
                  <li>● Docker-based redundant hosting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service 03 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-green">03 / Data Operations</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal">Intent Data Scrapers</h2>
              <div className="h-0.5 w-16 bg-brand-green"></div>
            </div>
            
            <div className="lg:col-span-8 space-y-6 font-sans text-base text-brand-charcoal/70 leading-relaxed">
              <p>
                Outbound only converts when it targets the right decision-maker at the right time. We build automated scraping pipelines that query local municipal building databases, track GCs winning permits, monitor tech hiring triggers, and verify every email through ghost SMTP handshake verification to achieve absolute zero-bounce safety.
              </p>
              
              <div className="bg-brand-pistachio/15 border border-brand-pistachio p-6 rounded-xl space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-brand-charcoal font-semibold">Data Harvesting Layer</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-brand-charcoal/80">
                  <li>● Permit trace protocols</li>
                  <li>● Real-time hire surge trippers</li>
                  <li>● Google review enrichment</li>
                  <li>● Active handshake verifiers</li>
                  <li>● Cell phone parsing filters</li>
                  <li>● Decision-maker extractors</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM CALLOUT */}
        <div className="bg-brand-burgundy text-brand-cashmere p-12 rounded-3xl text-center space-y-6 relative overflow-hidden">
          <h3 className="font-serif text-3xl md:text-4xl font-bold">Ready to see the blueprint for your market?</h3>
          <p className="font-sans text-sm text-brand-cashmere/75 max-w-xl mx-auto">
            Book a 15-minute operational audit. We will analyze your competitors, evaluate your deliverability risks, and sketch the exact horizontal infrastructure for your sector.
          </p>
          <div className="pt-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-brand-green px-8 py-3.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-brand-charcoal transition-all duration-300"
            >
              Get my custom blueprint
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
