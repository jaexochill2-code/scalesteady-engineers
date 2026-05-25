import Link from "next/link";

export default function TeamPage() {
  return (
    <div className="w-full bg-brand-cashmere min-h-screen py-20 px-6 md:px-8">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* HEADER */}
        <div className="border-b border-brand-pistachio/50 pb-12 space-y-6 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-green">
            The Technical Team
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight text-brand-charcoal">
            The systems <span className="italic font-normal text-brand-burgundy font-serif">engineers</span>
          </h1>
          <p className="font-sans text-base md:text-lg leading-relaxed text-brand-charcoal/80">
            We don't hire account executives or generic account managers. Our team is composed exclusively of systems architects, data mining engineers, and API integration specialists.
          </p>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Team Member 01 */}
          <div className="border border-brand-pistachio bg-white p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-charcoal">Veronica Taylor</h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-charcoal/30">Chief Outbound Architect</span>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-pistachio/40 text-brand-charcoal font-mono text-[10px] font-bold">VT</span>
              </div>
              <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                "Specializes in configuring secure, horizontal email server networks (50+ boxes), handling custom DNS routing security, and maintaining strict deliverability checks."
              </p>
            </div>
            
            <div className="pt-4 border-t border-brand-pistachio flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-charcoal/40">New York City</span>
              <Link 
                href="/contact" 
                className="font-mono text-xs uppercase tracking-wider text-brand-green hover:underline inline-flex items-center space-x-2"
              >
                <span>Schedule Call</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Team Member 02 */}
          <div className="border border-brand-pistachio bg-white p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-charcoal">Ashley Bleckner</h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-charcoal/30">Lead Systems Engineer</span>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-pistachio/40 text-brand-charcoal font-mono text-[10px] font-bold">AB</span>
              </div>
              <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                "Specializes in building custom REST/Webhook integrations routing replies directly into CRM systems, eliminating manual team intervention."
              </p>
            </div>
            
            <div className="pt-4 border-t border-brand-pistachio flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-charcoal/40">Southern California</span>
              <Link 
                href="/contact" 
                className="font-mono text-xs uppercase tracking-wider text-brand-green hover:underline inline-flex items-center space-x-2"
              >
                <span>Schedule Call</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Team Member 03 */}
          <div className="border border-brand-pistachio bg-white p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-charcoal">Emily Green</h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-charcoal/30">Head of Data Operations</span>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-pistachio/40 text-brand-charcoal font-mono text-[10px] font-bold">EG</span>
              </div>
              <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                "Specializes in custom municipal database crawlers, Google permit tracking integrations, and handshake validation protocols."
              </p>
            </div>
            
            <div className="pt-4 border-t border-brand-pistachio flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-charcoal/40">Chicago</span>
              <Link 
                href="/contact" 
                className="font-mono text-xs uppercase tracking-wider text-brand-green hover:underline inline-flex items-center space-x-2"
              >
                <span>Schedule Call</span>
                <span>→</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
