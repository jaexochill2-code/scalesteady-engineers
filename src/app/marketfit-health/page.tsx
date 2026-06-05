"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ScaleSteady Premium Dark Theme Palette (matched to home page)
const C = {
  bg: "#0C0D0E",             // deepest graphite void
  cardBg: "rgba(18, 19, 21, 0.75)", // frosted charcoal container
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(255,255,255,0.15)",
  borderFocus: "#0052FF",    // electric cobalt focus
  textPrimary: "#F4F4F4",    // high-contrast off-white
  textSecondary: "rgba(255,255,255,0.70)", // charcoal/muted text
  textMuted: "rgba(255,255,255,0.45)",
  accentBlue: "#38BDF8",     // sky blue highlights
  accentCobalt: "#0052FF",   // primary cobalt
  accentNavy: "#1B4F8A",     // sapphire navy
};

const ACCENTS = [
  { dot: "#38BDF8", tint: "rgba(56,189,248,0.02)", border: "rgba(56,189,248,0.1)" },
  { dot: "#0052FF", tint: "rgba(0,82,255,0.02)", border: "rgba(0,82,255,0.1)" },
  { dot: "#1B4F8A", tint: "rgba(27,79,138,0.02)", border: "rgba(27,79,138,0.1)" },
  { dot: "#38BDF8", tint: "rgba(56,189,248,0.02)", border: "rgba(56,189,248,0.1)" },
  { dot: "#0052FF", tint: "rgba(0,82,255,0.02)", border: "rgba(0,82,255,0.1)" },
];

interface OnboardingForm {
  company_name: string;
  contact_name: string;
  contact_details: string;
  primary_icp: string;
  geographic_target: string;
  ideal_job_size: string;
  copywriter_preference: string;
  copy_constraints: string;
  intro_offer: string;
  main_objection: string;
  edge: string;
  best_win: string;
  goals_90_days: string;
  past_results: string;
  routing_destination: string;
  email_names: string[];
}

