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
      setErrorMsg("Please answer all 10 questions before submitting.");
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
    "icp_description",
    "geographic_target",
    "brand_signature",
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

  // Premium Centered UI styling tokens
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
    fontSize: "12px",
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
    fontSize: "13px",
    lineHeight: "1.6",
    color: COLORS.inkBody,
    marginBottom: "16px",
    opacity: 0.85
  };

  const questionGroupStyle = (isActive: boolean): React.CSSProperties => ({
    borderBottom: "1px solid rgba(13, 43, 74, 0.06)",
    paddingBottom: "36px",
    marginBottom: "36px",
    opacity: isActive ? 1 : 0.9,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  });

  // ── Success State ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div 
        style={{ 
          background: COLORS.canvas, 
          backgroundImage: "radial-gradient(at 0% 0%, rgba(27, 79, 138, 0.03) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(196, 67, 27, 0.02) 0px, transparent 50%), linear-gradient(rgba(13, 43, 74, 0.008) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 43, 74, 0.008) 1px, transparent 1px)",
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

  // ── Centered Minimalist 1-Pager Dashboard Form ─────────────────────────────
  return (
    <div 
      style={{ 
        background: COLORS.canvas, 
        backgroundImage: "radial-gradient(at 0% 0%, rgba(27, 79, 138, 0.03) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(196, 67, 27, 0.02) 0px, transparent 50%), linear-gradient(rgba(13, 43, 74, 0.008) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 43, 74, 0.008) 1px, transparent 1px)",
        backgroundSize: "auto, auto, 24px 24px, 24px 24px",
        minHeight: "100vh", 
        padding: "80px 0 120px" 
      }}
    >
      
      <div className="mx-auto px-6 sm:px-12" style={{ maxWidth: "760px" }}>
        
        {/* Header Block */}
        <div className="mb-12 text-center">
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
              System Provisioning Console
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
            Configure your technical scope, routing protocols, and custom client parameters below to launch pipeline building.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Centered Luxury Questionnaire Card */}
          <div style={containerCardStyle}>
            
            {/* Ambient Progress Indicator */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "28px" }}>
              <span style={{ fontSize: "10px", fontFamily: "var(--font-mono, monospace)", color: COLORS.inkMuted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                Specification Checklist
              </span>
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "13px", color: COLORS.sapphire, fontWeight: 700 }}>
                {progressPercent}% Complete
              </span>
            </div>

            {/* Faint progress bar */}
            <div style={{ width: "100%", height: "3px", background: "rgba(13, 43, 74, 0.04)", marginBottom: "48px" }}>
              <div 
                style={{ 
                  height: "100%", 
                  width: `${progressPercent}%`, 
                  background: COLORS.sapphire, 
                  transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)" 
                }} 
              />
            </div>

            {/* Q1: Business Name */}
            <div style={questionGroupStyle(activeField === "company_name")}>
              <label style={labelStyle(activeField === "company_name")}>01 // Company name</label>
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
            <div style={questionGroupStyle(activeField === "contact_name")}>
              <label style={labelStyle(activeField === "contact_name")}>02 // Your name</label>
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
            <div style={questionGroupStyle(activeField === "contact_details")}>
              <label style={labelStyle(activeField === "contact_details")}>03 // Direct email or phone number</label>
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

            {/* Q4: ICP */}
            <div style={questionGroupStyle(activeField === "icp_description")}>
              <label style={labelStyle(activeField === "icp_description")}>04 // Ideal Client Profile (ICP)</label>
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
            <div style={questionGroupStyle(activeField === "geographic_target")}>
              <label style={labelStyle(activeField === "geographic_target")}>05 // Territorial Scope</label>
              <span style={helperStyle}>Select your target region. We isolate regional records to match this footprint.</span>
              
              <div style={{ position: "relative" }}>
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
              </div>

              {/* Dynamic write-in box for Custom Region */}
              {geoSelect === "Custom Region (Please specify)" && (
                <div style={{ marginTop: "16px" }}>
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

            {/* Q6: Brand Signature */}
            <div style={questionGroupStyle(activeField === "brand_signature")}>
              <label style={labelStyle(activeField === "brand_signature")}>06 // Primary competitive advantage</label>
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
            <div style={questionGroupStyle(activeField === "campaign_offer")}>
              <label style={labelStyle(activeField === "campaign_offer")}>07 // Campaign Hook & Offer</label>
              <span style={helperStyle}>Select your entry promotion. Low-friction offers significantly increase pipeline response rates.</span>
              
              <div style={{ position: "relative" }}>
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
              </div>

              {/* Dynamic write-in box for Custom Offer */}
              {offerSelect === "Custom Special Promotion" && (
                <div style={{ marginTop: "16px" }}>
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

            {/* Q8: Price Point */}
            <div style={questionGroupStyle(activeField === "core_deal_value")}>
              <label style={labelStyle(activeField === "core_deal_value")}>08 // Average contract value</label>
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
            <div style={questionGroupStyle(activeField === "routing_destination")}>
              <label style={labelStyle(activeField === "routing_destination")}>09 // CRM & Meeting Destination</label>
              <span style={helperStyle}>Specify the destination for booking calendar redirects and hot lead handoffs.</span>
              
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

            {/* Q10: 5 Email account names */}
            <div style={{ ...questionGroupStyle((activeField?.startsWith("email_names") ?? false)), borderBottom: "none", paddingBottom: "0px", marginBottom: "48px" }}>
              <label style={labelStyle((activeField?.startsWith("email_names") ?? false))}>10 // Outbound sender prefixes (5 required)</label>
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
              {status === "submitting" ? "Compiling Server Configuration..." : "Launch Outbound Build"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
