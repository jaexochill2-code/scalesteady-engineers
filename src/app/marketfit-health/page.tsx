"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ScaleSteady Premium Dark Theme Palette (matched to home page)
const C = {
  bg: "linear-gradient(135deg, #071224 0%, #0C0D0E 60%, #161719 100%)", // Navy/Sapphire to Charcoal/Deep Graphite
  cardBg: "rgba(18, 19, 21, 0.85)", // frosted charcoal container
  border: "rgba(255,255,255,0.08)",   // higher contrast border
  borderHover: "rgba(255,255,255,0.22)",
  borderFocus: "#0052FF",    // electric cobalt focus
  textPrimary: "#FFFFFF",    // high-contrast solid white
  textSecondary: "rgba(255,255,255,0.72)", // readable body
  textMuted: "rgba(255,255,255,0.45)",
  accentBlue: "#38BDF8",     // sky blue highlights
  accentCobalt: "#0052FF",   // primary cobalt
  accentNavy: "#1B4F8A",     // sapphire navy
};

const ACCENTS = [
  { dot: "#38BDF8", tint: "rgba(56,189,248,0.03)", border: "rgba(56,189,248,0.15)" },
  { dot: "#0052FF", tint: "rgba(0,82,255,0.03)", border: "rgba(0,82,255,0.15)" },
  { dot: "#1B4F8A", tint: "rgba(27,79,138,0.03)", border: "rgba(27,79,138,0.15)" },
  { dot: "#38BDF8", tint: "rgba(56,189,248,0.03)", border: "rgba(56,189,248,0.15)" },
  { dot: "#0052FF", tint: "rgba(0,82,255,0.03)", border: "rgba(0,82,255,0.15)" },
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
      const cached = localStorage.getItem("scalesteady_onboarding_v11_roofer");
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
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const save = (d: OnboardingForm) => {
    try {
      localStorage.setItem("scalesteady_onboarding_v11_roofer", JSON.stringify(d));
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
      localStorage.removeItem("scalesteady_onboarding_v11_roofer");
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

  if (status === "success") {
    return (
      <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="gcard" style={{ maxWidth: "520px", width: "100%", padding: "64px 48px", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(56,189,248,0.08)", border: `1px solid ${C.accentBlue}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <span style={{ color: C.accentBlue, fontSize: "22px" }}>&#10003;</span>
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
      <div style={{ position: "fixed", top: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(27,79,138,0.15) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-10%", left: "-5%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(0,82,255,0.10) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      {/* ═══ HERO ═══ */}
      <div style={{ position: "relative", zIndex: 2, padding: "110px 24px 40px", textAlign: "center" }}>
        <div style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="pill">
            <span className="pill-dot" />
            Outbound Campaign Setup
          </div>
          
          {/* Typwriter Headings */}
          <h1 style={{ fontSize: "clamp(32px, 5.5vw, 64px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.035em", color: C.textPrimary, marginBottom: "20px", minHeight: "2.3em" }}>
            <span style={{ display: "block", fontSize: "0.55em", color: C.accentBlue, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, marginBottom: "8px" }}>
              Commercial Outbound Setup
            </span>
            <span style={{ borderRight: "3px solid #38BDF8", paddingRight: "4px", display: "inline-block" }}>
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
        <Sec i={0} label="The Basics" title="Contact Details">
          <Field field="company_name" label="1. Roofing Company Name" active={act("company_name")}>
            <input className="gi" {...ip("company_name", form, handleChange, setActiveField, "e.g. Apex Roofing & Contracting")} data-active={act("company_name")} />
          </Field>
          <Field field="contact_name" label="2. Your Name & Title" active={act("contact_name")}>
            <input className="gi" {...ip("contact_name", form, handleChange, setActiveField, "e.g. John Miller, Commercial Accounts Director")} data-active={act("contact_name")} />
          </Field>
          <Field field="contact_details" label="3. Best Direct Email or Mobile Phone" active={act("contact_details")} last>
            <input className="gi" {...ip("contact_details", form, handleChange, setActiveField, "e.g. john@apexroofing.com or 555-0199")} data-active={act("contact_details")} />
          </Field>
        </Sec>

        {/* SECTION 2 */}
        <Sec i={1} label="Targeting" title="B2B Commercial Focus & Density">
          <Field field="primary_icp" label="4. Which high-value B2B referral partners or commercial buyers are we targeting?" active={act("primary_icp")}>
            <div style={{ position: "relative" }}>
              <select className="gi gi-sel" required value={form.primary_icp}
                onFocus={() => setActiveField("primary_icp")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("primary_icp", e.target.value)}
                data-active={act("primary_icp")}
              >
                <option value="" disabled>Select your B2B targets</option>
                <option value="Commercial Property Managers & Facility Directors">Commercial Property Managers & Facility Directors (Flat Roof Agreements)</option>
                <option value="Real Estate Agents & Escrow Officers">Real Estate Agents & Escrow Officers (Certifications & Escrow Repairs)</option>
                <option value="General Contractors & Commercial Builders">General Contractors & Commercial Builders (Tenant Improvement Bids)</option>
                <option value="Industrial & Warehouse Owners">Industrial & Warehouse Owners (Silicon Roof Coatings/Restorations)</option>
              </select>
            </div>
          </Field>
          <Field field="geographic_target" label="5. Target Geography (We filter prospects based on industrial park density and commercial zoning)" active={act("geographic_target")}>
            <input className="gi" {...ip("geographic_target", form, handleChange, setActiveField, "e.g. Cook County industrial corridors, or 50 miles radius from Chicago")} data-active={act("geographic_target")} />
          </Field>
          <Field field="ideal_job_size" label="6. Which commercial roofing systems are you equipped to handle? (e.g. TPO, EPDM, Silicone Coatings, Metal)" active={act("ideal_job_size")} last>
            <textarea className="gi gi-ta" {...tp("ideal_job_size", form, handleChange, setActiveField, "List TPO thickness limits, coating preferences, or specific metal profiles...")} data-active={act("ideal_job_size")} />
          </Field>
        </Sec>

        {/* SECTION 3 */}
        <Sec i={2} label="The Strategy" title="Foot-In-The-Door Offers & Risk Bypassing">
          <Field field="intro_offer" label="7. What is your high-conversion 'foot-in-the-door' offer for building owners?" active={act("intro_offer")}>
            <input className="gi" {...ip("intro_offer", form, handleChange, setActiveField, "e.g. Free Drone Thermal Assessment, or Capital Expenditure Budget Plan Estimate")} data-active={act("intro_offer")} />
            <p style={{ fontSize: "12px", color: C.textMuted, marginTop: "8px" }}>Boilerplate sales pitches fail commercial gatekeepers. We recommend diagnostic or capital budgeting offers.</p>
          </Field>
          <Field field="copy_constraints" label="8. What specific liability credentials can we leverage to instantly bypass corporate risk assessors?" active={act("copy_constraints")}>
            <textarea className="gi gi-ta" {...tp("copy_constraints", form, handleChange, setActiveField, "e.g. GAF Master Elite, OSHA-10 crew, $5M General Liability, or a 20-Year NDL (No Dollar Limit) manufacturer warranty")} data-active={act("copy_constraints")} />
          </Field>
          <Field field="best_win" label="9. Describe one major local commercial project completed (sq footage, roofing type, and how you prevented tenant business disruption)" active={act("best_win")} last>
            <textarea className="gi gi-ta" {...tp("best_win", form, handleChange, setActiveField, "e.g. Re-roofed a 50k sq ft GAF TPO warehouse with zero retail downtime by scheduling work during off-hours...")} data-active={act("best_win")} />
          </Field>
        </Sec>

        {/* SECTION 4 */}
        <Sec i={3} label="Objection Gates" title="Disarming gatekeepers & local credibility">
          <Field field="main_objection" label="10. When a property manager says 'we already have a preferred roofer', what backup value do you offer?" active={act("main_objection")}>
            <textarea className="gi gi-ta" {...tp("main_objection", form, handleChange, setActiveField, "e.g. We provide 2-hour emergency leak response when their vendor is busy, or act as secondary competitive bids to keep primary vendors honest")} data-active={act("main_objection")} />
          </Field>
          <Field field="edge" label="11. Whose name and title should sign the outbound emails?" active={act("edge")}>
            <input className="gi" {...ip("edge", form, handleChange, setActiveField, "e.g. Bob Smith, Commercial Account Manager (rather than Owner/CEO)")} data-active={act("edge")} />
            <p style={{ fontSize: "12px", color: C.textMuted, marginTop: "8px" }}>We recommend signing emails from an Account Manager or Lead Estimator to make the outreach feel peer-to-peer.</p>
          </Field>
          <Field field="goals_90_days" label="12. Do you want to target properties based on their capital budgeting planning cycles? (Commercial plans typically lock in Q3/Q4)" active={act("goals_90_days")}>
            <textarea className="gi gi-ta" {...tp("goals_90_days", form, handleChange, setActiveField, "Specify if you want to align outreach timing with fiscal years, lease cycles, or immediate storm response...")} data-active={act("goals_90_days")} />
          </Field>
          <Field field="past_results" label="13. How do you handle property managers' skepticism regarding local storm chasers or roofing contractor scams?" active={act("past_results")} last>
            <textarea className="gi gi-ta" {...tp("past_results", form, handleChange, setActiveField, "e.g. We cite local references, show physical brick-and-mortar office location, or prove active local permits...")} data-active={act("past_results")} />
          </Field>
        </Sec>

        {/* SECTION 5 */}
        <div className="sec" style={{ padding: "56px 24px 100px" }}>
          <div className="sec-tint" style={{ background: ACCENTS[4].tint }} />
          <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ marginBottom: "44px", position: "relative" }}>
              <span className="sec-tag" style={{ color: ACCENTS[4].dot }}>Campaign Setup</span>
              <h2 className="sec-heading">14. CRM Integration & Mailbox Sender Setup</h2>
              <span className="sec-ghost">05</span>
            </div>

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

            <div className="fg" data-active={activeField?.startsWith("email_names")} style={{ borderBottom: "none", marginBottom: "48px" }}>
              <label className="fl" data-active={activeField?.startsWith("email_names")}>15. First names of 5 team members to set up as outbound sender profiles</label>
              <p style={{ fontSize: "13px", color: C.textMuted, marginBottom: "20px" }}>Real first names only (e.g. bob, john). Emails will be sent from name@{domain}.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {form.email_names.map((name, i) => {
                  const ba = activeField === `email_names_${i}`;
                  return (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "11px", fontFamily: "monospace", color: ba ? C.textPrimary : C.textMuted, fontWeight: 600 }}>Sender {i + 1}</span>
                        <span style={{ fontSize: "11px", fontFamily: "monospace", color: name ? C.textSecondary : C.textMuted }}>{name || "name"}@{domain}</span>
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
              <div style={{ padding: "14px 18px", background: "rgba(255,59,48,0.1)", border: "1px solid rgba(255,59,48,0.3)", borderRadius: "0px", fontSize: "13px", color: "#FF3B30", marginBottom: "24px", lineHeight: 1.5 }}>
                {errorMsg}
              </div>
            )}

            <button type="submit" disabled={status === "submitting"} className="submit-btn submit-btn-full" style={{ borderRadius: "0px" }}>
              {status === "submitting" ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <span className="spin" /> Submitting Settings...
                </span>
              ) : (
                "Deploy Campaign Settings"
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}

function Sec({ i, label, title, children }: { i: number; label: string; title: string; children: React.ReactNode }) {
  const a = ACCENTS[i];
  return (
    <div className="sec" style={{ padding: "56px 24px" }}>
      <div className="sec-tint" style={{ background: a.tint }} />
      <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: "44px", position: "relative" }}>
          <span className="sec-tag" style={{ color: a.dot }}>{label}</span>
          <h2 className="sec-heading" style={{ color: C.textPrimary }}>{title}</h2>
          <span className="sec-ghost">{String(i + 1).padStart(2, "0")}</span>
        </div>
        {children}
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
  border-radius: 0px;
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
  border-radius: 50%;
  background: #38BDF8;
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
  border-radius: 0px;
  background: rgba(255,255,255,0.12);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.prog-pip[data-done="true"] {
  background: #FFFFFF;
}
.prog-pip[data-active="true"] {
  background: #0052FF;
  box-shadow: 0 0 10px rgba(0,82,255,0.6);
}

/* ── Section ── */
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
.sec-tag {
  display: block;
  font-family: monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.sec-heading {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.sec-ghost {
  position: absolute;
  right: 0; top: -8px;
  font-size: 80px;
  font-weight: 300;
  color: rgba(255,255,255,0.015);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

/* ── Field group ── */
.fg {
  padding-bottom: 28px;
  margin-bottom: 28px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding-left: 20px;
  border-left: 2px solid transparent;
  transition: border-color 0.3s, opacity 0.4s;
}
.fg[data-active="true"] {
  border-left-color: #0052FF;
}

/* ── Label ── */
.fl {
  display: block;
  font-size: 14.5px;
  font-weight: 500;
  color: rgba(255,255,255,0.95);
  margin-bottom: 10px;
  letter-spacing: -0.01em;
  transition: color 0.25s;
}
.fl[data-active="true"] { color: #FFFFFF; }
.fl-sm { font-size: 12px; color: rgba(255,255,255,0.5); }

/* ── Glass input ── */
.gi {
  width: 100%;
  background: rgba(18, 19, 21, 0.9);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 0px;
  padding: 14px 18px;
  font-size: 15px;
  color: #FFFFFF;
  outline: none;
  transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
}
.gi::placeholder {
  color: rgba(255,255,255,0.3);
}
.gi:hover {
  border-color: rgba(255,255,255,0.35);
  background: rgba(24, 25, 28, 0.95);
}
.gi:focus, .gi[data-active="true"] {
  border-color: #0052FF;
  background: rgba(12, 13, 14, 0.98);
  box-shadow: 0 0 0 4px rgba(0,82,255,0.25), 0 0 16px rgba(0,82,255,0.3);
}
.gi-ta {
  resize: vertical;
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
  background: #121315;
  color: #FFFFFF;
}
.gi-sel:invalid,
.gi-sel option[value=""] {
  color: rgba(255,255,255,0.3);
}

/* ── Glass card ── */
.gcard {
  background: rgba(18, 19, 21, 0.85);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.8);
}

/* ── Submit ── */
.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0052FF 0%, #1B4F8A 100%);
  border: none;
  border-radius: 0px;
  padding: 16px 36px;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 4px 16px rgba(0,82,255,0.35);
}
.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(0,82,255,0.55);
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
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .sec-ghost { display: none; }
  .gi { padding: 12px 14px; font-size: 14px; }
}
`;
