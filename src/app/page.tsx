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
  const [comparisonTab, setComparisonTab] = useState<"referral" | "system">("referral");

  return (
    <div className="w-full min-h-screen overflow-x-hidden pb-16 lg:pb-0" style={{ background: "#F4F4F4" }}>

      {/* ── HERO -- Full-bleed cinematic ── */}
      <section
        className="hero-section relative w-full"
        style={{ height: "clamp(600px, 88svh, 96svh)", minHeight: "600px", overflow: "visible", isolation: "isolate", zIndex: 25 }}
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
                <div style={{ width: "24px", height: "2px", background: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                <span
                  className="font-sans"
                  style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}
                >
                  Outbound Infrastructure
                </span>
              </div>

              {/* Headline -- commanding, fits 2 lines in the 1.2fr col */}
              <h1
                className="font-sans font-normal"
                style={{
                  fontSize: "clamp(44px, 6vw, 88px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.03em",
                  color: "#F4F4F4",
                }}
              >
                <span className="hero-word block" style={{ animationDelay: "0s" }}>
                  If you&apos;re here,
                </span>
                <span
                  className="hero-word block italic"
                  style={{ animationDelay: "0.12s", color: "#FFFFFF" }}
                >
                  the email worked.
                </span>
              </h1>

              {/* Service declaration -- $5k offer above the fold, high contrast */}
              <div className="hero-body-copy" style={{ marginTop: "clamp(14px, 2vw, 24px)", maxWidth: "440px" }}>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.40)",
                    marginBottom: "10px",
                  }}
                >
                  Cold email infrastructure for local service businesses
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 18px)",
                    lineHeight: "1.7",
                    color: "rgba(255,255,255,0.78)",
                    fontWeight: 400,
                  }}
                >
                  We build your entire outbound system at cost.{" "}
                  <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>$500 flat.</strong>{" "}
                  Zero agency fees until you collect{" "}
                  <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>$5,000 in new revenue.</strong>
                </p>
              </div>

              {/* CTA zone */}
              <div
                className="hero-cta-wrap flex flex-col sm:flex-row items-start sm:items-center gap-4"
                style={{ marginTop: "clamp(22px, 3vw, 36px)" }}
              >
                <Link
                  href="/contact"
                  className="hero-cta-btn hidden lg:inline-flex items-center justify-center font-sans font-semibold transition-all duration-300"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#000000",
                    background: "#FFFFFF",
                    padding: "16px 40px",
                    borderRadius: "0px",
                    flexShrink: 0,
                  }}
                >
                   Book a 15-min call
                </Link>
                <p
                  className="font-sans hero-risk-text"
                  style={{ fontSize: "11px", color: "rgba(250,248,246,0.45)", letterSpacing: "0.01em" }}
                >
                  15 minutes. No commitment.
                </p>
              </div>
            </div>

            {/* RIGHT: Phone column */}
            <div className="hero-phone-col" aria-hidden="true">
              <div className="phone-scale-wrapper">
                <AnimatedPhone />
              </div>
            </div>
          </div>
        </div>

      </section>


      {/* ── THE OUTBOUND TRUTHS ── */}
      <section id="approach" style={{ background: "#EBEBEB", padding: "clamp(120px, 16vw, 200px) 0 clamp(64px, 12vw, 160px)" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "800px" }}>
          
          {/* Left-anchored accent border + tactile hover focus group */}
          <div className="focus-group flex flex-col gap-8 border-l-[3px] pl-8 sm:pl-10" style={{ borderColor: "#0A0A0A" }}>
            
            <p
              className="font-sans"
              style={{
                fontSize: "clamp(28px, 3.8vw, 46px)",
                lineHeight: "1.25",
                color: "#111111",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Outbound is the single most predictable way to acquire clients -- because you control the <strong style={{ color: "#0A0A0A", fontWeight: 600 }}>volume, the targeting, and the math</strong>.
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
              Networking is slow. Cold calling is unsexy. <strong style={{ color: "#0A0A0A", fontWeight: 600 }}>Automation scales</strong>.
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
              The math is clear: a 1% response on 50,000 targeted emails delivers 500 active conversations. That is your <strong style={{ color: "#0A0A0A", fontWeight: 600 }}>physical floor</strong>.
            </p>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(18px, 2.2vw, 26px)",
                lineHeight: "1.4",
                color: "#111111",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                marginTop: "40px",
              }}
            >
              The technology is ready -- the only question is whether you build this asset now, or <strong style={{ color: "#0A0A0A", fontWeight: 600 }}>wait until the market standard forces you to catch up.</strong>
            </p>

          </div>
        </div>
      </section>

      {/* ── IDENTITY SHIFT ── */}
      <section style={{ background: "#111111", padding: "clamp(72px, 9vw, 120px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          {/* ── Identity statement ── */}
          <div className="mb-16">
            <p
              className="font-sans font-normal"
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                lineHeight: "1.35",
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "-0.02em",
                maxWidth: "820px",
              }}
            >
              There&apos;s a gap between the outreach you know you should be doing and what you&apos;re actually doing. Every month that gap costs you clients{" "}
              <span style={{ color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>you&apos;ll never know you lost.</span>
            </p>
            <p
              className="font-sans font-normal"
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


          {/* Mobile Tab Selector */}
          <div className="flex lg:hidden justify-center mb-8">
            <div 
              style={{ 
                display: "inline-flex", 
                background: "rgba(255,255,255,0.04)", 
                border: "1px solid rgba(255,255,255,0.12)", 
                padding: "3px", 
                borderRadius: "0px" 
              }}
            >
              <button
                type="button"
                onClick={() => setComparisonTab("referral")}
                className="font-sans font-bold uppercase transition-all duration-200"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  padding: "10px 18px",
                  background: comparisonTab === "referral" ? "#FFFFFF" : "transparent",
                  color: comparisonTab === "referral" ? "#000000" : "rgba(255,255,255,0.45)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Referral-dependent
              </button>
              <button
                type="button"
                onClick={() => setComparisonTab("system")}
                className="font-sans font-bold uppercase transition-all duration-200"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  padding: "10px 18px",
                  background: comparisonTab === "system" ? "#FFFFFF" : "transparent",
                  color: comparisonTab === "system" ? "#000000" : "rgba(255,255,255,0.45)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                System-powered
              </button>
            </div>
          </div>

          {/* Two columns: current self -> future self */}
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left: Referral-dependent */}
            <div 
              className={`p-8 xl:p-12 flex flex-col ${comparisonTab === "referral" ? "flex" : "hidden lg:flex"}`}
              style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="mb-8 flex items-center gap-3">
                <div style={{ width: "8px", height: "8px", background: "rgba(255,255,255,0.2)", borderRadius: "50%" }} />
                <span className="font-sans font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.3)" }}>Referral-dependent</span>
              </div>

              <ul className="flex flex-col gap-7 font-sans" style={{ fontSize: "14.5px" }}>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.40)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "rgba(255,255,255,0.68)" }}>
                    Revenue swings every month. <strong style={{ color: "rgba(255,255,255,0.88)" }}>You can&apos;t forecast, you can only react.</strong> Feast, then famine, repeat.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.40)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "rgba(255,255,255,0.68)" }}>
                    Growth depends on an algorithm, an ad platform, or an agency contract. <strong style={{ color: "rgba(255,255,255,0.88)" }}>Any one of those changes, and your pipeline dries up overnight.</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.40)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "rgba(255,255,255,0.68)" }}>
                    You are the engine. Slow down, and <strong style={{ color: "rgba(255,255,255,0.88)" }}>everything slows down.</strong> Scaling means working more, not smarter.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "rgba(255,255,255,0.40)", marginTop: "3px", flexShrink: 0 }}>—</span>
                  <span style={{ color: "rgba(255,255,255,0.68)" }}>
                    Paying <strong style={{ color: "rgba(255,255,255,0.88)" }}>$45–$70 per ad click
                    <span className="relative inline-block ml-1 group/tip cursor-help font-mono text-[10px] text-[rgba(255,255,255,0.35)] hover:text-white">[?]
                      <span className="absolute bottom-full left-0 mb-2 w-64 bg-[#0A0A0A] text-white text-[11px] p-3 leading-normal font-sans font-normal normal-case rounded-none opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity duration-200 z-30 shadow-lg border border-[rgba(255,255,255,0.1)]">
                        <strong>Source:</strong> ClickPatrol™ 2026 B2B Index: avg B2B search CPC $30-$70. LanderLab 2026: 70-90% bounce on B2B landing pages.
                      </span>
                    </span></strong> to rent attention. 8 in 10 leave. You own nothing.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right: System-powered — WHITE card, max contrast */}
            <div 
              className={`p-8 xl:p-12 flex flex-col ${comparisonTab === "system" ? "flex" : "hidden lg:flex"}`}
              style={{ background: "#FFFFFF", borderTop: "4px solid #0A0A0A" }}
            >
              <div className="mb-8 flex items-center gap-3">
                <div style={{ width: "8px", height: "8px", background: "#0A0A0A", borderRadius: "50%" }} />
                <span className="font-sans font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#0A0A0A" }}>System-powered</span>
              </div>

              <ul className="flex flex-col gap-7 font-sans mb-8" style={{ fontSize: "14.5px" }}>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "#444444" }}>
                    <strong style={{ color: "#111111" }}>Predictable pipeline.</strong> You know how many conversations you&apos;ll have next month before the month starts.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "#444444" }}>
                    <strong style={{ color: "#111111" }}>Zero platform dependency.</strong> No algorithm can kill your growth. Email is a direct line — you own it.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "#444444" }}>
                    <strong style={{ color: "#111111" }}>$0.04 per qualified contact
                    <span className="relative inline-block ml-1 group/tip cursor-help font-mono text-[10px] text-[#AAAAAA] hover:text-[#666666]">[?]
                      <span className="absolute bottom-full left-0 mb-2 w-64 bg-[#0A0A0A] text-white text-[11px] p-3 leading-normal font-sans font-normal normal-case rounded-none opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity duration-200 z-30 shadow-lg border border-[rgba(255,255,255,0.1)]">
                        <strong>Source:</strong> Smartlead & Winnr 2026: amortised mailbox cost $120/mo for 10k sends. Validated B2B contact scrape at $0.025/record.
                      </span>
                    </span></strong> — straight to the decision-maker. No auction. No middleman.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3">
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
      <section style={{ background: "#050505", padding: "clamp(72px, 8vw, 112px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          {/* Irony opener */}
          <p
            className="font-sans"
            style={{
              fontSize: "clamp(11px, 1vw, 13px)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            The worst case
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: "clamp(26px, 3.5vw, 44px)",
              lineHeight: "1.15",
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              fontWeight: 300,
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
              color: "rgba(255,255,255,0.62)",
              marginTop: "clamp(20px, 2.5vw, 32px)",
              maxWidth: "520px",
            }}
          >
            97.6% of our emails reach the primary inbox -- not promotions, not spam.{" "}
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>GlockApps 2026</span>
          </p>

          {/* The number */}
          <p
            className="font-sans font-bold"
            style={{
              fontSize: "clamp(56px, 10vw, 140px)",
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
              marginTop: "clamp(16px, 2vw, 28px)",
              background: "linear-gradient(135deg, #FFFFFF 0%, #C8C8C8 50%, #E8E8E8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            30,000<span style={{ WebkitTextFillColor: "rgba(255,255,255,0.40)" }}>+</span>
          </p>

          {/* Market awareness -- local, visceral */}
          <p
            className="font-sans"
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              lineHeight: "1.65",
              color: "rgba(255,255,255,0.72)",
              maxWidth: "520px",
              marginTop: "16px",
            }}
          >
            people in your city, your county, your service area hear your name for the first time.{" "}
            <strong style={{ color: "rgba(255,255,255,0.92)", fontWeight: 500 }}>
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
                color: "rgba(255,255,255,0.68)",
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
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.50)", marginTop: "8px", flexShrink: 0 }} />
                  <div>
                    <p className="font-sans" style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.90)", marginBottom: "4px" }}>
                      {item.label}
                    </p>
                    <p className="font-sans" style={{ fontSize: "13px", lineHeight: "1.6", color: "rgba(255,255,255,0.62)" }}>
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
                color: "rgba(255,255,255,0.58)",
                maxWidth: "560px",
                marginTop: "clamp(36px, 4vw, 52px)",
              }}
            >
              Cancel anytime and keep everything we built. That is the <strong style={{ color: "rgba(255,255,255,0.88)" }}>floor</strong> -- not a projection.
            </p>

          </div>

        </div>
      </section>





      {/* ── THE OFFER -- HOW WE ALIGN OUR INTERESTS ── */}
      <section id="pricing" style={{ background: "#F4F4F4", padding: "clamp(80px, 11vw, 140px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "780px" }}>

          <p
            className="font-sans font-semibold uppercase mb-6"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#111111" }}
          >
            How We Align Our Interests
          </p>

          <h2
            className="font-sans font-bold"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "1.12", color: "#111111", maxWidth: "700px", marginBottom: "clamp(20px, 3vw, 32px)", letterSpacing: "-0.02em" }}
          >
            We build your cold email system at cost -- and we don&apos;t bill for our labor until you collect{" "}
            <span style={{ color: "#111111", borderBottom: "2px solid #111111" }}>$5,000.</span>
          </h2>

          <p
            className="font-sans"
            style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.8, color: "#555555", maxWidth: "640px", marginBottom: "clamp(48px, 6vw, 72px)" }}
          >
            Most B2B agencies charge high upfront retainers because they need to cover overhead regardless of your results. We are a lean, 5-person team and we only take on clients where we are certain our campaigns will perform. We cover our own payroll upfront because we know that once you collect your first $5,000 from our pipeline, you will want us to keep running it.
          </p>

          <div className="flex flex-col gap-6">

            {/* Step 01 */}
            <div className="flex items-start gap-4">
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#111111", fontSize: "13px", flexShrink: 0, marginTop: "2px", minWidth: "24px" }}>01</span>
              <p className="font-sans" style={{ fontSize: "15.5px", lineHeight: "1.75", color: "#444444" }}>
                <strong style={{ color: "#111111" }}>You cover the raw infrastructure costs -- $500.</strong>{" "}
                This goes entirely to third-party registrars and data providers for your dedicated domains, warmed inboxes, and a verified lead list. We do not pocket a single dollar of this. You own it from day one.{" "}
                <span className="tooltip-container" style={{ color: "#111111", fontWeight: 600, textDecoration: "underline", textDecorationStyle: "dotted" }}>
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
                    <span className="flex justify-between text-[11px] font-semibold border-t border-gray-700 pt-1 mt-1">
                      <span>Raw Infrastructure Cost:</span>
                      <span className="font-mono text-white">$600</span>
                    </span>
                    <span className="block text-[9px] text-gray-400 mt-2">ScaleSteady absorbs the remaining $100 + all setups.</span>
                  </span>
                </span>
              </p>
            </div>

            <div style={{ width: "100%", height: "1px", background: "#E0E0E0" }} />

            {/* Step 02 */}
            <div className="flex items-start gap-4">
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#111111", fontSize: "13px", flexShrink: 0, marginTop: "2px", minWidth: "24px" }}>02</span>
              <p className="font-sans" style={{ fontSize: "15.5px", lineHeight: "1.75", color: "#444444" }}>
                <strong style={{ color: "#111111" }}>We build and manage your campaigns for $0 in agency fees.</strong>{" "}
                Our team handles all copywriting, technical deliverability, and daily optimization. We absorb our labor costs completely until our outbound system generates $5,000 in cleared revenue for your business.
              </p>
            </div>

            <div style={{ width: "100%", height: "1px", background: "#E0E0E0" }} />

            {/* Step 03 */}
            <div className="flex items-start gap-4">
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#111111", fontSize: "13px", flexShrink: 0, marginTop: "2px", minWidth: "24px" }}>03</span>
              <div className="font-sans" style={{ fontSize: "15.5px", lineHeight: "1.75", color: "#444444" }}>
                <p style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#111111" }}>Once your bank account reflects $5,000 in new revenue, you choose how to proceed.</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
                  <span className="flex items-center gap-2">
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#111111", flexShrink: 0, display: "inline-block" }} />
                    <span><strong style={{ color: "#111111" }}>Scale</strong> -- $699/mo, we keep managing and optimizing your pipeline</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#111111", flexShrink: 0, display: "inline-block" }} />
                    <span><strong style={{ color: "#111111" }}>Walk</strong> -- keep all infrastructure and 100% of the profits</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Guarantee Box */}
          <div style={{ marginTop: "clamp(48px, 6vw, 72px)", padding: "clamp(32px, 4vw, 48px)", border: "1px solid #1A1A1A", background: "#0A0A0A" }}>
            <p
              className="font-sans italic text-white"
              style={{ fontSize: "clamp(18px, 2.2vw, 26px)", lineHeight: 1.3, textAlign: "center" }}
            >
              Our business only makes sense if we perform for yours.
            </p>
            <p className="font-sans mx-auto mt-4 text-center" style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", maxWidth: "480px" }}>
              If we do not generate the $5,000 in new revenue, you keep the entire domain infrastructure and database. We write off our labor as a cost of doing business. You owe us nothing.
            </p>
            <div className="flex flex-col items-center mt-8">
              <Link
                href="/contact"
                className="font-sans font-semibold"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#000000",
                  background: "#FFFFFF",
                  padding: "18px 48px",
                }}
              >
                Book a consultation
              </Link>
              <p className="font-sans mt-4" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                15 minutes. No commitment. No pitch deck.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ── THE FORK (VISUAL EXPANSION) ── */}
      <section style={{ background: "#050505", padding: "clamp(80px, 10vw, 140px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1080px" }}>

          {/* Headline */}
          <p
            className="font-sans font-semibold uppercase mb-5 offer-scroll-reveal"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)" }}
          >
            The Fork
          </p>
          <h2
            className="font-sans font-normal italic offer-scroll-reveal"
            style={{
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: "1.15",
              color: "#F4F4F4",
              letterSpacing: "-0.02em",
              maxWidth: "600px",
              marginBottom: "16px",
            }}
          >
            Two roads. Both are wins.
          </h2>
          <p
            className="font-sans offer-scroll-reveal"
            style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(250,248,246,0.62)", maxWidth: "520px", marginBottom: "clamp(48px, 6vw, 80px)" }}
          >
            Once we generate $5,000 in new client revenue for your business,
            you choose what happens next. There is no bad option.
          </p>

          {/* Fork Diagram -- CSS */}
          <div className="offer-fork-container offer-scroll-reveal">
            {/* Stem */}
            <div className="flex justify-center mb-8">
              <div className="offer-fork-stem" style={{ width: "2px", height: "64px", background: "rgba(250,248,246,0.12)" }} />
            </div>

            {/* Split indicator */}
            <div className="flex justify-center mb-8">
              <div style={{ width: "48px", height: "2px", background: "rgba(250,248,246,0.08)", position: "relative" }}>
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "10px", height: "10px", borderRadius: "50%", background: "#0A0A0A" }} />
              </div>
            </div>

            {/* Two Paths */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

              {/* Path A: Scale */}
              <div
                className="offer-scroll-reveal p-8 xl:p-10 flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  minHeight: "380px",
                }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div style={{ width: "8px", height: "8px", background: "rgba(255,255,255,0.9)", borderRadius: "50%" }} />
                  <span className="font-sans font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.5)" }}>
                    Scale
                  </span>
                </div>

                <p className="font-sans font-bold mb-2" style={{ fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                  $699<span style={{ fontSize: "16px", color: "rgba(255,255,255,0.30)", fontWeight: 400 }}>/mo</span>
                </p>
                <p className="font-sans mb-8" style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
                  ongoing management
                </p>

                <ul className="flex flex-col gap-5 font-sans mb-auto" style={{ fontSize: "13.5px" }}>
                  {[
                    { bold: "Keep the pipeline running.", rest: " Revenue keeps flowing." },
                    { bold: "Scale the volume.", rest: " More inboxes, more sequences, more conversations." },
                    { bold: "Dedicated team.", rest: " Same people, same workflow, every week." },
                  ].map((item) => (
                    <li key={item.bold} className="flex items-start gap-3">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: "rgba(255,255,255,0.55)" }}>
                        <strong style={{ color: "rgba(255,255,255,0.85)" }}>{item.bold}</strong>{item.rest}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="font-sans mt-8" style={{ fontSize: "12px", color: "rgba(255,255,255,0.48)", lineHeight: 1.6, fontStyle: "italic" }}>
                  This is what happens when you stop relying on referrals and own a system that runs while you work.
                </p>
              </div>

              {/* Path B: Walk */}
              <div
                className="offer-scroll-reveal p-8 xl:p-10 flex flex-col"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  minHeight: "380px",
                }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div style={{ width: "8px", height: "8px", background: "rgba(255,255,255,0.3)", borderRadius: "50%" }} />
                  <span className="font-sans font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.35)" }}>
                    Walk
                  </span>
                </div>

                <p className="font-sans font-bold mb-2" style={{ fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, color: "#FFFFFF" }}>
                  $0
                </p>
                <p className="font-sans mb-8" style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
                  owed to us for our labor
                </p>

                <ul className="flex flex-col gap-5 font-sans mb-auto" style={{ fontSize: "13.5px" }}>
                  {[
                    { bold: "Keep the domains.", rest: " Registered to your business." },
                    { bold: "Keep the inboxes.", rest: " Warmed and authenticated." },
                    { bold: "Keep the lead list.", rest: " Your market, verified and mapped." },
                  ].map((item) => (
                    <li key={item.bold} className="flex items-start gap-3">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: "rgba(255,255,255,0.55)" }}>
                        <strong style={{ color: "rgba(255,255,255,0.85)" }}>{item.bold}</strong>{item.rest}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="font-sans mt-8" style={{ fontSize: "12px", color: "rgba(255,255,255,0.48)", lineHeight: 1.6, fontStyle: "italic" }}>
                  You have never hired an agency and walked out with a premium setup worth more than you paid. Until now.
                </p>
              </div>

            </div>

            {/* The Logical Bind */}
            <div className="offer-scroll-reveal" style={{ marginTop: "clamp(48px, 6vw, 80px)", textAlign: "center" }}>
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(28px, 4vw, 52px)",
                  lineHeight: 1.1,
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                  fontWeight: 300,
                }}
              >
                You literally cannot lose.
              </p>
              <p
                className="font-sans mx-auto"
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.65)",
                  maxWidth: "480px",
                  marginTop: "20px",
                }}
              >
                If we fail to hit $5,000, you walk automatically. You never agreed to a retainer.
                You only ever paid the hard cost of your email setup.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── THE GUARANTEE (PURE TYPOGRAPHY) ── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 140px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "960px", textAlign: "center" }}>

          <p
            className="font-sans font-semibold uppercase mb-10 offer-scroll-reveal"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#0A0A0A" }}
          >
            The Guarantee
          </p>

          <h2
            className="font-sans font-bold offer-scroll-reveal"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              lineHeight: 1.1,
              color: "#111111",
              letterSpacing: "-0.02em",
            }}
          >
            If we don&apos;t hit $5,000,<br />
            you pay us zero for our labor.
          </h2>

          <p
            className="font-sans mx-auto offer-scroll-reveal"
            style={{
              fontSize: "clamp(14px, 1.5vw, 17px)",
              lineHeight: 1.75,
              color: "#6B6B6B",
              maxWidth: "560px",
              marginTop: "clamp(24px, 3vw, 40px)",
            }}
          >
            Take the domains. Take the inboxes. Take the verified lead list.
            Run your own campaigns. We built you a premium cold email setup
            and charged you only the hard cost of the software.
          </p>

          <div
            className="offer-scroll-reveal mx-auto"
            style={{
              marginTop: "clamp(32px, 4vw, 56px)",
              borderTop: "1px solid #E8E8E8",
              paddingTop: "clamp(24px, 3vw, 40px)",
              maxWidth: "480px",
            }}
          >
            <p className="font-sans" style={{ fontSize: "13px", color: "#ABABAB", lineHeight: 1.7 }}>
              The setup fee covers the raw cost of the infrastructure -- domains, inboxes, data scraping.
              Our copywriting, campaign management, and optimization are free until you see results.
              If you never see results, you never pay for our service. Period.
            </p>
            
            <div className="flex flex-col items-center mt-8">
              <Link
                href="/contact"
                className="hero-cta-btn inline-flex items-center justify-center font-sans font-semibold transition-all duration-200"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#0A0A0A",
                  padding: "18px 48px",
                  borderRadius: "0px",
                  border: "1px solid rgba(0,0,0,0.15)",
                }}
              >
                Book a 15-min call
              </Link>
              <p className="font-sans mt-4 text-[#ABABAB]" style={{ fontSize: "12px" }}>
                15 minutes. No commitment. No pitch deck.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ── TESTIMONIALS ── */}
      <section id="results" style={{ background: "#F4F4F4", padding: "clamp(48px, 9vw, 112px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <p
            className="font-sans font-semibold uppercase mb-20"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#0A0A0A" }}
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
                style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#0A0A0A" }}
              >
                Deliverables
              </p>
              <p
                className="font-sans font-bold"
                style={{ fontSize: "clamp(44px, 5.5vw, 68px)", lineHeight: 1, letterSpacing: "-0.02em", color: "#111111" }}
              >
                15,000
              </p>
              <p className="font-sans mt-3 mb-8" style={{ fontSize: "13px", color: "#5A5A5A" }}>
                emails sent per month, exactly as quoted
              </p>
              <div style={{ width: "32px", height: "2px", background: "#0A0A0A", marginBottom: "28px" }} />
              <p
                className="font-sans italic mb-auto"
                style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.75", color: "#3A3A3A" }}
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
                style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#0A0A0A" }}
              >
                Closed deal
              </p>
              <p
                className="font-sans font-bold"
                style={{ fontSize: "clamp(44px, 5.5vw, 68px)", lineHeight: 1, letterSpacing: "-0.02em", color: "#111111" }}
              >
                $12,000
              </p>
              <p className="font-sans mt-3 mb-8" style={{ fontSize: "13px", color: "#5A5A5A" }}>
                first job closed, month two
              </p>
              <div style={{ width: "32px", height: "2px", background: "#0A0A0A", marginBottom: "28px" }} />
              <p
                className="font-sans italic mb-auto"
                style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.75", color: "#3A3A3A" }}
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
                style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#0A0A0A" }}
              >
                Communication
              </p>
              <p
                className="font-sans font-bold"
                style={{ fontSize: "clamp(44px, 5.5vw, 68px)", lineHeight: 1, letterSpacing: "-0.02em", color: "#111111" }}
              >
                48 hrs
              </p>
              <p className="font-sans mt-3 mb-8" style={{ fontSize: "13px", color: "#5A5A5A" }}>
                20 email accounts and domains live. Signed up Monday.
              </p>
              <div style={{ width: "32px", height: "2px", background: "#0A0A0A", marginBottom: "28px" }} />
              <p
                className="font-sans italic mb-auto"
                style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.75", color: "#3A3A3A" }}
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
      <section id="team" style={{ background: "#050505", padding: "clamp(72px, 8vw, 96px) 0 clamp(56px, 6vw, 80px)" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <p
            className="font-sans font-semibold uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", marginBottom: "clamp(32px, 4vw, 48px)" }}
          >
            We are ScaleSteady
          </p>

          {/* Copy */}
          <div style={{ maxWidth: "680px" }}>
            <p
              className="font-sans"
              style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.8", color: "rgba(255,255,255,0.82)", fontWeight: 500 }}
            >
              Hiring us means working with a small team of 5 passionate, hands-on people -- which means your campaign will be run inside a strict, battle-tested workflow. The same one we use on our own outreach. The same one that has been booking meetings for every client we have worked with.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "clamp(13px, 1.4vw, 16px)", lineHeight: "1.85", color: "rgba(255,255,255,0.62)", marginTop: "clamp(16px, 2vw, 22px)" }}
            >
              The same people who read your replies every Tuesday. Research your market. Compose your emails. Warm your domains. Rewrite your subject line when it underperforms. All five of us. Every time.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "clamp(13px, 1.4vw, 16px)", lineHeight: "1.85", color: "rgba(255,255,255,0.62)", marginTop: "clamp(14px, 1.8vw, 20px)" }}
            >
              No account manager. No junior who inherited your file. No one who says &ldquo;let me loop in the team.&rdquo;
            </p>

            {/* Pull quote -- the payoff */}
            <div
              style={{
                borderLeft: "3px solid rgba(255,255,255,0.20)",
                paddingLeft: "clamp(20px, 2.5vw, 28px)",
                marginTop: "clamp(40px, 5vw, 64px)",
              }}
            >
              <p
                className="font-sans italic"
                style={{
                  fontSize: "clamp(22px, 3vw, 42px)",
                  lineHeight: "1.25",
                  color: "rgba(255,255,255,0.62)",
                  letterSpacing: "-0.01em",
                }}
              >
                If we are booking meetings,
              </p>
              <p
                className="font-sans italic"
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
            background: "#0A0A0A",
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
