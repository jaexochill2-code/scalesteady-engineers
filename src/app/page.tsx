import Link from "next/link";
import Image from "next/image";
import CountUp from "@/components/client/CountUp";
import AnimateOnScroll from "@/components/client/AnimateOnScroll";

const SERVICES = [
  {
    title: "Outbound Infrastructure",
    desc: "50+ dedicated sending domains. Programmatic SPF, DKIM, DMARC. Warmed, monitored, and rotated so your deliverability is an engineered outcome — not a daily gamble.",
  },
  {
    title: "Pipeline Automation",
    desc: "Positive replies route straight into your CRM and trigger booking sequences automatically. The gap between interest and a call on your calendar closes to zero.",
  },
  {
    title: "Intent-Based Targeting",
    desc: "We pull real-time buying signals — permit filings, hiring activity, funding announcements — and build a live list of buyers who entered the market this week. Not last quarter.",
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
              alt="ScaleSteady Pipeline Engineers strategy session"
              width={2752}
              height={1536}
              priority
              unoptimized
              className="w-full h-full object-cover object-center block"
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
                fontSize: "clamp(48px, 5.5vw, 92px)",
                lineHeight: "1.08",
                letterSpacing: "-0.02em",
                color: "#0D2B4A",
              }}
            >
              <span className="hero-word" style={{ animationDelay: "0s", marginRight: "0.22em" }}>The</span>
              <span className="hero-word" style={{ animationDelay: "0.09s" }}>experts</span>
              <br />
              <span className="hero-word" style={{ animationDelay: "0.18s", marginRight: "0.22em" }}>in</span>
              <span className="hero-word" style={{ animationDelay: "0.27s", marginRight: "0.22em" }}>your</span>
              <span className="hero-word italic" style={{ animationDelay: "0.36s", marginRight: "0.22em", color: "#C4431B" }}>pipeline&apos;s</span>
              <span className="hero-word" style={{ animationDelay: "0.45s" }}>care.</span>
            </h1>

            <p
              className="font-sans hero-body-copy mt-6"
              style={{ fontSize: "17px", lineHeight: "1.72", color: "#3D3D3D", maxWidth: "370px" }}
            >
              We build and manage the outbound infrastructure that fills your calendar with qualified meetings. No ad spend. No guesswork. Fully owned by you.
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
                The experts in your <span className="italic" style={{ color: "#C4431B" }}>pipeline&apos;s</span> care.
              </h1>
              <p
                className="font-sans mt-4"
                style={{ fontSize: "15px", lineHeight: "1.7", color: "#3D3D3D", maxWidth: "360px" }}
              >
                Outbound infrastructure that fills your calendar. No ad spend, fully owned by you.
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

      {/* ── CLIENT BAR — proof zone ── */}
      <section
        className="hidden lg:block"
        style={{ background: "#FFFFFF", borderTop: "1px solid #E8E8E8", borderBottom: "1px solid #E8E8E8" }}
      >
        <div
          className="mx-auto px-8 sm:px-12 lg:px-24 flex items-center gap-4"
          style={{ maxWidth: "1280px", paddingTop: "18px", paddingBottom: "18px" }}
        >
          <span
            className="font-sans font-semibold uppercase flex-shrink-0"
            style={{ fontSize: "10px", letterSpacing: "0.1em", color: "#C4C4C4" }}
          >
            Trusted by
          </span>
          <div style={{ width: "1px", height: "16px", background: "#E8E8E8", flexShrink: 0 }} />
          <div className="flex items-center gap-10 xl:gap-16">
            {CLIENTS.map((n) => (
              <span
                key={n}
                className="font-sans font-medium uppercase"
                style={{ fontSize: "11px", letterSpacing: "0.07em", color: "#ABABAB" }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BRIDGE */}
      <section style={{ background: "#FAF8F6", padding: "clamp(56px, 7vw, 96px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "760px" }}>

          <p
            className="font-sans font-semibold uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4431B", marginBottom: "24px" }}
          >
            Outbound Systems for Service Businesses
          </p>

          <h2
            className="font-serif font-normal"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", lineHeight: "1.14", letterSpacing: "-0.02em", color: "#0D2B4A", marginBottom: "24px" }}
          >
            ScaleSteady builds the outreach system that keeps your pipeline full.
            We take you from depending on word of mouth to knowing exactly where
            your next customer is coming from.
          </h2>

          <p
            className="font-sans"
            style={{ fontSize: "16px", lineHeight: "1.8", color: "#4A4A4A", marginBottom: "40px" }}
          >
            We have spent two years building this for local service businesses in HVAC,
            roofing, home services, and health. The playbook works the same across every
            vertical because the problem is the same: you need a consistent way to bring
            in new business that does not depend on referrals or ad spend. Every client we
            work with ends our engagement with a system they fully own and a calendar that
            keeps filling.
          </p>

          {/* Proof strip */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ borderTop: "1px solid #E2DDD8" }}
          >
            {[
              { label: "Industries served", value: "HVAC, Roofing, Health & Home Services" },
              { label: "What you keep", value: "Every account, list, and sequence we build" },
              { label: "Contract terms", value: "No retainer. No lock-in. Ever." },
            ].map((item, i) => (
              <div
                key={i}
                className="py-6 pr-8"
                style={{
                  borderRight: i < 2 ? "1px solid #E2DDD8" : "none",
                  paddingLeft: i === 0 ? 0 : "32px",
                }}
              >
                <p
                  className="font-sans font-semibold uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#ABABAB", marginBottom: "8px" }}
                >
                  {item.label}
                </p>
                <p
                  className="font-sans"
                  style={{ fontSize: "14px", lineHeight: "1.55", color: "#0D2B4A" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
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

      {/* ── MANIFESTO — Void #050D1C ── */}
      <section style={{ background: "#050D1C", padding: "clamp(96px, 11vw, 160px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "960px" }}>
          <blockquote
            className="font-serif font-normal"
            style={{ fontSize: "clamp(26px, 3.8vw, 52px)", lineHeight: "1.18", color: "#FFFFFF" }}
          >
            &ldquo;Most growth partners treat outbound like a creative campaign. We treat it like{" "}
            <span className="italic" style={{ color: "#7EC4E0" }}>structural engineering</span>.
            If your systems don&apos;t have built-in redundancy, they are liabilities.&rdquo;
          </blockquote>
        </div>
      </section>


      {/* ── SERVICES ── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(96px, 11vw, 160px) 0" }}>

        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>

          <div className="mb-16 sm:mb-20">
            <h2
              className="font-serif font-bold"
              style={{ fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: "1.05", color: "#111111" }}
            >
              What we build
            </h2>
            <p
              className="font-sans mt-4"
              style={{ fontSize: "15px", lineHeight: "1.75", color: "#6B6B6B", maxWidth: "520px" }}
            >
              Three infrastructure layers installed directly into your stack. You own every domain, every list, every automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((card, i) => (
              <AnimateOnScroll key={card.title} delay={i * 120}>
                <div
                  className="service-card rounded-[20px] p-8 xl:p-10 flex flex-col group cursor-default"
                  style={{ minHeight: "280px" }}
                >
                  <h3
                    className="font-sans font-bold mb-4 group-hover:text-[#1B4F8A] transition-colors duration-300"
                    style={{ fontSize: "19px", lineHeight: "1.3", color: "#0A0A0A" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="font-sans mb-auto"
                    style={{ fontSize: "14px", lineHeight: "1.75", color: "#6B6B6B" }}
                  >
                    {card.desc}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 font-sans font-semibold mt-8 group-hover:gap-3 transition-all duration-300"
                    style={{ fontSize: "13px", color: "#1B4F8A" }}
                  >
                    <span>Learn more</span>
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </Link>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

        </div>
      </section>

      {/* ── METRICS — Deep Navy #0D2B4A ── */}
      <section style={{ background: "#0D2B4A", padding: "clamp(96px, 11vw, 160px) 0" }}>
        <div className="mx-auto px-8 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-center">

            <div className="lg:col-span-5" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2
                className="font-serif font-bold text-white"
                style={{ fontSize: "clamp(34px, 4vw, 56px)", lineHeight: "1.08" }}
              >
                Infrastructure<br />doesn&apos;t lie.
              </h2>
              <p
                className="font-sans"
                style={{ fontSize: "15px", lineHeight: "1.75", color: "rgba(255,255,255,0.55)", maxWidth: "340px" }}
              >
                We track deliverability, response quality, and net-new booked deals. Nothing else matters.
              </p>
            </div>

            <div
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 lg:pl-12"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "3px solid #C4431B", paddingTop: "20px" }}>
                <span
                  className="block font-mono font-extrabold text-white"
                  style={{ fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  <CountUp endValue={98.4} decimals={1} suffix="%" />
                </span>
                <span className="block font-sans font-medium" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                  Primary inbox placement rate
                </span>
                <p className="font-sans" style={{ fontSize: "13px", lineHeight: "1.7", color: "rgba(255,255,255,0.4)" }}>
                  Across all managed sending domains, averaged over 90 days.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "3px solid #C4431B", paddingTop: "20px" }}>
                <span
                  className="block font-mono font-extrabold text-white"
                  style={{ fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  +<CountUp endValue={284} suffix="%" />
                </span>
                <span className="block font-sans font-medium" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                  Net-new deal flow increase
                </span>
                <p className="font-sans" style={{ fontSize: "13px", lineHeight: "1.7", color: "rgba(255,255,255,0.4)" }}>
                  Qualified pipeline generated within 120 days of deployment.
                </p>
              </div>
            </div>

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
