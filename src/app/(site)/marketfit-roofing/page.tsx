"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ScaleSteady Premium Dark Theme Palette (matched to home page)
const C = {
  bg: "linear-gradient(135deg, #0A0B0C 0%, #0E1012 50%, #121417 100%)", // Matte Obsidian Black/Charcoal Base
  cardBg: "#F9F9FB", // premium warm gray/white card container
  border: "rgba(0, 0, 0, 0.08)",   // thin subtle border
  borderHover: "rgba(0, 0, 0, 0.18)",
  borderFocus: "#C8B395",    // warm sand / titanium focus accent
  textPrimary: "#FFFFFF",    // crisp white
  textSecondary: "#E5E5EA",  // Apple-grade secondary white/silver
  textMuted: "#636366",      // dark slate gray description text inside card
  accentSand: "#C8B395",     // warm sand gold highlights
  accentSandMuted: "rgba(200, 179, 149, 0.15)",
  accentObsidian: "#181A1F",  // deep dark graphite
};

const ACCENTS = [
  { dot: "#C8B395", tint: "rgba(200,179,149,0.01)", border: "rgba(200,179,149,0.08)" },
  { dot: "#C8B395", tint: "rgba(200,179,149,0.01)", border: "rgba(200,179,149,0.08)" },
  { dot: "#C8B395", tint: "rgba(200,179,149,0.01)", border: "rgba(200,179,149,0.08)" },
  { dot: "#C8B395", tint: "rgba(200,179,149,0.01)", border: "rgba(200,179,149,0.08)" },
  { dot: "#C8B395", tint: "rgba(200,179,149,0.01)", border: "rgba(200,179,149,0.08)" },
];

const ICP_OPTIONS = [
  { value: "Commercial Property Managers & Facility Directors", label: "Commercial Property Managers & Facility Directors (Flat Roof Agreements)" },
  { value: "Real Estate Agents & Escrow Officers", label: "Real Estate Agents & Escrow Officers (Certifications & Escrow Repairs)" },
  { value: "General Contractors & Commercial Builders", label: "General Contractors & Commercial Builders (Tenant Improvement Bids)" },
  { value: "Industrial & Warehouse Owners", label: "Industrial & Warehouse Owners (Silicone Roof Coatings/Restorations)" },
];

const ZONING_OPTIONS = [
  { value: "Light Industrial & Manufacturing", label: "Light Industrial & Manufacturing (High flat-roof density)" },
  { value: "Heavy Industrial & Warehouses", label: "Heavy Industrial & Warehouses (Large footprint flat-roofs)" },
  { value: "Commercial Retail & Strip Malls", label: "Commercial Retail & Strip Malls (Multi-tenant property setups)" },
  { value: "Professional Office Parks", label: "Professional Office Parks (Low-rise corporate plazas)" },
  { value: "Multi-Family Residential", label: "Multi-Family Residential (Apartments & condominium HOAs)" },
];


interface OnboardingForm {
  company_name: string;
  contact_name: string;
  contact_details: string;
  primary_icp: string;
  geographic_target: string;
  ideal_job_size: string;
  intro_offer: string;
  copy_constraints: string;
  best_win: string;
  main_objection: string;
  edge: string;
  goals_90_days: string;
  past_results: string;
  routing_destination: string;
  email_names: string[];
}

// Custom typewriter hook for fluid, responsive animations
function useTypewriter(words: string[], speed = 70, delay = 2200) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return currentText;
}

