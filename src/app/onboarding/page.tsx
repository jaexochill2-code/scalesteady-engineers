"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const COLORS = {
  canvas: "#0A0E1A",
  cardGlass: "rgba(255,255,255,0.04)",
  cardGlassHover: "rgba(255,255,255,0.06)",
  inputGlass: "rgba(255,255,255,0.05)",
  inputGlassActive: "rgba(255,255,255,0.08)",
  borderSubtle: "rgba(255,255,255,0.06)",
  borderActive: "rgba(138,180,248,0.3)",
  white: "#FFFFFF",
  textPrimary: "rgba(255,255,255,0.92)",
  textSecondary: "rgba(255,255,255,0.55)",
  textMuted: "rgba(255,255,255,0.3)",
  accentBlue: "#8AB4F8",
  accentPurple: "#BB86FC",
  accentTeal: "#03DAC6",
  accentRose: "#F2859D",
  accentAmber: "#F5BC6C",
  gradientStart: "#667EEA",
  gradientEnd: "#764BA2",
  deepNavy: "#060A14",
  sectionAlt: "rgba(255,255,255,0.015)",
};

// Section accent configs for visual variety
const SECTION_ACCENTS = [
  { color: COLORS.accentBlue, glow: "rgba(138,180,248,0.08)", gradient: "linear-gradient(135deg, rgba(138,180,248,0.08), transparent 60%)" },
  { color: COLORS.accentPurple, glow: "rgba(187,134,252,0.08)", gradient: "linear-gradient(135deg, rgba(187,134,252,0.08), transparent 60%)" },
  { color: COLORS.accentRose, glow: "rgba(242,133,157,0.08)", gradient: "linear-gradient(135deg, rgba(242,133,157,0.08), transparent 60%)" },
  { color: COLORS.accentTeal, glow: "rgba(3,218,198,0.08)", gradient: "linear-gradient(135deg, rgba(3,218,198,0.08), transparent 60%)" },
  { color: COLORS.accentAmber, glow: "rgba(245,188,108,0.08)", gradient: "linear-gradient(135deg, rgba(245,188,108,0.08), transparent 60%)" },
];

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

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("s-visible");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    const sections = document.querySelectorAll(".fs");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("scalesteady_onboarding_v8");
      if (cached) {
        const parsed = JSON.parse(cached);
        setForm((prev) => ({
          ...prev,
          ...parsed,
          email_names: Array.isArray(parsed.email_names) && parsed.email_names.length === 5
            ? parsed.email_names : prev.email_names,
        }));
        if (parsed.routing_destination) {
          const parts = parsed.routing_destination.split(": ");
          if (parts.length > 1) {
            setRoutingSelect(parts[0]);
            setRoutingDetails(parts.slice(1).join(": "));
          } else setRoutingDetails(parsed.routing_destination);
        }
      }
    } catch (e) { console.error(e); }
  }, []);

  const save = (data: OnboardingForm) => {
    try { localStorage.setItem("scalesteady_onboarding_v8", JSON.stringify(data)); }
    catch (e) { console.error(e); }
  };

  const handleChange = (field: keyof OnboardingForm, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    save(updated);
  };

  useEffect(() => {
    const value = routingSelect && routingDetails ? `${routingSelect}: ${routingDetails}` : routingDetails;
    if (value !== form.routing_destination) handleChange("routing_destination", value);
  }, [routingSelect, routingDetails]);

  const handleNameBoxChange = (index: number, value: string) => {
    const clean = value.replace(/@.*$/, "").replace(/\s+/g, "").toLowerCase();
    const names = [...form.email_names];
    names[index] = clean;
    const updated = { ...form, email_names: names };
    setForm(updated);
    save(updated);
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
    if (!fields.every((f) => f.trim().length > 0) || !form.email_names.every((n) => n.trim().length > 0)) {
      setStatus("error");
      setErrorMsg("Fill out every field before submitting.");
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
      localStorage.removeItem("scalesteady_onboarding_v8");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Submission failed.");
    }
  };

  const isComplete = (field: keyof OnboardingForm) => {
    if (field === "email_names") return form.email_names.every((n) => n.trim().length > 0);
    return form[field].trim().length > 0;
  };

  const fields: (keyof OnboardingForm)[] = [
    "company_name", "contact_name", "contact_details",
    "brand_voice", "core_services", "patient_words",
    "main_objection", "edge", "intro_offer",
    "past_results", "best_win", "goals_90_days",
    "email_angle", "routing_destination", "email_names",
  ];

  const done = fields.filter((f) => isComplete(f)).length;
  const domain = form.company_name
    ? form.company_name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com"
    : "yourdomain.com";

  const act = (f: string) => activeField === f;

  // ── Success ──
  if (status === "success") {
    return (
      <div style={{ background: COLORS.canvas, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
        <div className="glass-card" style={{ maxWidth: "540px", width: "100%", padding: "64px 48px", textAlign: "center", animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "rgba(138,180,248,0.1)", border: "1px solid rgba(138,180,248,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px", boxShadow: "0 0 40px rgba(138,180,248,0.1)",
          }}>
            <span style={{ color: COLORS.accentBlue, fontSize: "24px" }}>&#10003;</span>
          </div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", color: COLORS.textPrimary, fontWeight: 300, letterSpacing: "-0.03em", marginBottom: "12px" }}>
            Locked in.
          </h1>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: COLORS.textSecondary, maxWidth: "340px", margin: "0 auto 36px" }}>
            We'll review everything and reach out within 24 hours.
          </p>
          <Link href="/" className="cta-btn" style={{ display: "inline-block", padding: "16px 48px", textDecoration: "none", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.white }}>
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.canvas, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ── Ambient background orbs ── */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ═══ HERO ═══ */}
      <div style={{ position: "relative", padding: "120px 24px 64px", textAlign: "center", zIndex: 2 }}>
        <div style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="badge">
            <span className="badge-dot" />
            Cold Email Onboarding
          </div>

          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(36px, 5.5vw, 58px)",
            fontWeight: 200,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: COLORS.textPrimary,
            marginBottom: "16px",
          }}>
            Tell us about{" "}
            <span className="gradient-text">your practice</span>
          </h1>
          <p style={{ fontSize: "15px", color: COLORS.textSecondary, maxWidth: "380px", margin: "0 auto", lineHeight: 1.6, fontWeight: 300 }}>
            15 questions. About 10 minutes.<br />
            We handle everything from here.
          </p>
        </div>
      </div>

      {/* ═══ STICKY PROGRESS ═══ */}
      <div className="progress-bar-wrap">
        <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", gap: "3px", flex: 1 }}>
            {fields.map((f) => {
              const c = isComplete(f);
              const a = activeField === f || (f === "email_names" && activeField?.startsWith("email_names"));
              return <div key={f} className="prog-seg" style={{
                background: c ? COLORS.accentBlue : a ? COLORS.accentRose : "rgba(255,255,255,0.06)",
                boxShadow: c ? `0 0 8px ${COLORS.accentBlue}40` : a ? `0 0 8px ${COLORS.accentRose}40` : "none",
              }} />;
            })}
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: COLORS.accentBlue, fontWeight: 500, minWidth: "36px", textAlign: "right" }}>
            {done}/15
          </span>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} style={{ position: "relative", zIndex: 2 }}>

        {/* ═══ SECTION 1 -- THE BASICS ═══ */}
        <Section index={0} label="The Basics" title="Let's start simple.">
          <Q field="company_name" label="Practice name" active={act("company_name")} accent={0}>
            <input className="glass-input" {...inp("company_name", form, handleChange, setActiveField)} data-active={act("company_name")} />
          </Q>
          <Q field="contact_name" label="Your name" active={act("contact_name")} accent={0}>
            <input className="glass-input" {...inp("contact_name", form, handleChange, setActiveField)} data-active={act("contact_name")} />
          </Q>
          <Q field="contact_details" label="Best email or phone" active={act("contact_details")} accent={0} last>
            <input className="glass-input" {...inp("contact_details", form, handleChange, setActiveField)} data-active={act("contact_details")} />
          </Q>
        </Section>

        {/* ═══ SECTION 2 -- YOUR BRAND ═══ */}
        <Section index={1} label="Your Brand" title="How should we represent you?">
          <Q field="brand_voice" label="Describe your practice's vibe in a few words" active={act("brand_voice")} accent={1}>
            <input className="glass-input" {...inp("brand_voice", form, handleChange, setActiveField, "e.g. friendly, no-nonsense, family-oriented")} data-active={act("brand_voice")} />
          </Q>
          <Q field="core_services" label="Top 2-3 services you want booked solid" active={act("core_services")} accent={1}>
            <textarea className="glass-input glass-textarea" {...ta("core_services", form, handleChange, setActiveField, "e.g. spinal decompression, sports rehab, corrective care")} data-active={act("core_services")} />
          </Q>
          <Q field="patient_words" label="What do your happiest patients say about you?" active={act("patient_words")} accent={1} last>
            <textarea className="glass-input glass-textarea" {...ta("patient_words", form, handleChange, setActiveField, "In their words -- what do they tell friends or write in reviews?")} data-active={act("patient_words")} />
          </Q>
        </Section>

        {/* ═══ SECTION 3 -- YOUR EDGE ═══ */}
        <Section index={2} label="Your Edge" title="What makes you the pick?">
          <Q field="main_objection" label="What stops someone from booking with you?" active={act("main_objection")} accent={2}>
            <textarea className="glass-input glass-textarea" {...ta("main_objection", form, handleChange, setActiveField, "Cost concerns, skepticism, didn't know you existed, etc.")} data-active={act("main_objection")} />
          </Q>
          <Q field="edge" label="Why do people pick you over everyone else?" active={act("edge")} accent={2}>
            <textarea className="glass-input glass-textarea" {...ta("edge", form, handleChange, setActiveField, "What do you do that nobody else around you does?")} data-active={act("edge")} />
          </Q>
          <Q field="intro_offer" label="Got a new patient offer we can lead with?" active={act("intro_offer")} accent={2} last>
            <input className="glass-input" {...inp("intro_offer", form, handleChange, setActiveField, "e.g. $49 first visit with exam + X-rays")} data-active={act("intro_offer")} />
          </Q>
        </Section>

        {/* ═══ SECTION 4 -- RESULTS & GOALS ═══ */}
        <Section index={3} label="Results & Goals" title="What's worked, what's next.">
          <Q field="past_results" label="What marketing have you tried before?" active={act("past_results")} accent={3}>
            <textarea className="glass-input glass-textarea" {...ta("past_results", form, handleChange, setActiveField, "Facebook ads, Google, mailers, referrals -- or none")} data-active={act("past_results")} />
          </Q>
          <Q field="best_win" label="Best thing that ever brought you new patients?" active={act("best_win")} accent={3}>
            <textarea className="glass-input glass-textarea" {...ta("best_win", form, handleChange, setActiveField, "A specific ad, referral partner, Google listing, word-of-mouth")} data-active={act("best_win")} />
          </Q>
          <Q field="goals_90_days" label="What does a win look like in 90 days?" active={act("goals_90_days")} accent={3}>
            <textarea className="glass-input glass-textarea" {...ta("goals_90_days", form, handleChange, setActiveField, "e.g. 20 new patients/month, fill Tuesday afternoons")} data-active={act("goals_90_days")} />
          </Q>
          <Q field="email_angle" label="Who should our cold emails target?" active={act("email_angle")} accent={3} last>
            <textarea className="glass-input glass-textarea" {...ta("email_angle", form, handleChange, setActiveField, "e.g. desk workers 30-55, recent injury, athletes, families")} data-active={act("email_angle")} />
          </Q>
        </Section>

        {/* ═══ SECTION 5 -- CAMPAIGN SETUP ═══ */}
        <div className="fs" style={{ padding: "64px 24px 100px", position: "relative" }}>
          <div className="section-glow" style={{ background: SECTION_ACCENTS[4].gradient }} />
          <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>

            <div style={{ marginBottom: "44px" }}>
              <span className="section-label" style={{ color: COLORS.accentAmber }}>{SECTION_ACCENTS[4].color && "Campaign Setup"}</span>
              <h2 className="section-title">Last step. Where do the leads go?</h2>
              <span className="section-num" style={{ color: `${COLORS.accentAmber}08` }}>05</span>
            </div>

            {/* Routing */}
            <div className="q-group" data-active={act("routing_destination")}>
              <label className="q-label" data-active={act("routing_destination")} style={{ "--accent": COLORS.accentAmber } as React.CSSProperties}>
                Where should booked leads go?
              </label>
              <select
                className="glass-input glass-select"
                required
                value={routingSelect}
                onFocus={() => setActiveField("routing_destination")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => setRoutingSelect(e.target.value)}
                data-active={act("routing_destination")}
              >
                <option value="" disabled>Select routing method</option>
                <option value="Direct Calendar Link">Calendar / Scheduling Link</option>
                <option value="Email Inbox Routing">Email Inbox</option>
                <option value="CRM Routing">CRM (Jane App, HubSpot, etc.)</option>
                <option value="Direct Phone / SMS">Phone / SMS</option>
              </select>

              {routingSelect && (
                <div style={{ marginTop: "14px" }}>
                  <label className="q-label q-label-sm" data-active={true} style={{ "--accent": COLORS.accentAmber } as React.CSSProperties}>
                    {routingSelect === "Direct Calendar Link" ? "Paste your scheduling URL" :
                     routingSelect === "Email Inbox Routing" ? "Your intake email" :
                     routingSelect === "CRM Routing" ? "CRM link or webhook" : "Phone number"}
                  </label>
                  <input
                    className="glass-input"
                    type="text" required
                    value={routingDetails}
                    onFocus={() => setActiveField("routing_destination")}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) => setRoutingDetails(e.target.value)}
                    data-active={act("routing_destination")}
                  />
                </div>
              )}
            </div>

            {/* Sender Names */}
            <div className="q-group" data-active={activeField?.startsWith("email_names")} style={{ borderBottom: "none", marginBottom: "48px" }}>
              <label className="q-label" data-active={activeField?.startsWith("email_names")} style={{ "--accent": COLORS.accentAmber } as React.CSSProperties}>
                5 sender names from your team
              </label>
              <p style={{ fontSize: "12px", color: COLORS.textMuted, marginBottom: "20px", fontWeight: 300 }}>
                Real first names only. People reply to people.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {form.email_names.map((name, i) => {
                  const ba = activeField === `email_names_${i}`;
                  return (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: ba ? COLORS.accentAmber : COLORS.textMuted, fontWeight: 500 }}>
                          Sender {i + 1}
                        </span>
                        <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: name ? COLORS.accentBlue : COLORS.textMuted }}>
                          {name || "name"}@{domain}
                        </span>
                      </div>
                      <input
                        className="glass-input"
                        type="text" required value={name}
                        onFocus={() => setActiveField(`email_names_${i}`)}
                        onBlur={() => setActiveField(null)}
                        onChange={(e) => handleNameBoxChange(i, e.target.value)}
                        data-active={ba}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Error */}
            {status === "error" && (
              <div className="error-alert">{errorMsg}</div>
            )}

            {/* Submit */}
            <button type="submit" disabled={status === "submitting"} className="cta-btn cta-btn-full">
              {status === "submitting" ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <span className="spinner" /> Submitting...
                </span>
              ) : (
                "Launch Campaign Brief"
              )}
            </button>

          </div>
        </div>

      </form>
    </div>
  );
}

