import Link from "next/link";
import Image from "next/image";
import CountUp from "@/components/client/CountUp";
import AnimateOnScroll from "@/components/client/AnimateOnScroll";

const SERVICES = [
  {
    title: "Outbound Email Engines",
    desc: "We deploy and manage 50+ secondary sending domains with programmatic SPF, DKIM, and DMARC authentication. Your deliverability becomes a controlled variable, not a gamble.",
  },
  {
    title: "Operational Middleware",
    desc: "Positive replies route directly into your CRM, triggering automated booking sequences. No manual handoff, no lost leads, no lag between interest and action.",
  },
  {
    title: "Data Mining & Intent Signals",
    desc: "Real-time permit monitoring and intent extraction targeting high-ticket buyers at the exact moment they enter the market. Your list is always live.",
  },
];

const CLIENTS = ["Tarrant Mechanical", "Aesthetics Clinic Group", "Apex Leasing", "Floor Contracting"];

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ background: "#FAF8F6" }}>

      {/* ── HERO — 95svh: scroll provocation ── */}
      <section
        className="hero-section relative w-full -mt-[80px]"
        style={{ height: "95svh", minHeight: "640px" }}
      >

        {/* Image pane */}
        <div
          className="hero-image-pane absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ width: "58%" }}
        >
          {/* hero-photo-reveal: inner wrapper avoids transform conflict with -translate-y-1/2 on outer pane */}
          <div className="hero-photo-reveal">
            <Image
              src="/hero-team.jpeg"
              alt="ScaleSteady Pipeline Engineers strategy session"
              width={2752}
              height={1536}
              priority
              unoptimized
              className="w-full h-auto block"
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
            className="hidden lg:flex flex-col justify-center h-full px-12 xl:px-16 2xl:px-20"
            style={{ width: "42%" }}
          >

            <h1
              className="font-serif font-normal"
              style={{
                fontSize: "clamp(48px, 5.5vw, 92px)",
                lineHeight: "1.08",
                letterSpacing: "-0.02em",
                color: "#050D1C",
              }}
            >
              <span className="hero-word" style={{ animationDelay: "0s", marginRight: "0.22em" }}>The</span>
              <span className="hero-word" style={{ animationDelay: "0.09s" }}>experts</span>
              <br />
              <span className="hero-word" style={{ animationDelay: "0.18s", marginRight: "0.22em" }}>in</span>
              <span className="hero-word" style={{ animationDelay: "0.27s", marginRight: "0.22em" }}>your</span>
              <span className="hero-word italic" style={{ animationDelay: "0.36s", marginRight: "0.22em" }}>pipeline&apos;s</span>
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
                  background: "#111111",
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

          {/* Mobile */}
          <div className="lg:hidden absolute inset-0 z-10">
            <Image
              src="/hero-team.jpeg"
              alt="Strategy session"
              fill
              unoptimized
              className="object-cover -z-10"
              style={{ objectPosition: "center 35%" }}
            />
            <div
              className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.55))" }}
            >
              <div className="space-y-6">
                <h1
                  className="font-serif font-normal text-white drop-shadow-lg"
                  style={{ fontSize: "clamp(44px, 10vw, 68px)", lineHeight: "1.06", letterSpacing: "-0.025em" }}
                >
                  The experts in your <span className="italic">pipeline&apos;s</span> care.
                </h1>
                <p
                  className="font-sans leading-relaxed max-w-md"
                  style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)" }}
                >
                  Outbound infrastructure that fills your calendar. No ad spend, fully owned by you.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center font-sans font-semibold rounded-full shadow-lg"
                  style={{ fontSize: "15px", color: "#FFFFFF", background: "#111111", padding: "14px 36px", borderRadius: "0px" }}
                >
                  Book a discovery call
                </Link>
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
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
              color: "#050D1C",
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
