"use client";

import { useState } from "react";

export default function ContactPage() {
  const [scale, setScale] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectScale = (selected: string) => {
    setScale(selected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-brand-cashmere min-h-screen py-20 px-6 md:px-8">
      <div className="mx-auto max-w-4xl space-y-16">
        
        {/* HEADER */}
        <div className="border-b border-brand-pistachio/50 pb-12 space-y-6 text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-green">
            Revenue Infrastructure Audit
          </span>
          <h1 className="font-serif text-5xl font-bold leading-tight text-brand-charcoal">
            Secure your outbound <span className="italic font-normal text-brand-burgundy font-serif">machine</span>
          </h1>
          <p className="font-sans text-base text-brand-charcoal/70">
            We actively filter intake volume to protect sending reputation and guarantee high-touch delivery. Select your operational scope to configure your booking portal.
          </p>
        </div>

        {/* STEP 1: SELECT SCALE */}
        <div className="space-y-8 bg-white border border-brand-pistachio p-8 rounded-3xl shadow-sm">
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-charcoal/30">Step 01 / Choose Target Capacity</span>
            <h3 className="font-serif text-2xl font-bold text-brand-charcoal">What is your current business scale?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button 
              onClick={() => handleSelectScale("enterprise")}
              className={`p-6 rounded-2xl border text-left space-y-3 transition-all duration-300
                ${scale === "enterprise" 
                  ? "border-brand-green bg-brand-green/5 shadow-sm" 
                  : "border-brand-pistachio hover:border-brand-green/50 bg-brand-cashmere/20"}
              `}
            >
              <h4 className="font-serif text-lg font-bold text-brand-charcoal">Enterprise Growth Engine</h4>
              <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                Full-scale 50+ domain horizontal outbound infrastructure. Risk reversal options for firms with $500,000+ in annual contract value capacity.
              </p>
            </button>

            <button 
              onClick={() => handleSelectScale("planning")}
              className={`p-6 rounded-2xl border text-left space-y-3 transition-all duration-300
                ${scale === "planning" 
                  ? "border-brand-green bg-brand-green/5 shadow-sm" 
                  : "border-brand-pistachio hover:border-brand-green/50 bg-brand-cashmere/20"}
              `}
            >
              <h4 className="font-serif text-lg font-bold text-brand-charcoal">Standalone Audit & Setup</h4>
              <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                Blueprints, CRM pipeline audit, and custom Municipal permit scraper setup. Flat-fee of $3,800.
              </p>
            </button>
          </div>
        </div>

        {/* STEP 2: BOOKING FORM */}
        {scale && !submitted && (
          <div className="bg-white border border-brand-pistachio p-8 rounded-3xl shadow-sm space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-charcoal/30">Step 02 / System Requirements</span>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal">Enter operational details</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-brand-charcoal/40">Corporate Name</label>
                  <input type="text" required className="w-full p-3 rounded-lg border border-brand-pistachio focus:outline-none focus:border-brand-green text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-brand-charcoal/40">Executive Officer</label>
                  <input type="text" required className="w-full p-3 rounded-lg border border-brand-pistachio focus:outline-none focus:border-brand-green text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-charcoal/40">Corporate Email</label>
                <input type="email" required className="w-full p-3 rounded-lg border border-brand-pistachio focus:outline-none focus:border-brand-green text-sm" />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-charcoal/40">Current Monthly Deal Volume</label>
                <textarea rows={3} required placeholder="Tell us about your active sales setup..." className="w-full p-3 rounded-lg border border-brand-pistachio focus:outline-none focus:border-brand-green text-sm" />
              </div>

              <div className="pt-4 text-center">
                <button type="submit" className="bg-brand-burgundy text-white px-10 py-4 rounded-full font-sans text-xs font-semibold uppercase tracking-wider hover:bg-brand-green transition-colors">
                  Reserve technical slot
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: SUCCESS BLOCK */}
        {submitted && (
          <div className="bg-brand-burgundy text-brand-cashmere p-12 rounded-3xl text-center space-y-6 animate-scaleIn">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-green">Reservation Secured</span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold">Your technical audit has been initialized</h3>
            <p className="font-sans text-sm text-brand-cashmere/70 max-w-md mx-auto">
              Our Chief Systems Architect is compiling the Municipal permit trace logs for your market sector. A calendar booking slot has been secured and sent to your email.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
