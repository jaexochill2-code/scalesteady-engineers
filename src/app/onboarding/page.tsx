"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const COLORS = {
  canvas: "#FAF8F6",
  white: "#FFFFFF",
  inkPrimary: "#111111",
  inkBody: "#3D3D3D",
  inkMuted: "#9E9E9E",
  sapphire: "#1B4F8A",
  rust: "#C4431B",
  blueVoid: "#050D1C",
  blueDeep: "#0D2B4A",
  glacier: "#BFD9F0",
  frost: "#E8F2FA",
  warmCream: "#FFF9F2",
  coolSlate: "#F3F6FA",
};

interface OnboardingForm {
  company_name: string;
  contact_name: string;
  contact_details: string;
  brand_voice: string;
  core_services: string;
  patient_words: string;
  main_objection: string;
  edge: string;
  intro_offer: string;
  past_results: string;
  best_win: string;
  goals_90_days: string;
  email_angle: string;
  routing_destination: string;
  email_names: string[];
}

export default function OnboardingPage() {
  const [form, setForm] = useState<OnboardingForm>({
    company_name: "",
    contact_name: "",
    contact_details: "",
    brand_voice: "",
    core_services: "",
    patient_words: "",
    main_objection: "",
    edge: "",
    intro_offer: "",
    past_results: "",
    best_win: "",
    goals_90_days: "",
    email_angle: "",
    routing_destination: "",
    email_names: ["", "", "", "", ""],
  });

  const [routingSelect, setRoutingSelect] = useState<string>("");
  const [routingDetails, setRoutingDetails] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const sections = document.querySelectorAll(".form-section");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("scalesteady_onboarding_v7");
      if (cached) {
        const parsed = JSON.parse(cached);
        setForm((prev) => ({
          ...prev,
          ...parsed,
          email_names: Array.isArray(parsed.email_names) && parsed.email_names.length === 5
            ? parsed.email_names
            : prev.email_names,
        }));
        if (parsed.routing_destination) {
          const parts = parsed.routing_destination.split(": ");
          if (parts.length > 1) {
            setRoutingSelect(parts[0]);
            setRoutingDetails(parts.slice(1).join(": "));
          } else {
            setRoutingDetails(parsed.routing_destination);
          }
        }
      }
    } catch (e) { console.error("Cache restore failed:", e); }
  }, []);

  const handleChange = (field: keyof OnboardingForm, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    try { localStorage.setItem("scalesteady_onboarding_v7", JSON.stringify(updated)); }
    catch (e) { console.error("Cache write failed:", e); }
  };

  useEffect(() => {
    const value = routingSelect && routingDetails ? `${routingSelect}: ${routingDetails}` : routingDetails;
    if (value !== form.routing_destination) {
      handleChange("routing_destination", value);
    }
  }, [routingSelect, routingDetails]);

  const handleNameBoxChange = (index: number, value: string) => {
    const cleanPrefix = value.replace(/@.*$/, "").replace(/\s+/g, "").toLowerCase();
    const updatedNames = [...form.email_names];
    updatedNames[index] = cleanPrefix;
    const updated = { ...form, email_names: updatedNames };
    setForm(updated);
    try { localStorage.setItem("scalesteady_onboarding_v7", JSON.stringify(updated)); }
    catch (e) { console.error("Cache write failed:", e); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields = [
      form.company_name, form.contact_name, form.contact_details,
      form.brand_voice, form.core_services, form.patient_words,
      form.main_objection, form.edge, form.intro_offer,
      form.past_results, form.best_win, form.goals_90_days,
      form.email_angle, form.routing_destination,
    ];
    const allFilled = fields.every((f) => f.trim().length > 0) &&
      form.email_names.every((n) => n.trim().length > 0);

    if (!allFilled) {
      setStatus("error");
      setErrorMsg("Fill out everything before submitting.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const { error } = await supabase.from("onboarding_submissions").insert([{
        company_name: form.company_name,
        contact_name: form.contact_name,
        contact_details: form.contact_details,
        email_names: form.email_names,
        icp_description: `Target: ${form.email_angle}\nObjection: ${form.main_objection}`,
        brand_signature: `Voice: ${form.brand_voice}\nServices: ${form.core_services}\nEdge: ${form.edge}\nPatient Words: ${form.patient_words}`,
        campaign_offer: form.intro_offer,
        core_deal_value: `Past Results: ${form.past_results}\nBest Win: ${form.best_win}\n90-Day Goals: ${form.goals_90_days}`,
        geographic_target: "",
        routing_destination: form.routing_destination,
      }]);
      if (error) throw new Error(error.message);
      setStatus("success");
      localStorage.removeItem("scalesteady_onboarding_v7");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Submission failed. Try again.");
    }
  };

  const isFieldComplete = (field: keyof OnboardingForm) => {
    if (field === "email_names") return form.email_names.every((n) => n.trim().length > 0);
    return form[field].trim().length > 0;
  };

  const checklistFields: (keyof OnboardingForm)[] = [
    "company_name", "contact_name", "contact_details",
    "brand_voice", "core_services", "patient_words",
    "main_objection", "edge", "intro_offer",
    "past_results", "best_win", "goals_90_days",
    "email_angle", "routing_destination", "email_names",
  ];

  const completedCount = checklistFields.filter((f) => isFieldComplete(f)).length;
  const displayDomain = form.company_name
    ? form.company_name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com"
    : "yourdomain.com";

  // ── Shared input builders ──
  const inp = (field: keyof OnboardingForm, placeholder?: string) => ({
    type: "text" as const,
    required: true,
    value: form[field] as string,
    placeholder,
    onFocus: () => setActiveField(field),
    onBlur: () => setActiveField(null),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(field, e.target.value),
  });

  const ta = (field: keyof OnboardingForm, placeholder?: string) => ({
    required: true,
    value: form[field] as string,
    placeholder,
    onFocus: () => setActiveField(field),
    onBlur: () => setActiveField(null),
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(field, e.target.value),
  });

  const isActive = (field: string) => activeField === field;

  // ── Styles ──
  const inputCss = (active: boolean, variant: "light" | "dark" = "light"): React.CSSProperties => ({
    width: "100%",
    background: variant === "dark" ? "rgba(255,255,255,0.06)" : "#FFFFFF",
    border: active
      ? `1.5px solid ${variant === "dark" ? "rgba(191,217,240,0.5)" : COLORS.sapphire}`
      : `1.5px solid ${variant === "dark" ? "rgba(255,255,255,0.08)" : "rgba(13,43,74,0.08)"}`,
    borderRadius: "0px",
    padding: "16px 20px",
    fontSize: "14.5px",
    fontFamily: "var(--font-sans, sans-serif)",
    color: variant === "dark" ? "#FFFFFF" : COLORS.inkPrimary,
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: active ? `0 0 0 5px ${variant === "dark" ? "rgba(191,217,240,0.08)" : "rgba(27,79,138,0.07)"}` : "none",
  });

  const textareaCss = (active: boolean, variant: "light" | "dark" = "light"): React.CSSProperties => ({
    ...inputCss(active, variant),
    resize: "vertical",
    minHeight: "100px",
    lineHeight: "1.65",
  });

  const labelCss = (active: boolean, variant: "light" | "dark" = "light"): React.CSSProperties => ({
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: active
      ? (variant === "dark" ? COLORS.glacier : COLORS.sapphire)
      : (variant === "dark" ? "rgba(255,255,255,0.85)" : COLORS.inkPrimary),
    marginBottom: "10px",
    fontFamily: "var(--font-sans, sans-serif)",
    transition: "color 0.25s",
    letterSpacing: "0.01em",
  });

  const qGroup = (field: string, variant: "light" | "dark" = "light"): React.CSSProperties => ({
    paddingBottom: "32px",
    marginBottom: "32px",
    borderBottom: `1px solid ${variant === "dark" ? "rgba(255,255,255,0.06)" : "rgba(13,43,74,0.05)"}`,
    borderLeft: isActive(field) ? `3px solid ${variant === "dark" ? COLORS.glacier : COLORS.sapphire}` : "3px solid transparent",
    paddingLeft: "20px",
    marginLeft: "-20px",
    opacity: activeField && !isActive(field) ? 0.5 : 1,
    transform: activeField && !isActive(field) ? "scale(0.985)" : "scale(1)",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  });

  // ── Success ──
  if (status === "success") {
    return (
      <div style={{
        background: COLORS.canvas,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px"
      }}>
        <div style={{
          maxWidth: "580px",
          width: "100%",
          background: COLORS.white,
          border: "1px solid rgba(13,43,74,0.07)",
          padding: "64px 48px",
          textAlign: "center",
          animation: "fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: "rgba(27,79,138,0.06)", border: "1px solid rgba(27,79,138,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px",
          }}>
            <span style={{ color: COLORS.sapphire, fontSize: "22px", fontWeight: "bold" }}>&#10003;</span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-serif, serif)",
            fontSize: "clamp(28px, 4vw, 42px)",
            color: COLORS.inkPrimary, lineHeight: 1.15,
            letterSpacing: "-0.02em", marginBottom: "16px",
          }}>
            Locked in.
          </h1>
          <p style={{
            fontSize: "14.5px", lineHeight: "1.7", color: COLORS.inkBody,
            maxWidth: "380px", margin: "0 auto 36px",
          }}>
            We'll review everything and reach out within 24 hours to get your campaign rolling.
          </p>
          <Link href="/" style={{
            display: "inline-block", fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#FFF", background: COLORS.sapphire, padding: "16px 44px",
            textDecoration: "none", transition: "background 0.25s",
          }}
            onMouseOver={(e) => (e.currentTarget.style.background = COLORS.blueDeep)}
            onMouseOut={(e) => (e.currentTarget.style.background = COLORS.sapphire)}
          >
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  // ── Main Form ──
  return (
    <div style={{ background: COLORS.canvas, minHeight: "100vh", position: "relative", overflow: "hidden" }}>

      {/* Global Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(30px,-20px) rotate(2deg); }
          100% { transform: translate(-15px,15px) rotate(-1deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .form-section {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .form-section.section-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .form-section:nth-child(2) { transition-delay: 0.08s; }
        .form-section:nth-child(3) { transition-delay: 0.12s; }
        .form-section:nth-child(4) { transition-delay: 0.16s; }
        .form-section:nth-child(5) { transition-delay: 0.2s; }
        .progress-segment {
          height: 3px; flex: 1;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        textarea::placeholder, input::placeholder {
          color: rgba(0,0,0,0.25);
          font-style: italic;
        }
        .dark-section textarea::placeholder, .dark-section input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .section-number {
          font-family: var(--font-serif, serif);
          font-size: 72px;
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.04em;
          opacity: 0.06;
          position: absolute;
          right: 24px;
          top: 24px;
          pointer-events: none;
          user-select: none;
        }
      `}} />

      {/* ═══ HERO ═══ */}
      <div style={{
        position: "relative",
        padding: "100px 0 60px",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* Decorative hero image */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url(/hero-abstract.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
          pointerEvents: "none",
        }} />

        {/* Floating orbs */}
        <div style={{
          position: "absolute", top: "-120px", left: "-80px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(27,79,138,0.07) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none",
          animation: "floatSlow 18s infinite ease-in-out alternate",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", right: "-60px",
          width: "350px", height: "350px",
          background: "radial-gradient(circle, rgba(196,67,27,0.05) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none",
          animation: "floatSlow 22s infinite ease-in-out alternate-reverse",
        }} />

        <div style={{ position: "relative", zIndex: 2, animation: "fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            marginBottom: "20px",
          }}>
            <div style={{ width: "24px", height: "1.5px", background: COLORS.rust }} />
            <span style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "10.5px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: COLORS.rust, fontWeight: 700,
            }}>
              Cold Email Onboarding
            </span>
            <div style={{ width: "24px", height: "1.5px", background: COLORS.rust }} />
          </div>

          <h1 style={{
            fontFamily: "var(--font-serif, serif)",
            fontSize: "clamp(34px, 5vw, 52px)",
            lineHeight: 1.1, letterSpacing: "-0.03em",
            color: COLORS.inkPrimary, marginBottom: "14px",
          }}>
            Tell us about <span style={{ color: COLORS.rust, fontStyle: "italic" }}>your practice.</span>
          </h1>
          <p style={{
            fontSize: "15px", color: COLORS.inkBody,
            maxWidth: "440px", margin: "0 auto",
            lineHeight: "1.6",
          }}>
            15 questions. Takes about 10 minutes.<br />
            We'll handle everything from here.
          </p>
        </div>
      </div>

      {/* ═══ PROGRESS BAR (sticky) ═══ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(250,248,246,0.92)", backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(13,43,74,0.04)",
        padding: "16px 24px",
      }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "10.5px", fontFamily: "var(--font-mono, monospace)", color: COLORS.inkMuted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
              Progress
            </span>
            <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: COLORS.sapphire, fontWeight: 700 }}>
              {completedCount}/15
            </span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            {checklistFields.map((field) => {
              const complete = isFieldComplete(field);
              const active = activeField === field || (field === "email_names" && activeField?.startsWith("email_names"));
              return (
                <div key={field} className="progress-segment" style={{
                  background: complete ? COLORS.sapphire : active ? COLORS.rust : "rgba(13,43,74,0.06)",
                  boxShadow: active ? `0 0 6px ${COLORS.rust}` : "none",
                }} />
              );
            })}
          </div>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 1 -- THE BASICS  (Clean white, minimal)               */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="form-section" style={{
          background: COLORS.white,
          padding: "56px 24px",
          position: "relative",
        }}>
          <span className="section-number" style={{ color: COLORS.sapphire }}>01</span>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>

            <div style={qGroup("company_name")}>
              <label style={labelCss(isActive("company_name"))}>Practice name</label>
              <input {...inp("company_name")} style={inputCss(isActive("company_name"))} />
            </div>

            <div style={qGroup("contact_name")}>
              <label style={labelCss(isActive("contact_name"))}>Your name</label>
              <input {...inp("contact_name")} style={inputCss(isActive("contact_name"))} />
            </div>

            <div style={{ ...qGroup("contact_details"), borderBottom: "none", marginBottom: 0 }}>
              <label style={labelCss(isActive("contact_details"))}>Best email or phone</label>
              <input {...inp("contact_details")} style={inputCss(isActive("contact_details"))} />
            </div>

          </div>
        </div>

        {/* Decorative divider */}
        <div style={{
          height: "4px",
          background: `linear-gradient(90deg, transparent, ${COLORS.sapphire}22, ${COLORS.rust}22, transparent)`,
        }} />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 2 -- YOUR BRAND  (Blue tint, sapphire accent)         */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="form-section" style={{
          background: COLORS.coolSlate,
          padding: "56px 24px",
          position: "relative",
          borderTop: `3px solid ${COLORS.sapphire}15`,
        }}>
          <span className="section-number" style={{ color: COLORS.sapphire }}>02</span>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>

            <div style={{ marginBottom: "40px" }}>
              <span style={{
                fontFamily: "var(--font-mono, monospace)", fontSize: "10px",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: COLORS.sapphire, fontWeight: 700,
              }}>Your Brand</span>
              <h2 style={{
                fontFamily: "var(--font-serif, serif)", fontSize: "26px",
                color: COLORS.inkPrimary, fontWeight: 400, marginTop: "6px",
                letterSpacing: "-0.01em",
              }}>How do you want to come across?</h2>
            </div>

            <div style={qGroup("brand_voice")}>
              <label style={labelCss(isActive("brand_voice"))}>Describe your practice's vibe in a few words</label>
              <input {...inp("brand_voice", "e.g. friendly, no-nonsense, family-oriented")} style={inputCss(isActive("brand_voice"))} />
            </div>

            <div style={qGroup("core_services")}>
              <label style={labelCss(isActive("core_services"))}>Top 2-3 services you want booked solid</label>
              <textarea {...ta("core_services", "e.g. spinal decompression, sports rehab, corrective care")} style={textareaCss(isActive("core_services"))} />
            </div>

            <div style={{ ...qGroup("patient_words"), borderBottom: "none", marginBottom: 0 }}>
              <label style={labelCss(isActive("patient_words"))}>What do your happiest patients say about you?</label>
              <textarea {...ta("patient_words", "In their words -- what do they tell friends or write in reviews?")} style={textareaCss(isActive("patient_words"))} />
            </div>

          </div>
        </div>

        {/* Decorative image divider */}
        <div style={{
          height: "120px",
          backgroundImage: "url(/divider-warm.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }} />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 3 -- THE COMPETITION  (Warm cream, rust accent)       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="form-section" style={{
          background: COLORS.warmCream,
          padding: "56px 24px",
          position: "relative",
          borderTop: `3px solid ${COLORS.rust}20`,
        }}>
          <span className="section-number" style={{ color: COLORS.rust }}>03</span>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>

            <div style={{ marginBottom: "40px" }}>
              <span style={{
                fontFamily: "var(--font-mono, monospace)", fontSize: "10px",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: COLORS.rust, fontWeight: 700,
              }}>Competition & Edge</span>
              <h2 style={{
                fontFamily: "var(--font-serif, serif)", fontSize: "26px",
                color: COLORS.inkPrimary, fontWeight: 400, marginTop: "6px",
                letterSpacing: "-0.01em",
              }}>What makes you the pick?</h2>
            </div>

            <div style={qGroup("main_objection")}>
              <label style={labelCss(isActive("main_objection"))}>What stops someone from booking with you?</label>
              <textarea {...ta("main_objection", "Cost concerns, skepticism about chiro, didn't know you existed, etc.")} style={textareaCss(isActive("main_objection"))} />
            </div>

            <div style={qGroup("edge")}>
              <label style={labelCss(isActive("edge"))}>Why do people pick you over them?</label>
              <textarea {...ta("edge", "What do you do that nobody else around you does?")} style={textareaCss(isActive("edge"))} />
            </div>

            <div style={{ ...qGroup("intro_offer"), borderBottom: "none", marginBottom: 0 }}>
              <label style={labelCss(isActive("intro_offer"))}>Got a new patient offer we can lead with?</label>
              <input {...inp("intro_offer", "e.g. $49 first visit with exam + X-rays, free consult")} style={inputCss(isActive("intro_offer"))} />
            </div>

          </div>
        </div>

        {/* Animated gradient divider */}
        <div style={{
          height: "6px",
          background: `linear-gradient(90deg, ${COLORS.rust}30, ${COLORS.sapphire}30, ${COLORS.rust}30)`,
          backgroundSize: "200% auto",
          animation: "shimmer 4s linear infinite",
        }} />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 4 -- PAST RESULTS & GOALS  (White, strong accent)     */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="form-section" style={{
          background: COLORS.white,
          padding: "56px 24px",
          position: "relative",
        }}>
          <span className="section-number" style={{ color: COLORS.sapphire }}>04</span>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>

            <div style={{ marginBottom: "40px" }}>
              <span style={{
                fontFamily: "var(--font-mono, monospace)", fontSize: "10px",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: COLORS.sapphire, fontWeight: 700,
              }}>Results & Goals</span>
              <h2 style={{
                fontFamily: "var(--font-serif, serif)", fontSize: "26px",
                color: COLORS.inkPrimary, fontWeight: 400, marginTop: "6px",
              }}>What's worked, what hasn't, what's next.</h2>
            </div>

            <div style={qGroup("past_results")}>
              <label style={labelCss(isActive("past_results"))}>What marketing have you tried before?</label>
              <textarea {...ta("past_results", "Facebook ads, Google, mailers, referrals, events -- or none")} style={textareaCss(isActive("past_results"))} />
            </div>

            <div style={qGroup("best_win")}>
              <label style={labelCss(isActive("best_win"))}>Best thing that ever brought you new patients?</label>
              <textarea {...ta("best_win", "A specific ad, referral partner, Google listing, word-of-mouth")} style={textareaCss(isActive("best_win"))} />
            </div>

            <div style={qGroup("goals_90_days")}>
              <label style={labelCss(isActive("goals_90_days"))}>What does a win look like in 90 days?</label>
              <textarea {...ta("goals_90_days", "e.g. 20 new patients/month, fill Tuesday afternoons, grow revenue 30%")} style={textareaCss(isActive("goals_90_days"))} />
            </div>

            <div style={{ ...qGroup("email_angle"), borderBottom: "none", marginBottom: 0 }}>
              <label style={labelCss(isActive("email_angle"))}>Who should our cold emails target?</label>
              <textarea {...ta("email_angle", "e.g. desk workers 30-55, recent injury, athletes, families with kids")} style={textareaCss(isActive("email_angle"))} />
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 5 -- CAMPAIGN SETUP  (Dark inverted, premium)         */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="form-section dark-section" style={{
          background: COLORS.blueVoid,
          padding: "64px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle ambient glow */}
          <div style={{
            position: "absolute", top: "-100px", right: "-100px",
            width: "400px", height: "400px",
            background: "radial-gradient(circle, rgba(27,79,138,0.15) 0%, transparent 70%)",
            borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none",
            animation: "pulseGlow 6s infinite ease-in-out",
          }} />

          <span className="section-number" style={{ color: "rgba(255,255,255,0.04)", fontSize: "80px" }}>05</span>
          <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>

            <div style={{ marginBottom: "40px" }}>
              <span style={{
                fontFamily: "var(--font-mono, monospace)", fontSize: "10px",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: COLORS.glacier, fontWeight: 700,
              }}>Campaign Setup</span>
              <h2 style={{
                fontFamily: "var(--font-serif, serif)", fontSize: "26px",
                color: "#FFFFFF", fontWeight: 400, marginTop: "6px",
              }}>Last step. Where do we send the leads?</h2>
            </div>

            {/* Routing */}
            <div style={qGroup("routing_destination", "dark")}>
              <label style={labelCss(isActive("routing_destination"), "dark")}>Where should booked leads go?</label>

              <select
                required
                value={routingSelect}
                onFocus={() => setActiveField("routing_destination")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => setRoutingSelect(e.target.value)}
                style={{
                  ...inputCss(isActive("routing_destination"), "dark"),
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23BFD9F0' stroke-width='1.5'><polyline points='6 9 12 15 18 9'/></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 20px center",
                  backgroundSize: "16px",
                  cursor: "pointer",
                  paddingRight: "48px",
                }}
              >
                <option value="" disabled>-- Select --</option>
                <option value="Direct Calendar Link">Calendar / Scheduling Link</option>
                <option value="Email Inbox Routing">Email Inbox</option>
                <option value="CRM Routing">CRM (Jane App, HubSpot, etc.)</option>
                <option value="Direct Phone / SMS">Phone / SMS</option>
              </select>

              {routingSelect && (
                <div style={{ marginTop: "14px" }}>
                  <label style={{ ...labelCss(true, "dark"), fontSize: "11px" }}>
                    {routingSelect === "Direct Calendar Link" ? "Paste your scheduling URL" :
                     routingSelect === "Email Inbox Routing" ? "Your intake email" :
                     routingSelect === "CRM Routing" ? "CRM link or webhook" :
                     "Phone number"}
                  </label>
                  <input
                    type="text" required
                    value={routingDetails}
                    onFocus={() => setActiveField("routing_destination")}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) => setRoutingDetails(e.target.value)}
                    style={inputCss(isActive("routing_destination"), "dark")}
                  />
                </div>
              )}
            </div>

            {/* Sender Names */}
            <div style={{ ...qGroup("email_names_0", "dark"), borderBottom: "none", marginBottom: "48px" }}>
              <label style={labelCss(activeField?.startsWith("email_names") ?? false, "dark")}>
                5 sender names from your team
              </label>
              <p style={{
                fontSize: "12.5px", color: "rgba(255,255,255,0.4)",
                marginBottom: "20px", lineHeight: "1.5",
              }}>
                Real first names only. People reply to people.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {form.email_names.map((name, index) => {
                  const boxActive = activeField === `email_names_${index}`;
                  return (
                    <div key={index}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{
                          fontSize: "10px", fontFamily: "var(--font-mono, monospace)",
                          color: boxActive ? COLORS.glacier : "rgba(255,255,255,0.3)", fontWeight: 700,
                        }}>
                          Sender {index + 1}
                        </span>
                        <span style={{
                          fontSize: "10px", fontFamily: "var(--font-mono, monospace)",
                          color: name ? COLORS.glacier : "rgba(255,255,255,0.15)",
                        }}>
                          {name || "name"}@{displayDomain}
                        </span>
                      </div>
                      <input
                        type="text" required
                        value={name}
                        onFocus={() => setActiveField(`email_names_${index}`)}
                        onBlur={() => setActiveField(null)}
                        onChange={(e) => handleNameBoxChange(index, e.target.value)}
                        style={inputCss(boxActive, "dark")}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Error */}
            {status === "error" && (
              <div style={{
                padding: "14px 18px",
                background: "rgba(196,67,27,0.1)",
                border: "1.5px solid rgba(196,67,27,0.25)",
                fontSize: "13px", color: "#FF9B80",
                marginBottom: "28px", lineHeight: "1.5",
              }}>
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              style={{
                width: "100%", fontSize: "12px", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: COLORS.blueVoid,
                background: status === "submitting" ? "rgba(191,217,240,0.3)" : COLORS.glacier,
                padding: "20px 24px", border: "none",
                cursor: status === "submitting" ? "not-allowed" : "pointer",
                fontFamily: "var(--font-sans, sans-serif)",
                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseOver={(e) => {
                if (status !== "submitting") {
                  e.currentTarget.style.background = "#FFFFFF";
                }
              }}
              onMouseOut={(e) => {
                if (status !== "submitting") {
                  e.currentTarget.style.background = COLORS.glacier;
                }
              }}
            >
              {status === "submitting" ? "Submitting..." : "Submit Brief"}
            </button>

          </div>
        </div>

      </form>
    </div>
  );
}
