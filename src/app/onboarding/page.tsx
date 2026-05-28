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
  core_value_prop: string;
  icp_vertical: string;
  geographic_focus: string;
  trigger_event: string;
  pain_point: string;
  cost_of_inaction: string;
  competitor_alternative: string;
  differentiation_hook: string;
  campaign_offer: string;
  core_deal_value: string;
  routing_destination: string;
  email_names: string[];
}

export default function OnboardingPage() {
  const [form, setForm] = useState<OnboardingForm>({
    company_name: "",
    contact_name: "",
    contact_details: "",
    core_value_prop: "",
    icp_vertical: "",
    geographic_focus: "",
    trigger_event: "",
    pain_point: "",
    cost_of_inaction: "",
    competitor_alternative: "",
    differentiation_hook: "",
    campaign_offer: "",
    core_deal_value: "",
    routing_destination: "",
    email_names: ["", "", "", "", ""],
  });

  // Dropdown & Helper Selection States to eliminate manual input friction
  const [routingSelect, setRoutingSelect] = useState<string>("");
  const [routingDetails, setRoutingDetails] = useState<string>("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  // 1. Local Cache Restoration & Selection Parsing
  useEffect(() => {
    try {
      const cached = localStorage.getItem("scalesteady_onboarding_form_v5");
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
      localStorage.setItem("scalesteady_onboarding_form_v5", JSON.stringify(updated));
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
      localStorage.setItem("scalesteady_onboarding_form_v5", JSON.stringify(updated));
    } catch (e) {
      console.error("Cache write failed:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verify all fields are populated
    const isFormComplete = 
      form.company_name.trim().length > 0 &&
      form.contact_name.trim().length > 0 &&
      form.contact_details.trim().length > 0 &&
      form.core_value_prop.trim().length > 0 &&
      form.icp_vertical.trim().length > 0 &&
      form.geographic_focus.trim().length > 0 &&
      form.trigger_event.trim().length > 0 &&
      form.pain_point.trim().length > 0 &&
      form.cost_of_inaction.trim().length > 0 &&
      form.competitor_alternative.trim().length > 0 &&
      form.differentiation_hook.trim().length > 0 &&
      form.campaign_offer.trim().length > 0 &&
      form.core_deal_value.trim().length > 0 &&
      form.routing_destination.trim().length > 0 &&
      form.email_names.every((name) => name.trim().length > 0);

    if (!isFormComplete) {
      setStatus("error");
      setErrorMsg("Please answer all 15 diagnostic questions before submitting.");
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
          icp_description: `Target Sector: ${form.icp_vertical}\nTrigger Event: ${form.trigger_event}\nBiggest Pain Point: ${form.pain_point}\nCost of Inaction: ${form.cost_of_inaction}`,
          brand_signature: `Core Value Prop: ${form.core_value_prop}\nCompetitor Profile: ${form.competitor_alternative}\nUnfair Advantage: ${form.differentiation_hook}`,
          campaign_offer: form.campaign_offer,
          core_deal_value: form.core_deal_value,
          geographic_target: form.geographic_focus,
          routing_destination: form.routing_destination,
        },
      ]);

      if (error) throw new Error(error.message);

      setStatus("success");
      localStorage.removeItem("scalesteady_onboarding_form_v5");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit campaign details. Please check your internet connection.");
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
    "core_value_prop",
    "icp_vertical",
    "geographic_focus",
    "trigger_event",
    "pain_point",
    "cost_of_inaction",
    "competitor_alternative",
    "differentiation_hook",
    "campaign_offer",
    "core_deal_value",
    "routing_destination",
    "email_names",
  ];

  const completedCount = checklistFields.filter(field => isFieldComplete(field)).length;
  const progressPercent = Math.round((completedCount / checklistFields.length) * 100);

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

  // Monospace why we need this insight style
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

  // Focus group animation styles (dim other items smoothly)
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

  // ── Success State ──────────────────────────────────────────────────────────
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
            <span style={{ color: COLORS.sapphire, fontSize: "24px", fontWeight: "bold" }}>✓</span>
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
            Details saved.<br />
            <span style={{ color: COLORS.rust, fontStyle: "italic" }}>Thank you.</span>
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
            Your setup details are locked in. We will review your target client specifications and outbound email configurations, and notify you as soon as the initial setup is complete.
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
              Campaign Setup
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
            Outbound campaign <span style={{ color: COLORS.rust, fontStyle: "italic" }}>setup.</span>
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: COLORS.inkBody,
              marginTop: "16px",
              maxWidth: "500px",
              margin: "16px auto 0",
              lineHeight: "1.65",
            }}
          >
            Provide your campaign details below. Avoid all placeholders and fictitious data to ensure absolute setup accuracy.
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
              {checklistFields.map((field, idx) => {
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

            {/* SECTION 1: Core Identity */}
            <div style={sectionHeaderStyle}>
              1. Core Identity
            </div>

            {/* Q1: Business Name */}
            <div style={questionGroupStyle(activeField === "company_name", activeField !== null)}>
              <label style={labelStyle(activeField === "company_name")}>Company name</label>
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

            {/* Q2: Contact Person */}
            <div style={questionGroupStyle(activeField === "contact_name", activeField !== null)}>
              <label style={labelStyle(activeField === "contact_name")}>Your name</label>
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

            {/* Q3: Contact details */}
            <div style={questionGroupStyle(activeField === "contact_details", activeField !== null)}>
              <label style={labelStyle(activeField === "contact_details")}>Best email or phone number</label>
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

            {/* SECTION 2: Market Positioning */}
            <div style={sectionHeaderStyle}>
              2. Market Positioning
            </div>

            {/* Q4: Core Value Proposition */}
            <div style={questionGroupStyle(activeField === "core_value_prop", activeField !== null)}>
              <label style={labelStyle(activeField === "core_value_prop")}>Core Value Proposition</label>
              <span style={helperStyle}>If you had to explain your business to a busy, highly skeptical prospect in one simple sentence—without using industry jargon—what do they actually get?</span>
              <span style={insightStyle(activeField === "core_value_prop")}>
                How it helps (Kantar NeedScope): Outbound outreach has a 3-second window. Plain, honest B2B vocabulary drives trust and immediately hooks attention.
              </span>
              <textarea
                required
                value={form.core_value_prop}
                onFocus={() => setActiveField("core_value_prop")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("core_value_prop", e.target.value)}
                style={textareaStyle(activeField === "core_value_prop")}
              />
            </div>

            {/* Q5: Target ICP Vertical */}
            <div style={questionGroupStyle(activeField === "icp_vertical", activeField !== null)}>
              <label style={labelStyle(activeField === "icp_vertical")}>Target Client Sector</label>
              <span style={helperStyle}>What specific B2B sector, industry niche, or customer type represents your absolute best-margin clients?</span>
              <span style={insightStyle(activeField === "icp_vertical")}>
                How it helps (Qualtrics Segmentation): Focusing outbound energy exclusively on high-margin sweet spots prevents pipeline dilution and calendar fatigue.
              </span>
              <input
                type="text"
                required
                value={form.icp_vertical}
                onFocus={() => setActiveField("icp_vertical")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("icp_vertical", e.target.value)}
                style={inputStyle(activeField === "icp_vertical")}
              />
            </div>

            {/* Q6: Geographic Focus */}
            <div style={questionGroupStyle(activeField === "geographic_focus", activeField !== null)}>
              <label style={labelStyle(activeField === "geographic_focus")}>Geographic Focus</label>
              <span style={helperStyle}>What specific cities, states, or regions do you want this outbound campaign to target?</span>
              <span style={insightStyle(activeField === "geographic_focus")}>
                How it helps: Geographically targeted copy allows us to reference hyper-local trust markers and local competitor context in outreach scripts.
              </span>
              <input
                type="text"
                required
                value={form.geographic_focus}
                onFocus={() => setActiveField("geographic_focus")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("geographic_focus", e.target.value)}
                style={inputStyle(activeField === "geographic_focus")}
              />
            </div>

            {/* SECTION 3: Behavioral Triggers & Urgency */}
            <div style={sectionHeaderStyle}>
              3. Behavioral Triggers & Urgency
            </div>

            {/* Q7: The Catalyst/Trigger Event */}
            <div style={questionGroupStyle(activeField === "trigger_event", activeField !== null)}>
              <label style={labelStyle(activeField === "trigger_event")}>The Catalyst / Trigger Event</label>
              <span style={helperStyle}>What specific operational bottleneck, software failure, or administrative event usually forces a prospect to finally search for your service? What broke in their business today?</span>
              <span style={insightStyle(activeField === "trigger_event")}>
                How it helps (Ipsos Behavioral Insights): Outbound success relies on timing. Targeting buyers immediately after a critical trigger event drives a 4.6x increase in meetings.
              </span>
              <textarea
                required
                value={form.trigger_event}
                onFocus={() => setActiveField("trigger_event")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("trigger_event", e.target.value)}
                style={textareaStyle(activeField === "trigger_event")}
              />
            </div>

            {/* Q8: Primary Customer Headache */}
            <div style={questionGroupStyle(activeField === "pain_point", activeField !== null)}>
              <label style={labelStyle(activeField === "pain_point")}>Primary Customer Headache</label>
              <span style={helperStyle}>What is the single biggest operational headache, financial leak, or frustration your target clients experience before they hire you?</span>
              <span style={insightStyle(activeField === "pain_point")}>
                How it helps (Qualtrics Journey Mapping): Addressing the prospect's day-to-day friction in outreach copy acts as a pattern interrupt, proving we understand their world.
              </span>
              <textarea
                required
                value={form.pain_point}
                onFocus={() => setActiveField("pain_point")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("pain_point", e.target.value)}
                style={textareaStyle(activeField === "pain_point")}
              />
            </div>

            {/* Q9: The Cost of Inaction */}
            <div style={questionGroupStyle(activeField === "cost_of_inaction", activeField !== null)}>
              <label style={labelStyle(activeField === "cost_of_inaction")}>The Cost of Inaction</label>
              <span style={helperStyle}>If a prospect decides to do nothing and stick with their current situation, what is the concrete financial cost or operational risk they face over the next 12 months?</span>
              <span style={insightStyle(activeField === "cost_of_inaction")}>
                How it helps (NewtonX Value Assessment): B2B buying committees prioritize avoiding risk over achieving gains. Defining the cost of inaction creates urgency in copy.
              </span>
              <textarea
                required
                value={form.cost_of_inaction}
                onFocus={() => setActiveField("cost_of_inaction")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("cost_of_inaction", e.target.value)}
                style={textareaStyle(activeField === "cost_of_inaction")}
              />
            </div>

            {/* SECTION 4: Competitive Advantage */}
            <div style={sectionHeaderStyle}>
              4. Competitive Advantage
            </div>

            {/* Q10: Primary Competitor & Alternatives */}
            <div style={questionGroupStyle(activeField === "competitor_alternative", activeField !== null)}>
              <label style={labelStyle(activeField === "competitor_alternative")}>Primary Competitor & Alternatives</label>
              <span style={helperStyle}>Who or what are you most commonly losing deals to? (Is it a direct competitor, internal staff doing it poorly, or simple client inertia)?</span>
              <span style={insightStyle(activeField === "competitor_alternative")}>
                How it helps: Knowing what you compete against allows us to proactively handle objections and frame your solution as the only logical path.
              </span>
              <textarea
                required
                value={form.competitor_alternative}
                onFocus={() => setActiveField("competitor_alternative")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("competitor_alternative", e.target.value)}
                style={textareaStyle(activeField === "competitor_alternative")}
              />
            </div>

            {/* Q11: Differentiating Authority/Hook */}
            <div style={questionGroupStyle(activeField === "differentiation_hook", activeField !== null)}>
              <label style={labelStyle(activeField === "differentiation_hook")}>Differentiating Authority / Hook</label>
              <span style={helperStyle}>What is your single biggest proof point, unique capability, or unfair advantage that competitors literally cannot replicate?</span>
              <span style={insightStyle(activeField === "differentiation_hook")}>
                How it helps (Kantar Brand Equity): Highlighting a single, undeniable unfair advantage drives immediate credibility and sets up an uncopyable position.
              </span>
              <textarea
                required
                value={form.differentiation_hook}
                onFocus={() => setActiveField("differentiation_hook")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("differentiation_hook", e.target.value)}
                style={textareaStyle(activeField === "differentiation_hook")}
              />
            </div>

            {/* SECTION 5: Campaign Offer & Value */}
            <div style={sectionHeaderStyle}>
              5. Campaign Offer & Value
            </div>

            {/* Q12: The High-Status Low-Barrier Offer */}
            <div style={questionGroupStyle(activeField === "campaign_offer", activeField !== null)}>
              <label style={labelStyle(activeField === "campaign_offer")}>Introductory Offer / Assessment</label>
              <span style={helperStyle}>What introductory offer, free audit, assessment, or risk-free pilot program can we lead with to break through cold audience skepticism?</span>
              <span style={insightStyle(activeField === "campaign_offer")}>
                How it helps: A highly qualified, low-barrier diagnostic offer overcomes cold friction, giving prospects a zero-risk reason to book a call.
              </span>
              <textarea
                required
                value={form.campaign_offer}
                onFocus={() => setActiveField("campaign_offer")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("campaign_offer", e.target.value)}
                style={textareaStyle(activeField === "campaign_offer")}
              />
            </div>

            {/* Q13: Average Service Price Point */}
            <div style={questionGroupStyle(activeField === "core_deal_value", activeField !== null)}>
              <label style={labelStyle(activeField === "core_deal_value")}>Typical Price Point / Contract Size</label>
              <span style={helperStyle}>What is the typical contract size, average value, or annual value of your primary service?</span>
              <span style={insightStyle(activeField === "core_deal_value")}>
                How it helps: Knowing average contract sizes helps us tailor outbound messaging to match the appropriate executive decision-making tier.
              </span>
              <input
                type="text"
                required
                value={form.core_deal_value}
                onFocus={() => setActiveField("core_deal_value")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("core_deal_value", e.target.value)}
                style={inputStyle(activeField === "core_deal_value")}
              />
            </div>

            {/* SECTION 6: Lead Routing & Sender Prefixes */}
            <div style={sectionHeaderStyle}>
              6. Lead Routing & Sender Prefixes
            </div>

            {/* Q14: Appointments Routing & CRM Destination */}
            <div style={questionGroupStyle(activeField === "routing_destination", activeField !== null)}>
              <label style={labelStyle(activeField === "routing_destination")}>Where should we route new leads and appointments?</label>
              <span style={helperStyle}>Select your destination. We automatically configure alerts and scheduling redirections to this spot.</span>
              <span style={insightStyle(activeField === "routing_destination")}>
                How it helps: Immediate meeting routing and hot lead alerts prevent drop-offs, ensuring you engage prospects while interest is at its absolute peak.
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
                  <option value="Direct Calendar Link">Direct Calendar Link (e.g. Calendly, SavvyCal)</option>
                  <option value="Email Inbox Routing">Email Inbox Routing</option>
                  <option value="CRM Routing">CRM Routing (HubSpot, Salesforce, Zoho)</option>
                  <option value="Direct Phone / SMS">Direct Phone / SMS Alerts</option>
                </select>
              </div>

              {routingSelect && (
                <div style={{ marginTop: "16px" }}>
                  <label style={{ ...labelStyle(activeField === "routing_destination"), fontSize: "11px", color: COLORS.sapphire }}>
                    {routingSelect === "Direct Calendar Link" ? "Enter Calendar Scheduling URL" :
                     routingSelect === "Email Inbox Routing" ? "Enter Target Routing Email Address" :
                     routingSelect === "CRM Routing" ? "Enter CRM Portal / Webhook Details" :
                     "Enter Target Direct Phone Number"}
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

            {/* Q15: Outbound Sending Account Names */}
            <div style={{ ...questionGroupStyle((activeField?.startsWith("email_names") ?? false), activeField !== null), borderBottom: "none", paddingBottom: "0px", marginBottom: "48px" }}>
              <label style={labelStyle((activeField?.startsWith("email_names") ?? false))}>Names for your outbound sending accounts</label>
              <span style={helperStyle}>Provide exactly 5 prefixes using first names of real people or staff members (e.g., jane, alex, sarah). Do not include spaces, domains, or symbols.</span>
              <span style={insightStyle(activeField?.startsWith("email_names") ?? false)}>
                How it helps (Ipsos Deliverability): Accounts set up under authentic first names yield a 4.2x increase in positive response rates and significantly protect domain reputation.
              </span>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {form.email_names.map((name, index) => {
                  const isThisBoxActive = activeField === `email_names_${index}`;
                  return (
                    <div key={index} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono, monospace)", color: isThisBoxActive ? COLORS.sapphire : COLORS.inkMuted, fontWeight: 700 }}>
                          Prefix 0{index + 1}
                        </span>
                        {/* Live Outbound Email Preview */}
                        <span 
                          style={{ 
                            fontSize: "11px", 
                            fontFamily: "var(--font-mono, monospace)", 
                            color: name ? COLORS.sapphire : "rgba(13,43,74,0.3)",
                          }}
                        >
                          {name || "prefix"}@{displayDomain}
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
              {status === "submitting" ? "Submitting Campaign Details..." : "Submit Setup Details"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
