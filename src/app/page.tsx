"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CountUp from "@/components/client/CountUp";
import AnimateOnScroll from "@/components/client/AnimateOnScroll";
import AnimatedPhone from "@/components/client/AnimatedPhone";

const SERVICES = [
  {
    title: "Outbound Infrastructure",
    desc: "50+ dedicated sending domains. Programmatic SPF, DKIM, DMARC. Warmed, monitored, and rotated so your deliverability is a predictable outcome, not a daily gamble.",
  },
  {
    title: "Pipeline Automation",
    desc: "Positive replies route straight into your CRM and trigger booking sequences automatically. The gap between interest and a call on your calendar closes to zero.",
  },
  {
    title: "Intent-Based Targeting",
    desc: "We pull real-time buying signals from permit filings, hiring activity, and funding announcements, and build a live list of buyers who entered the market this week. Not last quarter.",
  },
];

const CLIENTS = ["Tarrant Mechanical", "Aesthetics Clinic Group", "Apex Leasing", "Floor Contracting"];

// ── OUTBOUND DASHBOARD REMOVED ──

// ── OUTBOUND INFRASTRUCTURE CALCULATOR ──
function OutboundCalculator() {
  const [acv, setAcv] = useState(5000);
  const [targetRevenue, setTargetRevenue] = useState(25000);

  const dealsNeeded = Math.ceil(targetRevenue / acv);
  const repliesNeeded = dealsNeeded * 10;
  const prospectsContacted = repliesNeeded * 100;
  const dailyVolume = Math.ceil(prospectsContacted / 20); // 20 working days
  const inboxesNeeded = Math.ceil(dailyVolume / 25); // 25 emails/day/inbox limit
  const domainsNeeded = Math.ceil(inboxesNeeded / 2); // 2 inboxes per domain
  const annualRoi = Math.round((targetRevenue * 12) / 500);

  return (
    <div className="calculator-card p-6 md:p-10 border border-[#1F2937] my-12" style={{ background: "var(--bg-secondary)" }}>
      <h3 className="font-serif text-2xl md:text-3xl text-white mb-6">Calculate Your Outbound Pipeline Math</h3>
      <p className="font-sans text-[13.5px] text-gray-400 mb-8 max-w-xl leading-relaxed">
        Outbound success is a physical floor, not a creative lottery. Drag the sliders to see the exact infrastructure required to support your monthly client acquisition targets safely.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Sliders Control Panel */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex justify-between font-sans text-xs text-gray-300 mb-2">
              <span>Average Contract Value (ACV)</span>
              <span className="font-semibold text-white">${acv.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={acv}
              onChange={(e) => setAcv(Number(e.target.value))}
              className="calculator-slider"
            />
          </div>

          <div>
            <div className="flex justify-between font-sans text-xs text-gray-300 mb-2">
              <span>Target Monthly Revenue</span>
              <span className="font-semibold text-white">${targetRevenue.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="100000"
              step="1000"
              value={targetRevenue}
              onChange={(e) => setTargetRevenue(Number(e.target.value))}
              className="calculator-slider"
            />
          </div>
        </div>

        {/* Live Output Panel */}
        <div className="grid grid-cols-2 gap-4 border-l border-[#1F2937] pl-4 md:pl-8">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400">Monthly Deals Needed</span>
            <span className="text-xl font-bold text-white mt-1">{dealsNeeded}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400">Target Prospects / Mo</span>
            <span className="text-xl font-bold text-[#C4431B] mt-1">{prospectsContacted.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400">Dedicated Domains Needed</span>
            <span className="text-xl font-bold text-white mt-1">{domainsNeeded}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400">Estimated Annual ROI</span>
            <span className="text-xl font-bold text-green-400 mt-1">{annualRoi.toLocaleString()}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden pb-16 lg:pb-0" style={{ background: "var(--bg-primary)" }}>

      {/* ── HERO -- Full-bleed cinematic ── */}
      <section
        className="hero-section relative w-full -mt-[80px]"
        style={{ height: "clamp(620px, 85svh, 95svh)", minHeight: "620px", overflow: "hidden" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/hero-team.jpeg"
            alt="ScaleSteady outbound infrastructure team"
            fill
            priority
            unoptimized
            className="object-cover opacity-20"
            style={{ objectPosition: "60% center" }}
          />
          {/* Gradients */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,15,18,0.96) 0%, rgba(20,23,28,0.92) 55%, rgba(13,15,18,0.96) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div
          className="relative h-full flex flex-col justify-center"
          style={{ paddingTop: "100px" }}
        >
          <div
            className="mx-auto w-full px-8 sm:px-12 lg:px-24"
            style={{ maxWidth: "1280px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              
              {/* Left Column -- Copy and CTAs */}
              <div className="lg:col-span-7">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "clamp(16px, 2.5vw, 28px)",
                  }}
                >
                  <div style={{ width: "28px", height: "2px", background: "#C4431B", flexShrink: 0 }} />
                  <span
                    className="font-sans"
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#C4431B",
                    }}
                  >
                    Outbound Infrastructure for B2B Service Businesses
                  </span>
                </div>

                <h1
                  className="font-serif font-normal"
                  style={{
                    fontSize: "clamp(48px, 6.5vw, 92px)",
                    lineHeight: "1.06",
                    letterSpacing: "-0.03em",
                    color: "#FAF8F6",
                    maxWidth: "800px",
                  }}
                >
                  <span className="hero-word block" style={{ animationDelay: "0s" }}>
                    If you&apos;re here,
                  </span>
                  <span
                    className="hero-word block italic"
                    style={{ animationDelay: "0.12s", color: "#C4431B" }}
                  >
                    the email worked.
                  </span>
                </h1>

                <p
                  className="font-sans hero-body-copy"
                  style={{
                    fontSize: "clamp(15px, 1.5vw, 18px)",
                    lineHeight: "1.65",
                    color: "var(--ink-secondary)",
                    maxWidth: "520px",
                    marginTop: "clamp(16px, 2.5vw, 24px)",
                  }}
                >
                  We build this exact high-deliverability outbound engine for your sales team. At cost, with $0 agency fees until you collect $5,000 in new B2B client revenue.
                </p>

                {/* Dual CTA */}
                <div
                  className="hero-cta-wrap flex flex-col sm:flex-row items-start sm:items-center gap-6"
                  style={{ marginTop: "clamp(24px, 3.5vw, 40px)" }}
                >
                  <Link
                    href="/contact"
                    className="hero-cta-btn inline-flex items-center justify-center font-sans font-semibold transition-all duration-300 hover:bg-[#2660A8]"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      background: "#1B4F8A",
                      padding: "18px 40px",
                      borderRadius: "0px",
                      flexShrink: 0,
                    }}
                  >
                    Run an outbound audit
                  </Link>

                  <a
                    href="#results"
                    className="font-sans text-[12px] font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-wider underline decoration-dotted"
                  >
                    See Deliverability Stats (No Opt-In)
                  </a>
                </div>
              </div>

              {/* Right Column -- Animated Phone */}
              <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end">
                <AnimatedPhone />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── THE OUTBOUND TRUTHS ── */}
      <section id="approach" style={{ background: "var(--bg-secondary)", padding: "clamp(64px, 10vw, 120px) 0", borderTop: "1px solid var(--ink-border)", borderBottom: "1px solid var(--ink-border)" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "800px" }}>
          
          <div className="focus-group flex flex-col gap-8 border-l-[3px] pl-8 sm:pl-10" style={{ borderColor: "#C4431B" }}>
            
            <p
              className="font-sans text-white"
              style={{
                fontSize: "clamp(24px, 3.2vw, 38px)",
                lineHeight: "1.3",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Outbound is the single most predictable way to acquire clients -- because you control the <strong style={{ color: "#C4431B", fontWeight: 600 }}>volume, the targeting, and the math</strong>.
            </p>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(15px, 1.6vw, 18px)",
                lineHeight: "1.65",
                color: "var(--ink-body)",
                fontWeight: 400,
              }}
            >
              Networking is slow. Cold calling is unsexy. <strong className="text-white font-semibold">Automation scales</strong>.
            </p>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(15px, 1.6vw, 18px)",
                lineHeight: "1.65",
                color: "var(--ink-body)",
                fontWeight: 400,
              }}
            >
              The math is clear: a 1% response on 50,000 targeted emails delivers 500 active conversations. That is your <strong className="text-white font-semibold">physical floor</strong>.
            </p>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(16px, 2vw, 22px)",
                lineHeight: "1.45",
                color: "var(--ink-primary)",
                fontWeight: 600,
                marginTop: "20px",
              }}
            >
              The technology is ready -- the only question is whether you build this asset now, or <strong style={{ color: "#C4431B", fontWeight: 600 }}>wait until the market standard forces you to catch up.</strong>
            </p>

          </div>
        </div>
      </section>

      {/* ── IDENTITY SHIFT ── */}
      <section style={{ background: "var(--bg-primary)", padding: "clamp(72px, 8vw, 110px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <div className="mb-16">
            <p
              className="font-serif font-normal"
              style={{
                fontSize: "clamp(22px, 2.8vw, 36px)",
                lineHeight: "1.35",
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "-0.02em",
                maxWidth: "820px",
              }}
            >
              There&apos;s a gap between the outreach you know you should be doing and what you&apos;re actually doing. Every month that gap costs you clients{" "}
              <span style={{ color: "#C4431B" }}>you&apos;ll never know you lost.</span>
            </p>
            <p
              className="font-serif font-normal"
              style={{
                fontSize: "clamp(22px, 2.8vw, 36px)",
                lineHeight: "1.35",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                fontWeight: 600,
                marginTop: "20px",
              }}
            >
              We close it.
            </p>
          </div>

          {/* Interactive Toggle / Chart Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left: Referral-dependent */}
            <div className="p-8 xl:p-12 flex flex-col" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--ink-border)" }}>
              <div className="mb-8 flex items-center gap-3">
                <div style={{ width: "8px", height: "8px", background: "rgba(255,255,255,0.15)", borderRadius: "50%" }} />
                <span className="font-sans font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.3)" }}>Referral-dependent</span>
              </div>

              <ul className="flex flex-col gap-7 font-sans" style={{ fontSize: "14.5px" }}>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.2)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "var(--ink-secondary)" }}>
                    Revenue swings every month. <strong style={{ color: "#FFFFFF" }}>You can&apos;t forecast, you can only react.</strong> Feast, then famine, repeat.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.2)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "var(--ink-secondary)" }}>
                    Growth depends on an algorithm, an ad platform, or an agency contract. <strong style={{ color: "#FFFFFF" }}>Any one of those changes, and your pipeline dries up overnight.</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.2)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "var(--ink-secondary)" }}>
                    You are the engine. Slow down, and <strong style={{ color: "#FFFFFF" }}>everything slows down.</strong> Scaling means working more, not smarter.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.2)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "var(--ink-secondary)" }}>
                    Paying <strong style={{ color: "#FFFFFF" }}>$45--$70 per ad click
                    <span className="relative inline-block ml-1 group/tip cursor-help font-mono text-[10px] text-[rgba(255,255,255,0.2)] hover:text-white">[?]
                      <span className="absolute bottom-full left-0 mb-2 w-64 bg-[#14171C] text-white text-[11px] p-3 border border-[#1F2937] leading-normal font-sans font-normal normal-case rounded-none opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity duration-200 z-30 shadow-lg">
                        <strong>Source:</strong> ClickPatrol B2B Index: avg B2B search CPC $30--$70. LanderLab: 70--90% bounce on B2B landing pages.
                      </span>
                    </span></strong> to rent attention. 8 in 10 leave. You own nothing.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right: System-powered -- Slate card */}
            <div className="p-8 xl:p-12 flex flex-col" style={{ background: "var(--bg-secondary)", borderTop: "4px solid #C4431B", borderLeft: "1px solid var(--ink-border)", borderRight: "1px solid var(--ink-border)", borderBottom: "1px solid var(--ink-border)" }}>
              <div className="mb-8 flex items-center gap-3">
                <div style={{ width: "8px", height: "8px", background: "#C4431B", borderRadius: "50%" }} />
                <span className="font-sans font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#C4431B" }}>System-powered</span>
              </div>

              <ul className="flex flex-col gap-7 font-sans mb-8" style={{ fontSize: "14.5px" }}>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#C4431B" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "var(--ink-body)" }}>
                    <strong style={{ color: "#FFFFFF" }}>Predictable pipeline.</strong> You know how many conversations you&apos;ll have next month before the month starts.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#C4431B" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "var(--ink-body)" }}>
                    <strong style={{ color: "#FFFFFF" }}>Zero platform dependency.</strong> No algorithm can kill your growth. Email is a direct line -- you own it.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#C4431B" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "var(--ink-body)" }}>
                    <strong style={{ color: "#FFFFFF" }}>$0.04 per qualified contact
                    <span className="relative inline-block ml-1 group/tip cursor-help font-mono text-[10px] text-gray-500 hover:text-white">[?]
                      <span className="absolute bottom-full left-0 mb-2 w-64 bg-[#14171C] text-white text-[11px] p-3 border border-[#1F2937] leading-normal font-sans font-normal normal-case rounded-none opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity duration-200 z-30 shadow-lg">
                        <strong>Source:</strong> Smartlead & Winnr: amortized mailbox cost $120/mo for 10k sends. Validated B2B contact scrape at $0.025/record.
                      </span>
                    </span></strong> -- straight to the decision-maker. No auction. No middleman.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#C4431B" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "var(--ink-body)" }}>
                    <strong style={{ color: "#FFFFFF" }}>The infrastructure lives in your business.</strong> Not in our account. Not in Google&apos;s. When we&apos;re done, you own it.
                  </span>
                </li>
              </ul>

              <div className="mt-auto pt-5" style={{ borderTop: "1px solid var(--ink-border)" }}>
                <p className="font-sans text-[11px] text-gray-500 leading-relaxed">
                  Data: <strong>ClickPatrol 2026</strong> · <strong>GlockApps 2026</strong> · <strong>Smartlead 2026</strong>
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── DEFINITIVE RESULTS ── */}
      <section id="results" style={{ background: "var(--bg-secondary)", padding: "clamp(72px, 8vw, 112px) 0", borderTop: "1px solid var(--ink-border)", borderBottom: "1px solid var(--ink-border)" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <p
            className="font-serif"
            style={{
              fontSize: "clamp(24px, 3vw, 40px)",
              lineHeight: "1.15",
              letterSpacing: "-0.02em",
              color: "#C4431B",
              fontWeight: 400,
              maxWidth: "640px",
            }}
          >
            The worst thing that can happen in 60 days:
          </p>

          <p
            className="font-sans"
            style={{
              fontSize: "13px",
              lineHeight: "1.65",
              color: "var(--ink-secondary)",
              marginTop: "clamp(20px, 2.5vw, 32px)",
              maxWidth: "520px",
            }}
          >
            97.6% of our emails reach the primary inbox -- not promotions, not spam.{" "}
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--ink-muted)" }}>GlockApps 2026</span>
          </p>

          {/* Dynamic counter */}
          <p
            className="font-serif font-bold text-white"
            style={{
              fontSize: "clamp(56px, 10vw, 140px)",
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
              marginTop: "clamp(16px, 2vw, 28px)",
            }}
          >
            30,000<span style={{ color: "#C4431B" }}>+</span>
          </p>

          <p
            className="font-sans"
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              lineHeight: "1.65",
              color: "var(--ink-secondary)",
              maxWidth: "520px",
              marginTop: "16px",
            }}
          >
            people in your city, your county, your service area hear your name for the first time.{" "}
            <strong style={{ color: "#FFFFFF", fontWeight: 500 }}>
              No door knock. No business card. No cold call.
            </strong>
          </p>

          {/* Infrastructure Breakdown Details */}
          <div style={{ marginTop: "clamp(48px, 5vw, 72px)", borderTop: "1px solid var(--ink-border)", paddingTop: "clamp(36px, 4vw, 56px)" }}>

            <p
              className="font-sans text-gray-300"
              style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: "1.75",
                maxWidth: "640px",
                marginBottom: "clamp(28px, 3vw, 40px)",
              }}
            >
              And you <strong className="text-white">keep everything</strong> we build. The accounts, the lists, the sequences. They belong to you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6" style={{ maxWidth: "740px" }}>
              {[
                { label: "Sending domains", detail: "Warmed, authenticated, DMARC-compliant -- registered in your name." },
                { label: "Email inboxes", detail: "Trusted accounts with established sender reputation. Ready for any campaign you run." },
                { label: "Verified lead list", detail: "Every contact in your TAM, cleaned and validated. Your market, mapped." },
                { label: "Outreach sequences", detail: "Battle-tested copy and cadences. Use them again, modify them, hand them to your team." },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div className="status-chip mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-sans text-white text-[14.5px] font-semibold mb-1">
                      {item.label}
                    </p>
                    <p className="font-sans text-[13px] leading-relaxed text-gray-400">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(14px, 1.4vw, 16px)",
                lineHeight: "1.7",
                color: "var(--ink-secondary)",
                maxWidth: "560px",
                marginTop: "clamp(36px, 4vw, 52px)",
              }}
            >
              Cancel anytime and keep everything we built. That is the <strong className="text-white">floor</strong> -- not a projection.
            </p>

          </div>

          {/* Embedded Calculator */}
          <OutboundCalculator />

        </div>
      </section>

      {/* ── THE OFFER ── */}
      <section id="pricing" style={{ background: "var(--bg-primary)", padding: "clamp(80px, 11vw, 140px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "780px" }}>

          <p
            className="font-sans font-semibold uppercase mb-6"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B" }}
          >
            How We Align Our Interests
          </p>

          <h2
            className="font-serif font-bold text-white text-3xl md:text-5xl"
            style={{ lineHeight: "1.15", maxWidth: "700px", marginBottom: "clamp(20px, 3vw, 32px)" }}
          >
            We build your cold email system at cost -- and we don&apos;t bill for our labor until you collect{" "}
            <span style={{ color: "#C4431B" }}>$5,000.</span>
          </h2>

          <p
            className="font-sans"
            style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.8, color: "var(--ink-body)", maxWidth: "640px", marginBottom: "clamp(48px, 6vw, 72px)" }}
          >
            Most B2B agencies charge high upfront retainers because they need to cover overhead regardless of your results. We are a lean, 5-person team and we only take on clients where we are certain our campaigns will perform. We cover our own payroll upfront because we know that once you collect your first $5,000 from our pipeline, you will want us to keep running it.
          </p>

          <div className="flex flex-col gap-6">

            {/* Step 1 -- With Invoice Tooltip */}
            <div className="flex items-start gap-4">
              <span className="font-display font-bold text-[#C4431B] text-sm flex-shrink-0 mt-1 w-6">01</span>
              <p className="font-sans text-gray-300 text-[15.5px] leading-relaxed">
                <strong className="text-white">You cover the raw infrastructure costs -- $500.</strong>{" "}
                This goes entirely to third-party registrars and data providers for your dedicated domains, warmed inboxes, and a verified lead list. We do not pocket a single dollar of this. You own it from day one.
                <span className="tooltip-container ml-1.5 text-[#C4431B] font-semibold underline decoration-dotted">
                  [View Invoice Breakdown]
                  <span className="tooltip-text">
                    <span className="block font-semibold mb-2 border-b border-gray-700 pb-1">Raw Cost Breakdown:</span>
                    <span className="flex justify-between text-[11px] mb-1">
                      <span>30x Secondary Domains:</span>
                      <span className="font-mono text-white">$360</span>
                    </span>
                    <span className="flex justify-between text-[11px] mb-1">
                      <span>30x Workspace Accounts:</span>
                      <span className="font-mono text-white">$180</span>
                    </span>
                    <span className="flex justify-between text-[11px] mb-1">
                      <span>Warmup Pools / GlockApps:</span>
                      <span className="font-mono text-white">$60</span>
                    </span>
                    <span className="flex justify-between text-[11px] font-semibold border-t border-gray-700 pt-1 mt-1 text-[#C4431B]">
                      <span>Raw Infrastructure Cost:</span>
                      <span className="font-mono text-white">$600</span>
                    </span>
                    <span className="block text-[9px] text-gray-400 mt-2">ScaleSteady absorbs the remaining $100 + all setups.</span>
                  </span>
                </span>
              </p>
            </div>

            <div style={{ width: "100%", height: "1px", background: "var(--ink-border)" }} />

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <span className="font-display font-bold text-[#C4431B] text-sm flex-shrink-0 mt-1 w-6">02</span>
              <p className="font-sans text-gray-300 text-[15.5px] leading-relaxed">
                <strong className="text-white">We build and manage your campaigns for $0 in agency fees.</strong>{" "}
                Our team handles all copywriting, technical deliverability, and daily optimization. We absorb our labor costs completely until our outbound system generates $5,000 in cleared revenue for your business.
              </p>
            </div>

            <div style={{ width: "100%", height: "1px", background: "var(--ink-border)" }} />

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <span className="font-display font-bold text-[#C4431B] text-sm flex-shrink-0 mt-1 w-6">03</span>
              <div className="font-sans text-gray-300 text-[15.5px] leading-relaxed">
                <p style={{ marginBottom: "12px" }}>
                  <strong className="text-white">Once your bank account reflects $5,000 in new revenue, you choose how to proceed.</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-3">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4431B]" />
                    <span><strong className="text-white">Scale</strong> -- $699/mo, we keep managing and optimizing your pipeline</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span><strong className="text-white">Walk</strong> -- keep all infrastructure and 100% of the profits</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Guarantee Card Box */}
          <div className="guarantee-box mt-16 p-8 md:p-12">
            <p
              className="font-serif italic text-white text-2xl md:text-3xl text-center"
              style={{ lineHeight: 1.25 }}
            >
              Our business only makes sense if we perform for yours.
            </p>
            <p className="font-sans mx-auto mt-4 text-center text-gray-400 text-sm max-w-lg leading-relaxed">
              If we do not generate the $5,000 in new revenue, you keep the entire domain infrastructure and database. We write off our labor as a cost of doing business. You owe us nothing.
            </p>
            <div className="flex flex-col items-center mt-8">
              <Link
                href="/contact"
                className="hero-cta-btn inline-flex items-center justify-center font-sans font-semibold transition-all duration-300 hover:bg-[#2660A8]"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#1B4F8A",
                  padding: "18px 48px",
                  borderRadius: "0px",
                }}
              >
                Book a consultation
              </Link>
              <p className="font-sans mt-4 text-xs text-gray-500">
                15 minutes. No commitment. No pitch deck.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="results" style={{ background: "var(--bg-secondary)", padding: "clamp(64px, 8vw, 110px) 0", borderTop: "1px solid var(--ink-border)", borderBottom: "1px solid var(--ink-border)" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <p
            className="font-sans font-semibold uppercase mb-16 text-[#C4431B]"
            style={{ fontSize: "11px", letterSpacing: "0.14em" }}
          >
            System Verification &amp; Client Case Studies
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {/* Testimonial 1 */}
            <div
              className="flex flex-col p-6 border border-[#1F2937] bg-black/20"
              style={{ minHeight: "360px" }}
            >
              <span className="font-sans font-semibold uppercase text-xs text-[#C4431B] mb-2 tracking-wider">
                Deliverables
              </span>
              <span className="font-serif font-bold text-white text-4xl md:text-5xl">
                15,000
              </span>
              <p className="font-sans text-xs text-gray-400 mt-2 mb-6">
                emails sent per month, exactly as quoted
              </p>
              <div style={{ width: "32px", height: "2px", background: "#C4431B", marginBottom: "20px" }} />
              <p className="font-serif italic text-gray-300 text-[14.5px] leading-relaxed mb-auto">
                &ldquo;Honestly I almost didn&apos;t sign up. I&apos;ve been burned by marketing guys before. But these guys showed me the price, told me exactly how many emails go out, and gave me a timeline. Fifteen thousand a month. Every Monday I get a report and the numbers match. No surprises, no upsells. Just organized people who do what they said they&apos;d do.&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #1F2937", marginTop: "24px", paddingTop: "16px" }}>
                <p className="font-sans text-[10.5px] tracking-wider text-gray-500 uppercase font-semibold">
                  Michael Turrentine, VP at Tarrant Mechanical, SE Michigan
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              className="flex flex-col p-6 border border-[#1F2937] bg-black/20"
              style={{ minHeight: "360px" }}
            >
              <span className="font-sans font-semibold uppercase text-xs text-[#C4431B] mb-2 tracking-wider">
                Closed Deal
              </span>
              <span className="font-serif font-bold text-white text-4xl md:text-5xl">
                $12,000
              </span>
              <p className="font-sans text-xs text-gray-400 mt-2 mb-6">
                first contract closed, month two
              </p>
              <div style={{ width: "32px", height: "2px", background: "#C4431B", marginBottom: "20px" }} />
              <p className="font-serif italic text-gray-300 text-[14.5px] leading-relaxed mb-auto">
                &ldquo;I figured it was another agency that&apos;d take my money and disappear. Second month a reply came in, turned into a twelve thousand dollar re-roof. One job. Paid for the whole year and then some. I don&apos;t even think about it anymore, it just runs in the background and leads show up.&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #1F2937", marginTop: "24px", paddingTop: "16px" }}>
                <p className="font-sans text-[10.5px] tracking-wider text-gray-500 uppercase font-semibold">
                  Anthony Rossi, Rossi &amp; Sons Contracting, Western PA
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              className="flex flex-col p-6 border border-[#1F2937] bg-black/20"
              style={{ minHeight: "360px" }}
            >
              <span className="font-sans font-semibold uppercase text-xs text-[#C4431B] mb-2 tracking-wider">
                Communication
              </span>
              <span className="font-serif font-bold text-white text-4xl md:text-5xl">
                48 Hours
              </span>
              <p className="font-sans text-xs text-gray-400 mt-2 mb-6">
                setup timeline to active domain warmups
              </p>
              <div style={{ width: "32px", height: "2px", background: "#C4431B", marginBottom: "20px" }} />
              <p className="font-serif italic text-gray-300 text-[14.5px] leading-relaxed mb-auto">
                &ldquo;I run a small practice, I don&apos;t have time to chase vendors. Signed up on Monday, by Wednesday they had everything built. Two weeks later emails were going out. Every Monday I get a quick update -- who replied, what they said, what&apos;s next. Short, clear, no fluff. I have never had to follow up with them once.&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #1F2937", marginTop: "24px", paddingTop: "16px" }}>
                <p className="font-sans text-[10.5px] tracking-wider text-gray-500 uppercase font-semibold">
                  Dr. Sarah Landes, Landes Chiropractic Practice, NW Ohio
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" style={{ background: "var(--bg-primary)", padding: "clamp(72px, 8vw, 96px) 0 clamp(56px, 6vw, 80px)" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <p
            className="font-sans font-semibold uppercase text-[#C4431B]"
            style={{ fontSize: "11px", letterSpacing: "0.14em", marginBottom: "clamp(32px, 4vw, 48px)" }}
          >
            We are ScaleSteady
          </p>

          <div style={{ maxWidth: "680px" }}>
            <p
              className="font-sans"
              style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.8", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}
            >
              Hiring us means working with a small team of 5 passionate, hands-on people -- which means your campaign will be run inside a strict, battle-tested workflow. The same one we use on our own outreach. The same one that has been booking meetings for every client we have worked with.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "clamp(13px, 1.4vw, 16px)", lineHeight: "1.85", color: "rgba(255,255,255,0.6)", marginTop: "clamp(16px, 2vw, 22px)" }}
            >
              The same people who read your replies every Tuesday. Research your market. Compose your emails. Warm your domains. Rewrite your subject line when it underperforms. All five of us. Every time.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "clamp(13px, 1.4vw, 16px)", lineHeight: "1.85", color: "rgba(255,255,255,0.6)", marginTop: "clamp(14px, 1.8vw, 20px)" }}
            >
              No account manager. No junior who inherited your file. No one who says &ldquo;let me loop in the team.&rdquo;
            </p>

            {/* Split quote */}
            <div
              style={{
                borderLeft: "3px solid #C4431B",
                paddingLeft: "clamp(20px, 2.5vw, 28px)",
                marginTop: "clamp(40px, 5vw, 64px)",
              }}
            >
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(22px, 3vw, 42px)",
                  lineHeight: "1.25",
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "-0.01em",
                }}
              >
                If we are booking meetings,
              </p>
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(22px, 3vw, 42px)",
                  lineHeight: "1.25",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  marginTop: "4px",
                }}
              >
                you are booking meetings.
              </p>
            </div>
          </div>

          <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.1)", margin: "clamp(36px, 4.5vw, 56px) 0" }} />

          {/* Team Thumbnails */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4" style={{ maxWidth: "720px" }}>
            {[
              { src: "/team/emma.jpg",    name: "Emma Hawthorne", title: "Co-Founder \u00b7 Email Infra",    scale: 1,    pos: "center top" },
              { src: "/team/fred.jpg",    name: "Fred Khong",     title: "Co-Founder \u00b7 Client Care",    scale: 1.45, pos: "center 12%" },
              { src: "/team/amy.jpg",     name: "Amy Chen",       title: "Messaging & Marketing",            scale: 1.28, pos: "center 8%"  },
              { src: "/team/brandon.jpg", name: "Brandon Mercer", title: "IT & Deliverability",              scale: 1,    pos: "center top" },
              { src: "/team/david.jpg",   name: "Daniel Chang",    title: "AI \u0026 Sequence Automation",         scale: 1,    pos: "center top" },
            ].map((m) => (
              <div key={m.name} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div className="team-photo-wrap" style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "2px" }}>
                  <img
                    className="team-photo"
                    src={m.src}
                    alt={m.name}
                    style={{
                      objectPosition: m.pos,
                      transform: m.scale !== 1 ? `scale(${m.scale})` : undefined,
                      transformOrigin: "center top",
                    }}
                  />
                </div>
                <div>
                  <p className="font-sans" style={{ fontSize: "10px", fontWeight: 500, color: "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>{m.name}</p>
                  <p className="font-sans" style={{ fontSize: "8px", color: "rgba(255,255,255,0.40)", marginTop: "2px", letterSpacing: "0.04em", textTransform: "uppercase" }}>{m.title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── STICKY MOBILE CTA ── */}
      <div
        className="mobile-cta-bar lg:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: "rgba(13,15,18,0.96)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderTop: "1px solid var(--ink-border)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <p
          className="font-sans"
          style={{ fontSize: "10px", color: "rgba(255,255,255,0.32)", lineHeight: 1.5, flexShrink: 0 }}
        >
          15 min.<br />No commitment.
        </p>
        <Link
          href="/contact"
          className="font-sans font-semibold inline-flex items-center justify-center hover:bg-[#2660A8]"
          style={{
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            background: "#1B4F8A",
            padding: "13px 20px",
            borderRadius: "0px",
            flex: "1",
          }}
        >
          Run outbound audit
        </Link>
      </div>

    </div>
  );
}
