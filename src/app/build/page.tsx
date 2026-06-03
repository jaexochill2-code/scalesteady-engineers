"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import logoAbstract from "../../../public/brand/logos/scalesteady_clean_monogram.png";

const PHONE = "224.487.7847";
const PHONE_HREF = "tel:+12244877847";
const PAYPAL_HOSTED_BUTTON_ID = "[INSERT]";

export default function BuildPage() {
  const [accepted, setAccepted] = useState(false);
  const [showTOS, setShowTOS] = useState(false);
  const [payPalLoaded, setPayPalLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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
  }, [accepted, payPalLoaded]);

  return (
    <div className="relative min-h-screen bg-[#F4F4F4] text-[#0A0A0A] font-sans antialiased selection:bg-[#0A0A0A] selection:text-white overflow-hidden">
      
      {/* ── AURORA UI GLOWS ── */}
      <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[#1B4F8A]/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[35%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#C4431B]/4 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[15%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#1B4F8A]/5 blur-[150px] pointer-events-none z-0" />
      
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

      {/* 01 MINIMAL NAV */}
      <header className="fixed top-0 left-0 z-50 w-full h-[70px] bg-white/85 backdrop-blur-md border-b border-[#DEDEDE] flex items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 flex-shrink-0">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src={logoAbstract}
                alt="ScaleSteady"
                className="object-contain mix-blend-multiply filter grayscale"
                fill
                priority
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="leading-none block font-sans text-sm font-extrabold tracking-wider uppercase text-[#0A0A0A]">
                ScaleSteady
              </span>
              <span className="font-sans block text-[7px] font-medium tracking-[0.22em] uppercase text-[#888888]">
                Pipeline Engineers
              </span>
            </div>
          </Link>
          <a
            href={PHONE_HREF}
            className="font-sans font-semibold text-xs tracking-wider uppercase bg-[#0A0A0A] hover:bg-[#2A2A2A] transition-colors duration-200 px-5 py-2.5"
            style={{ color: "#FFFFFF" }}
          >
            Call {PHONE}
          </a>
        </div>
      </header>

      {/* Main content wrapper */}
      <main className="relative pt-[70px] z-10">

        {/* 02 HERO */}
        <section className="pt-20 pb-16 border-b border-[#DEDEDE]">
          <div className="max-w-[960px] mx-auto px-6 text-center">
            <span className="inline-block px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#E8E8E8] text-[#262626] border border-black/5 mb-6">
              Pass-through cost | $0 agency fees | Full asset ownership
            </span>
            <h1 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight mb-6">
              Started in 24 hours, built in 14 days, managed for 60 days, and yours afterwards
            </h1>
            <p className="font-sans text-base md:text-lg text-[#262626] max-w-[720px] mx-auto leading-relaxed mb-8">
              $500 infrastructure cost. $0 in agency fees until you close revenue.
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-[#444444] font-semibold">
              Maximum exposure: $500. Everything else is ours to earn.
            </p>
          </div>
        </section>

        {/* 03 VALUE COMPARISON - Retail cost vs ScaleSteady */}
        <section className="py-16 max-w-[1200px] mx-auto px-6">
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-center tracking-tight text-[#0A0A0A] mb-4">
            What it really costs to start it yourself vs. ScaleSteady
          </h2>
          <p className="font-sans text-sm text-center text-[#444444] mb-12 max-w-[600px] mx-auto font-medium">
            Setting up a reliable email campaign requires a stack of software subscriptions. Here is what you would pay if you signed up for all of them yourself.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Retail Cost Bento Column */}
            <div className="lg:col-span-2 bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-white/80 hover:translate-y-[-2px] flex flex-col justify-between group">
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

              <div className="mt-8 pt-6 border-t border-[#DEDEDE] flex justify-between items-center">
                <span className="font-sans text-xs uppercase tracking-wider text-[#444444] font-bold">Estimated Retail Total</span>
                <span className="font-mono text-xl font-extrabold text-[#C4431B]">$875.00</span>
              </div>
            </div>

            {/* ScaleSteady Setup Value Bento Column */}
            <div className="bg-[#0D0D0D] text-white border border-[#222222]/80 p-8 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-[#444444] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:translate-y-[-2px] flex flex-col justify-between group">
              {/* Radial glow background spotlight */}
              <div className="absolute top-[-10%] right-[-10%] w-[200px] h-[200px] rounded-full bg-[#C4431B]/8 blur-[45px] pointer-events-none group-hover:bg-[#C4431B]/15 transition-all duration-500" />
              
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 text-[9px] font-bold tracking-widest uppercase bg-[#C4431B] text-white rounded mb-4 animate-pulse">
                  The ScaleSteady Deal
                </span>
                <h3 className="font-sans text-lg font-bold mb-4 text-white uppercase tracking-tight">Our Flat Setup Fee</h3>
                <p className="font-sans text-xs text-[#CCCCCC] leading-relaxed mb-6 font-medium">
                  If you do it yourself, you pay $875 for the raw software alone -- and you still have to build it, write the copy, and monitor the accounts without any experience. We buy these subscriptions in bulk. Your $500 setup fee goes entirely toward buying the accounts, and we configure everything, write the emails, and run the campaign for free.
                </p>
                
                <ul className="space-y-4 text-xs text-[#CCCCCC]">
                  <li className="flex items-center gap-3 transition-colors duration-300 hover:text-white group/item1">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/5 border border-white/10 group-hover/item1:border-[#C4431B] group-hover/item1:bg-[#C4431B]/10 transition-all duration-300">
                      <svg className="w-3 h-3 text-[#C4431B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">All 25 sending emails setup and warmed up</span>
                  </li>
                  <li className="flex items-center gap-3 transition-colors duration-300 hover:text-white group/item2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/5 border border-white/10 group-hover/item2:border-[#C4431B] group-hover/item2:bg-[#C4431B]/10 transition-all duration-300">
                      <svg className="w-3 h-3 text-[#C4431B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">All 5 domains registered and verified</span>
                  </li>
                  <li className="flex items-center gap-3 transition-colors duration-300 hover:text-white group/item3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/5 border border-white/10 group-hover/item3:border-[#C4431B] group-hover/item3:bg-[#C4431B]/10 transition-all duration-300">
                      <svg className="w-3 h-3 text-[#C4431B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">10,000 cleaned and verified leads</span>
                  </li>
                  <li className="flex items-center gap-3 transition-colors duration-300 hover:text-white group/item4">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/5 border border-white/10 group-hover/item4:border-[#C4431B] group-hover/item4:bg-[#C4431B]/10 transition-all duration-300">
                      <svg className="w-3 h-3 text-[#C4431B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">Technical DNS delivery filters configured</span>
                  </li>
                  <li className="flex items-center gap-3 transition-colors duration-300 hover:text-white group/item5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/5 border border-white/10 group-hover/item5:border-[#C4431B] group-hover/item5:bg-[#C4431B]/10 transition-all duration-300">
                      <svg className="w-3 h-3 text-[#C4431B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">All email sequences and copy angles written</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#222222] flex justify-between items-center relative z-10">
                <span className="font-sans text-xs uppercase tracking-wider text-[#CCCCCC] font-bold">Your Investment</span>
                <div className="text-right">
                  <span className="font-mono text-2xl font-extrabold text-white block">$500.00</span>
                  <span className="text-[10px] text-[#888888] font-mono">One-time flat cost</span>
                </div>
              </div>
            </div>

          </div>

          {/* Agency fee comparison callout */}
          <div className="mt-8 p-8 bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-md transition-all duration-500 hover:shadow-lg hover:border-white/80">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C4431B] animate-pulse" />
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
              <span className="text-base font-extrabold text-[#C4431B]">$0.00 / Mo</span>
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
        </section>

        {/* 04 WHAT'S INCLUDED - Asymmetric Bento Grid */}
        <section className="py-16 border-t border-b border-[#DEDEDE] bg-[#FAF8F6]">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-center tracking-tight text-[#0A0A0A] mb-12">
              Deliverables built directly for your business
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Bento Card 1: 20,000 Outreach Sends */}
              <div className="lg:col-span-2 bg-white/65 backdrop-blur-lg border border-white/40 shadow-sm rounded-3xl p-8 flex flex-col justify-between hover:border-black/10 hover:shadow-md transition-all duration-300">
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
                  <div><span className="text-emerald-600">●</span> SPF: Configured</div>
                  <div><span className="text-emerald-600">●</span> DKIM: Verified</div>
                  <div><span className="text-emerald-600">●</span> DMARC: Enforced</div>
                </div>
              </div>

              {/* Bento Card 2: 10,000 Verified Leads */}
              <div className="bg-white/65 backdrop-blur-lg border border-white/40 shadow-sm rounded-3xl p-8 flex flex-col justify-between hover:border-black/10 hover:shadow-md transition-all duration-300">
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
              <div className="bg-white/65 backdrop-blur-lg border border-white/40 shadow-sm rounded-3xl p-8 flex flex-col justify-between hover:border-black/10 hover:shadow-md transition-all duration-300">
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
              <div className="bg-white/65 backdrop-blur-lg border border-white/40 shadow-sm rounded-3xl p-8 flex flex-col justify-between hover:border-black/10 hover:shadow-md transition-all duration-300">
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
              <div className="lg:col-span-2 bg-white/65 backdrop-blur-lg border border-white/40 shadow-sm rounded-3xl p-8 flex flex-col justify-between hover:border-black/10 hover:shadow-md transition-all duration-300">
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
        <section className="bg-[#050505] text-white py-24 border-b border-[#1A1A1A]">
          <div className="max-w-[1200px] mx-auto px-6">
            
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#888888] block mb-2 text-center">
              Campaign Roadmap
            </span>
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-center tracking-tight mb-4">
              Onboarding & Implementation Timeline
            </h2>
            <p className="font-sans text-xs text-center text-[#CCCCCC] mb-16 max-w-[620px] mx-auto leading-relaxed">
              We continuously optimize your campaign daily to ensure we achieve the most favorable possible outcomes at the conclusion of the 60-day engagement.
            </p>

            {/* Premium Progress Bar Indicator (Horizontal Tracker) */}
            <div className="relative w-full max-w-[960px] mx-auto h-[3px] bg-[#1F1F1F] mb-16 rounded-full hidden md:block">
              {/* Glowing active line */}
              <div 
                className="absolute top-0 left-0 h-full bg-[#C4431B] shadow-[0_0_12px_rgba(196,67,27,0.7)] transition-all duration-500"
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
                        ? "bg-[#C4431B] border-[#C4431B] text-white shadow-[0_0_12px_rgba(196,67,27,0.5)] scale-110" 
                        : "bg-[#0A0A0A] border-[#2E2E2E] text-[#888888] hover:border-[#CCCCCC] hover:text-white"
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
                        ? "bg-[#111111] border-[#C4431B]/60 text-white shadow-xl translate-x-1" 
                        : "bg-transparent border-[#1F1F1F] text-[#888888] hover:border-[#2E2E2E] hover:text-white"
                    }`}
                  >
                    <span className={`font-mono text-xs px-2 py-0.5 rounded border transition-colors duration-300 ${
                      idx === activeStep 
                        ? "bg-[#C4431B]/10 border-[#C4431B]/40 text-[#C4431B]" 
                        : "bg-white/5 border-white/10 text-[#888888] group-hover/btn:text-white"
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#888888]">
                        {step.label}
                      </span>
                      <h4 className={`font-sans text-sm font-bold transition-colors duration-300 ${
                        idx === activeStep ? "text-white" : "text-[#CCCCCC] group-hover/btn:text-white"
                      }`}>
                        {step.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Column: Premium Glow Detail Panel */}
              <div className="lg:col-span-3 bg-[#0D0D0D] border border-white/10 rounded-3xl p-8 relative overflow-hidden min-h-[380px] flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-white/15">
                
                {/* Accent glow light */}
                <div className="absolute -top-12 -right-12 w-[240px] h-[240px] rounded-full bg-[#C4431B]/4 blur-[45px] pointer-events-none" />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase bg-[#C4431B]/15 text-[#C4431B] border border-[#C4431B]/30 rounded">
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
                        <span className="font-mono text-[9px] text-[#888888] uppercase tracking-wider">
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
                    <h5 className="font-mono text-[9px] text-[#888888] uppercase font-bold tracking-widest">
                      Key Deliverables & Actions:
                    </h5>
                    <ul className="space-y-2 text-xs text-[#CCCCCC] list-none p-0 m-0">
                      {timelineSteps[activeStep].bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#C4431B] font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#888888] relative z-10">
                  <span>Progress Stage: 0{activeStep + 1} / 04</span>
                  <span>ScaleSteady LLC</span>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* 06 ASSET OWNERSHIP */}
        <section className="py-20">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-[#0A0A0A] mb-4">
              Everything we build is your property
            </h2>
            <p className="font-sans text-base text-[#262626] leading-relaxed mb-6 font-medium">
              "The domains, the inboxes, the lead list, the sequences -- yours from day one."
            </p>
            <p className="font-sans text-xs text-[#444444] leading-relaxed">
              Sourced directly from <strong className="text-[#0A0A0A]">Section 3.1 of the Terms of Service</strong>. In the event of campaign termination for any reason, ScaleSteady is legally obligated to transfer all digital credentials and lead files to you in a portable format within 10 business days.
            </p>
          </div>
        </section>

        {/* 07 SCALE OR WALK */}
        <section className="bg-white py-20 border-t border-b border-[#DEDEDE] bg-[#FAF8F6]">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-center tracking-tight text-[#0A0A0A] mb-4">
              The Post-Milestone Choice
            </h2>
            <p className="font-sans text-sm text-center text-[#444444] mb-12 font-medium">
              You make this decision after your campaign has generated $5,000 in cleared revenue. Not before.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Walk Card */}
              <div className="bg-white border border-[#DEDEDE] p-8 flex flex-col justify-between rounded-2xl hover:shadow-sm transition-all duration-300">
                <div>
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#E8E8E8] text-[#262626] mb-4">
                    Option B
                  </span>
                  <h3 className="font-sans text-xl font-bold text-[#0A0A0A] mb-3">Walk and Keep</h3>
                  <p className="font-sans text-sm text-[#262626] leading-relaxed mb-6">
                    Conclude the campaign and retain complete ownership of the domains, warmed email inboxes, leads list, and copy sequences. You owe ScaleSteady nothing else.
                  </p>
                </div>
                <p className="font-sans text-xs font-semibold text-[#666666]">$0 Ongoing Retainer</p>
              </div>

              {/* Scale Card */}
              <div className="bg-[#111111] text-white border border-[#1A1A1A] p-8 flex flex-col justify-between rounded-2xl hover:shadow-md transition-all duration-300">
                <div>
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#C4431B] text-white mb-4">
                    Option A
                  </span>
                  <h3 className="font-sans text-xl font-bold mb-3 text-white">Scale Outreach</h3>
                  <p className="font-sans text-sm text-[#CCCCCC] leading-relaxed mb-6">
                    Retain ScaleSteady to actively manage, optimize, scale, and monitor your outbound campaign. Includes database refreshes, continuous copy sequencing, and inbox deliverability management.
                  </p>
                </div>
                <p className="font-sans text-xs font-semibold text-[#CCCCCC]">$699 / Month Retainer</p>
              </div>

            </div>
          </div>
        </section>

        {/* 08 PLAIN-ENGLISH TOS SUMMARY */}
        <section className="py-20">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-center tracking-tight text-[#0A0A0A] mb-4">
              Terms of Service Plain-English Summary
            </h2>
            <p className="font-sans text-xs text-center text-[#444444] mb-12 font-medium">
              Every commitment we make is documented in standard, readable contract clauses.
            </p>

            <div className="space-y-6 mb-10">
              <div className="bg-white/70 backdrop-blur-md border border-white/50 p-5 rounded-xl shadow-sm">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Clause 1 | What We Deliver</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  We build your outbound infrastructure, source a minimum of 10,000 verified leads, design campaign angles, and manage active sends (§1.3).
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-white/50 p-5 rounded-xl shadow-sm">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Clause 2 | Setup Investment</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  You remit a one-time setup fee of $500. This is pass-through cost passed directly to registrars and platforms; we retain zero markup (§2.1).
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-white/50 p-5 rounded-xl shadow-sm">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Clause 3 | Agency Fee Deferral</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  We charge $0 in agency fees or copywriting labor during the 60-day performance period, absorbing all delivery overhead (§2.3).
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-white/50 p-5 rounded-xl shadow-sm">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Clause 4 | Asset Retention</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  All domains, warmed inboxes, data lists, and campaign materials are your sole assets from the date of purchase (§3.1).
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-white/50 p-5 rounded-xl shadow-sm">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Clause 5 | Scale or Walk Option</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  Once the $5,000 revenue milestone is achieved, you can choose to continue campaign management with us or walk away with all assets (§9.1).
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-white/50 p-5 rounded-xl shadow-sm">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] font-semibold block mb-1">Clause 6 | Risk Limitation</span>
                <p className="font-sans text-sm text-[#262626] leading-relaxed">
                  Your aggregate financial exposure is capped at the initial $500 infrastructure fee. No performance milestone means no labor charge (§7.3).
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
              <div className="mt-8 border border-[#DEDEDE] bg-white p-6 max-h-[480px] overflow-y-scroll text-xs text-[#262626] font-mono leading-relaxed space-y-4 whitespace-pre-wrap rounded-xl shadow-inner">
                <h3 className="font-sans font-bold text-sm text-[#0A0A0A] uppercase tracking-tight">ScaleSteady LLC -- Terms of Service Agreement</h3>
                <p><strong>Effective Date:</strong> The date of the Client's execution as indicated in the signature block below.</p>
                <p><strong>Entity:</strong> ScaleSteady LLC ("ScaleSteady," "we," "us," or "the Company")</p>
                <p><strong>Governing Jurisdiction:</strong> To be confirmed by legal counsel at execution.</p>
                <hr className="border-[#DEDEDE] my-4" />
                <p>This agreement governs the outbound campaign setup and deployment services provided by ScaleSteady LLC.</p>
                
                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 1 -- Scope of Services</h4>
                <p>1.1 Deliverables: ScaleSteady will build the outbound email infrastructure, setup sending domains, warm inboxes, verify lists, write copy angles, and coordinate booked calls on behalf of the client.</p>
                <p>1.2 Campaign Scope: Minimum 20,000 sent emails, 10,000 verified leads, 2 distinct marketing angles, and 3 sequence steps, managed under sole technical control for the 60-day campaign.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 2 -- Cost Model & Labor Deferral</h4>
                <p>2.1 Infrastructure investment: A flat, one-time $500 setup fee is paid to registrars and data servers. ScaleSteady operates with zero margin or markup on this infrastructure component.</p>
                <p>2.2 Fee Deferral: ScaleSteady waives all labor, setup, copywriting, and inbox monitoring fees during the initial campaign period. ScaleSteady is compensated only after the Revenue Milestone is met.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 3 -- Asset Ownership</h4>
                <p>3.1 Full Ownership: All domains, warmed mailboxes, verified target leads, and copy templates belong exclusively to the client from the time of setup. Assets will be transferred within 10 days of end of service.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 6 -- Revenue Milestone</h4>
                <p>6.1 Milestone definition: $5,000 in cleared, attributed revenue closed by the client from leads sourced through this campaign, before the conclusion of the 60-day performance period.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 7 -- Downside Protection</h4>
                <p>7.1 Out of Scope: If the milestone is not hit in 60 days, client keeps 100% of the domains, inboxes, and leads. ScaleSteady waives all labor claims. Max client exposure is capped at the $500 setup fee.</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 9 -- Post-Milestone Election</h4>
                <p>9.1 Options: Client chooses Option A (Scale campaign management at $699/month) or Option B (Walk with assets and owe nothing further).</p>

                <h4 className="font-sans font-bold text-[#0A0A0A] uppercase mt-4">Section 13 -- Limitation of Liability</h4>
                <p>13.1 Cap: ScaleSteady's total liability under this agreement is limited to the $500 infrastructure fee paid by the client.</p>
              </div>
            )}

          </div>
        </section>

        {/* 09 ACCEPTANCE ZONE - Glassmorphic Bento Checkout Panel */}
        <section ref={acceptanceRef} id="acceptance" className="py-16">
          <div className="max-w-[720px] mx-auto px-6">
            
            <div className="bg-white/85 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-3xl shadow-lg relative z-10">
              
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#444444] block mb-2 text-center">
                Review and Accept Partnership Terms
              </span>
              <h2 className="font-sans text-2xl font-extrabold text-center text-[#0A0A0A] mb-8">
                Outbound Partnership Split
              </h2>

              {/* Defined split terms banner */}
              <div className="mb-6 p-4 bg-[#F4F4F4] border border-[#DEDEDE] text-center rounded-xl">
                <span className="font-sans text-xs font-semibold text-[#0A0A0A] block">
                  Campaign Scope: $500 Setup Investment + $0 Labor Fee
                </span>
                <span className="font-sans text-[11px] text-[#444444] mt-1 block">
                  ScaleSteady labor fees are 100% deferred until your campaign closes $5,000 in new revenue.
                </span>
              </div>

              {/* Partnership Split Grid with thin dividers */}
              <div className="grid grid-cols-2 gap-6 border-b border-[#DEDEDE] pb-8 mb-6">
                <div>
                  <h4 className="font-sans text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-3">ScaleSteady Delivers</h4>
                  <ul className="space-y-2 text-xs text-[#262626] list-none p-0 m-0 font-medium">
                    <li className="flex items-center gap-2 text-emerald-600"><span>✓</span> <span className="text-[#262626]">Outbound infrastructure build</span></li>
                    <li className="flex items-center gap-2 text-emerald-600"><span>✓</span> <span className="text-[#262626]">10,000+ verified target leads</span></li>
                    <li className="flex items-center gap-2 text-emerald-600"><span>✓</span> <span className="text-[#262626]">20,000+ campaign sends</span></li>
                    <li className="flex items-center gap-2 text-emerald-600"><span>✓</span> <span className="text-[#262626]">Active inbox monitoring</span></li>
                    <li className="flex items-center gap-2 text-emerald-600"><span>✓</span> <span className="text-[#262626]">Meeting coordination</span></li>
                  </ul>
                </div>
                <div className="border-l border-[#DEDEDE] pl-6">
                  <h4 className="font-sans text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-3">You Commit To</h4>
                  <ul className="space-y-2 text-xs text-[#262626] list-none p-0 m-0 font-medium">
                    <li className="flex items-center gap-2 text-[#444444]"><span>→</span> <span className="text-[#262626]">Approve message copy</span></li>
                    <li className="flex items-center gap-2 text-[#444444]"><span>→</span> <span className="text-[#262626]">Respond to warm leads (48h)</span></li>
                    <li className="flex items-center gap-2 text-[#444444]"><span>→</span> <span className="text-[#262626]">Monthly campaign reviews</span></li>
                    <li className="flex items-center gap-2 text-[#444444]"><span>→</span> <span className="text-[#262626]">Report milestone revenue</span></li>
                    <li className="flex items-center gap-2 text-[#444444]"><span>→</span> <span className="text-[#262626]">Close outbound leads</span></li>
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
                    className="mt-1 flex-shrink-0 cursor-pointer accent-[#0A0A0A]"
                  />
                  <span className="font-sans text-xs text-[#262626] leading-relaxed font-medium">
                    I have read and agree to the{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTOS(true);
                      }}
                      className="underline text-[#0A0A0A] font-extrabold hover:text-[#444444]"
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
      <footer className="bg-[#111111] text-white border-t border-[#262626] py-16 relative z-25">
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
              <p className="mt-1">Illinois Registered LLC</p>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