// ── Section Component ──
function Section({ index, label, title, children }: {
  index: number; label: string; title: string; children: React.ReactNode;
}) {
  const accent = SECTION_ACCENTS[index];
  return (
    <div className="fs" style={{ padding: "64px 24px", position: "relative" }}>
      <div className="section-glow" style={{ background: accent.gradient }} />
      <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: "44px" }}>
          <span className="section-label" style={{ color: accent.color }}>{label}</span>
          <h2 className="section-title">{title}</h2>
          <span className="section-num" style={{ color: `${accent.color}08` }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Question wrapper ──
function Q({ field, label, active, accent, last, children }: {
  field: string; label: string; active: boolean; accent: number; last?: boolean; children: React.ReactNode;
}) {
  const accentColor = SECTION_ACCENTS[accent].color;
  return (
    <div className="q-group" data-active={active} style={last ? { borderBottom: "none", marginBottom: 0 } : undefined}>
      <label className="q-label" data-active={active} style={{ "--accent": accentColor } as React.CSSProperties}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Input prop helpers ──
function inp(
  field: string,
  form: Record<string, any>,
  onChange: (f: any, v: string) => void,
  setActive: (f: string | null) => void,
  placeholder?: string,
) {
  return {
    type: "text" as const,
    required: true,
    value: form[field] as string,
    placeholder,
    onFocus: () => setActive(field),
    onBlur: () => setActive(null),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(field as any, e.target.value),
  };
}

function ta(
  field: string,
  form: Record<string, any>,
  onChange: (f: any, v: string) => void,
  setActive: (f: string | null) => void,
  placeholder?: string,
) {
  return {
    required: true,
    value: form[field] as string,
    placeholder,
    onFocus: () => setActive(field),
    onBlur: () => setActive(null),
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(field as any, e.target.value),
  };
}

// ── Global CSS ──
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }

/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float1 {
  0%, 100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(60px,-40px) scale(1.1); }
  66% { transform: translate(-30px,30px) scale(0.95); }
}
@keyframes float2 {
  0%, 100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(-50px,-60px) scale(1.15); }
}
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(138,180,248,0.1); }
  50% { box-shadow: 0 0 40px rgba(138,180,248,0.2); }
}

