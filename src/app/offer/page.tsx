"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ================================================================
   SCALESTEADY /OFFER PAGE
   ================================================================
   Architecture:
     Section 0 -- Hero (Pattern Interrupt)
     Section 1 -- Three Acts (Asset / Performance / Fork)
     Section 2 -- The Fork (Visual + Paths)
     Section 3 -- The Math (Logical Bind)
     Section 4 -- Trust Layer (Testimonials)
     Section 5 -- Guarantee (Typography)
     Section 6 -- Final CTA
   ================================================================ */

export default function OfferPage() {
  /* IntersectionObserver fallback for browsers without animation-timeline */
  useEffect(() => {
    const supportsScrollTimeline = CSS.supports("animation-timeline", "view()");
    if (supportsScrollTimeline) return; // native CSS handles it

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(".offer-scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  return (
    <div className="w-full min-h-screen overflow-x-hidden pb-16 lg:pb-0" style={{ background: "#050D1C" }}>

      {/* ──────────────────────────────────────────────────────────
          SECTION 0 -- HERO: THE PATTERN INTERRUPT
          ────────────────────────────────────────────────────────── */}
      <section
        className="offer-hero relative w-full -mt-[80px] flex items-center"
        style={{ minHeight: "100svh", overflow: "hidden" }}
      >
        {/* Background: Pillow-generated void gradient */}
        <div className="absolute inset-0">
          <Image
            src="/offer/hero-void.jpg"
            alt=""
            fill
            priority
            unoptimized
            className="object-cover"
            style={{ objectPosition: "center" }}
          />
          {/* Extra darken for text legibility */}
          <div className="absolute inset-0" style={{ background: "rgba(5,13,28,0.4)" }} />
        </div>

        {/* Content */}
        <div className="relative w-full" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
          <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8 offer-reveal" style={{ animationDelay: "0.1s" }}>
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
                The Offer
              </span>
            </div>

            {/* Headline -- the pattern interrupt */}
            <h1
              className="font-serif font-normal offer-reveal"
              style={{
                fontSize: "clamp(40px, 7.5vw, 100px)",
                lineHeight: "1.05",
                letterSpacing: "-0.03em",
                color: "#FAF8F6",
                maxWidth: "900px",
                animationDelay: "0.2s",
              }}
            >
              <span className="block">I don&apos;t want your money</span>
              <span className="block italic" style={{ color: "#C4431B" }}>
                unless I&apos;ve already made you money.
              </span>
            </h1>

            {/* Subheadline -- negative risk, front-loaded */}
            <p
              className="font-sans offer-reveal"
              style={{
                fontSize: "clamp(15px, 1.6vw, 20px)",
                lineHeight: "1.7",
                color: "rgba(250,248,246,0.50)",
                maxWidth: "540px",
                marginTop: "clamp(20px, 3vw, 36px)",
                animationDelay: "0.4s",
              }}
            >
              If we don&apos;t generate $5,000 in new client revenue for your business,
              you walk away with the infrastructure and owe us nothing for our labor.
            </p>

            {/* CTA */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 offer-reveal"
              style={{ marginTop: "clamp(32px, 4vw, 52px)", animationDelay: "0.55s" }}
            >
              <Link
                href="/contact"
                className="hero-cta-btn inline-flex items-center justify-center font-sans font-semibold transition-all duration-300"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#C4431B",
                  padding: "18px 48px",
                  borderRadius: "0px",
                }}
              >
                Book a call -- 15 minutes
              </Link>
              <span
                className="font-sans"
                style={{ fontSize: "12px", color: "rgba(250,248,246,0.25)" }}
              >
                Phone or Zoom. No commitment.
              </span>
            </div>

            {/* Scroll indicator */}
            <div
              className="offer-reveal mt-16 lg:mt-24"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="offer-scroll-indicator flex flex-col items-start gap-2">
                <span className="font-sans" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,248,246,0.18)" }}>
                  Scroll to read
                </span>
                <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ opacity: 0.2 }}>
                  <path d="M8 0v20M2 14l6 6 6-6" stroke="#FAF8F6" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────
          SECTION 1 -- THE THREE ACTS
          ────────────────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F6", padding: "clamp(72px, 10vw, 140px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          {/* Section label */}
          <p
            className="font-sans font-semibold uppercase mb-5 offer-scroll-reveal"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B" }}
          >
            How the deal works
          </p>
          <h2
            className="font-serif font-bold mb-16 offer-scroll-reveal"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: "1.15", color: "#111111", maxWidth: "640px" }}
          >
            Three steps. No fine print. Every asset belongs to you.
          </h2>

          {/* Three-Act Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

            {/* ACT 01 -- The Asset Acquisition */}
            <div
              className="offer-scroll-reveal relative p-8 xl:p-10 flex flex-col"
              style={{
                background: "#0A1E36",
                backgroundImage: "url(/offer/blueprint-tile.png)",
                backgroundSize: "200px 200px",
                backgroundBlendMode: "overlay",
                minHeight: "420px",
              }}
            >
              <span
                className="font-display absolute top-6 right-8"
                style={{ fontSize: "80px", fontWeight: 800, color: "rgba(255,255,255,0.04)", lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                01
              </span>
              <p
                className="font-sans font-semibold uppercase mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#C4431B" }}
              >
                The Asset Acquisition
              </p>
              <p
                className="font-serif font-bold mb-1"
                style={{ fontSize: "clamp(48px, 5vw, 68px)", lineHeight: 1, color: "#FFFFFF" }}
              >
                $500
              </p>
              <p className="font-sans mb-6" style={{ fontSize: "12px", color: "rgba(255,255,255,0.30)" }}>
                one-time setup
              </p>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />
              <ul className="flex flex-col gap-4 font-sans mb-auto" style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.65)" }}>
                {[
                  "Dedicated sending domains, registered to your business",
                  "Warmed, authenticated email inboxes",
                  "Custom-scraped lead list targeting your market",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: "#C4431B", flexShrink: 0, marginTop: "2px", fontSize: "12px" }}>&#10003;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p
                className="font-sans mt-8"
                style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}
              >
                This does not go to us.<br />
                It goes entirely to your infrastructure.
              </p>
            </div>

            {/* ACT 02 -- The Performance Phase */}
            <div
              className="offer-scroll-reveal relative p-8 xl:p-10 flex flex-col"
              style={{ background: "#0D2B4A", minHeight: "420px" }}
            >
              <span
                className="font-display absolute top-6 right-8"
                style={{ fontSize: "80px", fontWeight: 800, color: "rgba(255,255,255,0.04)", lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                02
              </span>
              <p
                className="font-sans font-semibold uppercase mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.35)" }}
              >
                The Performance Phase
              </p>
              <p
                className="font-serif font-bold mb-1"
                style={{ fontSize: "clamp(48px, 5vw, 68px)", lineHeight: 1, color: "#FFFFFF" }}
              >
                $0
              </p>
              <p className="font-sans mb-6" style={{ fontSize: "12px", color: "rgba(255,255,255,0.30)" }}>
                our fee, until you hit $5,000
              </p>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />
              <ul className="flex flex-col gap-4 font-sans mb-auto" style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.65)" }}>
                {[
                  "We write the outreach scripts",
                  "We manage every campaign end to end",
                  "We optimize, monitor inbox health, and iterate",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: "#C4431B", flexShrink: 0, marginTop: "2px", fontSize: "12px" }}>&#10003;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p
                className="font-sans mt-8"
                style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}
              >
                We do not invoice you until<br />
                your bank account moves first.
              </p>
            </div>

            {/* ACT 03 -- The Fork */}
            <div
              className="offer-scroll-reveal relative p-8 xl:p-10 flex flex-col"
              style={{
                background: "#FFFFFF",
                borderTop: "4px solid #C4431B",
                minHeight: "420px",
              }}
            >
              <span
                className="font-display absolute top-6 right-8"
                style={{ fontSize: "80px", fontWeight: 800, color: "rgba(0,0,0,0.04)", lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                03
              </span>
              <p
                className="font-sans font-semibold uppercase mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#C4431B" }}
              >
                The Fork in the Road
              </p>
              <p
                className="font-serif font-bold mb-1"
                style={{ fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.1, color: "#111111" }}
              >
                $5,000
              </p>
              <p className="font-sans mb-6" style={{ fontSize: "12px", color: "#9E9E9E" }}>
                in new client revenue, then you choose
              </p>
              <div style={{ width: "100%", height: "1px", background: "#E8E8E8", marginBottom: "24px" }} />
              <div className="flex flex-col gap-4 font-sans mb-auto" style={{ fontSize: "13.5px", color: "#3D3D3D" }}>
                <div className="flex items-start gap-3">
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1B4F8A", marginTop: "5px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 600, color: "#111111", marginBottom: "2px" }}>Scale</p>
                    <p style={{ color: "#6B6B6B" }}>$699/mo retainer. Keep scaling the pipeline.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C4431B", marginTop: "5px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 600, color: "#111111", marginBottom: "2px" }}>Walk</p>
                    <p style={{ color: "#6B6B6B" }}>Take everything we built and run your own campaigns. Owe us nothing.</p>
                  </div>
                </div>
              </div>
              <p
                className="font-sans mt-8"
                style={{ fontSize: "13px", fontWeight: 600, color: "#111111", lineHeight: 1.6 }}
              >
                Both options are wins.<br />
                There is no bad door.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────
          SECTION 2 -- THE FORK (VISUAL EXPANSION)
          ────────────────────────────────────────────────────────── */}
      <section style={{ background: "#050D1C", padding: "clamp(80px, 10vw, 140px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1080px" }}>

          {/* Headline */}
          <p
            className="font-sans font-semibold uppercase mb-5 offer-scroll-reveal"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B" }}
          >
            The Fork
          </p>
          <h2
            className="font-serif font-normal italic offer-scroll-reveal"
            style={{
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: "1.15",
              color: "#FAF8F6",
              letterSpacing: "-0.02em",
              maxWidth: "600px",
              marginBottom: "16px",
            }}
          >
            Two roads. Both are wins.
          </h2>
          <p
            className="font-sans offer-scroll-reveal"
            style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(250,248,246,0.35)", maxWidth: "520px", marginBottom: "clamp(48px, 6vw, 80px)" }}
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
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "10px", height: "10px", borderRadius: "50%", background: "#C4431B" }} />
              </div>
            </div>

            {/* Two Paths */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

              {/* Path A: Scale */}
              <div
                className="offer-scroll-reveal p-8 xl:p-10 flex flex-col"
                style={{
                  background: "rgba(13,43,74,0.6)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  minHeight: "380px",
                }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div style={{ width: "8px", height: "8px", background: "#1B4F8A", borderRadius: "50%" }} />
                  <span className="font-sans font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#1B4F8A" }}>
                    Scale
                  </span>
                </div>

                <p className="font-serif font-bold mb-2" style={{ fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, color: "#FFFFFF" }}>
                  $699<span style={{ fontSize: "16px", color: "rgba(255,255,255,0.35)" }}>/mo</span>
                </p>
                <p className="font-sans mb-8" style={{ fontSize: "12px", color: "rgba(255,255,255,0.30)" }}>
                  12-month retainer
                </p>

                <ul className="flex flex-col gap-5 font-sans mb-auto" style={{ fontSize: "13.5px" }}>
                  {[
                    { bold: "Keep the pipeline running.", rest: " Revenue keeps flowing." },
                    { bold: "Scale the volume.", rest: " More inboxes, more sequences, more conversations." },
                    { bold: "Dedicated team.", rest: " Same people, same workflow, every week." },
                  ].map((item) => (
                    <li key={item.bold} className="flex items-start gap-3">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: "rgba(255,255,255,0.65)" }}>
                        <strong style={{ color: "rgba(255,255,255,0.90)" }}>{item.bold}</strong>{item.rest}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="font-sans mt-8" style={{ fontSize: "12px", color: "rgba(255,255,255,0.20)", lineHeight: 1.6, fontStyle: "italic" }}>
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

                <p className="font-serif font-bold mb-2" style={{ fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, color: "#FFFFFF" }}>
                  $0
                </p>
                <p className="font-sans mb-8" style={{ fontSize: "12px", color: "rgba(255,255,255,0.30)" }}>
                  owed to us for our labor
                </p>

                <ul className="flex flex-col gap-5 font-sans mb-auto" style={{ fontSize: "13.5px" }}>
                  {[
                    { bold: "Keep the domains.", rest: " Registered to your business." },
                    { bold: "Keep the inboxes.", rest: " Warmed and authenticated." },
                    { bold: "Keep the lead list.", rest: " Your market, verified and mapped." },
                  ].map((item) => (
                    <li key={item.bold} className="flex items-start gap-3">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ marginTop: "3px" }} viewBox="0 0 24 24" fill="none" stroke="#C4431B" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: "rgba(255,255,255,0.65)" }}>
                        <strong style={{ color: "rgba(255,255,255,0.90)" }}>{item.bold}</strong>{item.rest}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="font-sans mt-8" style={{ fontSize: "12px", color: "rgba(255,255,255,0.20)", lineHeight: 1.6, fontStyle: "italic" }}>
                  You have never hired an agency and walked out with a premium setup worth more than you paid. Until now.
                </p>
              </div>

            </div>

            {/* The Logical Bind */}
            <div className="offer-scroll-reveal" style={{ marginTop: "clamp(48px, 6vw, 80px)", textAlign: "center" }}>
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(28px, 4vw, 52px)",
                  lineHeight: 1.15,
                  color: "#C4431B",
                  letterSpacing: "-0.02em",
                }}
              >
                You literally cannot lose.
              </p>
              <p
                className="font-sans mx-auto"
                style={{
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "rgba(250,248,246,0.22)",
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


      {/* ──────────────────────────────────────────────────────────
          SECTION 3 -- THE GUARANTEE (PURE TYPOGRAPHY)
          ────────────────────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 140px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "960px", textAlign: "center" }}>

          <p
            className="font-sans font-semibold uppercase mb-10 offer-scroll-reveal"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B" }}
          >
            The Guarantee
          </p>

          <h2
            className="font-serif font-bold offer-scroll-reveal"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              lineHeight: 1.1,
              color: "#0D2B4A",
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
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────
          SECTION 4 -- TRUST LAYER (TESTIMONIALS)
          ────────────────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F6", padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <p
            className="font-sans font-semibold uppercase mb-16 offer-scroll-reveal"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B" }}
          >
            What clients say
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0" style={{ alignItems: "stretch" }}>

            {/* T1: HVAC */}
            <div
              className="offer-scroll-reveal flex flex-col lg:pr-12"
              style={{ borderBottom: "1px solid #E8E8E8" }}
            >
              <p className="font-serif font-bold" style={{ fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, color: "#111111" }}>
                15,000
              </p>
              <p className="font-sans mt-3 mb-6" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                emails sent per month, exactly as quoted
              </p>
              <div style={{ width: "32px", height: "2px", background: "#C4431B", marginBottom: "24px" }} />
              <p className="font-serif italic mb-auto" style={{ fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.75, color: "#3D3D3D" }}>
                &ldquo;I&apos;ve been burned by marketing guys before. But these guys showed me the price,
                told me exactly how many emails go out, and gave me a timeline. No surprises, no upsells.
                Just organized people who do what they said they&apos;d do.&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #E8E8E8", marginTop: "28px", paddingTop: "16px" }}>
                <p className="font-sans" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#ABABAB", textTransform: "uppercase" }}>
                  Mike T., HVAC contractor, southeast Michigan
                </p>
              </div>
            </div>

            {/* T2: Roofing */}
            <div
              className="offer-scroll-reveal flex flex-col lg:px-12"
              style={{ borderLeft: "1px solid transparent", borderRight: "1px solid transparent" }}
            >
              <style>{`@media (min-width:1024px) { .offer-t2-borders { border-left-color: #E8E8E8 !important; border-right-color: #E8E8E8 !important; } }`}</style>
              <div className="offer-t2-borders flex flex-col h-full lg:border-l lg:border-r" style={{ borderColor: "#E8E8E8" }}>
                <p className="font-serif font-bold" style={{ fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, color: "#111111" }}>
                  $12,000
                </p>
                <p className="font-sans mt-3 mb-6" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                  first job closed, month two
                </p>
                <div style={{ width: "32px", height: "2px", background: "#C4431B", marginBottom: "24px" }} />
                <p className="font-serif italic mb-auto" style={{ fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.75, color: "#3D3D3D" }}>
                  &ldquo;Second month a reply came in, turned into a twelve thousand dollar re-roof.
                  One job. Paid for the whole year and then some. I don&apos;t even think about it anymore,
                  it just runs in the background and leads show up.&rdquo;
                </p>
                <div style={{ borderTop: "1px solid #E8E8E8", marginTop: "28px", paddingTop: "16px" }}>
                  <p className="font-sans" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#ABABAB", textTransform: "uppercase" }}>
                    Tony R., roofing contractor, western Pennsylvania
                  </p>
                </div>
              </div>
            </div>

            {/* T3: Chiropractic */}
            <div
              className="offer-scroll-reveal flex flex-col lg:pl-12"
              style={{ borderTop: "1px solid #E8E8E8" }}
            >
              <p className="font-serif font-bold lg:mt-0 mt-8" style={{ fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, color: "#111111" }}>
                48 hrs
              </p>
              <p className="font-sans mt-3 mb-6" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                fully live, signed up Monday
              </p>
              <div style={{ width: "32px", height: "2px", background: "#C4431B", marginBottom: "24px" }} />
              <p className="font-serif italic mb-auto" style={{ fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.75, color: "#3D3D3D" }}>
                &ldquo;Signed up on Monday, by Wednesday they had everything built.
                Two weeks later emails were going out. Every Monday I get a quick update --
                who replied, what they said, what&apos;s next. Short, clear, no fluff.&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #E8E8E8", marginTop: "28px", paddingTop: "16px" }}>
                <p className="font-sans" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#ABABAB", textTransform: "uppercase" }}>
                  Dr. Sarah L., chiropractic practice, northwest Ohio
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────
          SECTION 5 -- FINAL CTA
          ────────────────────────────────────────────────────────── */}
      <section style={{ background: "#050D1C", padding: "clamp(80px, 10vw, 140px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "800px", textAlign: "center" }}>

          <p
            className="font-sans font-semibold uppercase mb-8 offer-scroll-reveal"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B" }}
          >
            Ready?
          </p>

          <h2
            className="font-serif font-normal offer-scroll-reveal"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              lineHeight: 1.1,
              color: "#FAF8F6",
              letterSpacing: "-0.02em",
              marginBottom: "clamp(24px, 3vw, 40px)",
            }}
          >
            Let&apos;s talk about your market.
          </h2>

          <p
            className="font-sans mx-auto offer-scroll-reveal"
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(250,248,246,0.35)",
              maxWidth: "440px",
              marginBottom: "clamp(32px, 4vw, 52px)",
            }}
          >
            15 minutes. Phone or Zoom. Fred walks you through the setup,
            the timeline, and what the first 60 days look like.
          </p>

          <Link
            href="/contact"
            className="offer-scroll-reveal hero-cta-btn inline-flex items-center justify-center font-sans font-semibold transition-all duration-300"
            style={{
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "#C4431B",
              padding: "20px 56px",
              borderRadius: "0px",
            }}
          >
            Book a discovery call
          </Link>

          <p
            className="font-sans offer-scroll-reveal"
            style={{ fontSize: "12px", color: "rgba(250,248,246,0.18)", marginTop: "20px" }}
          >
            No commitment. No pitch deck.
          </p>

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
            background: "#C4431B",
            padding: "13px 20px",
            borderRadius: "0px",
            flex: "1",
          }}
        >
          Book a call
        </Link>
      </div>

    </div>
  );
}
