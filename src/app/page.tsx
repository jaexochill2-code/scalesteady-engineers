"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CountUp from "@/components/client/CountUp";
import AnimateOnScroll from "@/components/client/AnimateOnScroll";

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
    <div className="w-full min-h-screen overflow-x-hidden" style={{ background: "#FAF8F6" }}>

      {/* ── HERO — 95svh: scroll provocation ── */}
      <section
        className="hero-section relative w-full -mt-[80px]"
        style={{ height: "88svh", minHeight: "600px" }}
      >

        {/* Image pane */}
        <div
          className="hero-image-pane absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ width: "58%", height: "100%" }}
        >
          {/* hero-photo-reveal: inner wrapper avoids transform conflict with -translate-y-1/2 on outer pane */}
          <div className="hero-photo-reveal" style={{ height: "100%" }}>
            <Image
              src="/hero-team.jpeg"
              alt="ScaleSteady outbound infrastructure team"
              width={2752}
              height={1536}
              priority
              unoptimized
              className="w-full h-full object-cover block"
              style={{ objectPosition: "70% center" }}
            />
            {/* Right-edge gradient — cream blend */}
            <div
              className="absolute inset-y-0 right-0"
              style={{
                width: "22%",
                background: "linear-gradient(to right, transparent 0%, rgba(250,248,246,0.5) 55%, #FAF8F6 100%)",
              }}
            />
          </div>
        </div>

        {/* Cream panel — right 42% */}
        <div
          className="absolute inset-y-0 right-0 hidden lg:block"
          style={{ width: "42%", background: "#FAF8F6" }}
        />

        {/* Content */}
        <div
          className="relative h-full flex items-center justify-end"
          style={{ paddingTop: "80px" }}
        >

          {/* Desktop copy */}
          <div
            className="hidden lg:flex flex-col justify-center h-full px-12 xl:px-16 2xl:px-20 relative"
            style={{ width: "42%", paddingLeft: "clamp(40px, 3.5vw, 64px)" }}
          >
            {/* Terracotta brand rule — anchored accent, stops at natural content boundary */}
            <div
              className="absolute left-0"
              style={{ top: "50%", transform: "translateY(-50%)", width: "3px", height: "260px", background: "#C4431B" }}
            />

            <h1
              className="font-serif font-normal"
              style={{
                fontSize: "clamp(42px, 5vw, 80px)",
                lineHeight: "1.08",
                letterSpacing: "-0.02em",
                color: "#0D2B4A",
              }}
            >
              <span className="hero-word" style={{ animationDelay: "0s" }}>If you&apos;re here,</span>
              <br />
              <span className="hero-word italic" style={{ animationDelay: "0.12s", color: "#C4431B" }}>the email worked.</span>
            </h1>

            <p
              className="font-sans hero-body-copy mt-6"
              style={{ fontSize: "17px", lineHeight: "1.72", color: "#3D3D3D", maxWidth: "340px" }}
            >
              We build the same system for your business.
            </p>

            {/* CTA zone — enters as unit after body copy */}
            <div className="hero-cta-wrap mt-8">
              <Link
                href="/contact"
                className="hero-cta-btn inline-flex items-center justify-center font-sans font-semibold transition-all duration-300"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#1B4F8A",
                  padding: "18px 44px",
                  borderRadius: "0px",
                }}
              >
                Book a discovery call
              </Link>
              <p
                className="font-sans hero-risk-text mt-3"
                style={{ fontSize: "12px", color: "#9E9E9E", letterSpacing: "0.01em" }}
              >
                15 minutes. No commitment.
              </p>
            </div>

          </div>

          {/* Mobile -- split-stack: photo top, copy bottom on cream */}
          <div className="lg:hidden flex flex-col w-full">
            {/* Photo pane -- explicit height, Image fill needs sized parent */}
            <div className="relative w-full" style={{ height: "50svh", minHeight: "280px" }}>
              <Image
                src="/hero-team.jpeg"
                alt="ScaleSteady team strategy session"
                fill
                unoptimized
                className="object-cover"
                style={{ objectPosition: "center 60%" }}
              />
              {/* Bottom fade into cream */}
              <div
                className="absolute inset-x-0 bottom-0"
                style={{ height: "60px", background: "linear-gradient(to bottom, transparent, #FAF8F6)" }}
              />
            </div>

            {/* Copy pane — solid cream, no contrast issues */}
            <div
              className="px-6 sm:px-10 pb-8 pt-2"
              style={{ background: "#FAF8F6", flex: "0 0 auto", borderLeft: "3px solid #C4431B", marginLeft: "24px" }}
            >
              <h1
                className="font-serif font-normal"
                style={{ fontSize: "clamp(32px, 8vw, 48px)", lineHeight: "1.1", letterSpacing: "-0.02em", color: "#0D2B4A" }}
              >
                If you&apos;re here,{" "}
                <span className="italic" style={{ color: "#C4431B" }}>the email worked.</span>
              </h1>
              <p
                className="font-sans mt-4"
                style={{ fontSize: "15px", lineHeight: "1.7", color: "#3D3D3D", maxWidth: "360px" }}
              >
                We build the same system for your business.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center font-brand font-semibold"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    background: "#1B4F8A",
                    padding: "14px 36px",
                    borderRadius: "0px",
                  }}
                >
                  Book a discovery call
                </Link>
                <p
                  className="font-sans mt-3"
                  style={{ fontSize: "11px", color: "#9E9E9E", letterSpacing: "0.01em" }}
                >
                  15 minutes. No commitment.
                </p>
              </div>
            </div>
          </div>

        </div>

      </section>



      {/* ── THE OUTBOUND TRUTHS ── */}
      <section style={{ background: "#FAF8F6", padding: "clamp(100px, 12vw, 160px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "800px" }}>
          
          {/* Left-anchored accent border + tactile hover focus group */}
          <div className="focus-group flex flex-col gap-12 border-l-[3px] pl-8 sm:pl-10" style={{ borderColor: "#C4431B" }}>
            
            <p
              className="font-sans"
              style={{
                fontSize: "clamp(24px, 3.2vw, 36px)",
                lineHeight: "1.4",
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
                fontSize: "clamp(24px, 3.2vw, 36px)",
                lineHeight: "1.4",
                color: "#3D3D3D",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Networking is slow. Cold calling is unsexy. <strong style={{ color: "#1B4F8A", fontWeight: 600 }}>Automation scales</strong>.
            </p>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(24px, 3.2vw, 36px)",
                lineHeight: "1.4",
                color: "#3D3D3D",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              The math is clear: a 1% response on 50,000 targeted emails delivers 500 active conversations. That is your <strong style={{ color: "#1B4F8A", fontWeight: 600 }}>physical floor</strong>.
            </p>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(24px, 3.2vw, 36px)",
                lineHeight: "1.4",
                color: "#0D2B4A",
                fontWeight: 600,
                letterSpacing: "-0.02em",
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

          {/* Section label */}
          <div className="mb-12">
            <p
              className="font-sans font-semibold uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)" }}
            >
              Two types of business
            </p>
          </div>

          {/* Two columns: current self → future self */}
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

          </div>

          {/* ── Declaration ── */}
          <div className="mt-14 pt-12" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

              <div className="flex-1">
                <h3 className="font-serif font-normal" style={{ fontSize: "clamp(30px, 4vw, 52px)", lineHeight: "1.1", letterSpacing: "-0.02em", color: "#FFFFFF" }}>
                  We don&apos;t find you leads.
                  <br />
                  <span className="italic" style={{ color: "#7EC4E0" }}>We build the system</span> that does.
                </h3>
                <p className="font-sans mt-4" style={{ fontSize: "15px", lineHeight: "1.7", color: "rgba(255,255,255,0.45)", maxWidth: "480px" }}>
                  Infrastructure you own. A pipeline that runs without you. A calendar that fills itself.
                </p>
              </div>

              <div className="flex-shrink-0">
                <a href="/contact"
                  className="inline-flex items-center gap-3 font-sans font-semibold transition-all duration-300 hover:bg-[#7EC4E0] hover:text-[#0D2B4A] group"
                  style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#0D2B4A", background: "#FFFFFF", padding: "18px 44px" }}
                >
                  Book a discovery call
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
                <p className="font-sans mt-3" style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
                  15 minutes. No commitment.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>




      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(96px, 11vw, 160px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <p
            className="font-sans font-semibold uppercase mb-20"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B" }}
          >
            What clients say
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3">

            {/* T1: Deliverables Honesty — HVAC */}
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
                24,000
              </p>
              <p className="font-sans mt-3 mb-8" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                emails sent per month, exactly as quoted
              </p>
              <div style={{ width: "32px", height: "2px", background: "#C4431B", marginBottom: "28px" }} />
              <p
                className="font-serif italic mb-auto"
                style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.75", color: "#3D3D3D" }}
              >
                &ldquo;They told us upfront how many emails go out every month. Twenty-four thousand. Every Monday the report confirmed it. I have worked with people who promise volume and cannot tell you what actually went out. These guys could. Every number they quoted on day one showed up in the report.&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #E8E8E8", marginTop: "32px", paddingTop: "20px" }}>
                <p className="font-sans" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#ABABAB", textTransform: "uppercase" }}>
                  Mike T., HVAC contractor, southeast Michigan
                </p>
              </div>
            </div>

            {/* T2: Closed Deal — Roofing */}
            <div
              className="flex flex-col py-16 lg:py-0"
              style={{
                padding: "clamp(24px, 4vw, 56px)",
                borderTop: "1px solid #E8E8E8",
                borderBottom: "1px solid #E8E8E8",
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
                &ldquo;Second month we closed a roofing contract worth twelve thousand. That one job paid for two and a half years of this service. I stopped doing the math after that because it stopped being a question. The system keeps running.&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #E8E8E8", marginTop: "32px", paddingTop: "20px" }}>
                <p className="font-sans" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#ABABAB", textTransform: "uppercase" }}>
                  Tony R., roofing contractor, western Pennsylvania
                </p>
              </div>
            </div>

            {/* T3: Speed + Communication — Chiropractic */}
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
                &ldquo;Signed up Monday. By Wednesday all 20 email accounts were built and the domains were set up. Two weeks of warmup and the first emails went to market on day fourteen. Every Monday I get a short note: who replied, what they said, what is next. I have never once had to chase them.&rdquo;
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




      {/* ── PRICING ── */}
      <section style={{ background: "#FAF8F6", padding: "clamp(96px, 11vw, 160px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          {/* Eyebrow */}
          <p
            className="font-sans font-semibold uppercase mb-6"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B" }}
          >
            Pricing
          </p>

          {/* Headline */}
          <h2
            className="font-serif font-bold mb-6"
            style={{ fontSize: "clamp(30px, 3.8vw, 50px)", lineHeight: "1.1", color: "#111111", maxWidth: "620px" }}
          >
            The average local service client is worth $3,000 to $15,000. Do the math.
          </h2>

          {/* ROI strip */}
          <p
            className="font-sans mb-16"
            style={{ fontSize: "13px", color: "#6B6B6B", borderLeft: "2px solid #E8E8E8", paddingLeft: "16px" }}
          >
            Email averages $36 returned for every $1 spent. Source: Litmus State of Email, 2024.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ alignItems: "stretch" }}>

            {/* SCALE */}
            <div className="flex flex-col p-8 xl:p-10" style={{ border: "1px solid #E8E8E8", background: "#FFFFFF" }}>
              <p
                className="font-sans font-semibold uppercase mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#6B6B6B" }}
              >
                Scale
              </p>
              <div className="mb-1">
                <span className="font-serif font-bold" style={{ fontSize: "clamp(42px, 5vw, 60px)", lineHeight: 1, color: "#111111" }}>$999</span>
                <span className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>/mo</span>
              </div>
              <p className="font-sans mb-8" style={{ fontSize: "12px", color: "#ABABAB" }}>
                A $5,000 client covers 5 months at this tier.
              </p>
              <div style={{ width: "100%", height: "1px", background: "#E8E8E8", marginBottom: "28px" }} />
              <ul className="flex flex-col gap-4 mb-auto font-sans" style={{ fontSize: "13.5px", color: "#3D3D3D" }}>
                {[
                  "100 email inboxes",
                  "20 routing domains — more people find your business",
                  "75,000 emails sent per month",
                  "We build your lead list and full market research",
                  "Unlimited outreach sequences",
                  "1 dedicated account manager — single point of contact, works hand in hand with you",
                  "Everything we build belongs to you",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span style={{ color: "#C4431B", flexShrink: 0, marginTop: "2px", fontSize: "12px" }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3">
                <a
                  href="/contact"
                  className="font-sans font-semibold text-center"
                  style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#111111", border: "1px solid #111111", padding: "14px 24px", display: "block" }}
                >
                  Get started
                </a>
                <a
                  href="/contact"
                  className="font-sans text-center"
                  style={{ fontSize: "12px", color: "#ABABAB", textDecoration: "underline", display: "block" }}
                >
                  Book a call first
                </a>
              </div>
            </div>

            {/* GROWTH — featured */}
            <div
              className="flex flex-col p-8 xl:p-10 relative"
              style={{ background: "#0D2B4A", border: "1px solid #0D2B4A", marginTop: "-20px", marginBottom: "-20px", zIndex: 10, boxShadow: "0 24px 64px rgba(13,43,74,0.25)" }}
            >
              <div className="mb-6 flex items-center justify-between">
                <p
                  className="font-sans font-semibold uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.45)" }}
                >
                  Growth
                </p>
                <span
                  className="font-sans font-bold uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#FFFFFF", background: "#C4431B", padding: "4px 10px" }}
                >
                  Most Popular
                </span>
              </div>
              <div className="mb-1">
                <span className="font-serif font-bold" style={{ fontSize: "clamp(42px, 5vw, 60px)", lineHeight: 1, color: "#FFFFFF" }}>$699</span>
                <span className="font-sans" style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>/mo</span>
              </div>
              <p className="font-sans mb-8" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                A $5,000 client covers 7 months at this tier.
              </p>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "28px" }} />
              <ul className="flex flex-col gap-4 mb-auto font-sans" style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)" }}>
                {[
                  "50 email inboxes",
                  "10 routing domains — more people find your business",
                  "37,500 emails sent per month",
                  "We build your lead list and full market research",
                  "3 outreach sequences — battle-tested playbook",
                  "Everything we build belongs to you",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span style={{ color: "#C4431B", flexShrink: 0, marginTop: "2px", fontSize: "12px" }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3">
                <a
                  href="/contact"
                  className="font-sans font-semibold text-center"
                  style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#0D2B4A", background: "#FFFFFF", padding: "14px 24px", display: "block" }}
                >
                  Get started
                </a>
                <a
                  href="/contact"
                  className="font-sans text-center"
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "underline", display: "block" }}
                >
                  Book a call first
                </a>
              </div>
            </div>

            {/* STARTER */}
            <div className="flex flex-col p-8 xl:p-10" style={{ border: "1px solid #E8E8E8", background: "#FFFFFF" }}>
              <p
                className="font-sans font-semibold uppercase mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#6B6B6B" }}
              >
                Starter
              </p>
              <div className="mb-1">
                <span className="font-serif font-bold" style={{ fontSize: "clamp(42px, 5vw, 60px)", lineHeight: 1, color: "#111111" }}>$399</span>
                <span className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>/mo</span>
              </div>
              <p className="font-sans mb-8" style={{ fontSize: "12px", color: "#ABABAB" }}>
                A $5,000 client covers 12 months at this tier.
              </p>
              <div style={{ width: "100%", height: "1px", background: "#E8E8E8", marginBottom: "28px" }} />
              <ul className="flex flex-col gap-4 mb-auto font-sans" style={{ fontSize: "13.5px", color: "#3D3D3D" }}>
                {[
                  "20 email inboxes",
                  "4 routing domains — more people find your business",
                  "15,000 emails sent per month",
                  "We build your lead list — you never prospect manually again",
                  "1 outreach sequence — same playbook we use for our own clients",
                  "Everything we build belongs to you",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span style={{ color: "#C4431B", flexShrink: 0, marginTop: "2px", fontSize: "12px" }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3">
                <a
                  href="/contact"
                  className="font-sans font-semibold text-center"
                  style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#111111", border: "1px solid #111111", padding: "14px 24px", display: "block" }}
                >
                  Get started
                </a>
                <a
                  href="/contact"
                  className="font-sans text-center"
                  style={{ fontSize: "12px", color: "#ABABAB", textDecoration: "underline", display: "block" }}
                >
                  Book a call first
                </a>
              </div>
            </div>

          </div>

          {/* Ownership */}
          <div className="mt-12 text-center">
            <p
              className="font-sans"
              style={{ fontSize: "14px", lineHeight: "1.75", color: "#6B6B6B", maxWidth: "560px", margin: "0 auto" }}
            >
              The accounts, the lists, the sequences. They belong to you. Cancel anytime and keep everything we built.
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-20" style={{ maxWidth: "640px" }}>
            {[
              { q: "Do I need technical knowledge to run this?", a: "No. We handle the setup. You respond to interested prospects." },
              { q: "What happens to my accounts if I cancel?", a: "They stay with you. We hand over everything on the last day." },
              { q: "How long before emails go out?", a: "Setup takes 7 to 14 days. We warm the accounts first so your deliverability is protected from day one." },
            ].map((item, i) => (
              <div key={i} style={{ borderTop: "1px solid #E8E8E8", padding: "24px 0" }}>
                <p className="font-sans font-semibold mb-3" style={{ fontSize: "14px", color: "#111111" }}>{item.q}</p>
                <p className="font-sans" style={{ fontSize: "14px", lineHeight: "1.7", color: "#6B6B6B" }}>{item.a}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FINAL CTA — Void #050D1C ── */}
      <section style={{ background: "#050D1C", padding: "clamp(96px, 11vw, 160px) 0" }}>

        <div className="mx-auto px-8 sm:px-12 lg:px-24 text-center" style={{ maxWidth: "768px" }}>
          <h2
            className="font-serif font-normal text-white"
            style={{ fontSize: "clamp(40px, 5.5vw, 72px)", lineHeight: "1.08" }}
          >
            Let&apos;s talk about<br />your pipeline.
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: "16px",
              lineHeight: "1.75",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "480px",
              margin: "24px auto 40px",
            }}
          >
            15 minutes with our team. We&apos;ll map your market, outline the infrastructure, and give you the blueprint. Yours to keep regardless of fit.
          </p>
          <Link
            href="/contact"
            className="hero-cta-btn inline-flex items-center justify-center font-sans font-semibold transition-all duration-300"
            style={{
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0D2B4A",
              background: "#FFFFFF",
              padding: "18px 48px",
              borderRadius: "0px",
            }}
          >
            Book a discovery call
          </Link>
        </div>
      </section>

    </div>
  );
}