/* ── Ambient Orbs ── */
.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
}
.orb-1 {
  width: 500px; height: 500px;
  top: -150px; left: -100px;
  background: radial-gradient(circle, rgba(102,126,234,0.12), transparent 70%);
  animation: float1 25s infinite ease-in-out;
}
.orb-2 {
  width: 450px; height: 450px;
  bottom: 20%; right: -120px;
  background: radial-gradient(circle, rgba(187,134,252,0.08), transparent 70%);
  animation: float2 30s infinite ease-in-out;
}
.orb-3 {
  width: 350px; height: 350px;
  top: 40%; left: 30%;
  background: radial-gradient(circle, rgba(3,218,198,0.06), transparent 70%);
  animation: float1 35s infinite ease-in-out reverse;
}

/* ── Badge ── */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 100px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  font-weight: 500;
  margin-bottom: 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #03DAC6;
  animation: pulse 2s infinite ease-in-out;
  box-shadow: 0 0 8px rgba(3,218,198,0.4);
}

/* ── Gradient Text ── */
.gradient-text {
  background: linear-gradient(135deg, #8AB4F8, #BB86FC, #F2859D);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 6s linear infinite;
}

/* ── Progress Bar ── */
.progress-bar-wrap {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 14px 24px;
  background: rgba(10,14,26,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.prog-seg {
  height: 3px;
  flex: 1;
  border-radius: 2px;
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}

/* ── Section ── */
.fs {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  border-top: 1px solid rgba(255,255,255,0.03);
}
.fs.s-visible {
  opacity: 1;
  transform: translateY(0);
}
.section-glow {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 0;
}
.section-label {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.section-title {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 300;
  color: rgba(255,255,255,0.88);
  letter-spacing: -0.02em;
}
.section-num {
  position: absolute;
  right: 0;
  top: 0;
  font-family: 'Inter', sans-serif;
  font-size: 80px;
  font-weight: 200;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

/* ── Question Group ── */
.q-group {
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  padding-left: 20px;
  border-left: 2px solid transparent;
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
}
.q-group[data-active="true"] {
  border-left-color: var(--accent, rgba(138,180,248,0.5));
}

/* ── Label ── */
.q-label {
  display: block;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255,255,255,0.55);
  margin-bottom: 12px;
  transition: color 0.3s;
  letter-spacing: 0.01em;
}
.q-label[data-active="true"] {
  color: var(--accent, rgba(138,180,248,1));
}
.q-label-sm {
  font-size: 11px;
}

/* ── Glass Input ── */
.glass-input {
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  color: rgba(255,255,255,0.9);
  outline: none;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.glass-input::placeholder {
  color: rgba(255,255,255,0.15);
  font-weight: 300;
  font-style: italic;
}
.glass-input:hover {
  background: rgba(255,255,255,0.05);
  border-color: rgba(255,255,255,0.1);
}
.glass-input:focus, .glass-input[data-active="true"] {
  background: rgba(255,255,255,0.06);
  border-color: rgba(138,180,248,0.35);
  box-shadow: 0 0 0 4px rgba(138,180,248,0.06), 0 4px 24px rgba(0,0,0,0.2);
}
.glass-textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.65;
}

/* ── Glass Select ── */
.glass-select {
  appearance: none;
  cursor: pointer;
  padding-right: 48px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%238AB4F8' stroke-width='1.5'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 16px;
}
.glass-select option {
  background: #1a1e2e;
  color: rgba(255,255,255,0.9);
  padding: 12px;
}

/* ── Glass Card ── */
.glass-card {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
}

/* ── CTA Button ── */
.cta-btn {
  position: relative;
  background: linear-gradient(135deg, #667EEA, #764BA2);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #FFFFFF;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 8px 32px rgba(102,126,234,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
}
.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(102,126,234,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
}
.cta-btn:active {
  transform: translateY(0);
}
.cta-btn-full {
  width: 100%;
  padding: 20px 24px;
}
.cta-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* ── Spinner ── */
.spinner {
  display: inline-block;
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.2);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* ── Error ── */
.error-alert {
  padding: 14px 18px;
  background: rgba(242,133,157,0.08);
  border: 1px solid rgba(242,133,157,0.2);
  border-radius: 12px;
  font-size: 13px;
  color: #F2859D;
  margin-bottom: 24px;
  line-height: 1.5;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .section-num { display: none; }
  .glass-input { padding: 14px 16px; font-size: 13px; }
}
`;
