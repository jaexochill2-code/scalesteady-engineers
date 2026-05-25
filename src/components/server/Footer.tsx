import Link from "next/link";
import Logo from "@/components/server/Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-charcoal text-brand-cashmere border-t border-brand-border/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        
        {/* Top grid section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          
          {/* Email Capture column */}
          <div className="lg:col-span-2 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-orange">
              [Stay Connected]
            </span>
            <h4 className="font-serif text-xl font-medium text-white max-w-sm">
              Operational blueprints and deal flow updates delivered weekly.
            </h4>
            <form className="flex max-w-md items-center border-b border-brand-border/30 pb-2">
              <input 
                type="email" 
                placeholder="Enter corporate email" 
                className="w-full bg-transparent font-sans text-sm text-white placeholder-brand-cashmere/40 focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="font-sans text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-white transition-colors"
              >
                Sign Up
              </button>
            </form>
            <p className="font-sans text-[11px] text-brand-cashmere/55 max-w-xs leading-normal">
              By subscribing, you agree to receive technical audits. Opt-out at any time.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-3 sm:grid-cols-4">
            
            {/* Column 1: Methodology */}
            <div className="space-y-4">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-brand-cashmere/40">[Methodology]</h5>
              <ul className="space-y-2 text-sm text-brand-cashmere/75 font-sans">
                <li><Link href="/services" className="hover:text-brand-orange transition-colors">Horizontal Scaling</Link></li>
                <li><Link href="/process" className="hover:text-brand-orange transition-colors">Warmup Protocol</Link></li>
                <li><Link href="/process" className="hover:text-brand-orange transition-colors">Data Mining</Link></li>
              </ul>
            </div>

            {/* Column 2: Legal */}
            <div className="space-y-4">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-brand-cashmere/40">[Regulatory]</h5>
              <ul className="space-y-2 text-sm text-brand-cashmere/75 font-sans">
                <li><a href="#" className="hover:text-brand-orange transition-colors">ADV Form Part 2</a></li>
                <li><a href="#" className="hover:text-brand-orange transition-colors">Privacy Charter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security Audit</a></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="space-y-4">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-brand-cashmere/40">[Company]</h5>
              <ul className="space-y-2 text-sm text-brand-cashmere/75 font-sans">
                <li><Link href="/team" className="hover:text-brand-orange transition-colors">The Engineers</Link></li>
                <li><Link href="/work" className="hover:text-brand-orange transition-colors">Case Studies</Link></li>
                <li><Link href="/contact" className="hover:text-brand-orange transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Column 4: Support */}
            <div className="space-y-4">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-brand-cashmere/40">[Support]</h5>
              <ul className="space-y-2 text-sm text-brand-cashmere/75 font-sans">
                <li><a href="#" className="hover:text-brand-orange transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-brand-orange transition-colors">System Status</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom copyright & disclosures */}
        <div className="mt-16 pt-8 border-t border-brand-border/10 space-y-6">
          
          {/* Integrated Reversed Logo lockup */}
          <div className="flex justify-start">
            <Logo variant="reversed" size="sm" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-brand-cashmere/40 font-mono pt-4 border-t border-brand-border/5">
            <span>© {new Date().getFullYear()} PIPELINE ENGINEERS. ALL RIGHTS RESERVED.</span>
            <span className="mt-2 md:mt-0 tracking-wider">[STATUS: STABLE OPERATIONS]</span>
          </div>

          <p className="font-sans text-[10px] leading-relaxed text-brand-cashmere/35 max-w-6xl">
            Pipeline Engineers operates as an elite B2B systems engineering firm. We design, host, and operate B2B outbound infrastructure. Lead delivery is dependent on target demographic volume, market conditions, and client offer positioning. We are fiduciaries of your outbound brand health and do not engage in spam-bot practices.
          </p>
        </div>

      </div>
    </footer>
  );
}
