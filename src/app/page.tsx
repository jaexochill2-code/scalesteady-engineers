"use client";

import React, { useState } from "react";
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

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden pb-16 lg:pb-0" style={{ background: "#FAF8F6" }}>

      {/* ── HERO -- Full-bleed cinematic ── */}
      <section
        className="hero-section relative w-full -mt-[80px]"
        style={{ height: "clamp(600px, 88svh, 96svh)", minHeight: "600px", overflow: "visible", isolation: "isolate", zIndex: 10 }}
      >
        {/* Background: photo + dark overlay -- clipped to section bounds */}
        <div className="absolute inset-0" style={{ overflow: "hidden", borderRadius: 0 }}>
          <Image
            src="/hero-team.jpeg"
            alt="ScaleSteady outbound infrastructure team"
            fill
            priority
            unoptimized
            className="object-cover"
            style={{ objectPosition: "60% center" }}
          />
          {/* Cinematic dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(3,8,15,0.96) 0%, rgba(3,8,15,0.90) 50%, rgba(3,8,15,0.98) 100%)",
            }}
          />
          {/* Ambient Glow */}
          <div className="hero-bg-glow" />
        </div>

        {/* 2-column hero grid: text left | phone right */}
        <div
          className="relative h-full flex items-center"
          style={{ paddingTop: "80px" }}
        >
          <div
            className="mx-auto w-full px-8 sm:px-12 lg:px-20 hero-grid"
            style={{ maxWidth: "1400px" }}
          >
            {/* LEFT: Text column */}
            <div className="hero-text-col">
              {/* Overline */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "clamp(14px, 2vw, 24px)" }}>
                <div style={{ width: "24px", height: "2px", background: "#C4431B", flexShrink: 0 }} />
                <span
                  className="font-sans"
                  style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4431B" }}
                >
                  Outbound Infrastructure
                </span>
              </div>

              {/* Headline -- commanding, fits 2 lines in the 1.2fr col */}
              <h1
                className="font-serif font-normal"
                style={{
                  fontSize: "clamp(44px, 6vw, 88px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.03em",
                  color: "#FAF8F6",
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

              {/* Subheadline */}
              <p
                className="font-sans hero-body-copy"
                style={{
                  fontSize: "clamp(13px, 1.2vw, 17px)",
                  lineHeight: "1.65",
                  color: "rgba(250,248,246,0.50)",
                  maxWidth: "380px",
                  marginTop: "clamp(14px, 2vw, 22px)",
                }}
              >
                We build the same system for your business.
              </p>

              {/* CTA zone */}
              <div
                className="hero-cta-wrap flex flex-col sm:flex-row items-start sm:items-center gap-4"
                style={{ marginTop: "clamp(22px, 3vw, 36px)" }}
              >
                <Link
                  href="/contact"
                  className="hero-cta-btn inline-flex items-center justify-center font-sans font-semibold transition-all duration-300"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    background: "#C4431B",
                    padding: "16px 40px",
                    borderRadius: "0px",
                    flexShrink: 0,
                  }}
                >
                  Book a discovery call
                </Link>
                <p
                  className="font-sans hero-risk-text"
                  style={{ fontSize: "11px", color: "rgba(250,248,246,0.40)", letterSpacing: "0.01em" }}
                >
                  15 minutes. No commitment.
                </p>
              </div>
            </div>

            {/* RIGHT: Phone column -- in-flow, vertically centered by grid */}
            <div className="hero-phone-col" aria-hidden="true">
              <div className="phone-scale-wrapper">
                <AnimatedPhone />
              </div>
            </div>
          </div>
        </div>

      </section>


      {/* ── THE OUTBOUND TRUTHS ── */}
      <section id="approach" style={{ background: "#EDE7DF", padding: "clamp(64px, 12vw, 160px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "800px" }}>
          
          {/* Left-anchored accent border + tactile hover focus group */}
          <div className="focus-group flex flex-col gap-8 border-l-[3px] pl-8 sm:pl-10" style={{ borderColor: "#C4431B" }}>
            
            <p
              className="font-sans"
              style={{
                fontSize: "clamp(28px, 3.8vw, 46px)",
                lineHeight: "1.25",
                color: "#0D2B4A",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Outbound is the single most predictable way to acquire clients -- because you control the <strong style={{ color: "#C4431B", fontWeight: 600 }}>volume, the targeting, and the math</strong>.
            </p>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(15px, 1.7vw, 20px)",
                lineHeight: "1.65",
                color: "#3D3D3D",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              Networking is slow. Cold calling is unsexy. <strong style={{ color: "#1B4F8A", fontWeight: 600 }}>Automation scales</strong>.
            </p>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(15px, 1.7vw, 20px)",
                lineHeight: "1.65",
                color: "#3D3D3D",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              The math is clear: a 1% response on 50,000 targeted emails delivers 500 active conversations. That is your <strong style={{ color: "#1B4F8A", fontWeight: 600 }}>physical floor</strong>.
            </p>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(18px, 2.2vw, 26px)",
                lineHeight: "1.4",
                color: "#0D2B4A",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                marginTop: "40px",
              }}
            >
              The technology is ready -- the only question is whether you build this asset now, or <strong style={{ color: "#C4431B", fontWeight: 600 }}>wait until the market standard forces you to catch up.</strong>
            </p>

          </div>
        </div>
      </section>

      {/* ── IDENTITY SHIFT ── */}
      <section style={{ background: "#0D2B4A", padding: "clamp(72px, 9vw, 120px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          {/* ── Identity statement ── */}
          <div className="mb-16">
            <p
              className="font-serif font-normal"
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
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
                fontSize: "clamp(24px, 3vw, 40px)",
                lineHeight: "1.35",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                fontWeight: 600,
                marginTop: "24px",
              }}
            >
              We close it.
            </p>
          </div>


          {/* Two columns: current self -> future self */}
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left: Referral-dependent */}
            <div className="p-8 xl:p-12 flex flex-col" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="mb-8 flex items-center gap-3">
                <div style={{ width: "8px", height: "8px", background: "rgba(255,255,255,0.2)", borderRadius: "50%" }} />
                <span className="font-sans font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.3)" }}>Referral-dependent</span>
              </div>

              <ul className="flex flex-col gap-7 font-sans" style={{ fontSize: "14.5px" }}>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.25)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>
                    Revenue swings every month. <strong style={{ color: "rgba(255,255,255,0.7)" }}>You can&apos;t forecast, you can only react.</strong> Feast, then famine, repeat.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.25)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>
                    Growth depends on an algorithm, an ad platform, or an agency contract. <strong style={{ color: "rgba(255,255,255,0.7)" }}>Any one of those changes, and your pipeline dries up overnight.</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.25)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>
                    You are the engine. Slow down, and <strong style={{ color: "rgba(255,255,255,0.7)" }}>everything slows down.</strong> Scaling means working more, not smarter.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.25)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>
                    Paying <strong style={{ color: "rgba(255,255,255,0.7)" }}>$45–$70 per ad click
                    <span className="relative inline-block ml-1 group/tip cursor-help font-mono text-[10px] text-[rgba(255,255,255,0.2)] hover:text-white">[?]
                      <span className="absolute bottom-full left-0 mb-2 w-64 bg-[#1B4F8A] text-white text-[11px] p-3 leading-normal font-sans font-normal normal-case rounded-none opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity duration-200 z-30 shadow-lg">
                        <strong>Source:</strong> ClickPatrol™ 2026 B2B Index: avg B2B search CPC $30-$70. LanderLab 2026: 70-90% bounce on B2B landing pages.
                      </span>
                    </span></strong> to rent attention. 8 in 10 leave. You own nothing.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right: System-powered — WHITE card, max contrast */}
            <div className="p-8 xl:p-12 flex flex-col" style={{ background: "#FFFFFF", borderTop: "4px solid #1B4F8A" }}>
              <div className="mb-8 flex items-center gap-3">
                <div style={{ width: "8px", height: "8px", background: "#1B4F8A", borderRadius: "50%" }} />
                <span className="font-sans font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#1B4F8A" }}>System-powered</span>
              </div>

              <ul className="flex flex-col gap-7 font-sans mb-8" style={{ fontSize: "14.5px" }}>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "#444444" }}>
                    <strong style={{ color: "#111111" }}>Predictable pipeline.</strong> You know how many conversations you&apos;ll have next month before the month starts.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "#444444" }}>
                    <strong style={{ color: "#111111" }}>Zero platform dependency.</strong> No algorithm can kill your growth. Email is a direct line — you own it.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "#444444" }}>
                    <strong style={{ color: "#111111" }}>$0.04 per qualified contact
                    <span className="relative inline-block ml-1 group/tip cursor-help font-mono text-[10px] text-[#CCCCCC] hover:text-[#1B4F8A]">[?]
                      <span className="absolute bottom-full left-0 mb-2 w-64 bg-[#0D2B4A] text-white text-[11px] p-3 leading-normal font-sans font-normal normal-case rounded-none opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity duration-200 z-30 shadow-lg">
                        <strong>Source:</strong> Smartlead & Winnr 2026: amortised mailbox cost $120/mo for 10k sends. Validated B2B contact scrape at $0.025/record.
                      </span>
                    </span></strong> — straight to the decision-maker. No auction. No middleman.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "#444444" }}>
                    <strong style={{ color: "#111111" }}>The infrastructure lives in your business.</strong> Not in our account. Not in Google&apos;s. When we&apos;re done, you own it.
                  </span>
                </li>
              </ul>

              <div className="mt-auto pt-5" style={{ borderTop: "1px solid #EEEEEE" }}>
                <p className="font-sans text-[10px] text-[#BBBBBB] leading-relaxed">
                  Data: <strong>ClickPatrol™ 2026</strong> · <strong>GlockApps 2026</strong> · <strong>Smartlead 2026</strong>
                </p>
              </div>
            </div>

          </div>{/* end chart grid */}

        </div>
      </section>



      {/* ── DEFINITIVE RESULTS -- The Irony Section ── */}
      <section style={{ background: "#050D1C", padding: "clamp(72px, 8vw, 112px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          {/* Irony opener */}
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(26px, 3.5vw, 44px)",
              lineHeight: "1.15",
              letterSpacing: "-0.02em",
              color: "#C4431B",
              fontWeight: 400,
              maxWidth: "640px",
            }}
          >
            The worst thing that can happen in 60&nbsp;days:
          </p>

          {/* Deliverability connector -- this is WHY 30,000 is real */}
          <p
            className="font-sans"
            style={{
              fontSize: "13px",
              lineHeight: "1.65",
              color: "rgba(255,255,255,0.30)",
              marginTop: "clamp(20px, 2.5vw, 32px)",
              maxWidth: "520px",
            }}
          >
            97.6% of our emails reach the primary inbox -- not promotions, not spam.{" "}
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.14)" }}>GlockApps 2026</span>
          </p>

          {/* The number */}
          <p
            className="font-serif font-bold"
            style={{
              fontSize: "clamp(56px, 10vw, 140px)",
              lineHeight: 0.85,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              marginTop: "clamp(16px, 2vw, 28px)",
            }}
          >
            30,000<span style={{ color: "#C4431B" }}>+</span>
          </p>

          {/* Market awareness -- local, visceral */}
          <p
            className="font-sans"
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              lineHeight: "1.65",
              color: "rgba(255,255,255,0.50)",
              maxWidth: "520px",
              marginTop: "16px",
            }}
          >
            people in your city, your county, your service area hear your name for the first time.{" "}
            <strong style={{ color: "rgba(255,255,255,0.80)", fontWeight: 500 }}>
              No door knock. No business card. No cold call.
            </strong>
          </p>

          {/* ── The ownership payoff -- the irony closer ── */}
          <div style={{ marginTop: "clamp(48px, 5vw, 72px)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "clamp(36px, 4vw, 56px)" }}>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: "1.75",
                color: "rgba(255,255,255,0.42)",
                maxWidth: "640px",
                marginBottom: "clamp(28px, 3vw, 40px)",
              }}
            >
              And you <strong style={{ color: "#FFFFFF" }}>keep everything</strong> we build. The accounts,
              the lists, the sequences. They belong to you.
            </p>

            {/* Ownership grid -- 2 col, tight, no bloat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6" style={{ maxWidth: "740px" }}>
              {[
                { label: "Sending domains", detail: "Warmed, authenticated, DMARC-compliant -- registered in your name." },
                { label: "Email inboxes", detail: "Trusted accounts with established sender reputation. Ready for any campaign you run." },
                { label: "Verified lead list", detail: "Every contact in your TAM, cleaned and validated. Your market, mapped." },
                { label: "Outreach sequences", detail: "Battle-tested copy and cadences. Use them again, modify them, hand them to your team." },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C4431B", marginTop: "8px", flexShrink: 0 }} />
                  <div>
                    <p className="font-sans" style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.80)", marginBottom: "4px" }}>
                      {item.label}
                    </p>
                    <p className="font-sans" style={{ fontSize: "13px", lineHeight: "1.6", color: "rgba(255,255,255,0.30)" }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Irony close -- the floor, not a projection */}
            <p
              className="font-sans"
              style={{
                fontSize: "clamp(14px, 1.4vw, 16px)",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.25)",
                maxWidth: "560px",
                marginTop: "clamp(36px, 4vw, 52px)",
              }}
            >
              Cancel anytime and keep everything we built. That is the <strong style={{ color: "rgba(255,255,255,0.55)" }}>floor</strong> -- not a projection.
            </p>

          </div>

        </div>
      </section>





      {/* ── THE OFFER -- HOW WE ALIGN OUR INTERESTS ── */}
      <section id="pricing" style={{ background: "#050D1C", padding: "clamp(80px, 11vw, 140px) 0" }}>
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
            style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.7)", maxWidth: "640px", marginBottom: "clamp(48px, 6vw, 72px)" }}
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

            <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)" }} />

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <span className="font-display font-bold text-[#C4431B] text-sm flex-shrink-0 mt-1 w-6">02</span>
              <p className="font-sans text-gray-300 text-[15.5px] leading-relaxed">
                <strong className="text-white">We build and manage your campaigns for $0 in agency fees.</strong>{" "}
                Our team handles all copywriting, technical deliverability, and daily optimization. We absorb our labor costs completely until our outbound system generates $5,000 in cleared revenue for your business.
              </p>
            </div>

            <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)" }} />

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
          <div className="guarantee-box mt-16 p-8 md:p-12" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
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
              <p className="font-sans mt-4 text-[#ABABAB]" style={{ fontSize: "12px" }}>
                15 minutes. No commitment. No pitch deck.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ── TESTIMONIALS ── */}
      <section id="results" style={{ background: "#FFFFFF", padding: "clamp(48px, 9vw, 112px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <p
            className="font-sans font-semibold uppercase mb-20"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B" }}
          >
            What clients say
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ alignItems: "stretch" }}>

            {/* T1: Deliverables Honesty -- HVAC */}
            <div
              className="flex flex-col pb-16 lg:pb-0"
              style={{ paddingRight: "clamp(24px, 4vw, 56px)", borderBottom: "1px solid #E8E8E8" }}
            >
              <p
                className="font-sans font-semibold uppercase mb-5"
                style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#C4431B" }}
              >
                Deliverables
              </p>
              <p
                className="font-serif font-bold"
                style={{ fontSize: "clamp(44px, 5.5vw, 68px)", lineHeight: 1, letterSpacing: "-0.02em", color: "#111111" }}
              >
                15,000
              </p>
              <p className="font-sans mt-3 mb-8" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                emails sent per month, exactly as quoted
              </p>
              <div style={{ width: "32px", height: "2px", background: "#C4431B", marginBottom: "28px" }} />
              <p
                className="font-serif italic mb-auto"
                style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.75", color: "#3D3D3D" }}
              >
                &ldquo;Honestly I almost didn&apos;t sign up. I&apos;ve been burned by marketing guys before. But these guys showed me the price, told me exactly how many emails go out, and gave me a timeline. Fifteen thousand a month. Every Monday I get a report and the numbers match. No surprises, no upsells. Just organized people who do what they said they&apos;d do.&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #E8E8E8", marginTop: "32px", paddingTop: "20px" }}>
                <p className="font-sans" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#ABABAB", textTransform: "uppercase" }}>
                  Mike T., HVAC contractor, southeast Michigan
                </p>
              </div>
            </div>

            {/* T2: Closed Deal -- Roofing */}
            <div
              className="flex flex-col py-16 lg:py-0"
              style={{
                paddingLeft: "clamp(24px, 4vw, 56px)",
                paddingRight: "clamp(24px, 4vw, 56px)",
                borderLeft: "1px solid #E8E8E8",
                borderRight: "1px solid #E8E8E8",
              }}
            >
              <p
                className="font-sans font-semibold uppercase mb-5"
                style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#C4431B" }}
              >
                Closed deal
              </p>
              <p
                className="font-serif font-bold"
                style={{ fontSize: "clamp(44px, 5.5vw, 68px)", lineHeight: 1, letterSpacing: "-0.02em", color: "#111111" }}
              >
                $12,000
              </p>
              <p className="font-sans mt-3 mb-8" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                first job closed, month two
              </p>
              <div style={{ width: "32px", height: "2px", background: "#C4431B", marginBottom: "28px" }} />
              <p
                className="font-serif italic mb-auto"
                style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.75", color: "#3D3D3D" }}
              >
                &ldquo;I figured it was another agency that&apos;d take my money and disappear. Second month a reply came in, turned into a twelve thousand dollar re-roof. One job. Paid for the whole year and then some. I don&apos;t even think about it anymore, it just runs in the background and leads show up.&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #E8E8E8", marginTop: "32px", paddingTop: "20px" }}>
                <p className="font-sans" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#ABABAB", textTransform: "uppercase" }}>
                  Tony R., roofing contractor, western Pennsylvania
                </p>
              </div>
            </div>

            {/* T3: Speed + Communication -- Chiropractic */}
            <div
              className="flex flex-col pt-16 lg:pt-0"
              style={{ paddingLeft: "clamp(24px, 4vw, 56px)", borderTop: "1px solid #E8E8E8" }}
            >
              <p
                className="font-sans font-semibold uppercase mb-5"
                style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#C4431B" }}
              >
                Communication
              </p>
              <p
                className="font-serif font-bold"
                style={{ fontSize: "clamp(44px, 5.5vw, 68px)", lineHeight: 1, letterSpacing: "-0.02em", color: "#111111" }}
              >
                48 hrs
              </p>
              <p className="font-sans mt-3 mb-8" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                20 email accounts and domains live. Signed up Monday.
              </p>
              <div style={{ width: "32px", height: "2px", background: "#C4431B", marginBottom: "28px" }} />
              <p
                className="font-serif italic mb-auto"
                style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.75", color: "#3D3D3D" }}
              >
                &ldquo;I run a small practice, I don&apos;t have time to chase vendors. Signed up on Monday, by Wednesday they had everything built. Two weeks later emails were going out. Every Monday I get a quick update -- who replied, what they said, what&apos;s next. Short, clear, no fluff. I have never had to follow up with them once.&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #E8E8E8", marginTop: "32px", paddingTop: "20px" }}>
                <p className="font-sans" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#ABABAB", textTransform: "uppercase" }}>
                  Dr. Sarah L., chiropractic practice, northwest Ohio
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ── TEAM ── */}
      <section id="team" style={{ background: "#03080F", padding: "clamp(72px, 8vw, 96px) 0 clamp(56px, 6vw, 80px)" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <p
            className="font-sans font-semibold uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B", marginBottom: "clamp(32px, 4vw, 48px)" }}
          >
            We are ScaleSteady
          </p>

          {/* Copy */}
          <div style={{ maxWidth: "680px" }}>
            <p
              className="font-sans"
              style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.8", color: "rgba(255,255,255,0.72)", fontWeight: 500 }}
            >
              Hiring us means working with a small team of 5 passionate, hands-on people -- which means your campaign will be run inside a strict, battle-tested workflow. The same one we use on our own outreach. The same one that has been booking meetings for every client we have worked with.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "clamp(13px, 1.4vw, 16px)", lineHeight: "1.85", color: "rgba(255,255,255,0.38)", marginTop: "clamp(16px, 2vw, 22px)" }}
            >
              The same people who read your replies every Tuesday. Research your market. Compose your emails. Warm your domains. Rewrite your subject line when it underperforms. All five of us. Every time.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "clamp(13px, 1.4vw, 16px)", lineHeight: "1.85", color: "rgba(255,255,255,0.38)", marginTop: "clamp(14px, 1.8vw, 20px)" }}
            >
              No account manager. No junior who inherited your file. No one who says &ldquo;let me loop in the team.&rdquo;
            </p>

            {/* Pull quote -- the payoff, Option C: border + split-weight */}
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
                  color: "rgba(255,255,255,0.38)",
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

          {/* Divider */}
          <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.1)", margin: "clamp(36px, 4.5vw, 56px) 0" }} />

          {/* Team thumbnails -- copy is the star, photos are the credit line */}
          <div className="grid grid-cols-3 sm:grid-cols-5" style={{ gap: "10px", maxWidth: "720px" }}>
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
                  <p className="font-sans" style={{ fontSize: "8px", color: "rgba(255,255,255,0.22)", marginTop: "2px", letterSpacing: "0.04em", textTransform: "uppercase" }}>{m.title}</p>
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
          background: "rgba(5,13,28,0.96)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
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
          className="font-sans font-semibold inline-flex items-center justify-center"
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
          Book a discovery call
        </Link>
      </div>

    </div>
  );
}