export default function OnboardingPage() {
  const [form, setForm] = useState<OnboardingForm>({
    company_name: "",
    contact_name: "",
    contact_details: "",
    primary_icp: "",
    geographic_target: "",
    ideal_job_size: "",
    copywriter_preference: "",
    copy_constraints: "",
    intro_offer: "",
    main_objection: "",
    edge: "",
    best_win: "",
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
      const cached = localStorage.getItem("scalesteady_onboarding_v10_roofer");
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
      localStorage.setItem("scalesteady_onboarding_v10_roofer", JSON.stringify(d));
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
      form.copywriter_preference,
      form.copy_constraints,
      form.intro_offer,
      form.main_objection,
      form.edge,
      form.best_win,
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
          brand_signature: `Vibe: ${form.edge}\nEdge: ${form.edge}\nPast Wins: ${form.best_win}\nCopy Choice: ${form.copywriter_preference}`,
          campaign_offer: form.intro_offer,
          core_deal_value: `Constraints: ${form.copy_constraints}\nGoals: ${form.goals_90_days}\nPast Marketing: ${form.past_results}`,
          geographic_target: form.geographic_target,
          routing_destination: form.routing_destination,
        },
      ]);
      if (error) throw new Error(error.message);
      setStatus("success");
      localStorage.removeItem("scalesteady_onboarding_v10_roofer");
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
    "copywriter_preference",
    "copy_constraints",
    "intro_offer",
    "main_objection",
    "edge",
    "best_win",
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
      <div style={{ position: "fixed", top: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(27,79,138,0.12) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-10%", left: "-5%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(0,82,255,0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      {/* ═══ HERO ═══ */}
      <div style={{ position: "relative", zIndex: 2, padding: "100px 24px 40px", textAlign: "center" }}>
        <div style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="pill">
            <span className="pill-dot" />
            Outbound Campaign Setup
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.03em", color: C.textPrimary, marginBottom: "16px" }}>
            Map your <em style={{ fontStyle: "italic", fontWeight: 700 }}>outbound edge.</em>
          </h1>
          <p style={{ fontSize: "15px", color: C.textSecondary, maxWidth: "420px", margin: "0 auto", lineHeight: 1.6 }}>
            15 questions. High-signal targeting targets. We build the system to broadcast your competitive floor.
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
          <span style={{ fontFamily: "monospace", fontSize: "11px", color: C.textSecondary, fontWeight: 600 }}>{done}/16</span>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} style={{ position: "relative", zIndex: 2 }}>

        {/* SECTION 1 */}
        <Sec i={0} label="The Basics" title="Firmographic & Point of Contact">
          <Field field="company_name" label="1. Roofing Company Name" active={act("company_name")}>
            <input className="gi" {...ip("company_name", form, handleChange, setActiveField, "e.g. Apex Roofing & Contracting")} data-active={act("company_name")} />
          </Field>
          <Field field="contact_name" label="2. Your Name & Role" active={act("contact_name")}>
            <input className="gi" {...ip("contact_name", form, handleChange, setActiveField, "e.g. John Miller, General Manager")} data-active={act("contact_name")} />
          </Field>
          <Field field="contact_details" label="3. Best Direct Email or Mobile Phone" active={act("contact_details")} last>
            <input className="gi" {...ip("contact_details", form, handleChange, setActiveField, "e.g. john@apexroofing.com or 555-0199")} data-active={act("contact_details")} />
          </Field>
        </Sec>

        {/* SECTION 2 */}
        <Sec i={1} label="Targeting" title="Geography & Ideal Clients">
          <Field field="primary_icp" label="4. What is your primary client focus?" active={act("primary_icp")}>
            <div style={{ position: "relative" }}>
              <select className="gi gi-sel" required value={form.primary_icp}
                onFocus={() => setActiveField("primary_icp")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("primary_icp", e.target.value)}
                data-active={act("primary_icp")}
              >
                <option value="" disabled>Select your primary ICP</option>
                <option value="Residential Retail (Out-of-Pocket Replacements)">Residential Retail (Out-of-Pocket Replacements)</option>
                <option value="Residential Storm Restoration (Insurance-Paid)">Residential Storm Restoration (Insurance-Paid)</option>
                <option value="Commercial Building Owners (Industrial/Flat Roofs)">Commercial Building Owners (Industrial/Flat Roofs)</option>
                <option value="Commercial Property Management Companies">Commercial Property Management Companies</option>
              </select>
            </div>
          </Field>
          <Field field="geographic_target" label="5. Geographic Target Area (Cities, Counties, or Zip Codes)" active={act("geographic_target")}>
            <input className="gi" {...ip("geographic_target", form, handleChange, setActiveField, "e.g. Dallas-Fort Worth metroplex, or 50 miles radius around Naperville IL")} data-active={act("geographic_target")} />
          </Field>
          <Field field="ideal_job_size" label="6. What is your ideal project size or scope? (e.g., $15K+ shingle replacements, multi-family flat roofs)" active={act("ideal_job_size")} last>
            <textarea className="gi gi-ta" {...tp("ideal_job_size", form, handleChange, setActiveField, "Describe the project size, roof material focus, or building parameters...")} data-active={act("ideal_job_size")} />
          </Field>
        </Sec>

        {/* SECTION 3 */}
        <Sec i={2} label="Email Copy" title="Outbound Messaging Guidelines">
          <Field field="copywriter_preference" label="7. Who will write the email templates?" active={act("copywriter_preference")}>
            <div style={{ position: "relative" }}>
              <select className="gi gi-sel" required value={form.copywriter_preference}
                onFocus={() => setActiveField("copywriter_preference")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => handleChange("copywriter_preference", e.target.value)}
                data-active={act("copywriter_preference")}
              >
                <option value="" disabled>Select writing preference</option>
                <option value="ScaleSteady writes it (Recommended - based on target data)">ScaleSteady writes it (Recommended - based on target data)</option>
                <option value="Contractor writes it (We will provide our pre-written copy)">Contractor writes it (We will provide our pre-written copy)</option>
              </select>
            </div>
          </Field>
          <Field field="copy_constraints" label="8. Email copy guidelines, constraints, or copy highlights" active={act("copy_constraints")}>
            <textarea className="gi gi-ta" {...tp("copy_constraints", form, handleChange, setActiveField, "Specify any topics to avoid, tone limits, warranty callouts (e.g. 50-year warranty, GAF Certified), or copy instructions...")} data-active={act("copy_constraints")} />
          </Field>
          <Field field="intro_offer" label="9. Core hook / outbound lead magnet we lead with" active={act("intro_offer")} last>
            <input className="gi" {...ip("intro_offer", form, handleChange, setActiveField, "e.g. Free commercial roof drone inspection, $500 off complete replacement")} data-active={act("intro_offer")} />
          </Field>
        </Sec>

        {/* SECTION 4 */}
        <Sec i={3} label="Positioning" title="Objections, Edge & Social Proof">
          <Field field="main_objection" label="10. What is the biggest objection you face from prospects?" active={act("main_objection")}>
            <textarea className="gi gi-ta" {...tp("main_objection", form, handleChange, setActiveField, "Cost concerns, skepticism of contractors, already have a roof vendor, etc.")} data-active={act("main_objection")} />
          </Field>
          <Field field="edge" label="11. Why do clients select your company over local roofers?" active={act("edge")}>
            <textarea className="gi gi-ta" {...tp("edge", form, handleChange, setActiveField, "What is your competitive edge? (No-hassle claims handling, GAF Master Elite status, etc.)")} data-active={act("edge")} />
          </Field>
          <Field field="best_win" label="12. What is your proudest case study or project win we can cite?" active={act("best_win")}>
            <textarea className="gi gi-ta" {...tp("best_win", form, handleChange, setActiveField, "e.g. Re-roofed a 40,000 sq ft industrial warehouse under budget, or 100+ residential roofs completed post-hail storm")} data-active={act("best_win")} />
          </Field>
          <Field field="past_results" label="13. What marketing channels have you historically tried?" active={act("past_results")} last>
            <textarea className="gi gi-ta" {...tp("past_results", form, handleChange, setActiveField, "Local SEO, Facebook, HomeAdvisor/Angi, door knocking, etc.")} data-active={act("past_results")} />
          </Field>
        </Sec>

        {/* SECTION 5 */}
        <div className="sec" style={{ padding: "56px 24px 100px" }}>
          <div className="sec-tint" style={{ background: ACCENTS[4].tint }} />
          <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ marginBottom: "44px", position: "relative" }}>
              <span className="sec-tag" style={{ color: ACCENTS[4].dot }}>Campaign Setup</span>
              <h2 className="sec-heading">14. 90-Day Goals & Routing</h2>
              <span className="sec-ghost">05</span>
            </div>

            <Field field="goals_90_days" label="What does a successful campaign look like in 90 days?" active={act("goals_90_days")}>
              <textarea className="gi gi-ta" {...tp("goals_90_days", form, handleChange, setActiveField, "e.g. 10 qualified commercial estimates, or 30 residential retail bookings")} data-active={act("goals_90_days")} />
            </Field>

            <div className="fg" data-active={act("routing_destination")}>
              <label className="fl" data-active={act("routing_destination")}>15. Where should booked leads go?</label>
              <div style={{ position: "relative" }}>
                <select className="gi gi-sel" required value={routingSelect}
                  onFocus={() => setActiveField("routing_destination")}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => setRoutingSelect(e.target.value)}
                  data-active={act("routing_destination")}
                >
                  <option value="" disabled>Select routing method</option>
                  <option value="Direct Calendar Link">Calendar / Scheduling Link</option>
                  <option value="Email Inbox Routing">Email Inbox</option>
                  <option value="CRM Routing">CRM (Jane App, HubSpot, JobNimbus, etc.)</option>
                  <option value="Direct Phone / SMS">Phone / SMS</option>
                </select>
              </div>
              {routingSelect && (
                <div style={{ marginTop: "14px" }}>
                  <label className="fl fl-sm" data-active={true}>
                    {routingSelect === "Direct Calendar Link" ? "Paste your scheduling URL" :
                     routingSelect === "Email Inbox Routing" ? "Your intake email" :
                     routingSelect === "CRM Routing" ? "CRM link or webhook" : "Phone number"}
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
              <label className="fl" data-active={activeField?.startsWith("email_names")}>16. 5 sender names from your team</label>
              <p style={{ fontSize: "13px", color: C.textMuted, marginBottom: "20px" }}>Real first names only. People reply to people.</p>
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
              <div style={{ padding: "14px 18px", background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.2)", borderRadius: "0px", fontSize: "13px", color: "#FF3B30", marginBottom: "24px", lineHeight: 1.5 }}>
                {errorMsg}
              </div>
            )}

            <button type="submit" disabled={status === "submitting"} className="submit-btn submit-btn-full" style={{ borderRadius: "0px" }}>
              {status === "submitting" ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <span className="spin" /> Submitting...
                </span>
              ) : (
                "Submit Campaign Settings"
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
  background: rgba(12, 13, 14, 0.9);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.prog-pip {
  height: 3px; flex: 1;
  border-radius: 0px;
  background: rgba(255,255,255,0.1);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.prog-pip[data-done="true"] {
  background: #FFFFFF;
}
.prog-pip[data-active="true"] {
  background: #0052FF;
  box-shadow: 0 0 8px rgba(0,82,255,0.45);
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
  border-bottom: 1px solid rgba(255,255,255,0.04);
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
  color: rgba(255,255,255,0.9);
  margin-bottom: 10px;
  letter-spacing: -0.01em;
  transition: color 0.25s;
}
.fl[data-active="true"] { color: #FFFFFF; }
.fl-sm { font-size: 12px; color: rgba(255,255,255,0.5); }

/* ── Glass input ── */
.gi {
  width: 100%;
  background: rgba(18, 19, 21, 0.85);
  border: 1px solid rgba(255,255,255,0.08);
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
  border-color: rgba(255,255,255,0.18);
  background: rgba(24, 25, 28, 0.9);
}
.gi:focus, .gi[data-active="true"] {
  border-color: #0052FF;
  background: rgba(12, 13, 14, 0.95);
  box-shadow: 0 0 0 4px rgba(0,82,255,0.18);
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
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%2386868b' stroke-width='2' stroke-linecap='round'><polyline points='6 9 12 15 18 9'/></svg>");
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
  background: rgba(18, 19, 21, 0.8);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 0px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.7);
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
  box-shadow: 0 4px 16px rgba(0,82,255,0.25);
}
.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(0,82,255,0.45);
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
