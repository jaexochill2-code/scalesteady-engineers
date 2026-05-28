"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Brand Color Palette - v3 Sapphire & High-Luxury Gold/Rust Elements
const COLORS = {
  canvas: "#FAF8F6",
  white: "#FFFFFF",
  inkPrimary: "#111111",
  inkBody: "#3D3D3D",
  inkMuted: "#9E9E9E",
  border: "#E8E8E8",
  sapphire: "#1B4F8A",
  rust: "#C4431B",
  blueVoid: "#050D1C",
  blueDeep: "#0D2B4A",
  glacier: "#BFD9F0",
  frost: "#E8F2FA",
};

interface OnboardingForm {
  company_name: string;
  contact_name: string;
  contact_details: string;
  brand_personality: string;
  core_services: string;
  competitors: string;
  past_marketing: string;
  best_performing: string;
  marketing_goals: string;
  monthly_budget: string;
  target_audience: string;
  intro_offer: string;
  messaging_angle: string;
  routing_destination: string;
  email_names: string[];
}

export default function OnboardingPage() {
  const [form, setForm] = useState<OnboardingForm>({
    company_name: "",
    contact_name: "",
    contact_details: "",
    brand_personality: "",
    core_services: "",
    competitors: "",
    past_marketing: "",
    best_performing: "",
    marketing_goals: "",
    monthly_budget: "",
    target_audience: "",
    intro_offer: "",
    messaging_angle: "",
    routing_destination: "",
    email_names: ["", "", "", "", ""],
  });

  // Dropdown & Helper Selection States
  const [routingSelect, setRoutingSelect] = useState<string>("");
  const [routingDetails, setRoutingDetails] = useState<string>("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  // 1. Local Cache Restoration
  useEffect(() => {
    try {
      const cached = localStorage.getItem("scalesteady_onboarding_form_v6");
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
    } catch (e) {
      console.error("Cache restoration failed:", e);
    }
  }, []);

  const handleChange = (field: keyof OnboardingForm, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    try {
      localStorage.setItem("scalesteady_onboarding_form_v6", JSON.stringify(updated));
    } catch (e) {
      console.error("Cache write failed:", e);
    }
  };

  // Sync Routing selection and details into unified form field
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
    try {
      localStorage.setItem("scalesteady_onboarding_form_v6", JSON.stringify(updated));
    } catch (e) {
      console.error("Cache write failed:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFormComplete = 
      form.company_name.trim().length > 0 &&
      form.contact_name.trim().length > 0 &&
      form.contact_details.trim().length > 0 &&
      form.brand_personality.trim().length > 0 &&
      form.core_services.trim().length > 0 &&
      form.competitors.trim().length > 0 &&
      form.past_marketing.trim().length > 0 &&
      form.best_performing.trim().length > 0 &&
      form.marketing_goals.trim().length > 0 &&
      form.monthly_budget.trim().length > 0 &&
      form.target_audience.trim().length > 0 &&
      form.intro_offer.trim().length > 0 &&
      form.messaging_angle.trim().length > 0 &&
      form.routing_destination.trim().length > 0 &&
      form.email_names.every((name) => name.trim().length > 0);

    if (!isFormComplete) {
      setStatus("error");
      setErrorMsg("Please complete all 15 fields before submitting.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const { error } = await supabase.from("onboarding_submissions").insert([
        {
          company_name: form.company_name,
          contact_name: form.contact_name,
          contact_details: form.contact_details,
          email_names: form.email_names,
          icp_description: `Target Audience: ${form.target_audience}\nMessaging Angle: ${form.messaging_angle}\nMonthly Budget: ${form.monthly_budget}`,
          brand_signature: `Brand Voice: ${form.brand_personality}\nCore Services: ${form.core_services}\nCompetitors: ${form.competitors}`,
          campaign_offer: form.intro_offer,
          core_deal_value: `Past Marketing: ${form.past_marketing}\nBest Performing: ${form.best_performing}\nGoals: ${form.marketing_goals}`,
          geographic_target: "",
          routing_destination: form.routing_destination,
        },
      ]);

      if (error) throw new Error(error.message);

      setStatus("success");
      localStorage.removeItem("scalesteady_onboarding_form_v6");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Submission failed. Please check your connection and try again.");
    }
  };

  const isFieldComplete = (field: keyof OnboardingForm) => {
    if (field === "email_names") {
      return form.email_names.every((name) => name.trim().length > 0);
    }
    return form[field].trim().length > 0;
  };

  const checklistFields: (keyof OnboardingForm)[] = [
    "company_name",
    "contact_name",
    "contact_details",
    "brand_personality",
    "core_services",
    "competitors",
    "past_marketing",
    "best_performing",
    "marketing_goals",
    "monthly_budget",
    "target_audience",
    "intro_offer",
    "messaging_angle",
    "routing_destination",
    "email_names",
  ];

  const completedCount = checklistFields.filter(field => isFieldComplete(field)).length;

  // Dynamic domain calculation for interactive preview
  const displayDomain = form.company_name
    ? form.company_name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com"
    : "yourdomain.com";

  // Centered UI styling tokens
  const containerCardStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(13, 43, 74, 0.07)",
    outline: "1px solid rgba(255, 255, 255, 0.8)",
    outlineOffset: "-4px",
    boxShadow: "0 24px 64px rgba(13, 43, 74, 0.02), inset 0 1px 0 rgba(255,255,255,0.8)",
    padding: "clamp(32px, 5vw, 64px)",
    borderRadius: "0px",
    position: "relative",
    zIndex: 10,
    animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
  };

  const inputStyle = (isActive: boolean): React.CSSProperties => ({
    width: "100%",
    background: "#FFFFFF",
    border: isActive ? `1.5px solid ${COLORS.sapphire}` : "1.5px solid rgba(13, 43, 74, 0.08)",
    borderRadius: "0px",
    padding: "16px 20px",
    fontSize: "14.5px",
    fontFamily: "var(--font-sans, sans-serif)",
    color: COLORS.inkPrimary,
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: isActive ? "0 0 0 5px rgba(27, 79, 138, 0.07)" : "none",
  });

  const selectStyle = (isActive: boolean): React.CSSProperties => ({
    ...inputStyle(isActive),
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%233D3D3D' stroke-width='1.5' stroke-linecap='square'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 20px center",
    backgroundSize: "16px",
    cursor: "pointer",
    paddingRight: "48px",
  });

  const textareaStyle = (isActive: boolean): React.CSSProperties => ({
    ...inputStyle(isActive),
    resize: "vertical",
    minHeight: "120px",
    lineHeight: "1.65",
  });

  const labelStyle = (isActive: boolean): React.CSSProperties => ({
    display: "block",
    fontSize: "12.5px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: isActive ? COLORS.sapphire : COLORS.inkPrimary,
    marginBottom: "8px",
    fontFamily: "var(--font-mono, monospace)",
    transition: "color 0.25s",
  });

  const helperStyle = {
    display: "block",
    fontSize: "13.5px",
    lineHeight: "1.65",
    color: COLORS.inkBody,
    marginBottom: "12px",
  };

  const insightStyle = (isActive: boolean): React.CSSProperties => ({
    display: "block",
    fontFamily: "var(--font-mono, monospace)",
    fontSize: "11px",
    lineHeight: "1.5",
    color: isActive ? COLORS.sapphire : COLORS.inkMuted,
    marginBottom: "16px",
    transition: "all 0.25s ease",
    opacity: isActive ? 1 : 0.8,
  });

  // Focus group animation styles
  const questionGroupStyle = (isActive: boolean, hasFocus: boolean): React.CSSProperties => ({
    borderBottom: "1px solid rgba(13, 43, 74, 0.05)",
    paddingBottom: "36px",
    marginBottom: "36px",
    borderLeft: isActive ? `3px solid ${COLORS.sapphire}` : "3px solid transparent",
    paddingLeft: "20px",
    marginLeft: "-20px",
    opacity: hasFocus && !isActive ? 0.45 : 1,
    transform: hasFocus && !isActive ? "scale(0.98)" : "scale(1)",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  });

  const sectionHeaderStyle: React.CSSProperties = {
    fontFamily: "var(--font-serif, serif)",
    fontSize: "22px",
    color: COLORS.rust,
    fontWeight: 400,
    borderBottom: "1px solid rgba(13, 43, 74, 0.08)",
    paddingBottom: "12px",
    marginBottom: "36px",
    letterSpacing: "-0.01em",
  };

  // ── Success State ──────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div 
        style={{ 
          background: COLORS.canvas, 
          backgroundImage: "radial-gradient(at 0% 0%, rgba(27, 79, 138, 0.02) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(196, 67, 27, 0.02) 0px, transparent 50%), linear-gradient(rgba(13, 43, 74, 0.006) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 43, 74, 0.006) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 24px 24px, 24px 24px",
          minHeight: "100vh", 
          display: "flex", 
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px"
        }}
      >
        <div 
          style={{ 
            maxWidth: "640px", 
            width: "100%",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(13, 43, 74, 0.07)",
            outline: "1px solid rgba(255, 255, 255, 0.8)",
            outlineOffset: "-4px",
            boxShadow: "0 24px 64px rgba(13, 43, 74, 0.02)",
            padding: "56px 48px",
            textAlign: "center"
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(27, 79, 138, 0.06)",
              border: `1px solid rgba(27, 79, 138, 0.2)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 32px",
            }}
          >
            <span style={{ color: COLORS.sapphire, fontSize: "24px", fontWeight: "bold" }}>&#10003;</span>
          </div>
          
          <h1
            style={{
              fontFamily: "var(--font-serif, serif)",
              fontSize: "clamp(32px, 4.5vw, 48px)",
              color: COLORS.inkPrimary,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            All set.<br />
            <span style={{ color: COLORS.rust, fontStyle: "italic" }}>We're on it.</span>
          </h1>

          <p
            style={{
              fontSize: "14.5px",
              lineHeight: "1.75",
              color: COLORS.inkBody,
              marginBottom: "40px",
              maxWidth: "460px",
              margin: "0 auto 40px",
            }}
          >
            Your marketing brief is locked in. Our team will review your strategy details and reach out within 24 hours to kick off your campaign.
          </p>

          <Link
            href="/"
            style={{
              display: "inline-block",
              fontSize: "11.5px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: COLORS.sapphire,
              padding: "18px 48px",
              textDecoration: "none",
              transition: "background 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
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

  // ── Centered Minimalist 1-Pager Form ─────────────────────────────
  return (
    <div 
      style={{ 
        background: COLORS.canvas, 
        backgroundImage: "radial-gradient(at 0% 0%, rgba(27, 79, 138, 0.02) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(196, 67, 27, 0.02) 0px, transparent 50%), linear-gradient(rgba(13, 43, 74, 0.006) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 43, 74, 0.006) 1px, transparent 1px)",
        backgroundSize: "auto, auto, 24px 24px, 24px 24px",
        minHeight: "100vh", 
        padding: "80px 0 120px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Cinematic Aurora Glow Blurs */}
      <div 
        style={{
          position: "absolute",
          top: "-200px",
          left: "-200px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(27,79,138,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(120px)",
          pointerEvents: "none",
          animation: "floatAurora 20s infinite ease-in-out alternate",
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: "absolute",
          bottom: "-200px",
          right: "-200px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(196,67,27,0.04) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(120px)",
          pointerEvents: "none",
          animation: "floatAurora 25s infinite ease-in-out alternate-reverse",
          zIndex: 1
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes floatAurora {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, -30px) scale(1.1);
          }
          100% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
        .progress-dot {
          height: 4px;
          flex: 1;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}} />
      
      <div className="mx-auto px-6 sm:px-12" style={{ maxWidth: "760px", position: "relative", zIndex: 5 }}>
        
        {/* Header Block */}
        <div className="mb-12 text-center" style={{ animation: "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "20px", height: "2px", background: COLORS.rust }} />
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.rust,
                fontWeight: 700
              }}
            >
              Marketing Brief
            </span>
            <div style={{ width: "20px", height: "2px", background: COLORS.rust }} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif, serif)",
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: COLORS.inkPrimary,
            }}
          >
            Let's build your <span style={{ color: COLORS.rust, fontStyle: "italic" }}>campaign.</span>
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: COLORS.inkBody,
              marginTop: "16px",
              maxWidth: "520px",
              margin: "16px auto 0",
              lineHeight: "1.65",
            }}
          >
            15 quick questions so we can represent your practice the right way, target the right people, and get you results from day one.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Centered Questionnaire Card */}
          <div style={containerCardStyle}>
            
            {/* Ambient Progress Indicator */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono, monospace)", color: COLORS.inkMuted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                Progress
              </span>
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "13px", color: COLORS.sapphire, fontWeight: 700 }}>
                {completedCount} of 15 completed
              </span>
            </div>

            {/* Progress dot row */}
            <div style={{ display: "flex", gap: "6px", width: "100%", justifyContent: "space-between", marginBottom: "48px" }}>
              {checklistFields.map((field) => {
                const complete = isFieldComplete(field);
                const active = activeField === field || (field === "email_names" && activeField?.startsWith("email_names"));
                return (
                  <div 
                    key={field}
                    className="progress-dot"
                    style={{
                      background: complete 
                        ? COLORS.sapphire 
                        : active 
                          ? COLORS.rust 
                          : "rgba(13, 43, 74, 0.06)",
                      boxShadow: active ? `0 0 8px ${COLORS.rust}` : "none",
                      borderRadius: "0px",
                    }}
                  />
                );
              })}
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 1: The Basics                                      */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div style={sectionHeaderStyle}>
              1. The Basics
            </div>

            {/* Q1: Practice Name */}
            <div style={questionGroupStyle(activeField === "company_name", activeField !== null)}>
              <label style={labelStyle(activeField === "company_name")}>Practice Name</label>
              <input
                type="text"
                required
                value={form.company_name}
                onFocus={() => setActiveField("company_name")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("company_name", e.target.value)}
                style={inputStyle(activeField === "company_name")}
              />
            </div>

            {/* Q2: Your Name */}
            <div style={questionGroupStyle(activeField === "contact_name", activeField !== null)}>
              <label style={labelStyle(activeField === "contact_name")}>Your Name</label>
              <input
                type="text"
                required
                value={form.contact_name}
                onFocus={() => setActiveField("contact_name")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("contact_name", e.target.value)}
                style={inputStyle(activeField === "contact_name")}
              />
            </div>

            {/* Q3: Contact */}
            <div style={questionGroupStyle(activeField === "contact_details", activeField !== null)}>
              <label style={labelStyle(activeField === "contact_details")}>Best Email or Phone</label>
              <input
                type="text"
                required
                value={form.contact_details}
                onFocus={() => setActiveField("contact_details")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("contact_details", e.target.value)}
                style={inputStyle(activeField === "contact_details")}
              />
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 2: Brand & Positioning                             */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div style={sectionHeaderStyle}>
              2. Brand & Positioning
            </div>

            {/* Q4: Brand Personality */}
            <div style={questionGroupStyle(activeField === "brand_personality", activeField !== null)}>
              <label style={labelStyle(activeField === "brand_personality")}>How would you describe your practice's personality?</label>
              <span style={helperStyle}>If your practice were a person, how would they come across? Friendly and casual? Clinical and serious? Family-oriented? High-end and exclusive?</span>
              <span style={insightStyle(activeField === "brand_personality")}>
                This shapes every word we write on your behalf -- emails, ads, landing pages. We need to sound like you.
              </span>
              <textarea
                required
                value={form.brand_personality}
                onFocus={() => setActiveField("brand_personality")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("brand_personality", e.target.value)}
                style={textareaStyle(activeField === "brand_personality")}
              />
            </div>

            {/* Q5: Core Services to Promote */}
            <div style={questionGroupStyle(activeField === "core_services", activeField !== null)}>
              <label style={labelStyle(activeField === "core_services")}>What services do you most want to fill your schedule with?</label>
              <span style={helperStyle}>Not everything you offer -- just the 2-3 services that are most profitable or that you want more of. (e.g. spinal decompression, sports rehab, corrective care plans)</span>
              <span style={insightStyle(activeField === "core_services")}>
                We'll build campaigns around these specific services instead of generic "chiropractic" messaging.
              </span>
              <textarea
                required
                value={form.core_services}
                onFocus={() => setActiveField("core_services")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("core_services", e.target.value)}
                style={textareaStyle(activeField === "core_services")}
              />
            </div>

            {/* Q6: Competitors */}
            <div style={questionGroupStyle(activeField === "competitors", activeField !== null)}>
              <label style={labelStyle(activeField === "competitors")}>Who are you competing with locally?</label>
              <span style={helperStyle}>Name specific practices, chains, or even alternatives like PT clinics and massage studios that your potential patients might go to instead.</span>
              <span style={insightStyle(activeField === "competitors")}>
                Knowing who else is marketing in your area lets us position you differently and avoid saying the same things they do.
              </span>
              <textarea
                required
                value={form.competitors}
                onFocus={() => setActiveField("competitors")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("competitors", e.target.value)}
                style={textareaStyle(activeField === "competitors")}
              />
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 3: Marketing History & Goals                       */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div style={sectionHeaderStyle}>
              3. Marketing History & Goals
            </div>

            {/* Q7: Past Marketing */}
            <div style={questionGroupStyle(activeField === "past_marketing", activeField !== null)}>
              <label style={labelStyle(activeField === "past_marketing")}>What marketing have you tried before?</label>
              <span style={helperStyle}>Facebook ads, Google ads, mailers, SEO, referral programs, community events, social media -- anything. If nothing, just say "none."</span>
              <span style={insightStyle(activeField === "past_marketing")}>
                We don't want to repeat what didn't work. And if something did work, we want to understand why so we can scale it.
              </span>
              <textarea
                required
                value={form.past_marketing}
                onFocus={() => setActiveField("past_marketing")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("past_marketing", e.target.value)}
                style={textareaStyle(activeField === "past_marketing")}
              />
            </div>

            {/* Q8: What Worked Best */}
            <div style={questionGroupStyle(activeField === "best_performing", activeField !== null)}>
              <label style={labelStyle(activeField === "best_performing")}>What's the single best thing that ever brought you new patients?</label>
              <span style={helperStyle}>A specific ad, a referral partner, a Google listing, a community talk, word-of-mouth -- whatever moved the needle most.</span>
              <span style={insightStyle(activeField === "best_performing")}>
                Your best-ever result is a goldmine. We'll reverse-engineer what made it work and build on it.
              </span>
              <textarea
                required
                value={form.best_performing}
                onFocus={() => setActiveField("best_performing")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("best_performing", e.target.value)}
                style={textareaStyle(activeField === "best_performing")}
              />
            </div>

            {/* Q9: Marketing Goals */}
            <div style={questionGroupStyle(activeField === "marketing_goals", activeField !== null)}>
              <label style={labelStyle(activeField === "marketing_goals")}>What does success look like for you in the next 90 days?</label>
              <span style={helperStyle}>A number of new patients per month? Filling a specific time slot? Launching a new service? Growing revenue by X%? Be specific.</span>
              <span style={insightStyle(activeField === "marketing_goals")}>
                A clear target lets us measure whether campaigns are actually working, and adjust fast if they're not.
              </span>
              <textarea
                required
                value={form.marketing_goals}
                onFocus={() => setActiveField("marketing_goals")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("marketing_goals", e.target.value)}
                style={textareaStyle(activeField === "marketing_goals")}
              />
            </div>

            {/* Q10: Monthly Budget */}
            <div style={questionGroupStyle(activeField === "monthly_budget", activeField !== null)}>
              <label style={labelStyle(activeField === "monthly_budget")}>What's your comfortable monthly marketing budget?</label>
              <span style={helperStyle}>A rough range is fine. This helps us recommend the right channels and set realistic expectations for volume.</span>
              <span style={insightStyle(activeField === "monthly_budget")}>
                We won't upsell you. This just tells us whether to focus on high-volume paid ads or lean, organic strategies.
              </span>
              <input
                type="text"
                required
                value={form.monthly_budget}
                onFocus={() => setActiveField("monthly_budget")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("monthly_budget", e.target.value)}
                style={inputStyle(activeField === "monthly_budget")}
                placeholder="e.g. $1,500 - $3,000/month"
              />
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 4: Campaign Strategy                               */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div style={sectionHeaderStyle}>
              4. Campaign Strategy
            </div>

            {/* Q11: Target Audience for Marketing */}
            <div style={questionGroupStyle(activeField === "target_audience", activeField !== null)}>
              <label style={labelStyle(activeField === "target_audience")}>Who should we be targeting in our ads and outreach?</label>
              <span style={helperStyle}>Think about the people most likely to book. Age range, lifestyle, job type, situation -- whatever helps us narrow it down. (e.g. "desk workers 30-55 in the suburbs," "active adults who just got injured")</span>
              <span style={insightStyle(activeField === "target_audience")}>
                The tighter the targeting, the lower the cost per lead. Broad targeting burns budget fast.
              </span>
              <textarea
                required
                value={form.target_audience}
                onFocus={() => setActiveField("target_audience")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("target_audience", e.target.value)}
                style={textareaStyle(activeField === "target_audience")}
              />
            </div>

            {/* Q12: Intro Offer */}
            <div style={questionGroupStyle(activeField === "intro_offer", activeField !== null)}>
              <label style={labelStyle(activeField === "intro_offer")}>Do you have a new patient offer or special we can promote?</label>
              <span style={helperStyle}>A discounted first visit, free consultation, bundled exam + X-ray, etc. If you don't have one, we can help create one.</span>
              <span style={insightStyle(activeField === "intro_offer")}>
                A clear, low-risk offer is the #1 driver of cold-audience conversions. People need a reason to try someone new.
              </span>
              <textarea
                required
                value={form.intro_offer}
                onFocus={() => setActiveField("intro_offer")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("intro_offer", e.target.value)}
                style={textareaStyle(activeField === "intro_offer")}
              />
            </div>

            {/* Q13: Messaging Angle */}
            <div style={questionGroupStyle(activeField === "messaging_angle", activeField !== null)}>
              <label style={labelStyle(activeField === "messaging_angle")}>Why should someone pick you over every other option in town?</label>
              <span style={helperStyle}>In your own words -- what do you do better or differently? What do patients say about you that you're most proud of?</span>
              <span style={insightStyle(activeField === "messaging_angle")}>
                This becomes the core message in everything we run. It's the one thing that makes people stop scrolling and pay attention.
              </span>
              <textarea
                required
                value={form.messaging_angle}
                onFocus={() => setActiveField("messaging_angle")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("messaging_angle", e.target.value)}
                style={textareaStyle(activeField === "messaging_angle")}
              />
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 5: Campaign Setup                                  */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div style={sectionHeaderStyle}>
              5. Campaign Setup
            </div>

            {/* Q14: Booking Routing */}
            <div style={questionGroupStyle(activeField === "routing_destination", activeField !== null)}>
              <label style={labelStyle(activeField === "routing_destination")}>Where should we send leads who want to book?</label>
              <span style={helperStyle}>Your scheduling link, front desk email, phone number, or CRM -- wherever new leads should land.</span>
              <span style={insightStyle(activeField === "routing_destination")}>
                Speed matters. The faster a lead gets a response, the higher the booking rate. We'll route everything here.
              </span>
              
              <div style={{ position: "relative" }}>
                <select
                  required
                  value={routingSelect}
                  onFocus={() => setActiveField("routing_destination")}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setRoutingSelect(e.target.value)}
                  style={selectStyle(activeField === "routing_destination")}
                >
                  <option value="" disabled>-- Select routing method --</option>
                  <option value="Direct Calendar Link">Calendar / Scheduling Link</option>
                  <option value="Email Inbox Routing">Email Inbox</option>
                  <option value="CRM Routing">CRM (HubSpot, Jane App, etc.)</option>
                  <option value="Direct Phone / SMS">Phone / SMS</option>
                </select>
              </div>

              {routingSelect && (
                <div style={{ marginTop: "16px" }}>
                  <label style={{ ...labelStyle(activeField === "routing_destination"), fontSize: "11px", color: COLORS.sapphire }}>
                    {routingSelect === "Direct Calendar Link" ? "Paste your scheduling URL" :
                     routingSelect === "Email Inbox Routing" ? "Enter your intake email address" :
                     routingSelect === "CRM Routing" ? "Enter your CRM link or webhook" :
                     "Enter your phone number"}
                  </label>
                  <input
                    type="text"
                    required
                    value={routingDetails}
                    onFocus={() => setActiveField("routing_destination")}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) => setRoutingDetails(e.target.value)}
                    style={inputStyle(activeField === "routing_destination")}
                  />
                </div>
              )}
            </div>

            {/* Q15: Outbound Email Sender Names */}
            <div style={{ ...questionGroupStyle((activeField?.startsWith("email_names") ?? false), activeField !== null), borderBottom: "none", paddingBottom: "0px", marginBottom: "48px" }}>
              <label style={labelStyle((activeField?.startsWith("email_names") ?? false))}>Outbound Email Sender Names</label>
              <span style={helperStyle}>Give us 5 first names from your team to use as email senders. Real names only -- people reply to people, not brands. (e.g. dr.sarah, mike, jenny)</span>
              <span style={insightStyle(activeField?.startsWith("email_names") ?? false)}>
                Emails from a real person's name get 2-3x more replies than emails from a company name.
              </span>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {form.email_names.map((name, index) => {
                  const isThisBoxActive = activeField === `email_names_${index}`;
                  return (
                    <div key={index} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono, monospace)", color: isThisBoxActive ? COLORS.sapphire : COLORS.inkMuted, fontWeight: 700 }}>
                          Sender {index + 1}
                        </span>
                        {/* Live Outbound Email Preview */}
                        <span 
                          style={{ 
                            fontSize: "11px", 
                            fontFamily: "var(--font-mono, monospace)", 
                            color: name ? COLORS.sapphire : "rgba(13,43,74,0.3)",
                          }}
                        >
                          {name || "name"}@{displayDomain}
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onFocus={() => setActiveField(`email_names_${index}`)}
                        onBlur={() => setActiveField(null)}
                        onChange={(e) => handleNameBoxChange(index, e.target.value)}
                        style={inputStyle(isThisBoxActive)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Error Notification Alert */}
            {status === "error" && (
              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(196,67,27,0.05)",
                  border: `1.5px solid rgba(196,67,27,0.15)`,
                  fontSize: "13px",
                  color: COLORS.rust,
                  marginBottom: "32px",
                  lineHeight: "1.6",
                  fontFamily: "var(--font-sans, sans-serif)",
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              disabled={status === "submitting"}
              style={{
                width: "100%",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                background: status === "submitting" ? COLORS.inkMuted : COLORS.sapphire,
                padding: "20px 24px",
                border: "none",
                cursor: status === "submitting" ? "not-allowed" : "pointer",
                fontFamily: "var(--font-sans, sans-serif)",
                borderRadius: "0px",
                transition: "background 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseOver={(e) => {
                if (status !== "submitting") {
                  e.currentTarget.style.background = COLORS.blueDeep;
                }
              }}
              onMouseOut={(e) => {
                if (status !== "submitting") {
                  e.currentTarget.style.background = COLORS.sapphire;
                }
              }}
            >
              {status === "submitting" ? "Submitting..." : "Submit Marketing Brief"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
