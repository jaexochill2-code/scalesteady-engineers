import Link from "next/link";

export default function WorkPage() {
  return (
    <div className="w-full bg-brand-cashmere min-h-screen py-20 px-6 md:px-8">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* HEADER */}
        <div className="border-b border-brand-pistachio/50 pb-12 space-y-6 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-green">
            The Performance Evidence
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight text-brand-charcoal">
            The work <span className="italic font-normal text-brand-burgundy font-serif">speaks</span>
          </h1>
          <p className="font-sans text-base md:text-lg leading-relaxed text-brand-charcoal/80">
            We don't publish soft client quotes or creative awards. We document hard, auditable operational metrics: pipeline growth, deliverability, and net-new contracts won.
          </p>
        </div>

        {/* CASE STUDIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Case 01 */}
          <div className="border border-brand-pistachio bg-white p-8 rounded-3xl space-y-8 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-center border-b border-brand-pistachio pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-charcoal/30">Commercial HVAC Outbound</span>
              <span className="font-mono text-xs text-brand-green font-bold">Active Relay</span>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-serif text-3xl font-bold text-brand-charcoal group-hover:text-brand-burgundy transition-colors">Commercial HVAC Acquisition Engine</h3>
              <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                Replaced highly inflated Google LSA ads ($150 CPL) with signal-based permit scraping. Provisions 65 send nodes targeting local building managers.
              </p>
            </div>

            {/* Major Monospace Stats */}
            <div className="grid grid-cols-2 gap-4 bg-brand-pistachio/15 p-6 rounded-2xl border border-brand-pistachio">
              <div>
                <span className="block font-mono text-3xl font-bold text-brand-green">98.1%</span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-charcoal/50">Inbox Placement</span>
              </div>
              <div>
                <span className="block font-mono text-3xl font-bold text-brand-charcoal">+240%</span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-charcoal/50">Deal Flow Growth</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/contact" className="font-mono text-xs uppercase tracking-wider text-brand-green inline-flex items-center space-x-2 group-hover:underline">
                <span>View System Specifications</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Case 02 */}
          <div className="border border-brand-pistachio bg-white p-8 rounded-3xl space-y-8 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-center border-b border-brand-pistachio pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-charcoal/30">Medical Aesthetics Group</span>
              <span className="font-mono text-xs text-brand-green font-bold">Active Relay</span>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-serif text-3xl font-bold text-brand-charcoal group-hover:text-brand-burgundy transition-colors">High-Ticket MedSpa Consultation Funnel</h3>
              <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                Deployed automated local review triggers and Custom Tracking Domains to capture high-value consultations without margin-bleeding coupons.
              </p>
            </div>

            {/* Major Monospace Stats */}
            <div className="grid grid-cols-2 gap-4 bg-brand-pistachio/15 p-6 rounded-2xl border border-brand-pistachio">
              <div>
                <span className="block font-mono text-3xl font-bold text-brand-green">99.2%</span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-charcoal/50">Handshake Verified</span>
              </div>
              <div>
                <span className="block font-mono text-3xl font-bold text-brand-charcoal">8.4x</span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-charcoal/50">ROI Ratio</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/contact" className="font-mono text-xs uppercase tracking-wider text-brand-green inline-flex items-center space-x-2 group-hover:underline">
                <span>View System Specifications</span>
                <span>→</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