export default function OnboardingPage() {
  const typedHeadline = useTypewriter([
    "Target commercial building owners.",
    "Scale flat-roof service agreements.",
    "Engage facility & property managers.",
  ]);

  const [form, setForm] = useState<OnboardingForm>({
    company_name: "",
    contact_name: "",
    contact_details: "",
    primary_icp: "",
    geographic_target: "",
    ideal_job_size: "",
    intro_offer: "",
    copy_constraints: "",
    best_win: "",
    main_objection: "",
    edge: "",
    goals_90_days: "",
    past_results: "",
    routing_destination: "",
    email_names: ["", "", "", "", ""],
  });

  const [routingSelect, setRoutingSelect] = useState<string>("");
  const [routingDetails, setRoutingDetails] = useState<string>("");
  const [zoningTargets, setZoningTargets] = useState<string[]>([]);
  const [geoRadius, setGeoRadius] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".sec").forEach((s) => observer.observe(s));
    return () => document.querySelectorAll(".sec").forEach((s) => observer.unobserve(s));
  }, []);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("scalesteady_onboarding_v12_roofer");
      if (cached) {
        const parsed = JSON.parse(cached);
        setForm((prev) => ({
          ...prev,
          ...parsed,
          email_names: Array.isArray(parsed.email_names) && parsed.email_names.length === 5 ? parsed.email_names : prev.email_names,
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
        if (parsed.geographic_target) {
          const parts = parsed.geographic_target.split(" | Area: ");
          if (parts.length > 1) {
            setGeoRadius(parts[1]);
            const zonesPart = parts[0].replace("Zones: ", "");
            setZoningTargets(zonesPart ? zonesPart.split(", ") : []);
          } else {
            setGeoRadius(parsed.geographic_target);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const save = (d: OnboardingForm) => {
    try {
      localStorage.setItem("scalesteady_onboarding_v12_roofer", JSON.stringify(d));
    } catch {}
  };

  const handleChange = (field: keyof OnboardingForm, value: string) => {
    const u = { ...form, [field]: value };
    setForm(u);
    save(u);
  };

  useEffect(() => {
    const v = routingSelect && routingDetails ? `${routingSelect}: ${routingDetails}` : routingDetails;
    if (v !== form.routing_destination) {
      const u = { ...form, routing_destination: v };
      setForm(u);
      save(u);
    }
  }, [routingSelect, routingDetails]);

  useEffect(() => {
    const zonesStr = zoningTargets.join(", ");
    const combined = zonesStr || geoRadius ? `Zones: ${zonesStr} | Area: ${geoRadius}` : "";
    if (combined !== form.geographic_target) {
      const u = { ...form, geographic_target: combined };
      setForm(u);
      save(u);
    }
  }, [zoningTargets, geoRadius]);

  const handleNameBoxChange = (i: number, value: string) => {
    const clean = value.replace(/@.*$/, "").replace(/\s+/g, "").toLowerCase();
    const names = [...form.email_names];
    names[i] = clean;
    const u = { ...form, email_names: names };
    setForm(u);
    save(u);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zoningTargets.length === 0) {
      setStatus("error");
      setErrorMsg("Please select at least one zoning target profile under Question 5.");
      return;
    }
    if (!geoRadius.trim()) {
      setStatus("error");
      setErrorMsg("Please enter your target geography focus area under Question 5.");
      return;
    }
    const f = [
      form.company_name,
      form.contact_name,
      form.contact_details,
      form.primary_icp,
      form.geographic_target,
      form.ideal_job_size,
      form.intro_offer,
      form.copy_constraints,
      form.best_win,
      form.main_objection,
      form.edge,
      form.goals_90_days,
      form.past_results,
      form.routing_destination,
    ];
    if (!f.every((x) => x.trim().length > 0) || !form.email_names.every((n) => n.trim().length > 0)) {
      setStatus("error");
      setErrorMsg("Please complete all 15 questions before submitting.");
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
          icp_description: `Target Focus: ${form.primary_icp}\nIdeal Project: ${form.ideal_job_size}\nMain Objection: ${form.main_objection}`,
          brand_signature: `Vibe: ${form.edge}\nEdge: ${form.edge}\nPast Wins: ${form.best_win}`,
          campaign_offer: form.intro_offer,
          core_deal_value: `Constraints: ${form.copy_constraints}\nGoals: ${form.goals_90_days}\nPast Marketing: ${form.past_results}`,
          geographic_target: form.geographic_target,
          routing_destination: form.routing_destination,
        },
      ]);
      if (error) throw new Error(error.message);
      setStatus("success");
      localStorage.removeItem("scalesteady_onboarding_v12_roofer");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit marketing onboarding information.");
    }
  };

  const ok = (f: keyof OnboardingForm) => {
    if (f === "email_names") {
      return form.email_names.every((n) => n.trim().length > 0);
    }
    return form[f].trim().length > 0;
  };

  const FL: (keyof OnboardingForm)[] = [
    "company_name",
    "contact_name",
    "contact_details",
    "primary_icp",
    "geographic_target",
    "ideal_job_size",
    "intro_offer",
    "copy_constraints",
    "best_win",
    "main_objection",
    "edge",
    "goals_90_days",
    "past_results",
    "routing_destination",
    "email_names",
  ];
  
  const done = FL.filter(ok).length;
  const domain = form.company_name ? form.company_name.toLowerCase().replace(/[^a-z0-9]/g, "") + "roofing.com" : "yourdomain.com";
  const act = (f: string) => activeField === f;

  const getActiveSecIndex = () => {
    if (!activeField) return -1;
    if (["company_name", "contact_name", "contact_details"].includes(activeField)) return 0;
    if (["primary_icp", "geographic_target", "ideal_job_size"].includes(activeField)) return 1;
    if (["intro_offer", "copy_constraints", "best_win"].includes(activeField)) return 2;
    if (["main_objection", "edge", "goals_90_days", "past_results"].includes(activeField)) return 3;
    if (activeField === "routing_destination" || activeField.startsWith("email_names")) return 4;
    return -1;
  };
  const activeSec = getActiveSecIndex();

  if (status === "success") {
    return (
      <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="gcard" style={{ maxWidth: "520px", width: "100%", padding: "64px 48px", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(200,179,149,0.08)", border: `1px solid ${C.accentSand}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <span style={{ color: C.accentSand, fontSize: "22px" }}>&#10003;</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", color: C.textPrimary, fontWeight: 400, letterSpacing: "-0.03em", marginBottom: "12px" }}>Locked in.</h1>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: C.textSecondary, maxWidth: "340px", margin: "0 auto 36px" }}>
            Your marketing profile has been updated. We are analyzing your ideal targets and constraints to draft your outbound sequence campaigns.
          </p>
          <Link href="/" className="submit-btn" style={{ display: "inline-flex", padding: "16px 48px", textDecoration: "none", borderRadius: "0px" }}>
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", position: "relative", color: C.textPrimary }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Ambient blurs matched to scalesteady.pro */}
      <div style={{ position: "fixed", top: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(200,179,149,0.05) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-10%", left: "-5%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(200,179,149,0.03) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      {/* ═══ HERO ═══ */}
      <div style={{ position: "relative", zIndex: 2, padding: "90px 24px 30px", textAlign: "center" }}>
        <div style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="pill">
            <span className="pill-dot" />
            Outbound Campaign Setup
          </div>
          
          {/* Typewriter Headings */}
          <h1 style={{ fontSize: "clamp(32px, 5.5vw, 64px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.035em", color: C.textPrimary, marginBottom: "16px", minHeight: "2.3em" }}>
            <span style={{ display: "block", fontSize: "0.55em", color: C.accentSand, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, marginBottom: "8px" }}>
              Commercial Outbound Setup
            </span>
            <span style={{ borderRight: "3px solid #C8B395", paddingRight: "4px", display: "inline-block" }}>
              {typedHeadline || "\u00A0"}
            </span>
          </h1>
          
          <p style={{ fontSize: "15px", color: C.textSecondary, maxWidth: "460px", margin: "0 auto", lineHeight: 1.6 }}>
            15 questions to define your commercial flat-roof specs and bypass gatekeeper objections.
          </p>
        </div>
      </div>

      {/* ═══ STICKY PROGRESS ═══ */}
      <div className="prog-wrap">
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ display: "flex", gap: "3px", flex: 1 }}>
            {FL.map((f) => (
              <div key={f} className="prog-pip" data-done={ok(f)} data-active={activeField === f || (f === "email_names" && activeField?.startsWith("email_names"))} />
            ))}
          </div>
          <span style={{ fontFamily: "monospace", fontSize: "11px", color: C.textSecondary, fontWeight: 600 }}>{done}/15</span>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} style={{ position: "relative", zIndex: 2 }}>

        {/* SECTION 1 */}
        <Sec i={0} label="01 / BRAND IDENTIFICATION" title="Corporate Anchor & Direct Lines" isActive={activeSec === 0}>
          <Field field="company_name" label="1. Registered Corporate Entity & Brand Name" active={act("company_name")}>
            <input className="gi" {...ip("company_name", form, handleChange, setActiveField, "e.g. Apex Roofing & Contracting")} data-active={act("company_name")} />
          </Field>
          <Field field="contact_name" label="2. Authorized Representative & Corporate Title" active={act("contact_name")}>
            <input className="gi" {...ip("contact_name", form, handleChange, setActiveField, "e.g. John Miller, Commercial Accounts Director")} data-active={act("contact_name")} />
          </Field>
          <Field field="contact_details" label="3. Secure Corporate Email & Direct Line" active={act("contact_details")} last>
            <input className="gi" {...ip("contact_details", form, handleChange, setActiveField, "e.g. john@apexroofing.com or 555-0199")} data-active={act("contact_details")} />
          </Field>
        </Sec>

        {/* SECTION 2 */}
        <Sec i={1} label="02 / ICP CALIBRATION" title="Algorithmic Zoning & Property Density" isActive={activeSec === 1}>
          <Field field="primary_icp" label="4. Select your prime B2B target profiles & strategic referral partners (Select all that apply):" active={act("primary_icp")}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
              {ICP_OPTIONS.map((opt) => {
                const selectedList = form.primary_icp ? form.primary_icp.split(", ") : [];
                const isSelected = selectedList.includes(opt.value);
                
                const handleToggle = () => {
                  let newList;
                  if (isSelected) {
                    newList = selectedList.filter((v) => v !== opt.value);
                  } else {
                    newList = [...selectedList, opt.value];
                  }
                  handleChange("primary_icp", newList.join(", "));
                };
                
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={handleToggle}
                    onFocus={() => setActiveField("primary_icp")}
                    onBlur={() => setActiveField(null)}
                    className="icp-card-btn"
                    data-selected={isSelected}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className="icp-chk" data-selected={isSelected}>
                        {isSelected && <span>&#10003;</span>}
                      </div>
                      <span style={{ fontSize: "14px", textAlign: "left", lineHeight: 1.4 }}>{opt.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Field>
          <Field field="geographic_target" label="5. Algorithmic Zoning & Property Density targets (Select all that apply):" active={act("geographic_target")}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px", marginBottom: "20px" }}>
              {ZONING_OPTIONS.map((opt) => {
                const isSelected = zoningTargets.includes(opt.value);
                
                const handleToggle = () => {
                  let newList;
                  if (isSelected) {
                    newList = zoningTargets.filter((v) => v !== opt.value);
                  } else {
                    newList = [...zoningTargets, opt.value];
                  }
                  setZoningTargets(newList);
                };
                
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={handleToggle}
                    onFocus={() => setActiveField("geographic_target")}
                    onBlur={() => setActiveField(null)}
                    className="icp-card-btn"
                    data-selected={isSelected}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className="icp-chk" data-selected={isSelected}>
                        {isSelected && <span>&#10003;</span>}
                      </div>
                      <span style={{ fontSize: "14px", textAlign: "left", lineHeight: 1.4 }}>{opt.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <label className="fl fl-sm" style={{ display: "block", marginBottom: "8px" }}>Target Locations / Geography (e.g. Cook County industrial corridors, or 50 miles radius from Chicago)</label>
            <input 
              className="gi" 
              type="text"
              required
              value={geoRadius}
              placeholder="e.g. Cook County, or within 50 miles of Chicago"
              onFocus={() => setActiveField("geographic_target")}
              onBlur={() => setActiveField(null)}
              onChange={(e) => setGeoRadius(e.target.value)}
              data-active={act("geographic_target")} 
            />
          </Field>
          <Field field="ideal_job_size" label="6. Authorized Manufacturer Certifications & Systems (e.g. TPO, EPDM, Silicone Coatings, Metal)" active={act("ideal_job_size")} last>
            <textarea className="gi gi-ta" {...tp("ideal_job_size", form, handleChange, setActiveField, "List TPO thickness limits, coating preferences, or specific metal profiles...")} data-active={act("ideal_job_size")} />
          </Field>
        </Sec>

        {/* SECTION 3 */}
        <Sec i={2} label="03 / VALUE COUPLING" title="Low-Friction Offers & Risk Bypassing" isActive={activeSec === 2}>
          <Field field="intro_offer" label="7. High-Conversion Low-Friction Offer (e.g. Drone Thermal Inspections, Capital Expenditure Budgeting Plan)" active={act("intro_offer")}>
            <input className="gi" {...ip("intro_offer", form, handleChange, setActiveField, "e.g. Free Drone Thermal Assessment, or Capital Expenditure Budget Plan Estimate")} data-active={act("intro_offer")} />
            <p style={{ fontSize: "12.5px", color: C.textMuted, marginTop: "8px", lineHeight: 1.5 }}>Boilerplate sales pitches fail commercial gatekeepers. We recommend diagnostic or capital budgeting offers.</p>
          </Field>
          <Field field="copy_constraints" label="8. Corporate Risk Mitigation Credentials & Warranty Limits (e.g. GAF Master Elite, OSHA-10, $5M GL, 20-Year NDL)" active={act("copy_constraints")}>
            <textarea className="gi gi-ta" {...tp("copy_constraints", form, handleChange, setActiveField, "e.g. GAF Master Elite, OSHA-10 crew, $5M General Liability, or a 20-Year NDL (No Dollar Limit) manufacturer warranty")} data-active={act("copy_constraints")} />
          </Field>
          <Field field="best_win" label="9. Describe one major local commercial project completed (sq footage, roofing type, and how you prevented tenant business downtime)" active={act("best_win")} last>
            <textarea className="gi gi-ta" {...tp("best_win", form, handleChange, setActiveField, "e.g. Re-roofed a 50k sq ft GAF TPO warehouse with zero retail downtime by scheduling work during off-hours...")} data-active={act("best_win")} />
          </Field>
        </Sec>

        {/* SECTION 4 */}
        <Sec i={3} label="04 / OBJECTION BYPASS" title="Gatekeeper Mitigation & Trust Leverage" isActive={activeSec === 3}>
          <Field field="main_objection" label="10. When gatekeepers or property managers use the 'we already have a preferred roofer' defense, what secondary leverage do you offer?" active={act("main_objection")}>
            <textarea className="gi gi-ta" {...tp("main_objection", form, handleChange, setActiveField, "e.g. We provide 2-hour emergency leak response when their vendor is busy, or act as secondary competitive bids to keep primary vendors honest")} data-active={act("main_objection")} />
          </Field>
          <Field field="edge" label="11. Whose name and title should sign the outbound emails?" active={act("edge")}>
            <input className="gi" {...ip("edge", form, handleChange, setActiveField, "e.g. Bob Smith, Commercial Account Manager (rather than Owner/CEO)")} data-active={act("edge")} />
            <p style={{ fontSize: "12.5px", color: C.textMuted, marginTop: "8px", lineHeight: 1.5 }}>We recommend signing emails from an Account Manager or Lead Estimator to make the outreach feel peer-to-peer.</p>
          </Field>
          <Field field="goals_90_days" label="12. Do you want to target properties based on their capital budgeting planning cycles? (Commercial plans typically lock in Q3/Q4)" active={act("goals_90_days")}>
            <textarea className="gi gi-ta" {...tp("goals_90_days", form, handleChange, setActiveField, "Specify if you want to align outreach timing with fiscal years, lease cycles, or immediate storm response...")} data-active={act("goals_90_days")} />
          </Field>
          <Field field="past_results" label="13. How do you handle property managers' skepticism regarding local storm chasers, roofing contractor scams, or lack of local presence?" active={act("past_results")} last>
            <textarea className="gi gi-ta" {...tp("past_results", form, handleChange, setActiveField, "e.g. We cite local references, show physical brick-and-mortar office location, or prove active local permits...")} data-active={act("past_results")} />
          </Field>
        </Sec>

        {/* SECTION 5 */}
        <Sec i={4} label="05 / PIPELINE ROUTING" title="CRM Integration & Mailbox Sender Setup" isActive={activeSec === 4}>
          <div className="fg" data-active={act("routing_destination")}>
            <label className="fl" data-active={act("routing_destination")}>14. Which CRM or routing method should booked estimates route to?</label>
            <div style={{ position: "relative" }}>
              <select className="gi gi-sel" required value={routingSelect}
                onFocus={() => setActiveField("routing_destination")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => setRoutingSelect(e.target.value)}
                data-active={act("routing_destination")}
              >
                <option value="" disabled>Select CRM integration target</option>
                <option value="AccuLynx CRM">AccuLynx CRM (Lead integration)</option>
                <option value="JobNimbus CRM">JobNimbus CRM (Lead webhook)</option>
                <option value="HubSpot / Salesforce">HubSpot or Salesforce CRM</option>
                <option value="Email Intake Routing">Direct Email Inbox</option>
              </select>
            </div>
            {routingSelect && (
              <div style={{ marginTop: "14px" }}>
                <label className="fl fl-sm" data-active={true}>
                  {routingSelect === "Email Intake Routing" ? "Enter your intake email" : "Enter CRM webhook, API key name, or link details"}
                </label>
                <input className="gi" type="text" required value={routingDetails}
                  onFocus={() => setActiveField("routing_destination")}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setRoutingDetails(e.target.value)}
                  data-active={act("routing_destination")}
                />
              </div>
            )}
          </div>

          <div className="fg" data-active={activeField?.startsWith("email_names")} style={{ borderBottom: "none", marginBottom: 0 }}>
            <label className="fl" data-active={activeField?.startsWith("email_names")}>15. First names of 5 team members to set up as outbound sender profiles</label>
            <p style={{ fontSize: "13px", color: C.textMuted, marginBottom: "20px", lineHeight: 1.5 }}>Real first names only (e.g. bob, john). Emails will be sent from name@{domain}.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {form.email_names.map((name, i) => {
                const ba = activeField === `email_names_${i}`;
                return (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: ba ? "#1C1C1E" : "#8E8E93", fontWeight: 600 }}>Sender {i + 1}</span>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: name ? "#2C2C2E" : "#8E8E93" }}>{name || "name"}@{domain}</span>
                    </div>
                    <input className="gi" type="text" required value={name}
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

          {status === "error" && (
            <div style={{ padding: "14px 18px", background: "rgba(255,59,48,0.1)", border: "1px solid rgba(255,59,48,0.3)", borderRadius: "0px", fontSize: "13px", color: "#FF3B30", margin: "24px 0", lineHeight: 1.5 }}>
              {errorMsg}
            </div>
          )}

          <button type="submit" disabled={status === "submitting"} className="submit-btn submit-btn-full" style={{ borderRadius: "0px", marginTop: "32px" }}>
            {status === "submitting" ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <span className="spin" /> Submitting Settings...
              </span>
            ) : (
              "Deploy Campaign Settings"
            )}
          </button>
        </Sec>

      </form>
    </div>
  );
}

function Sec({ i, label, title, isActive, children }: { i: number; label: string; title: string; isActive: boolean; children: React.ReactNode }) {
  const a = ACCENTS[i];
  return (
    <div className="sec sec-layout" style={{ padding: "24px 24px" }} data-active={isActive}>
      <div className="sec-tint" style={{ background: a.tint }} />
      
      <div className="sec-grid">
        {/* Left column (Rail) */}
        <div className="sec-rail">
          <div className="sec-circle" data-active={isActive} style={{ borderColor: isActive ? C.accentSand : "rgba(255, 255, 255, 0.08)" }}>
            {String(i + 1).padStart(2, "0")}
          </div>
          {i < 4 && (
            <div className="sec-line" data-active={isActive} style={{ background: isActive ? `linear-gradient(to bottom, ${C.accentSand}99, rgba(255,255,255,0.01))` : `linear-gradient(to bottom, rgba(200, 179, 149, 0.08), rgba(255,255,255,0.01))` }} />
          )}
        </div>
        
        {/* Right column (Card) */}
        <div className="sec-card" data-active={isActive}>
          <div style={{ marginBottom: "40px", position: "relative" }}>
            <span className="sec-tag" style={{ color: isActive ? C.accentSand : "#7A8B9E" }}>{label}</span>
            <h2 className="sec-heading" style={{ color: "#1C1C1E" }}>{title}</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function Field({ field, label, active, last, children }: { field: string; label: string; active: boolean; last?: boolean; children: React.ReactNode }) {
  return (
    <div className="fg" data-active={active} style={last ? { borderBottom: "none", marginBottom: 0 } : undefined}>
      <label className="fl" data-active={active}>{label}</label>
      {children}
    </div>
  );
}

function ip(field: string, form: Record<string, any>, onChange: (f: any, v: string) => void, setActive: (f: string | null) => void, placeholder?: string) {
  return {
    type: "text" as const,
    required: true,
    value: form[field] as string,
    placeholder,
    onFocus: () => setActive(field),
    onBlur: () => setActive(null),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)
  };
}

function tp(field: string, form: Record<string, any>, onChange: (f: any, v: string) => void, setActive: (f: string | null) => void, placeholder?: string) {
  return {
    required: true,
    value: form[field] as string,
    placeholder,
    onFocus: () => setActive(field),
    onBlur: () => setActive(null),
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(field, e.target.value)
  };
}

const CSS = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes dotPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

/* ── Pill badge ── */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 18px 7px 14px;
  background: rgba(18, 19, 21, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 0px !important;
  font-family: monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  font-weight: 600;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.pill-dot {
  width: 6px; height: 6px;
  border-radius: 50% !important;
  background: #C8B395;
  animation: dotPulse 2.5s infinite ease-in-out;
}

/* ── Sticky progress ── */
.prog-wrap {
  position: sticky;
  top: 0; z-index: 50;
  padding: 14px 24px;
  background: rgba(12, 13, 14, 0.95);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.prog-pip {
  height: 3px; flex: 1;
  border-radius: 0px !important;
  background: #242528; /* Inactive track to graphite */
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.prog-pip[data-done="true"] {
  background: #FFFFFF;
}
.prog-pip[data-active="true"] {
  background: #C8B395;
  box-shadow: 0 0 10px rgba(200,179,149,0.6);
}

/* ── Section & Grid ── */
.sec {
  position: relative;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
.sec.vis { opacity: 1; transform: translateY(0); }
.sec:nth-child(odd) > .sec-tint { display: none; }
.sec-tint {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.sec-grid {
  display: block;
}
@media (min-width: 768px) {
  .sec-grid {
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 32px;
    align-items: start;
    max-width: 690px;
    margin: 0 auto;
  }
}

/* ── Timeline Rail ── */
.sec-rail {
  display: none;
}
@media (min-width: 768px) {
  .sec-rail {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 100%;
    margin-top: 6px;
  }
}
.sec-circle {
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  background: #0C0D0E;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  letter-spacing: 0.05em;
}
.sec-circle[data-active="true"] {
  color: #C8B395;
  background: rgba(200, 179, 149, 0.05);
  box-shadow: 0 0 16px rgba(200, 179, 149, 0.2);
}
.sec-line {
  position: absolute;
  top: 38px;
  bottom: -48px;
  left: 50%;
  width: 1px;
  z-index: 1;
  transition: background 0.3s ease;
}

/* ── Card Container ── */
.sec-card {
  background: #F9F9FB; /* Crisp clean light paper gray */
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0px !important;
  padding: 48px 40px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  color: #1C1C1E; /* Dark text default inside card */
}
.sec-card[data-active="true"] {
  border-color: rgba(200, 179, 149, 0.25) !important;
  box-shadow: 0 24px 64px rgba(0,0,0,0.7), 0 0 32px rgba(200, 179, 149, 0.03);
}
.sec-tag {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 6px;
  transition: color 0.3s ease;
}
.sec-heading {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* ── Field group ── */
.fg {
  padding-bottom: 28px;
  margin-bottom: 28px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding-left: 20px;
  border-left: 2px solid transparent;
  transition: border-color 0.3s, opacity 0.4s;
}
.fg[data-active="true"] {
  border-left-color: #C8B395;
}

/* ── Label ── */
.fl {
  display: block;
  font-size: 14.5px;
  font-weight: 500;
  color: #1C1C1E;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
  transition: color 0.25s;
}
.fl[data-active="true"] { color: #000000; }
.fl-sm { font-size: 12px; color: #636366; }

/* ── Glass input ── */
.gi {
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #D1D1D6;
  border-radius: 0px !important;
  padding: 14px 18px;
  font-size: 15px;
  color: #1C1C1E;
  outline: none;
  transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
  box-shadow: inset 0 1px 0 rgba(0,0,0,0.01);
}
.gi::placeholder {
  color: #8E8E93;
}
.gi:hover {
  border-color: rgba(0,0,0,0.25);
  background: #FFFFFF;
}
.gi:focus, .gi[data-active="true"] {
  border-color: #C8B395 !important;
  background: #FFFFFF;
  box-shadow: 0 0 0 4px rgba(200, 179, 149, 0.15), 0 0 16px rgba(200, 179, 149, 0.15) !important;
}
.gi-ta {
  resize: none !important; /* Eliminate raw browser resize handle */
  min-height: 96px;
  line-height: 1.6;
}

/* ── Select ── */
.gi-sel {
  appearance: none;
  cursor: pointer;
  padding-right: 44px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 14px;
}
.gi-sel option {
  background: #FFFFFF;
  color: #1C1C1E;
}
.gi-sel:invalid,
.gi-sel option[value=""] {
  color: #8E8E93;
}

/* ── Multiselect Bento Card Option Toggles ── */
.icp-card-btn {
  width: 100%;
  background: #F2F2F7;
  border: 1px solid #E5E5EA;
  border-radius: 0px !important;
  padding: 14px 18px;
  color: #2C2C2E;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}
.icp-card-btn:hover {
  border-color: rgba(0, 0, 0, 0.25);
  background: #E5E5EA;
}
.icp-card-btn[data-selected="true"] {
  border-color: #C8B395 !important;
  background: #F5EFE6;
  color: #1C1C1E;
  box-shadow: 0 0 0 4px rgba(200, 179, 149, 0.05);
}
.icp-chk {
  width: 18px;
  height: 18px;
  border: 1px solid #C7C7CC;
  border-radius: 0px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #FFFFFF;
  color: #C8B395;
  font-size: 11px;
  font-weight: bold;
  transition: all 0.25s ease;
}
.icp-chk[data-selected="true"] {
  border-color: #C8B395;
  background: rgba(200, 179, 149, 0.1);
}

/* ── Glass card ── */
.gcard {
  background: #F9F9FB;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0px !important;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  color: #1C1C1E;
}

/* ── Submit ── */
.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #C8B395 0%, #A58E6F 100%);
  border: none;
  border-radius: 0px !important;
  padding: 16px 36px;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #0A0B0C;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 4px 16px rgba(200, 179, 149, 0.2);
}
.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(200, 179, 149, 0.35);
}
.submit-btn:active { transform: translateY(0); }
.submit-btn-full { width: 100%; }
.submit-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

/* ── Spinner ── */
.spin {
  display: inline-block;
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.25);
  border-top-color: #fff;
  border-radius: 50% !important;
  animation: spin 0.6s linear infinite;
}

/* ── Responsive ── */
@media (max-width: 767px) {
  .sec-grid { display: block; }
  .gi { padding: 12px 14px; font-size: 14px; }
  .sec-card { padding: 32px 24px; }
}
`;
