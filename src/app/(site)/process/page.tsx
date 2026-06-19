import Link from "next/link";

export default function ProcessPage() {
  return (
    <div className="w-full bg-brand-cashmere min-h-screen py-20 px-6 md:px-8">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* HEADER */}
        <div className="border-b border-brand-pistachio/50 pb-12 space-y-6 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-green">
            The Deployment Sequence
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight text-brand-charcoal">
            Our operational <span className="italic font-normal text-brand-burgundy font-serif">sequence</span>
          </h1>
          <p className="font-sans text-base md:text-lg leading-relaxed text-brand-charcoal/80">
            We don't keep you guessing about campaign progress. We follow a strict, auditable 4-stage engineering timeline to construct your pipeline asset.
          </p>
        </div>

        {/* PROCESS TIMELINE */}
        <div className="relative border-l border-brand-pistachio/80 pl-6 md:pl-10 space-y-16 max-w-4xl mx-auto py-6">
          
          {/* Stage 01 */}
          <div className="relative space-y-4">
            {/* Pulsing indicator node */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full border-2 border-brand-green bg-brand-cashmere"></div>
            
            <span className="font-mono text-xs uppercase tracking-widest text-brand-green">Phase 01 / Technical Dissection</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal">Audit & Data Mining</h3>
            <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
              We compile your competitor profiles, trace municipal building permit systems, review hiring signals, and define the exact executive decision-maker target database.
            </p>
          </div>

          {/* Stage 02 */}
          <div className="relative space-y-4">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full border-2 border-brand-green bg-brand-cashmere"></div>
            
            <span className="font-mono text-xs uppercase tracking-widest text-brand-green">Phase 02 / Domain Synthesis</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal">Domain & IP Deployment</h3>
            <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
              We purchase and configure 50+ isolated secondary sending domains. We manually write and authenticate strict DMARC, DKIM, and SPF protocols to protect your main branding asset.
            </p>
          </div>

          {/* Stage 03 */}
          <div className="relative space-y-4">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full border-2 border-brand-green bg-brand-cashmere"></div>
            
            <span className="font-mono text-xs uppercase tracking-widest text-brand-green">Phase 03 / Pre-Flight Verification</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal">Warmup & Script Curation</h3>
            <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
              We initialize a 14–21 day automated warmup sequence to establish domain authority. In parallel, we script custom, high-status outbound sequences using our Alex Hormozi risk-reversal templates.
            </p>
          </div>

          {/* Stage 04 */}
          <div className="relative space-y-4">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full border-2 border-brand-green bg-brand-cashmere"></div>
            
            <span className="font-mono text-xs uppercase tracking-widest text-brand-green">Phase 04 / Live Flow Routing</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal">Live Flow & CRM Routing</h3>
            <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
              Outbound sequences are released under strict limit checks (30 emails daily per box). Positive responses are filtered client-side and automatically routed straight to your active primary sales inbox.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
