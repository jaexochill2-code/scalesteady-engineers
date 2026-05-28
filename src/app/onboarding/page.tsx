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

// Vector Inline Graphics representing architectural engineering
const IdentityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.rust} strokeWidth="1.5" strokeLinecap="square">
    <rect x="3" y="3" width="18" height="18" />
    <path d="M9 3v18" />
    <path d="M15 3v18" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </svg>
);

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.rust} strokeWidth="1.5" strokeLinecap="square">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v20" />
    <path d="M2 12h20" />
  </svg>
);

const CampaignIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.rust} strokeWidth="1.5" strokeLinecap="square">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

interface OnboardingForm {
  company_name: string;
  contact_name: string;
  contact_details: string;
  email_names: string[];
  icp_description: string;
  brand_signature: string;
  campaign_offer: string;
  core_deal_value: string;
  geographic_target: string;
  routing_destination: string;
}

export default function OnboardingPage() {
  const [form, setForm] = useState<OnboardingForm>({
    company_name: "",
    contact_name: "",
    contact_details: "",
    email_names: ["", "", "", "", ""],
    icp_description: "",
    brand_signature: "",
    campaign_offer: "",
    core_deal_value: "",
    geographic_target: "",
    routing_destination: "",
  });

  // Dropdown & Helper Selection States to eliminate manual input friction
  const [geoSelect, setGeoSelect] = useState<string>("");
  const [geoCustom, setGeoCustom] = useState<string>("");
  
  const [offerSelect, setOfferSelect] = useState<string>("");
  const [offerCustom, setOfferCustom] = useState<string>("");

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

        // Back-populate Dropdown Selection states from cached flat values
        if (parsed.geographic_target) {
          const matchedGeo = ["Midwest (IL, IN, OH, MI, WI)", "California & West Coast", "Texas & South-Central", "Florida & Southeast", "Northeast (NY, NJ, PA)", "National (United States)"].find(g => g === parsed.geographic_target);
          if (matchedGeo) {
            setGeoSelect(matchedGeo);
          } else {
            setGeoSelect("Custom Region (Please specify)");
            setGeoCustom(parsed.geographic_target);
          }
        }

        if (parsed.campaign_offer) {
          const matchedOffer = ["Free Outbound Strategy Audit (Recommended)", "Risk-Free 30-Day Pipeline Trial", "Free Initial Consultation & Pilot Run", "No Promotion (Raw value proposition only)"].find(o => o === parsed.campaign_offer);
          if (matchedOffer) {
            setOfferSelect(matchedOffer);
          } else {
            setOfferSelect("Custom Special Promotion");
            setOfferCustom(parsed.campaign_offer);
          }
        }

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

  // Sync Geographic selections into flat form field
  useEffect(() => {
    const value = geoSelect === "Custom Region (Please specify)" ? geoCustom : geoSelect;
    if (value !== form.geographic_target) {
      handleChange("geographic_target", value);
    }
  }, [geoSelect, geoCustom]);

  // Sync Offer selections into flat form field
  useEffect(() => {
    const value = offerSelect === "Custom Special Promotion" ? offerCustom : offerSelect;
    if (value !== form.campaign_offer) {
      handleChange("campaign_offer", value);
    }
  }, [offerSelect, offerCustom]);

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
      form.email_names.every((name) => name.trim().length > 0) &&
      form.icp_description.trim().length > 0 &&
      form.brand_signature.trim().length > 0 &&
      form.campaign_offer.trim().length > 0 &&
      form.core_deal_value.trim().length > 0 &&
      form.geographic_target.trim().length > 0 &&
      form.routing_destination.trim().length > 0;

    if (!isFormComplete) {
      setStatus("error");
      setErrorMsg("Please answer all 10 questions before launching your build.");
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
          icp_description: form.icp_description,
          brand_signature: form.brand_signature,
          campaign_offer: form.campaign_offer,
          core_deal_value: form.core_deal_value,
          geographic_target: form.geographic_target,
          routing_destination: form.routing_destination,
        },
      ]);

      if (error) throw new Error(error.message);

      setStatus("success");
      localStorage.removeItem("scalesteady_onboarding_form_v5");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit build configuration. Please check your network connection.");
    }
  };

  // Helper to verify field completeness for visual checklist
  const isFieldComplete = (field: keyof OnboardingForm) => {
    if (field === "email_names") {
      return form.email_names.every((name) => name.trim().length > 0);
    }
    return form[field].trim().length > 0;
  };

  const checklistItems = [
    { key: "company_name", num: "01", label: "Company Identity" },
    { key: "contact_name", num: "02", label: "Client Partner Name" },
    { key: "contact_details", num: "03", label: "Direct Comms Line" },
    { key: "icp_description", num: "04", label: "Target Client Spec" },
    { key: "geographic_target", num: "05", label: "Territorial Scope" },
    { key: "brand_signature", num: "06", label: "Primary Advantage" },
    { key: "campaign_offer", num: "07", label: "Campaign Hook Spec" },
    { key: "core_deal_value", num: "08", label: "Contract Deal Value" },
    { key: "routing_destination", num: "09", label: "CRM Routing Route" },
    { key: "email_names", num: "10", label: "Outbound Prefixes (5)" },
  ];

  const completedCount = checklistItems.filter(item => isFieldComplete(item.key as keyof OnboardingForm)).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);

  // Dynamic domain calculation for interactive preview
  const displayDomain = form.company_name
    ? form.company_name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com"
    : "yourdomain.com";

  // Circular Progress Metrics
  const radius = 26;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // $100,000 Luxury styling tokens & double border system
  const cardStyle = (isActive: boolean): React.CSSProperties => ({
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: isActive ? `1px solid ${COLORS.sapphire}` : "1px solid rgba(13, 43, 74, 0.07)",
    outline: isActive ? "1.5px solid rgba(27, 79, 138, 0.12)" : "1px solid rgba(255, 255, 255, 0.6)",
    outlineOffset: "-4px",
    boxShadow: isActive 
      ? "0 16px 40px rgba(13, 43, 74, 0.05), inset 0 1px 0 rgba(255,255,255,0.8)" 
      : "0 8px 30px rgba(13, 43, 74, 0.015), inset 0 1px 0 rgba(255,255,255,0.8)",
    padding: "clamp(24px, 4vw, 40px)",
    borderRadius: "0px",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    position: "relative",
  });

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
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    color: isActive ? COLORS.sapphire : COLORS.inkPrimary,
    marginBottom: "10px",
    fontFamily: "var(--font-mono, monospace)",
    transition: "color 0.25s",
  });

  const helperStyle = {
    display: "block",
    fontSize: "12.5px",
    lineHeight: "1.6",
    color: COLORS.inkBody,
    marginBottom: "16px",
    opacity: 0.85
  };

  const sectionHeaderStyle: React.CSSProperties = {
    fontFamily: "var(--font-serif, serif)",
    fontSize: "23px",
    color: COLORS.inkPrimary,
    fontWeight: 400,
    borderBottom: "1px solid rgba(13, 43, 74, 0.08)",
    paddingBottom: "16px",
    marginBottom: "36px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  // ── Success State ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div 
        style={{ 
          background: COLORS.canvas, 
          backgroundImage: "radial-gradient(at 0% 0%, rgba(27, 79, 138, 0.04) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(196, 67, 27, 0.03) 0px, transparent 50%), linear-gradient(rgba(13, 43, 74, 0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 43, 74, 0.012) 1px, transparent 1px)",
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
            maxWidth: "600px", 
            width: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(13, 43, 74, 0.08)",
            outline: "1px solid rgba(255, 255, 255, 0.7)",
            outlineOffset: "-4px",
            boxShadow: "0 24px 64px rgba(13, 43, 74, 0.04)",
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
            Parameters compiled.<br />
            <span style={{ color: COLORS.rust, fontStyle: "italic" }}>System launching.</span>
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
            Your build configuration has been verified and committed to active storage. Outbound network nodes and routing relays are entering target provisioning stages.
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

  // ── Main 1-Pager Dashboard Form ────────────────────────────────────────────
  return (
    <div 
      style={{ 
        background: COLORS.canvas, 
        backgroundImage: "radial-gradient(at 0% 0%, rgba(27, 79, 138, 0.04) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(196, 67, 27, 0.03) 0px, transparent 50%), linear-gradient(rgba(13, 43, 74, 0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 43, 74, 0.012) 1px, transparent 1px)",
        backgroundSize: "auto, auto, 24px 24px, 24px 24px",
        minHeight: "100vh", 
        padding: "80px 0 120px" 
      }}
    >
      
      <div className="mx-auto px-6 sm:px-12 lg:px-24" style={{ maxWidth: "1280px" }}>
        
        {/* Header Block */}
        <div className="mb-16">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: COLORS.rust }} />
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
              System Provisioning Console
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif, serif)",
              fontSize: "clamp(38px, 6vw, 68px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: COLORS.inkPrimary,
              maxWidth: "800px",
            }}
          >
            Outbound campaign <span style={{ color: COLORS.rust, fontStyle: "italic" }}>setup.</span>
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: COLORS.inkBody,
              marginTop: "20px",
              maxWidth: "580px",
              lineHeight: "1.7",
            }}
          >
            Configure your technical scope, routing protocols, and custom client parameters below to launch pipeline building.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Main Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: 8 Columns */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Card 1: Your Identity */}
              <div style={cardStyle(activeField === "company_name" || activeField === "contact_name" || activeField === "contact_details")}>
                <div style={sectionHeaderStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <IdentityIcon />
                    <span>01 // Business Identity</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: COLORS.inkMuted, letterSpacing: "0.1em" }}>[SPEC: IDENTITY]</span>
                </div>

                <div className="flex flex-col gap-8">
                  {/* Q1: Business Name */}
                  <div>
                    <label style={labelStyle(activeField === "company_name")}>1. Company name</label>
                    <span style={helperStyle}>The legal or trade name of your firm as it should appear in communication signatures.</span>
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
                  <div>
                    <label style={labelStyle(activeField === "contact_name")}>2. Your name</label>
                    <span style={helperStyle}>Primary business partner leading this campaign (used for individual sender profiles).</span>
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
                  <div>
                    <label style={labelStyle(activeField === "contact_details")}>3. Direct email or phone number</label>
                    <span style={helperStyle}>For technical alerts and deployment updates from our engineering team.</span>
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
                </div>
              </div>

              {/* Card 2: Your Market and Audience */}
              <div style={cardStyle(activeField === "icp_description" || activeField === "geographic_target")}>
                <div style={sectionHeaderStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <TargetIcon />
                    <span>02 // Target Market Spec</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: COLORS.inkMuted, letterSpacing: "0.1em" }}>[SPEC: MARKET]</span>
                </div>

                <div className="flex flex-col gap-8">
                  {/* Q4: ICP */}
                  <div>
                    <label style={labelStyle(activeField === "icp_description")}>4. Ideal Client Profile (ICP)</label>
                    <span style={helperStyle}>Describe your high-value audience (e.g. general contractors doing $3M+, local medical practices, etc.).</span>
                    <textarea
                      required
                      value={form.icp_description}
                      onFocus={() => setActiveField("icp_description")}
                      onBlur={() => setActiveField(null)}
                      onChange={(e) => handleChange("icp_description", e.target.value)}
                      style={textareaStyle(activeField === "icp_description")}
                    />
                  </div>

                  {/* Q5: Geographic Targets (DROP-DOWN Selection) */}
                  <div>
                    <label style={labelStyle(activeField === "geographic_target")}>5. Territorial Scope</label>
                    <span style={helperStyle}>Select your target region. We isolate regional records to match this footprint.</span>
                    
                    <select
                      required
                      value={geoSelect}
                      onFocus={() => setActiveField("geographic_target")}
                      onBlur={() => setActiveField(null)}
                      onChange={(e) => setGeoSelect(e.target.value)}
                      style={selectStyle(activeField === "geographic_target")}
                    >
                      <option value="" disabled>-- Select a target region --</option>
                      <option value="Midwest (IL, IN, OH, MI, WI)">Midwest (IL, IN, OH, MI, WI)</option>
                      <option value="California & West Coast">California & West Coast</option>
                      <option value="Texas & South-Central">Texas & South-Central</option>
                      <option value="Florida & Southeast">Florida & Southeast</option>
                      <option value="Northeast (NY, NJ, PA)">Northeast (NY, NJ, PA)</option>
                      <option value="National (United States)">National (United States)</option>
                      <option value="Custom Region (Please specify)">Other Region (Specify below)</option>
                    </select>

                    {/* Animating write-in box for Custom Region */}
                    {geoSelect === "Custom Region (Please specify)" && (
                      <div className="mt-4 animate-fade-in">
                        <label style={{ ...labelStyle(activeField === "geographic_target"), fontSize: "11px", color: COLORS.rust }}>Specify Custom Region</label>
                        <input
                          type="text"
                          required
                          value={geoCustom}
                          onFocus={() => setActiveField("geographic_target")}
                          onBlur={() => setActiveField(null)}
                          onChange={(e) => setGeoCustom(e.target.value)}
                          style={inputStyle(activeField === "geographic_target")}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 3: The Campaign and Offer */}
              <div style={cardStyle(activeField === "brand_signature" || activeField === "campaign_offer" || activeField === "core_deal_value" || activeField === "routing_destination" || (activeField?.startsWith("email_names") ?? false))}>
                <div style={sectionHeaderStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <CampaignIcon />
                    <span>03 // Campaign Parameters</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: COLORS.inkMuted, letterSpacing: "0.1em" }}>[SPEC: CAMPAIGN]</span>
                </div>

                <div className="flex flex-col gap-8">
                  {/* Q6: Brand Signature */}
                  <div>
                    <label style={labelStyle(activeField === "brand_signature")}>6. Primary competitive advantage</label>
                    <span style={helperStyle}>What unique value or capability distinguishes your service from standard industry options?</span>
                    <textarea
                      required
                      value={form.brand_signature}
                      onFocus={() => setActiveField("brand_signature")}
                      onBlur={() => setActiveField(null)}
                      onChange={(e) => handleChange("brand_signature", e.target.value)}
                      style={textareaStyle(activeField === "brand_signature")}
                    />
                  </div>

                  {/* Q7: Specials / Promos (DROP-DOWN Selection) */}
                  <div>
                    <label style={labelStyle(activeField === "campaign_offer")}>7. Campaign Hook & Offer</label>
                    <span style={helperStyle}>Select your entry promotion. Low-friction offers significantly increase pipeline response rates.</span>
                    
                    <select
                      required
                      value={offerSelect}
                      onFocus={() => setActiveField("campaign_offer")}
                      onBlur={() => setActiveField(null)}
                      onChange={(e) => setOfferSelect(e.target.value)}
                      style={selectStyle(activeField === "campaign_offer")}
                    >
                      <option value="" disabled>-- Select a campaign offer type --</option>
                      <option value="Free Outbound Strategy Audit (Recommended)">Free Outbound Strategy Audit (Recommended)</option>
                      <option value="Risk-Free 30-Day Pipeline Trial">Risk-Free 30-Day Pipeline Trial</option>
                      <option value="Free Initial Consultation & Pilot Run">Free Initial Consultation & Pilot Run</option>
                      <option value="Custom Special Promotion">Custom Special Promotion (Specify below)</option>
                      <option value="No Promotion (Raw value proposition only)">No Promotion (Raw value proposition only)</option>
                    </select>

                    {/* Animating write-in box for Custom Offer */}
                    {offerSelect === "Custom Special Promotion" && (
                      <div className="mt-4 animate-fade-in">
                        <label style={{ ...labelStyle(activeField === "campaign_offer"), fontSize: "11px", color: COLORS.rust }}>Describe your custom promotion</label>
                        <input
                          type="text"
                          required
                          value={offerCustom}
                          onFocus={() => setActiveField("campaign_offer")}
                          onBlur={() => setActiveField(null)}
                          onChange={(e) => setOfferCustom(e.target.value)}
                          style={inputStyle(activeField === "campaign_offer")}
                        />
                      </div>
                    )}
                  </div>

                  {/* Q8: Price Point / High Volume focus */}
                  <div>
                    <label style={labelStyle(activeField === "core_deal_value")}>8. Average customer contract value</label>
                    <span style={helperStyle}>The typical contract size or annual value. Helps us customize outreach hooks for deal qualification.</span>
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

                  {/* Q9: Bookings routing (DROP-DOWN Selection) */}
                  <div>
                    <label style={labelStyle(activeField === "routing_destination")}>9. CRM & Meeting Destination</label>
                    <span style={helperStyle}>Specify the destination for booking calendar redirects and hot lead handoffs.</span>
                    
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

                    {routingSelect && (
                      <div className="mt-4 animate-fade-in">
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

                  {/* Q10: 5 Email account names */}
                  <div>
                    <label style={labelStyle(activeField?.startsWith("email_names") ?? false)}>10. Outbound sender prefixes (5 required)</label>
                    <span style={helperStyle}>Provide exactly 5 prefixes to compile outbound email mailboxes (e.g. sales, support, support2).</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      {form.email_names.map((name, index) => {
                        const isThisBoxActive = activeField === `email_names_${index}`;
                        return (
                          <div key={index} className="flex flex-col gap-2">
                            <span style={{ fontSize: "10px", fontFamily: "var(--font-mono, monospace)", color: isThisBoxActive ? COLORS.sapphire : COLORS.inkMuted, fontWeight: 700 }}>
                              BOX 0{index + 1}
                            </span>
                            <input
                              type="text"
                              required
                              value={name}
                              onFocus={() => setActiveField(`email_names_${index}`)}
                              onBlur={() => setActiveField(null)}
                              onChange={(e) => handleNameBoxChange(index, e.target.value)}
                              style={inputStyle(isThisBoxActive)}
                            />
                            {/* Live Outbound Email Preview */}
                            <span 
                              style={{ 
                                fontSize: "9.5px", 
                                fontFamily: "var(--font-mono, monospace)", 
                                color: name ? COLORS.sapphire : "rgba(13,43,74,0.3)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "block"
                              }}
                            >
                              {name || "prefix"}@{displayDomain}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: 4 Columns (Bento Sidebar with Submit) */}
            <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-[40px]">
              
              {/* Card: Submission Progress & Checklist */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(13, 43, 74, 0.07)",
                  outline: "1px solid rgba(255, 255, 255, 0.6)",
                  outlineOffset: "-4px",
                  boxShadow: "0 8px 30px rgba(13, 43, 74, 0.015), inset 0 1px 0 rgba(255,255,255,0.8)",
                  padding: "36px 32px",
                  borderRadius: "0px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif, serif)",
                        fontSize: "19px",
                        color: COLORS.inkPrimary,
                        fontWeight: 600,
                      }}
                    >
                      Console Progress
                    </h3>
                    <span style={{ fontSize: "11px", fontFamily: "var(--font-mono, monospace)", color: COLORS.inkMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      System checklist
                    </span>
                  </div>

                  {/* Circular Vector Progress Ring */}
                  <div style={{ position: "relative", width: "64px", height: "64px" }}>
                    <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
                      <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(13, 43, 74, 0.05)" strokeWidth={strokeWidth} />
                      <circle cx="32" cy="32" r={radius} fill="none" stroke={COLORS.sapphire} strokeWidth={strokeWidth}
                        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="square"
                        style={{ transition: "stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }} />
                    </svg>
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12.5px",
                      fontFamily: "var(--font-mono, monospace)",
                      fontWeight: 700,
                      color: COLORS.sapphire
                    }}>
                      {progressPercent}%
                    </div>
                  </div>
                </div>

                {/* Real-time Checklist */}
                <div className="flex flex-col gap-3.5 mb-8">
                  {checklistItems.map((item) => {
                    const complete = isFieldComplete(item.key as keyof OnboardingForm);
                    return (
                      <div 
                        key={item.key} 
                        style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "space-between",
                          fontSize: "12.5px", 
                          fontFamily: "var(--font-mono, monospace)",
                          color: complete ? COLORS.inkPrimary : COLORS.inkMuted,
                          transition: "color 0.2s",
                        }}
                      >
                        <span style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                          <span style={{ color: complete ? COLORS.sapphire : COLORS.inkMuted, fontWeight: 700 }}>
                            {item.num}
                          </span>
                          <span style={{ textDecoration: complete ? "line-through" : "none", opacity: complete ? 0.65 : 1 }}>
                            {item.label}
                          </span>
                        </span>
                        <span style={{ color: complete ? COLORS.sapphire : COLORS.inkMuted, fontWeight: "bold", fontSize: "14px" }}>
                          {complete ? "●" : "○"}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                <p
                  style={{
                    fontSize: "12.5px",
                    lineHeight: "1.65",
                    color: COLORS.inkBody,
                    marginBottom: "28px",
                  }}
                >
                  All active parameters must compile at 100% to initialize the outbound pipeline server build.
                </p>

                {status === "error" && (
                  <div
                    style={{
                      padding: "14px 18px",
                      background: "rgba(196,67,27,0.06)",
                      border: "1px solid rgba(196,67,27,0.2)",
                      fontSize: "12.5px",
                      color: COLORS.rust,
                      marginBottom: "20px",
                      lineHeight: "1.5"
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{
                    width: "100%",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    background: status === "submitting" ? COLORS.inkMuted : COLORS.sapphire,
                    padding: "19px 24px",
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
                  {status === "submitting" ? "Compiling..." : "Launch Outbound Build"}
                </button>
              </div>

              {/* Card: Engineering Guarantee Info */}
              <div
                style={{
                  background: COLORS.blueDeep,
                  outline: "1px solid rgba(255, 255, 255, 0.08)",
                  outlineOffset: "-4px",
                  padding: "36px 32px",
                  color: "#FFFFFF",
                  borderRadius: "0px",
                  boxShadow: "0 12px 36px rgba(13, 43, 74, 0.05)",
                }}
              >
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.rust }} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      fontWeight: 700
                    }}
                  >
                    Infrastructure Guarantee
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-serif, serif)",
                    fontSize: "18px",
                    marginBottom: "14px",
                    fontWeight: 500,
                    lineHeight: "1.35",
                  }}
                >
                  You keep 100% of the built assets.
                </h4>
                <p
                  style={{
                    fontSize: "12.5px",
                    lineHeight: "1.65",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  The warm email sending accounts, high-yield prospect lists, delivery infrastructure, and cold outreach domains are legally registered under your entity. They remain your permanent property under any circumstance.
                </p>
              </div>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}
