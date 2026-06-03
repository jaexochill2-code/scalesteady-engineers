"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";

const PHONE = "224.487.7847";
const PHONE_HREF = "tel:+12244877847";
const PAYPAL_HOSTED_BUTTON_ID: string = "9DREMSSX56AHQ";

export default function BuildPage() {
  const [accepted, setAccepted] = useState(false);
  const [showTOS, setShowTOS] = useState(false);
  const [payPalLoaded, setPayPalLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const acceptanceRef = useRef<HTMLDivElement>(null);

  const timelineSteps = [
    {
      label: "Days 1 - 2",
      title: "Inbox & Domain Acquisition",
      desc: "Domains registered and configured with full DNS records (SPF, DKIM, DMARC) and 25 dedicated sending inboxes are provisioned.",
      bullets: [
        "Register 5 new campaign domains (.com)",
        "Configure SPF, DKIM, and DMARC records",
        "Create 25 professional business inboxes"
      ],
      metrics: [
        { name: "Domains Sourced", value: "5 registered" },
        { name: "Business Inboxes", value: "25 provisioned" },
        { name: "Authentication Protocols", value: "SPF, DKIM, DMARC" }
      ]
    },
    {
      label: "Days 3 - 16",
      title: "14-Day Delivery Warmup",
      desc: "We ramp up sending volumes slowly using simulated peer networks to build email reputation, protecting against spam filters.",
      bullets: [
        "Warm up all 25 sending mailboxes automatically",
        "Source and filter 10,000 targeted B2B lead contacts",
        "Research custom marketing angles and targets",
        "Write copy sequences, follow-ups, and verify lists"
      ],
      metrics: [
        { name: "List Sourcing Goal", value: "10,000 leads" },
        { name: "Email Copywritten", value: "2 angles + 3 followups" },
        { name: "Verification Accuracy", value: "MillionVerifier validated" }
      ]
    },
    {
      label: "Day 15",
      title: "Kickoff & Review",
      desc: "Submission of lead lists, copies, and sequences for Week 1 approval. No outreach goes out until you formally review and approve it.",
      bullets: [
        "Deliver lead spreadsheets for manual checking",
        "Present copywriting sequences for review",
        "Confirm campaign settings and domain checks",
        "Formally approve kickoff launch parameters"
      ],
      metrics: [
        { name: "Outreach Approval State", value: "Client-controlled kickoff" },
        { name: "Domain Reputation State", value: "Fully warmed and secure" }
      ]
    },
    {
      label: "Weeks 3 - 8",
      title: "Performance Check-ins",
      desc: "Active campaigns launch. Review schedules transition to regular updates to coordinate bookings and refine targeting.",
      bullets: [
        "Wk 3: Async performance report check",
        "Wk 4: 15-minute Zoom campaign alignment call",
        "Wk 6: Async copywriting audit check",
        "Wk 8: Final milestone review and handover call"
      ],
      metrics: [
        { name: "Daily Optimization Check", value: "Continuous deliverability checks" },
        { name: "Inbox Monitoring Frequency", value: "Twice daily review" }
      ]
    }
  ];

  const scrollToAcceptance = (e: React.MouseEvent) => {
    e.preventDefault();
    acceptanceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Poll for PayPal SDK load as a fallback in case Next.js onLoad doesn't trigger
  useEffect(() => {
    if ((window as any).paypal) {
      setPayPalLoaded(true);
    } else {
      const interval = setInterval(() => {
        if ((window as any).paypal) {
          setPayPalLoaded(true);
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  // Render the PayPal button once loaded
  useEffect(() => {
    if (
      payPalLoaded &&
      PAYPAL_HOSTED_BUTTON_ID &&
      PAYPAL_HOSTED_BUTTON_ID !== "[INSERT]" &&
      PAYPAL_HOSTED_BUTTON_ID !== "" &&
      (window as any).paypal
    ) {
      try {
        const containerId = `#paypal-container-${PAYPAL_HOSTED_BUTTON_ID}`;
        const container = document.querySelector(containerId);
        if (container && container.children.length === 0) {
          (window as any).paypal.HostedButtons({
            hostedButtonId: PAYPAL_HOSTED_BUTTON_ID,
          }).render(containerId);
        }
      } catch (err) {
        console.error("PayPal button render error:", err);
      }
    }
  }, [payPalLoaded]);

  return (
    <div 
      className="relative min-h-screen font-sans antialiased selection:bg-neutral-900 selection:text-white overflow-hidden"
      style={{ backgroundColor: "var(--canvas)", color: "var(--ink-primary)" }}
    >
      
      {/* ── AURORA UI GLOWS ── */}
      <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[#1B4F8A]/3 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[35%] right-[-5%] w-[600px] h-[600px] rounded-full bg-white/5 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[15%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#1B4F8A]/3 blur-[150px] pointer-events-none z-0" />
      
      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {PAYPAL_HOSTED_BUTTON_ID &&
        PAYPAL_HOSTED_BUTTON_ID !== "[INSERT]" &&
        PAYPAL_HOSTED_BUTTON_ID !== "" && (
          <Script
            src="https://www.paypal.com/sdk/js?client-id=BAAS2hDrmJeZ6vej0n_nyNRRjAczAVMDvRkgeMguvM3FF8aR5ONEd5BTqzDbVTz53qws2xYrgO7ZfoOeZg&components=hosted-buttons&disable-funding=venmo&currency=USD"
            strategy="afterInteractive"
            onLoad={() => setPayPalLoaded(true)}
          />
        )}


      {/* Main content wrapper */}
      <main className="relative z-10">


        {/* 02 HERO */}
        <section className="bg-[var(--canvas)] pt-28 pb-24 border-b border-[var(--ink-border)] relative overflow-hidden">

          {/* Background bloom */}
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-[#1B4F8A]/5 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-[-5%] w-[500px] h-[400px] rounded-full bg-[#1B4F8A]/4 blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-[-5%] w-[400px] h-[300px] rounded-full bg-[#1B4F8A]/3 blur-[90px] pointer-events-none" />

          <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">

            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2.5 px-5 py-2 text-[10px] font-bold tracking-widest uppercase bg-[#1B4F8A]/5 text-[#1B4F8A] border border-[#1B4F8A]/10 rounded-full mb-14">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B4F8A] animate-pulse flex-shrink-0" />
              HEALTH &amp; CONSTRUCTION &nbsp;&middot;&nbsp; PASS-THROUGH COST &nbsp;&middot;&nbsp; FULL ASSET OWNERSHIP
            </span>

            {/* 4-line typographic stack */}
            <h1 className="font-sans font-extrabold tracking-tight leading-[1.08] mb-12">
              <span className="block text-4xl md:text-[62px] text-[#0C0C0E]">Built in 48 hrs.</span>
              <span className="block text-4xl md:text-[62px] text-neutral-500 font-light">Hardened in 14 days.</span>
              <span className="block text-4xl md:text-[62px] text-[#0C0C0E]">Managed for 2 months.</span>
              <span className="block text-4xl md:text-[62px] text-[#1B4F8A]">Yours to keep.</span>
            </h1>

            {/* Money line */}
            <p className="font-mono text-sm md:text-base text-neutral-600 tracking-wider mb-14">
              $500 infrastructure cost &nbsp;&middot;&nbsp; $0 agency fees until you close revenue
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button
                onClick={scrollToAcceptance}
                className="px-10 py-4 bg-[#1B4F8A] hover:bg-[#2660A8] text-white font-sans font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:shadow-[0_0_40px_rgba(27,79,138,0.3)] active:scale-[0.98]"
              >
                GET STARTED &mdash; $500
              </button>
              <span className="font-mono text-[11px] text-[#444444] tracking-wider">
                Maximum exposure: $500. Everything else is ours to earn.
              </span>
            </div>

          </div>
        </section>

        {/* 03 VALUE COMPARISON - Retail cost vs ScaleSteady */}
        <section className="bg-[#FFFFFF] border-b border-[var(--ink-border)] py-28 relative z-10">
          <div className="max-w-[1200px] mx-auto px-6">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-3 text-center">02 -- Cost Breakdown</span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-center tracking-tight text-[#0A0A0A] mb-4">
              Here is what you are <span className="text-[#1B4F8A] underline font-extrabold">not</span> paying
            </h2>
          <p className="font-sans text-sm text-center text-[#444444] mb-12 max-w-[600px] mx-auto font-medium">
            If you signed up for these tools yourself and hired someone to run them, this is the bill.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Retail Cost Bento Column */}
            <div className="bento-card-light lg:col-span-2 p-8 flex flex-col justify-between group">
              <div>
                <h3 className="font-sans text-lg font-bold text-[#0A0A0A] mb-6 uppercase tracking-tight">Retail software and data costs</h3>
                <div className="space-y-3 text-xs font-medium">
                  
                  <div className="flex justify-between border-b border-[#DEDEDE] pb-3 pt-1 transition-all duration-300 hover:translate-x-1.5 hover:text-[#0A0A0A] group/row1">
                    <span className="text-[#3A3A3A] group-hover/row1:text-[#0A0A0A] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/10 group-hover/row1:bg-black transition-colors duration-300" />
                      25 professional business inboxes (@ $7.20/user/mo) <sup>[1]</sup>
                    </span>
                    <span className="font-mono text-sm text-[#0A0A0A] font-bold transition-all duration-300 group-hover/row1:scale-105">$180.00</span>
                  </div>

                  <div className="flex justify-between border-b border-[#DEDEDE] pb-3 pt-1 transition-all duration-300 hover:translate-x-1.5 hover:text-[#0A0A0A] group/row2">
                    <span className="text-[#3A3A3A] group-hover/row2:text-[#0A0A0A] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/10 group-hover/row2:bg-black transition-colors duration-300" />
                      5 domains (Namecheap .com registration) <sup>[2]</sup>
                    </span>
                    <span className="font-mono text-sm text-[#0A0A0A] font-bold transition-all duration-300 group-hover/row2:scale-105">$40.00</span>
                  </div>

                  <div className="flex justify-between border-b border-[#DEDEDE] pb-3 pt-1 transition-all duration-300 hover:translate-x-1.5 hover:text-[#0A0A0A] group/row3">
                    <span className="text-[#3A3A3A] group-hover/row3:text-[#0A0A0A] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/10 group-hover/row3:bg-black transition-colors duration-300" />
                      10,000 lead list exports (Apollo.io Professional plan) <sup>[3]</sup>
                    </span>
                    <span className="font-mono text-sm text-[#0A0A0A] font-bold transition-all duration-300 group-hover/row3:scale-105">$500.00</span>
                  </div>

                  <div className="flex justify-between border-b border-[#DEDEDE] pb-3 pt-1 transition-all duration-300 hover:translate-x-1.5 hover:text-[#0A0A0A] group/row4">
                    <span className="text-[#3A3A3A] group-hover/row4:text-[#0A0A0A] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/10 group-hover/row4:bg-black transition-colors duration-300" />
                      Email sending & warm-up software (Instantly or Smartlead plan) <sup>[4]</sup>
                    </span>
                    <span className="font-mono text-sm text-[#0A0A0A] font-bold transition-all duration-300 group-hover/row4:scale-105">$120.00</span>
                  </div>

                  <div className="flex justify-between pb-1 pt-1 transition-all duration-300 hover:translate-x-1.5 hover:text-[#0A0A0A] group/row5">
                    <span className="text-[#3A3A3A] group-hover/row5:text-[#0A0A0A] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/10 group-hover/row5:bg-black transition-colors duration-300" />
                      Email list verification (MillionVerifier lookup credits) <sup>[5]</sup>
                    </span>
                    <span className="font-mono text-sm text-[#0A0A0A] font-bold transition-all duration-300 group-hover/row5:scale-105">$35.00</span>
                  </div>

                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DEDEDE]">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans text-xs uppercase tracking-wider text-[#444444] font-bold">Estimated Retail Total</span>
                  <span className="font-mono text-[10px] text-[#888888]">(software only, no labor)</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-5xl md:text-6xl font-extrabold text-neutral-400 line-through opacity-60">$875</span>
                  <span className="font-mono text-lg font-bold text-[#0A0A0A] block mt-1">...and you still have to build it yourself</span>
                </div>
              </div>
            </div>
          <div className="bento-card-light bg-white p-8 relative overflow-hidden flex flex-col justify-between group border-2 border-[#1B4F8A] shadow-[0_20px_50px_rgba(27,79,138,0.12)]">
              {/* Radial glow background spotlight */}
              <div className="absolute top-[-10%] right-[-10%] w-[200px] h-[200px] rounded-full bg-[#1B4F8A]/5 blur-[45px] pointer-events-none group-hover:bg-[#1B4F8A]/10 transition-all duration-500" />
              
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 text-[9px] font-bold tracking-widest uppercase bg-[#1B4F8A] text-white rounded mb-4">
                  The ScaleSteady Deal
                </span>
                <h3 className="font-sans text-lg font-bold mb-4 text-[#0C0C0E] uppercase tracking-tight">Our Flat Setup Fee</h3>
                <p className="font-sans text-xs text-[#2F3033] leading-relaxed mb-6 font-medium">
                  If you do it yourself, you pay $875 for the raw software alone -- and you still have to build it, write the copy, and monitor the accounts without any experience. We buy these subscriptions in bulk. Your $500 setup fee goes entirely toward buying the accounts, and we configure everything, write the emails, and run the campaign for free.
                </p>
                
                <ul className="space-y-4 text-xs text-[#2F3033]">
                  <li className="flex items-center gap-3 transition-colors duration-300 hover:text-[#0C0C0E] group/item1">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1B4F8A]/5 border border-[#1B4F8A]/20 group-hover/item1:border-[#1B4F8A] group-hover/item1:bg-[#1B4F8A]/10 transition-all duration-300">
                      <svg className="w-3 h-3 text-[#1B4F8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">All 25 sending emails setup and warmed up</span>
                  </li>
                  <li className="flex items-center gap-3 transition-colors duration-300 hover:text-[#0C0C0E] group/item2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1B4F8A]/5 border border-[#1B4F8A]/20 group-hover/item2:border-[#1B4F8A] group-hover/item2:bg-[#1B4F8A]/10 transition-all duration-300">
                      <svg className="w-3 h-3 text-[#1B4F8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">All 5 domains registered and verified</span>
                  </li>
                  <li className="flex items-center gap-3 transition-colors duration-300 hover:text-[#0C0C0E] group/item3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1B4F8A]/5 border border-[#1B4F8A]/20 group-hover/item3:border-[#1B4F8A] group-hover/item3:bg-[#1B4F8A]/10 transition-all duration-300">
                      <svg className="w-3 h-3 text-[#1B4F8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">10,000 cleaned and verified leads</span>
                  </li>
                  <li className="flex items-center gap-3 transition-colors duration-300 hover:text-[#0C0C0E] group/item4">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1B4F8A]/5 border border-[#1B4F8A]/20 group-hover/item4:border-[#1B4F8A] group-hover/item4:bg-[#1B4F8A]/10 transition-all duration-300">
                      <svg className="w-3 h-3 text-[#1B4F8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">Technical DNS delivery filters configured</span>
                  </li>
                  <li className="flex items-center gap-3 transition-colors duration-300 hover:text-[#0C0C0E] group/item5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1B4F8A]/5 border border-[#1B4F8A]/20 group-hover/item5:border-[#1B4F8A] group-hover/item5:bg-[#1B4F8A]/10 transition-all duration-300">
                      <svg className="w-3 h-3 text-[#1B4F8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">All email sequences and copy angles written</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--ink-border)] relative z-10">
                <div className="mb-4 p-4 bg-[#1B4F8A]/5 border border-[#1B4F8A]/20 rounded-xl">
                  <span className="font-mono text-[10px] text-[#1B4F8A] uppercase tracking-wider font-bold block mb-1">What you actually pay</span>
                  <span className="font-mono text-4xl font-extrabold text-[#0C0C0E]">$500</span>
                  <span className="font-sans text-xs text-neutral-500 block mt-1">One-time flat cost &mdash; 100% goes to your vendor accounts. We retain zero.</span>
                </div>
                <div className="p-3 bg-[#1B4F8A]/5 border border-[#1B4F8A]/20 rounded-lg text-center font-mono">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">You save at minimum</span>
                  <span className="text-2xl font-extrabold text-[#1B4F8A] block mt-1">$375 + 60 days of free labor</span>
                </div>
              </div>
            </div>

          </div>

          {/* Agency Alternative + Why Section */}
          <div className="mt-8 space-y-0">

            {/* Beat 1: The Agency Math */}
            <div className="bento-card-light rounded-b-none p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-md border-b-0 hover:translate-y-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-400" />
                  <h4 className="font-sans text-xs font-extrabold uppercase tracking-widest text-[#0A0A0A]">
                    The Agency Alternative
                  </h4>
                </div>
                <p className="font-sans text-xs text-[#444444] leading-relaxed max-w-[760px] font-medium">
                  Typical marketing agencies charge an upfront fee between <strong>$1,500 and $5,000</strong> to set this up <sup>[7]</sup>, plus a monthly retainer between <strong>$3,000 and $7,000</strong> <sup>[6]</sup>. They usually lock you into a 6-month contract -- and still pass the $875 software bill to your credit card.
                </p>
              </div>
              <div className="flex-shrink-0 bg-white/95 shadow-sm border border-[#DEDEDE] px-6 py-4 rounded-2xl text-center font-mono transition-transform duration-300 hover:scale-[1.03]">
                <span className="block text-[9px] text-[#666666] uppercase font-bold tracking-wider mb-1">ScaleSteady Agency Fee</span>
                <span className="text-base font-extrabold text-neutral-900">$0.00 / Mo</span>
              </div>
            </div>

            {/* Beat 2 + 3: The Why */}
            <div className="bento-card-light rounded-t-none border-t-0 bg-[#FAF9F6] p-8 md:p-10 relative overflow-hidden shadow-sm hover:translate-y-0">
              
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#1B4F8A]/3 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-[#1B4F8A]/3 blur-[60px] pointer-events-none" />

              <div className="relative z-10 max-w-[760px] space-y-6">

                <span className="inline-block px-3 py-1 text-[9px] font-bold tracking-widest uppercase bg-[#1B4F8A]/5 text-[#1B4F8A] border border-[#1B4F8A]/10 rounded">
                  Why we structure it this way
                </span>

                <p className="font-sans text-lg md:text-2xl font-bold text-[#0C0C0E] leading-snug">
                  We learned that the only way to grow in this space is by giving value first.
                </p>

                <p className="font-sans text-sm text-[#2F3033] leading-relaxed">
                  So we go first. That is not a marketing angle -- it is how we decided to run this business. The clients who have found success with us came the same way you did. We proved it before we pitched it.
                </p>

                <div className="border-t border-[#D8D6CE]" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#585A60] font-bold">Who we take on</span>
                    <p className="font-sans text-sm text-[#2F3033] leading-relaxed">
                      Health and construction only. Not as a rule -- as a promise. These are the two industries we can stand fully behind. We are not going to take your money somewhere we have not already been.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#585A60] font-bold">All we want</span>
                    <p className="font-sans text-sm text-[#2F3033] leading-relaxed">
                      A seat at the table. One shot to show you what this does. If it works, we build something long-term. If it does not, you walk. No hard feelings.
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* Citations Footer */}
          <div className="mt-6 text-[10px] text-[#666666] leading-relaxed space-y-1">
            <p><sup>[1]</sup> Professional business email hosting baseline pricing plans</p>
            <p><sup>[2]</sup> Namecheap domain registration baseline registry listings: namecheap.com</p>
            <p><sup>[3]</sup> Apollo.io Professional credit limits and base export pricing: apollo.io/pricing</p>
            <p><sup>[4]</sup> Instantly.ai / Smartlead.ai average baseline deliverability and warm-up pricing structures</p>
            <p><sup>[5]</sup> MillionVerifier bulk email list verification verification thresholds: millionverifier.com/pricing</p>
            <p><sup>[6]</sup> B2B outbound agency monthly retainer pricing benchmarks: newlead.io/pricing-reports</p>
            <p><sup>[7]</sup> Outsource SDR and agency technical authentication setup & onboarding fees: prospeo.io/agency-costs</p>
          </div>
          </div>
        </section>

        {/* 04 WHAT'S INCLUDED - Asymmetric Bento Grid */}
        <section className="py-20 bg-white border-b border-neutral-200 relative z-10">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-center tracking-tight text-[#0A0A0A] mb-12">
              Deliverables built directly for your business
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Bento Card 1: 20,000 Outreach Sends */}
              <div className="bento-card-light lg:col-span-2 p-8 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-[#444444] font-semibold uppercase tracking-wider">TOS §1.3 (a)</span>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-[#E8E8E8] text-[#262626] rounded">CAPACITY</span>
                  </div>
                  <h3 className="font-sans text-xl font-bold text-[#0A0A0A]">20,000 Highly Targeted Sends</h3>
                  <p className="font-sans text-sm text-[#262626] leading-relaxed">
                    Deployment of dedicated sending domains and warmed email inboxes, configured to send a minimum of 20,000 highly targeted emails across your campaign cycle.
                  </p>
                </div>
                <div className="mt-6 border-t border-[#DEDEDE] pt-4 flex gap-4 text-xs font-mono text-[#444444]">
                  <div><span className="text-emerald-600 font-bold">●</span> SPF: Configured</div>
                  <div><span className="text-emerald-600 font-bold">●</span> DKIM: Verified</div>
                  <div><span className="text-emerald-600 font-bold">●</span> DMARC: Enforced</div>
                </div>
              </div>

              {/* Bento Card 2: 10,000 Verified Leads */}
              <div className="bento-card-light p-8 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-[#444444] font-semibold uppercase tracking-wider">TOS §1.3 (b)</span>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-[#E8E8E8] text-[#262626] rounded">DATA</span>
                  </div>
                  <h3 className="font-sans text-xl font-bold text-[#0A0A0A]">10,000 Verified ICP Leads</h3>
                  <p className="font-sans text-sm text-[#262626] leading-relaxed">
                    Sourcing and delivery of a minimum of 10,000 verified and cleaned business email addresses drawn from your target ideal prospect profile.
                  </p>
                </div>
                <div className="mt-6 border-t border-[#DEDEDE] pt-4 flex justify-between text-xs font-mono text-[#444444]">
                  <span>Cleaned & Validated</span>
                  <span className="text-emerald-600 font-bold">99.8% Accuracy</span>
                </div>
              </div>

              {/* Bento Card 3: 2 Custom Angles */}
              <div className="bento-card-light p-8 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-[#444444] font-semibold uppercase tracking-wider">TOS §1.3 (c)</span>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-[#E8E8E8] text-[#262626] rounded">COPY</span>
                  </div>
                  <h3 className="font-sans text-xl font-bold text-[#0A0A0A]">2 Distinct Market Angles</h3>
                  <p className="font-sans text-sm text-[#262626] leading-relaxed">
                    Development of two distinct marketing angles, each custom-tailored to a segment of your ideal client profile to maximize outreach relevance.
                  </p>
                </div>
                <div className="mt-6 border-t border-[#DEDEDE] pt-4 flex gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-white border border-[#DEDEDE] text-[#262626]">Angle A: Direct</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-white border border-[#DEDEDE] text-[#262626]">Angle B: Story</span>
                </div>
              </div>

              {/* Bento Card 4: 3 Follow-up Steps */}
              <div className="bento-card-light p-8 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-[#444444] font-semibold uppercase tracking-wider">TOS §1.3 (d)</span>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-[#E8E8E8] text-[#262626] rounded">FLOW</span>
                  </div>
                  <h3 className="font-sans text-xl font-bold text-[#0A0A0A]">3 Sequence Follow-ups</h3>
                  <p className="font-sans text-sm text-[#262626] leading-relaxed">
                    Creation of three follow-up email sequences written specifically to engage and pull responses from prospects who did not reply to the initial message.
                  </p>
                </div>
                <div className="mt-6 border-t border-[#DEDEDE] pt-4 flex gap-2 font-mono text-xs text-[#444444]">
                  <span>Step 1</span> → <span>Step 2</span> → <span>Step 3</span>
                </div>
              </div>

              {/* Bento Card 5: Managed Campaign Operations */}
              <div className="bento-card-light lg:col-span-2 p-8 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-[#444444] font-semibold uppercase tracking-wider">TOS §1.3 (e, f)</span>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-[#E8E8E8] text-[#262626] rounded">OPS</span>
                  </div>
                  <h3 className="font-sans text-xl font-bold text-[#0A0A0A]">Managed Campaign Operations</h3>
                  <p className="font-sans text-sm text-[#262626] leading-relaxed">
                    Full campaign execution including active inbox monitoring, bounce rate reduction, qualified response purification, booking coordination, and monthly alignment reviews.
                  </p>
                </div>
                <div className="mt-6 border-t border-[#DEDEDE] pt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono text-[#262626]">
                  <div>✓ Inbox Monitoring</div>
                  <div>✓ Meeting Coordination</div>
                  <div>✓ Monthly Review</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 05 TIMELINE - Warmup, Parallel Deliverables, Kickoff, Check-ins */}
        <section className="bg-[#0D0D0E] text-white py-24 border-b border-neutral-900 relative overflow-hidden z-10">
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2 text-center">
              Campaign Roadmap
            </span>
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-center tracking-tight mb-4">
              Onboarding &amp; Implementation Timeline
            </h2>
            <p className="font-sans text-xs text-center text-neutral-400 mb-16 max-w-[620px] mx-auto leading-relaxed">
              We continuously optimize your campaign daily to ensure we achieve the most favorable possible outcomes at the conclusion of the 60-day engagement.
            </p>

            {/* Premium Progress Bar Indicator (Horizontal Tracker) */}
            <div className="relative w-full max-w-[960px] mx-auto h-[3px] bg-[#1F1F1F] mb-16 rounded-full hidden md:block">
              {/* Glowing active line */}
              <div 
                className="absolute top-0 left-0 h-full bg-[#1B4F8A] shadow-[0_0_12px_rgba(27,79,138,0.7)] transition-all duration-500"
                style={{ width: `${(activeStep / 3) * 100}%` }}
              />
              
              {/* Dot Indicators */}
              <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
                {timelineSteps.map((step, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`pointer-events-auto -translate-y-[0.5px] w-7 h-7 rounded-full border-2 font-mono text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
                      idx <= activeStep 
                        ? "bg-[#1B4F8A] border-[#1B4F8A] text-white shadow-[0_0_12px_rgba(27,79,138,0.5)] scale-110" 
                        : "bg-[#0A0A0A] border-[#2E2E2E] text-[#888888] hover:border-[#1B4F8A] hover:text-white"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Asymmetric 2-Column Bento Timeline Console */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              
              {/* Left Column: Interactive vertical triggers (4 steps) */}
              <div className="lg:col-span-2 space-y-4">
                {timelineSteps.map((step, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-5 border rounded-2xl transition-all duration-300 flex items-start gap-4 group/btn ${
                      idx === activeStep 
                        ? "bg-[#111111] border-[#1B4F8A]/60 text-white shadow-xl translate-x-1" 
                        : "bg-transparent border-[#1F1F1F] text-[#888888] hover:border-[#2E2E2E] hover:text-white"
                    }`}
                  >
                    <span className={`font-mono text-xs px-2 py-0.5 rounded border transition-colors duration-300 ${
                      idx === activeStep 
                        ? "bg-[#1B4F8A]/15 border-[#1B4F8A]/40 text-[#1B4F8A]" 
                        : "bg-white/5 border-white/10 text-[#888888] group-hover/btn:text-white"
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        {step.label}
                      </span>
                      <h4 className={`font-sans text-sm font-bold transition-colors duration-300 ${
                        idx === activeStep ? "text-[#1B4F8A]" : "text-[#CCCCCC] group-hover/btn:text-white"
                      }`}>
                        {step.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Column: Premium Glow Detail Panel */}
              <div className="bento-card-dark lg:col-span-3 p-8 relative overflow-hidden min-h-[380px] flex flex-col justify-between hover:border-[#1B4F8A]/40 shadow-[0_20px_50px_rgba(27,79,138,0.05)]">
                
                {/* Accent glow light */}
                <div className="absolute -top-12 -right-12 w-[240px] h-[240px] rounded-full bg-[#1B4F8A]/4 blur-[45px] pointer-events-none" />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase bg-[#1B4F8A]/15 text-[#1B4F8A] border border-[#1B4F8A]/30 rounded">
                        Active Phase: {timelineSteps[activeStep].label}
                      </span>
                      <h3 className="font-sans text-lg font-bold text-white mt-1">
                        {timelineSteps[activeStep].title}
                      </h3>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#CCCCCC] leading-relaxed">
                    {timelineSteps[activeStep].desc}
                  </p>

                  {/* Dynamic Metrics layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {timelineSteps[activeStep].metrics.map((metric, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-0.5">
                        <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
                          {metric.name}
                        </span>
                        <span className="font-sans text-xs font-bold text-white">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Checklist of deliverables */}
                  <div className="space-y-3 pt-2">
                    <h5 className="font-mono text-[9px] text-neutral-500 uppercase font-bold tracking-widest">
                      Key Deliverables &amp; Actions:
                    </h5>
                    <ul className="space-y-2 text-xs text-[#CCCCCC] list-none p-0 m-0">
                      {timelineSteps[activeStep].bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-white font-bold">&bull;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500 relative z-10">
                  <span>Progress Stage: 0{activeStep + 1} / 04</span>
                  <span>ScaleSteady LLC</span>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* 06 ASSET OWNERSHIP */}
        <section className="py-20 bg-[#FAF8F6] border-b border-neutral-200 relative z-10">
          <div className="max-w-[1100px] mx-auto px-6">

            <div className="text-center mb-12">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#888888] block mb-3">06 -- Ownership</span>
              <h2 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-[#0A0A0A] mb-4">
                Everything we build is your property
              </h2>
              <p className="font-sans text-sm text-[#444444] font-medium max-w-[540px] mx-auto">
                Sourced from Section 3.1 of the signed Terms of Service. This is not a promise -- it is a legal obligation.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bento-card-light border-l-4 border-l-[#1B4F8A] p-6 hover:translate-y-[-2px]">
                <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-lg bg-[#0A0A0A]/5">
                  <svg className="w-5 h-5 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
                <span className="font-sans text-sm font-bold text-[#0A0A0A] block mb-1">5 Domains</span>
                <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider font-bold">Yours from Day 1</span>
              </div>

              <div className="bento-card-light border-l-4 border-l-[#1B4F8A] p-6 hover:translate-y-[-2px]">
                <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-lg bg-[#0A0A0A]/5">
                  <svg className="w-5 h-5 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-sans text-sm font-bold text-[#0A0A0A] block mb-1">25 Inboxes</span>
                <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider font-bold">Yours from Day 1</span>
              </div>

              <div className="bento-card-light border-l-4 border-l-[#1B4F8A] p-6 hover:translate-y-[-2px]">
                <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-lg bg-[#0A0A0A]/5">
                  <svg className="w-5 h-5 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                  </svg>
                </div>
                <span className="font-sans text-sm font-bold text-[#0A0A0A] block mb-1">10,000 Leads</span>
                <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider font-bold">Yours from Day 1</span>
              </div>

              <div className="bento-card-light border-l-4 border-l-[#1B4F8A] p-6 hover:translate-y-[-2px]">
                <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-lg bg-[#0A0A0A]/5">
                  <svg className="w-5 h-5 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-sans text-sm font-bold text-[#0A0A0A] block mb-1">Email Sequences</span>
                <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider font-bold">Yours from Day 1</span>
              </div>

            </div>

            <p className="font-sans text-xs text-[#666666] text-center mt-8">
              In the event of campaign termination for any reason, ScaleSteady is legally obligated to transfer all digital credentials and lead files to you in a portable format within 10 business days. (TOS &sect;3.4)
            </p>
          </div>
        </section>

        {/* 07 SCALE OR WALK */}
        <section className="py-24 border-b border-neutral-200 bg-white relative z-10">
          <div className="max-w-[1000px] mx-auto px-6">

            {/* Milestone trigger callout */}
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#888888] block mb-4">07 -- Post-Milestone Election</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#888888] block mb-3">Revenue milestone reached</span>
              <div className="font-sans text-7xl md:text-9xl font-extrabold text-[#0A0A0A] leading-none mb-4">$5,000</div>
              <p className="font-sans text-sm text-[#444444] font-medium">
                This decision only happens after your campaign closes revenue. Not before. Not during. After.
              </p>
              <div className="mt-6 inline-block px-6 py-2 border border-[#DEDEDE] bg-white rounded-full">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666666]">Then you choose one of two options below</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Walk Card */}
              <div className="bento-card-light p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#E8E8E8] text-[#262626] mb-5">
                    Option B
                  </span>
                  <h3 className="font-sans text-2xl font-extrabold text-[#0A0A0A] mb-4">Walk and Keep Everything</h3>
                  <p className="font-sans text-sm text-[#444444] leading-relaxed mb-6">
                    Conclude the engagement. Retain complete ownership of all 5 domains, 25 warmed inboxes, the 10,000-contact lead list, and all email sequences. You owe ScaleSteady nothing further.
                  </p>
                  <ul className="space-y-2 text-xs text-[#444444]">
                    <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">&#10003;</span> All domains transferred to you</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">&#10003;</span> All inboxes transferred to you</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">&#10003;</span> Full lead list export delivered</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">&#10003;</span> All copy sequences handed over</li>
                  </ul>
                </div>
                <p className="font-mono text-sm font-bold text-[#0A0A0A] mt-8">$0 additional fees</p>
              </div>

              {/* Scale Card */}
              <div className="bento-card-light bg-white p-8 flex flex-col justify-between border-2 border-[#1B4F8A] shadow-[0_20px_50px_rgba(27,79,138,0.08)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[#1B4F8A]/5 blur-[60px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#1B4F8A] text-white">
                      Option A
                    </span>
                    <span className="font-mono text-[9px] text-[#1B4F8A] uppercase tracking-wider border border-[#1B4F8A]/20 bg-[#1B4F8A]/5 px-2 py-0.5 rounded">Most common choice</span>
                  </div>
                  <h3 className="font-sans text-2xl font-extrabold mb-4 text-[#0C0C0E]">Keep Scaling</h3>
                  <p className="font-sans text-sm text-[#2F3033] leading-relaxed mb-6">
                    Retain ScaleSteady to actively manage, optimize, and scale your outbound campaign. Includes database refreshes, continuous copy sequencing, and inbox deliverability management.
                  </p>
                  <ul className="space-y-2 text-xs text-[#2F3033]">
                    <li className="flex items-center gap-2"><span className="text-[#1B4F8A] font-bold">&#10003;</span> Continuous lead list refreshes</li>
                    <li className="flex items-center gap-2"><span className="text-[#1B4F8A] font-bold">&#10003;</span> A/B copy optimization</li>
                    <li className="flex items-center gap-2"><span className="text-[#1B4F8A] font-bold">&#10003;</span> Monthly campaign review calls</li>
                    <li className="flex items-center gap-2"><span className="text-[#1B4F8A] font-bold">&#10003;</span> Inbox deliverability management</li>
                  </ul>
                </div>
                <p className="font-mono text-sm font-bold text-[#0C0C0E] mt-8 relative z-10">$699 / month</p>
              </div>

            </div>
          </div>
        </section>

        {/* 08 PLAIN-ENGLISH TOS SUMMARY */}
        <section className="py-20 bg-[var(--canvas)] border-b border-[var(--ink-border)] relative z-10">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-center tracking-tight text-[#0A0A0A] mb-4">
              Terms of Service Plain-English Summary
            </h2>
            <p className="font-sans text-xs text-center text-[#444444] mb-12 font-medium">
              Every commitment we make is documented in standard, readable contract clauses.
            </p>

            <div className="space-y-4 mb-10">

              <div className="bento-card-light bg-white/70 p-5 hover:translate-y-[-1px]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Section 1 | What We Deliver</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  ScaleSteady deploys dedicated sending domains and warmed inboxes (minimum 20,000 sends), sources and cleans a minimum of 10,000 verified B2B leads, develops two distinct marketing angles with three follow-up sequences, and manages active inbox monitoring, response coordination, and campaign reviews throughout the 60-day engagement. (§1.3)
                </p>
              </div>

              <div className="bento-card-light bg-white/70 p-5 hover:translate-y-[-1px]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Section 2 | Pass-Through Cost Model</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  The $500 Infrastructure Fee is remitted in full to third-party vendors -- domain registrars, email data providers, and warm-up platforms. ScaleSteady retains zero markup. All agency, labor, copywriting, and management fees are deferred until the Revenue Milestone is achieved. (§2.1 -- §2.3)
                </p>
              </div>

              <div className="bento-card-light bg-white/70 p-5 hover:translate-y-[-1px]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Section 3 | Asset Ownership</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  All domain names, email inboxes, lead lists, and outbound sequences are the sole property of the Client from the moment of purchase or creation. Upon termination for any reason, all assets are transferred to the Client within 10 business days. ScaleSteady retains no title, equity, or licensing rights. (§3.1, §3.4)
                </p>
              </div>

              <div className="bento-card-light bg-white/70 p-5 hover:translate-y-[-1px]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Section 6 -- 7 | Revenue Milestone and Downside Protection</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  The Revenue Milestone is $5,000 in new, cleared revenue attributable to the campaign. If the Milestone is not achieved within 60 days, ScaleSteady waives all claims to labor compensation, the Client retains all assets, and no further fees of any kind are owed. Client maximum financial exposure is $500, regardless of outcome. (§6.1, §7.3)
                </p>
              </div>

              <div className="bento-card-light bg-white/70 p-5 hover:translate-y-[-1px]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Section 9 | Post-Milestone Election</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  Upon verified Milestone achievement, the Client elects Option A (ongoing retainer at $699/month, 12-month commitment with 30-day cancellation notice) or Option B (conclude engagement, retain 100% of all assets, owe nothing further). Failure to elect within 14 days defaults to Option B. (§9.1 -- §9.3)
                </p>
              </div>

              <div className="bento-card-light bg-white/70 p-5 hover:translate-y-[-1px]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Section 10 | Refund Policy</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  Full refund is available only if requested before ScaleSteady executes any vendor purchases. Once domain registration, inbox provisioning, lead list acquisition, or warm-up enrollment has been executed, the Infrastructure Fee is non-refundable in whole or in part. ScaleSteady earns no margin on these purchases and has no funds to return. No labor fee is collected during the campaign phase and therefore none is subject to refund. (§10.2 -- §10.4)
                </p>
              </div>

              <div className="bento-card-light bg-white/70 p-5 hover:translate-y-[-1px]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Section 13 | Limitation of Liability</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  ScaleSteady's total aggregate liability is capped at $500 -- the Infrastructure Fee paid. ScaleSteady is not liable for indirect, consequential, or punitive damages including lost profits or lost revenue. ScaleSteady is not liable for service interruptions or policy changes by third-party platforms, registrars, or data vendors. (§13.1 -- §13.3)
                </p>
              </div>

              <div className="bento-card-light bg-white/70 p-5 hover:translate-y-[-1px]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Section 14 | Dispute Resolution</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  Disputes are resolved first through 15-day good faith negotiation, then non-binding mediation (costs shared equally), then litigation in a court of competent jurisdiction. Both parties waive the right to a jury trial by signing this Agreement. (&sect;14.1 &mdash; &sect;14.3)
                </p>
              </div>

            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowTOS(!showTOS)}
                className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#444444] border-b-2 border-[#0A0A0A] pb-0.5 transition-colors"
              >
                {showTOS ? "Hide Full Terms of Service" : "View Full Terms of Service"}
              </button>
            </div>

            {showTOS && (
              <div className="mt-8 border border-[#DEDEDE] bg-white p-6 max-h-[600px] overflow-y-scroll text-xs text-[#262626] font-mono leading-relaxed space-y-4 rounded-xl shadow-inner">
                
                <h3 className="font-sans font-bold text-sm text-[#0A0A0A] uppercase tracking-tight">ScaleSteady LLC -- Terms of Service and Client Service Agreement</h3>
                <p><strong>Entity:</strong> ScaleSteady LLC</p>
                <p><strong>Effective Date:</strong> Date of Client Execution</p>
                <hr className="border-[#DEDEDE] my-3" />
                <p className="italic text-[#444444]">This document is written to be understood, not to intimidate. If any section is unclear, reach out before signing.</p>
                <hr className="border-[#DEDEDE] my-3" />

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">PART I -- Standard Service Terms</h4>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 1 -- Scope of Services</h4>
                <p>1.1 DEFINED DELIVERABLES. ScaleSteady agrees to provide services explicitly described in the Client's accepted proposal or onboarding agreement (the "Scope of Work" or "SOW"). Services not itemized in the SOW are outside scope and will not be performed without a written addendum executed by both parties.</p>
                <p>1.2 SERVICE BOUNDARIES. ScaleSteady is an outbound infrastructure company. Our engagement covers the construction, configuration, deployment, and ongoing management of the Client's outbound email system. We do not provide inbound marketing, paid media management, website development, or sales training unless separately agreed in writing.</p>
                <p>1.3 CAMPAIGN INFRASTRUCTURE COMPONENTS. A standard ScaleSteady engagement includes: deployment of dedicated sending domains and warmed inboxes configured to send a minimum of 20,000 emails per campaign cycle; sourcing and delivery of a minimum of 10,000 verified and cleaned email addresses; development of two (2) distinct marketing angles; creation of three (3) follow-up email sequences; lead list verification and cleaning; inbox management and monitoring of interested reply threads; and coordination of follow-up on prospective meetings on the Client's behalf.</p>
                <p>1.4 SCOPE MODIFICATIONS. Any request to expand, modify, or reduce the Scope of Work must be submitted in writing and executed via a Change Order signed by both parties before additional work commences.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 2 -- Payment Terms and Pass-Through Cost Model</h4>
                <p>2.1 INFRASTRUCTURE INVESTMENT. The Client agrees to pay a one-time infrastructure investment of five hundred dollars (US $500) at commencement of services. This fee is remitted in full to third-party vendors. ScaleSteady does not retain any portion as revenue or markup. A full itemized breakdown of vendor allocations will be provided at invoicing.</p>
                <p>2.2 PASS-THROUGH COST DEFINITION. The Infrastructure Fee constitutes a "Pass-Through Cost" -- a third-party expenditure made by ScaleSteady on the Client's behalf as procuring agent. Pass-Through Costs are incurred immediately upon placement of vendor orders and are non-refundable once vendor purchases have been executed. Specific refund conditions are addressed in Section 10.</p>
                <p>2.3 AGENCY FEE DEFERRAL. ScaleSteady charges zero dollars ($0) in agency fees, labor fees, or management fees during the campaign's initial phase. ScaleSteady absorbs all costs associated with personnel, platform licensing, copywriting, and campaign management until the Revenue Milestone (Section 6) is achieved or the Performance Period (Section 7) concludes. ScaleSteady's financial recovery depends entirely on the Client's commercial success.</p>
                <p>2.4 LATE PAYMENT. If the Client elects the ongoing retainer (Section 9) and a monthly invoice becomes more than fourteen (14) days past due, ScaleSteady reserves the right to suspend active campaign services until the balance is resolved.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 3 -- Intellectual Property and Asset Ownership</h4>
                <p>3.1 CLIENT OWNERSHIP. All domain names, email inboxes, lead lists, and outbound email sequences developed for the Client are the sole property of the Client from the moment of purchase or creation. ScaleSteady acts as authorized technical agent during the active campaign and holds no title, equity, or licensing rights over any Client-specific asset.</p>
                <p>3.2 SCALESTEADY PROPRIETARY MATERIALS. ScaleSteady retains exclusive ownership of all proprietary tools, internal automation systems, deliverability frameworks, methodologies, and operational playbooks. The Client acquires no rights or licenses in ScaleSteady's internal systems as a result of this engagement.</p>
                <p>3.3 CONTENT LICENSE DURING ENGAGEMENT. The Client grants ScaleSteady a limited, non-exclusive, revocable license to use the Client's name, brand, logo, products, and service descriptions solely for constructing and deploying outbound campaign materials on the Client's behalf.</p>
                <p>3.4 ASSET TRANSFER UPON TERMINATION. Upon termination for any reason, ScaleSteady will facilitate orderly transfer of all Client-owned digital assets within ten (10) business days, including domain registrar credentials, inbox login credentials, and lead list exports in portable format. All ScaleSteady access privileges to Client accounts will be permanently revoked upon completion of transfer.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 4 -- Confidentiality and Mutual Non-Disclosure</h4>
                <p>4.1 -- 4.3. Both parties agree to hold each other's Confidential Information -- including business strategies, pricing, customer lists, campaign data, and proprietary methods -- in strict confidence, not disclose it to any third party without written consent, and use it solely for fulfilling obligations under this Agreement. Confidentiality does not apply to information that is publicly known, was rightfully known prior to disclosure, is independently developed, or is required to be disclosed by law.</p>
                <p>4.4 DURATION. Confidentiality obligations survive termination of this Agreement for three (3) years.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 5 -- Term, Termination, and Offboarding</h4>
                <p>5.1 INITIAL TERM. The engagement commences on the date of Client acceptance and continues until: (a) the Revenue Milestone is achieved; (b) the 60-day Performance Period concludes; or (c) the Agreement is terminated per the provisions below.</p>
                <p>5.2 TERMINATION BY CLIENT. The Client may terminate at any time by written notice. Upon receipt: all campaign activity ceases within 5 business days; the Infrastructure Fee for vendor purchases already executed remains non-refundable; ScaleSteady's deferred labor fee obligation is discharged in full; all Client-owned assets are transferred per Section 3.4.</p>
                <p>5.3 TERMINATION BY SCALESTEADY. ScaleSteady may terminate with 7 business days' written notice if: (a) the Client materially breaches this Agreement and fails to cure within 5 business days; (b) the Client engages in conduct likely to violate applicable email regulations; or (c) continued service would require ScaleSteady to violate applicable law.</p>
                <p>5.4 EFFECT OF TERMINATION. Termination does not extinguish obligations accrued prior to the effective date. Sections 3, 4, 8, 10, 11, and 12 survive termination indefinitely.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">PART II -- ScaleSteady-Specific Terms</h4>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 6 -- Revenue Milestone and Performance Trigger</h4>
                <p>6.1 DEFINITION. The Revenue Milestone is five thousand dollars (US $5,000) in new, cleared revenue received by the Client from customers sourced through ScaleSteady's outbound campaign meeting the attribution criteria in Section 6.2.</p>
                <p>6.2 ATTRIBUTION STANDARD. Revenue is attributable if the customer: (a) was identified from ScaleSteady's verified lead list or engaged through a ScaleSteady-managed sequence; and (b) did not have an existing active commercial relationship with the Client at the time of initial outreach.</p>
                <p>6.3 VERIFICATION. The Client shall notify ScaleSteady in writing within five (5) business days of receiving cleared funds satisfying or contributing to the Milestone. Verification may include a bank statement, CRM record, invoice, or any document reasonably evidencing cleared revenue. ScaleSteady relies on the Client's honest and timely self-reporting.</p>
                <p>6.4 MILESTONE TRIGGER. Upon verified achievement, the Client's right to elect Scale or Walk (Section 9) becomes active. No labor fees are assessed regardless of which option is selected.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 7 -- Performance Period, Deferred Labor, and Downside Protection</h4>
                <p>7.1 PERFORMANCE PERIOD. The Performance Period begins on the date ScaleSteady launches the Client's first email sequence and continues for sixty (60) calendar days, or until the Revenue Milestone is achieved, whichever occurs first.</p>
                <p>7.2 SCALESTEADY'S LABOR COMMITMENT. ScaleSteady commits to providing the full scope of services defined in Section 1.3 throughout the entirety of the Performance Period at no charge to the Client. All labor, management, copywriting, inbox monitoring, and optimization work performed during this period is absorbed by ScaleSteady as a condition of this Agreement.</p>
                <p>7.3 OUTCOME IF MILESTONE IS NOT ACHIEVED. If the Revenue Milestone is not achieved within the Performance Period: ScaleSteady waives all claims to labor compensation; the Client retains full ownership of all campaign infrastructure assets (domains, warmed inboxes, verified lead lists, and email sequences); and no further fees of any nature are owed beyond the Infrastructure Fee. The Client's maximum financial exposure under this Agreement is five hundred dollars ($500), regardless of campaign outcome.</p>
                <p>7.4 NO GUARANTEE OF COMMERCIAL OUTCOME. ScaleSteady warrants delivery of the infrastructure and campaign assets defined in Section 1.3. ScaleSteady does not warrant or guarantee any specific commercial outcome, including replies, booked meetings, closed deals, or revenue generated. Commercial outcomes depend on variables ScaleSteady does not control: the Client's sales process, offer quality, sales team capability, market conditions, and target audience responsiveness. ScaleSteady's direct financial interest in campaign performance shapes how the company works. It does not convert into a contractual guarantee.</p>
                <p>7.5 PAST PERFORMANCE DISCLAIMER. Case studies, results references, or historical performance data shared by ScaleSteady are provided for illustrative purposes only and do not guarantee equivalent results in any current or future engagement.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 8 -- Sole Operational Control of Infrastructure</h4>
                <p>8.1 SCALESTEADY'S TECHNICAL AUTHORITY. For the duration of the active campaign, ScaleSteady retains sole operational control over all sending infrastructure, including domain configuration, DNS records (SPF, DKIM, DMARC), inbox warm-up schedules, sending sequences, automation workflows, and email delivery platforms.</p>
                <p>8.2 WHY THIS IS NECESSARY. Cold email infrastructure is technically fragile. Unauthorized changes to DNS settings, sending volumes, or account configurations can cause rapid, difficult-to-reverse damage to domain reputation and deliverability. Recovery can take weeks to months and may require abandoning the affected domain entirely. This is a technical requirement, not a business preference.</p>
                <p>8.3 CLIENT ACCESS. The Client is granted read-level access to campaign dashboards and reporting throughout the engagement. The Client shall not independently alter or instruct third parties to alter any infrastructure component without ScaleSteady's prior written consent.</p>
                <p>8.4 TERMINATION RELEASES OPERATIONAL CONTROL. Upon termination, all infrastructure assets are transferred to the Client in full and ScaleSteady's operational authority terminates completely. The Client assumes sole responsibility for the infrastructure from that point forward.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 9 -- Post-Milestone Election: Scale or Walk</h4>
                <p>9.1 THE ELECTION. Upon achievement of the Revenue Milestone, the Client elects one of the following: OPTION A -- SCALE: retain ScaleSteady at a monthly retainer of six hundred and ninety-nine dollars (US $699/month) for continued campaign management. OPTION B -- WALK: conclude the engagement. The Client retains 100% of all infrastructure assets at no further cost. ScaleSteady does not invoice any labor fee.</p>
                <p>9.2 ELECTION TIMING. The Client shall communicate their election in writing within fourteen (14) calendar days of verified Milestone achievement. Failure to communicate within this window will be treated as an election to Walk (Option B).</p>
                <p>9.3 RETAINER COMMITMENT. Option A clients enter a twelve (12)-month retainer commitment billed monthly in advance. The Client may cancel with thirty (30) days' written notice. Cancellation before twelve (12) months incurs an early termination fee equal to three (3) months of the then-current monthly retainer.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 10 -- Refund Policy and Non-Refundable Purchases</h4>
                <p>10.1 GENERAL. ScaleSteady operates on a pass-through cost model and defers all labor fees until the Revenue Milestone is achieved. Refund eligibility depends on the stage at which a request is made.</p>
                <p>10.2 REFUNDABLE AMOUNTS. If the Client requests a refund before ScaleSteady executes any vendor purchases, the Client is entitled to a full refund of the Infrastructure Fee.</p>
                <p>10.3 NON-REFUNDABLE AMOUNTS. Once ScaleSteady has executed vendor purchases -- including domain registration, inbox provisioning, lead list acquisition, or warm-up platform enrollment -- those costs are non-refundable in whole or in part. The reasons: (a) ScaleSteady has already disbursed funds to third-party vendors operating under their own non-refundable policies; (b) the purchased assets are transferred to the Client's ownership upon purchase -- the Client possesses what was bought; and (c) ScaleSteady earns no margin on these purchases and has no funds to return.</p>
                <p>10.4 LABOR FEE REFUNDS. Because ScaleSteady does not collect labor fees during the initial campaign phase, there is no labor fee subject to refund during the Performance Period. If the Client terminates during an active retainer (Option A), the current month's retainer is non-refundable. The early termination fee described in Section 9.3 applies in lieu of any remaining monthly fees.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 11 -- Compliance, Indemnification, and Regulatory Responsibility</h4>
                <p>11.1 CLIENT WARRANTS LEGAL COMPLIANCE. The Client represents and warrants that: (a) their business and products are legally operated; (b) the target market does not target individuals in jurisdictions where commercial email outreach is prohibited; and (c) the Client will conduct all follow-up and sales activities in accordance with applicable law.</p>
                <p>11.2 CAN-SPAM, GDPR, AND EQUIVALENT LAWS. Under CAN-SPAM and CASL, primary legal liability attaches to the advertiser (the Client). Under GDPR, both the data controller (Client) and data processor (ScaleSteady) may carry independent compliance obligations. ScaleSteady will implement industry-standard compliance measures including functional unsubscribe mechanisms, accurate sender identification, and valid physical address inclusion. The Client is responsible for ensuring campaign content complies with the laws of recipient jurisdictions.</p>
                <p>11.3 CLIENT INDEMNIFICATION. The Client agrees to indemnify, defend, and hold harmless ScaleSteady and its members, officers, contractors, and agents from any claim, loss, liability, fine, or legal expense arising from: (a) the Client's failure to comply with applicable law; (b) inaccurate or misleading information provided by the Client; or (c) any third-party claim arising from the nature of the Client's products, services, or business practices.</p>
                <p>11.4 RIGHT TO REFUSE OR SUSPEND. ScaleSteady reserves the right to pause or permanently discontinue services if, in its reasonable judgment, continued campaign operations would violate applicable regulations, damage ScaleSteady's sender infrastructure, or expose ScaleSteady to material legal or reputational risk. Written notice will be provided and asset transfer facilitated per Section 3.4. No labor fees will be assessed for the period preceding suspension.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 12 -- Mutual Cooperation and Client Obligations</h4>
                <p>12.1 THE PARTNERSHIP STANDARD. Campaign success depends on two things: the quality of infrastructure and outreach ScaleSteady delivers, and the quality of sales conversations and follow-through the Client conducts. ScaleSteady does not operate as a passive service. Active Client engagement is a condition of this partnership.</p>
                <p>12.2 CLIENT OBLIGATIONS. The Client agrees to: respond to warm leads within two (2) business days of notification; provide accurate business information and service descriptions; notify ScaleSteady of any material change to offer, pricing, or target audience within five (5) business days; and participate in at least one scheduled campaign review per month.</p>
                <p>12.3 CLIENT FAILURE TO COOPERATE. If the Client fails to fulfill the obligations in Section 12.2 and that failure materially impairs campaign performance, ScaleSteady shall not be held responsible for any resulting reduction in effectiveness or failure to achieve the Revenue Milestone. ScaleSteady's labor deferral commitment remains in effect; however, non-cooperation will be documented and considered relevant context in any subsequent dispute.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 13 -- Limitation of Liability</h4>
                <p>13.1 AGGREGATE LIABILITY CAP. ScaleSteady's total aggregate liability shall not exceed the Infrastructure Fee paid: five hundred dollars ($500). This limitation reflects the nature of ScaleSteady's deferred-fee model. Because no labor fees are collected during the initial campaign phase, there is no larger pool of fees against which a claim could fairly be measured.</p>
                <p>13.2 EXCLUSION OF CONSEQUENTIAL DAMAGES. ScaleSteady is not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, lost revenue, loss of business opportunity, or reputational harm. The commercial outcome of any outbound campaign is subject to market forces and sales variables not within ScaleSteady's control.</p>
                <p>13.3 THIRD-PARTY PLATFORM LIABILITY. ScaleSteady is not liable for service interruptions, deliverability failures, data inaccuracies, or policy changes caused by third-party platforms, domain registrars, email service providers, or data vendors. ScaleSteady will take commercially reasonable steps to remediate such issues but cannot guarantee continuity of third-party services.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 14 -- Dispute Resolution</h4>
                <p>14.1 GOOD FAITH NEGOTIATION. Either party may initiate dispute resolution by delivering written notice describing the dispute. Both parties have fifteen (15) calendar days to reach a mutually agreeable resolution before escalating to mediation.</p>
                <p>14.2 MEDIATION. If negotiation does not resolve the dispute within fifteen (15) days, the parties submit the matter to non-binding mediation before a mutually agreed-upon mediator. Mediation costs are shared equally.</p>
                <p>14.3 LITIGATION. If mediation fails, the dispute shall be resolved through litigation in a court of competent jurisdiction. Nothing in this Section prevents either party from seeking emergency injunctive or equitable relief where necessary to prevent irreparable harm.</p>
                <p className="font-bold">JURY TRIAL WAIVER. By signing this Agreement, both parties expressly and voluntarily waive their constitutional right to have any dispute decided by a jury. Both parties acknowledge they have read this waiver, understand its legal significance, and agree to it knowingly and without coercion.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 15 -- General Provisions</h4>
                <p>15.1 ENTIRE AGREEMENT. This Agreement, together with the Client's accepted proposal and any executed Statements of Work, constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, warranties, or understandings, whether written or oral.</p>
                <p>15.2 AMENDMENTS. No amendment is effective unless made in writing and signed by authorized representatives of both parties.</p>
                <p>15.3 SEVERABILITY. If any provision is found unenforceable, it shall be modified to the minimum extent necessary to make it enforceable, or severed if modification is not possible, without affecting the remaining provisions.</p>
                <p>15.4 NO WAIVER. The failure of either party to enforce any right or provision shall not constitute a waiver of that right or provision.</p>
                <p>15.5 INDEPENDENT CONTRACTORS. The parties are independent contractors. Nothing in this Agreement creates a partnership, joint venture, employment, or agency relationship.</p>
                <p>15.6 NOTICES. All formal notices shall be delivered in writing via email to the designated contact of each party, with confirmation of receipt. Notices are effective upon confirmed delivery.</p>

                <hr className="border-[#DEDEDE] my-4" />
                <p className="font-bold">EXECUTION. By signing below, each party confirms they have read, understood, and agree to the terms of this Agreement in full, including the Jury Trial Waiver set forth in Section 14.</p>
              </div>
            )}

          </div>
        </section>

        {/* 09 ACCEPTANCE ZONE - Glassmorphic Bento Checkout Panel */}
        <section ref={acceptanceRef} id="acceptance" className="py-20 bg-[#F9F9FB] border-b border-neutral-200 relative z-10">
          <div className="max-w-[720px] mx-auto px-6">
            
            <div className="bento-card-dark text-white bg-[#0D0D0E]/80 backdrop-blur-2xl border-white/10 p-8 md:p-12 shadow-[0_24px_64px_rgba(0,0,0,0.8)] relative z-10">
              
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2 text-center">
                Review and Accept Partnership Terms
              </span>
              <h2 className="font-sans text-2xl font-extrabold text-center text-white mb-8">
                Outbound Partnership Split
              </h2>

              {/* Defined split terms banner */}
              <div className="mb-6 p-5 bg-[#151515] border border-white/10 text-center rounded-xl shadow-inner">
                <span className="font-sans text-xs font-bold text-white block">
                  Campaign Scope: <span className="text-[#1B4F8A]">$500 Setup Investment</span> + $0 Labor Fee
                </span>
                <span className="font-sans text-[11px] text-neutral-400 mt-1.5 block">
                  ScaleSteady labor fees are 100% deferred until your campaign closes $5,000 in new revenue.
                </span>
              </div>

              {/* Partnership Split Grid with thin dividers */}
              <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-8 mb-6">
                <div>
                  <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider mb-3">ScaleSteady Delivers</h4>
                  <ul className="space-y-2 text-xs text-neutral-300 list-none p-0 m-0 font-medium">
                    <li className="flex items-center gap-2 text-emerald-500"><span>✓</span> <span className="text-neutral-300">Outbound infrastructure build</span></li>
                    <li className="flex items-center gap-2 text-emerald-500"><span>✓</span> <span className="text-neutral-300">10,000+ verified target leads</span></li>
                    <li className="flex items-center gap-2 text-emerald-500"><span>✓</span> <span className="text-neutral-300">20,000+ campaign sends</span></li>
                    <li className="flex items-center gap-2 text-emerald-500"><span>✓</span> <span className="text-neutral-300">Active inbox monitoring</span></li>
                    <li className="flex items-center gap-2 text-emerald-500"><span>✓</span> <span className="text-neutral-300">Meeting coordination</span></li>
                  </ul>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider mb-3">You Commit To</h4>
                  <ul className="space-y-2 text-xs text-neutral-300 list-none p-0 m-0 font-medium">
                    <li className="flex items-center gap-2 text-neutral-400"><span>→</span> <span className="text-neutral-300">Approve message copy</span></li>
                    <li className="flex items-center gap-2 text-neutral-400"><span>→</span> <span className="text-neutral-300">Respond to warm leads (48h)</span></li>
                    <li className="flex items-center gap-2 text-neutral-400"><span>→</span> <span className="text-neutral-300">Monthly campaign reviews</span></li>
                    <li className="flex items-center gap-2 text-neutral-400"><span>→</span> <span className="text-neutral-300">Report milestone revenue</span></li>
                    <li className="flex items-center gap-2 text-neutral-400"><span>→</span> <span className="text-neutral-300">Close outbound leads</span></li>
                  </ul>
                </div>
              </div>

              {/* Checkbox Acceptance with clear link styling */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-1.5 flex-shrink-0 cursor-pointer accent-[#1B4F8A] w-4 h-4 rounded border-white/20 bg-black/40"
                  />
                  <span className="font-sans text-xs text-neutral-300 leading-relaxed font-medium">
                    I have read and agree to the{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTOS(true);
                      }}
                      className="underline text-[#1B4F8A] font-extrabold hover:text-white transition-colors duration-200"
                    >
                      Terms of Service
                    </button>
                    . I understand ScaleSteady builds my outbound system, sources my leads list, and deploys my campaign -- and that the deals I close from this pipeline depend on my offer and close rate.
                  </span>
                </label>
              </div>

              {/* PayPal Button Container */}
              <div className="relative">
                <div
                  style={{
                    pointerEvents: accepted ? "auto" : "none",
                    opacity: accepted ? 1 : 0.45,
                    transition: "opacity 0.3s ease",
                    userSelect: accepted ? "auto" : "none",
                  }}
                  className="w-full flex flex-col items-center justify-center min-h-[80px]"
                >
                  {PAYPAL_HOSTED_BUTTON_ID &&
                  PAYPAL_HOSTED_BUTTON_ID !== "[INSERT]" &&
                  PAYPAL_HOSTED_BUTTON_ID !== "" ? (
                    <div
                      id={`paypal-container-${PAYPAL_HOSTED_BUTTON_ID}`}
                      className="w-full max-w-[320px]"
                    />
                  ) : (
                    // Mockup Payment button for local testing
                    <button
                      type="button"
                      onClick={() => {
                        if (accepted) {
                          alert(
                            "Acceptance recorded. (Local Sandbox Mode: PayPal Hosted Button ID will render live when real ID is provided)."
                          );
                        }
                      }}
                      className="w-full max-w-[320px] bg-[#FFC439] hover:bg-[#F2B51F] text-[#111111] font-sans font-bold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <span>Pay with</span>
                      <strong className="italic text-[#003087] font-extrabold text-base">PayPal</strong>
                    </button>
                  )}
                </div>

                {!accepted && (
                  <p className="text-center font-mono text-[11px] text-[#444444] mt-4 font-semibold">
                    Please check the terms acceptance box above to activate checkout
                  </p>
                )}
              </div>

              <div className="mt-8 text-center border-t border-[#DEDEDE] pt-6 flex flex-col items-center gap-3">
                <span className="font-sans text-[11px] text-[#262626] font-semibold tracking-wide">
                  🔒 Secure checkout via PayPal - $500.00 USD - One-time payment
                </span>
                
                <div className="flex items-center gap-2 text-[#888888] font-mono text-[9px] uppercase tracking-wider mt-2">
                  <span>SSL Encrypted</span> | <span>256-Bit Protection</span>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* 12 COMPREHENSIVE TRUST FOOTER */}
      <footer className="bg-[#050505] text-white border-t border-[#1A1A1A] py-16 relative z-20">
        <div className="max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-24">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-12">
            
            {/* Column 1: Brand details */}
            <div className="flex flex-col gap-4">
              <span className="font-sans text-base font-extrabold tracking-wider uppercase text-white">
                ScaleSteady
              </span>
              <p className="font-sans text-[11px] text-[#888888] tracking-widest uppercase">
                Pipeline Engineers
              </p>
              <p className="font-sans text-xs text-[#CCCCCC] leading-relaxed mt-2">
                We build and configure high-deliverability cold email sending environments, sourcing verified B2B leads to fill sales pipelines.
              </p>
            </div>

            {/* Column 2: Legal Documents & Links */}
            <div className="flex flex-col gap-3">
              <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wider mb-2">Legal & Compliance</h5>
              <Link href="/terms" className="font-sans text-xs text-[#CCCCCC] hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="font-sans text-xs text-[#CCCCCC] hover:text-white transition-colors">Privacy Policy</Link>
              <a href="mailto:help@scalesteady.co" className="font-sans text-xs text-[#CCCCCC] hover:text-white transition-colors">Refund Policy & Support</a>
            </div>

            {/* Column 3: Contact & Registry */}
            <div className="flex flex-col gap-3">
              <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wider mb-2">Office</h5>
              <address className="font-sans text-xs text-[#CCCCCC] not-italic leading-relaxed">
                ScaleSteady LLC<br />
                2735 Hassert Blvd, Suite 135<br />
                Naperville, IL 60564<br />
                United States
              </address>
              <a href={PHONE_HREF} className="font-sans text-xs text-[#CCCCCC] hover:text-white mt-1 block">Phone: {PHONE}</a>
              <span className="font-sans text-xs text-[#CCCCCC] block">Email: help@scalesteady.co</span>
            </div>

          </div>

          <div className="border-t border-[#262626] pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* Regulatory compliance block */}
            <div className="max-w-[720px] text-[10px] text-[#888888] leading-relaxed space-y-2">
              <p>
                <strong>CAN-SPAM Act Compliance.</strong> ScaleSteady LLC operates in complete compliance with the CAN-SPAM Act of 2003. All campaigns we manage utilize valid opt-out mechanisms, accurate sender information, and physical office identifiers.
              </p>
              <p>
                <strong>Data Sourcing.</strong> Campaign leads are sourced from legally collected, publicly compiled business directories and professional databases. We do not purchase or deploy consumer-grade mass lists.
              </p>
              <p>
                <strong>Downside Protection.</strong> Per Section 7 of the Service Agreement, if the campaign fails to generate a verified $5,000 in new customer revenue within 60 days, ScaleSteady waives all labor compensation claims. Client retains full title and ownership of all campaign domains, inboxes, lists, and templates.
              </p>
            </div>
            
            <div className="text-right text-[11px] text-[#666666] flex-shrink-0">
              <p>&copy; {new Date().getFullYear()} ScaleSteady LLC. All rights reserved.</p>
            </div>

          </div>

        </div>
      </footer>

        {/* Sticky Mobile CTA */}
        {showStickyCTA && (
          <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#050505]/95 backdrop-blur-md border-t border-[#1A1A1A] p-4 flex items-center justify-between gap-4">
            <div className="flex-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#666666] block">Infrastructure Setup</span>
              <span className="font-sans text-sm font-extrabold text-white">$500 &mdash; one time</span>
            </div>
            <button
              onClick={scrollToAcceptance}
              className="px-6 py-3 bg-[#1B4F8A] hover:bg-[#2660A8] text-white font-sans font-bold text-xs uppercase tracking-widest transition-colors duration-200 flex-shrink-0"
            >
              Get Started
            </button>
          </div>
        )}

    </div>
  );
}
