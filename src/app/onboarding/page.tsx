"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Apple-inspired light palette
const C = {
  bg: "#f5f5f7",
  white: "#FFFFFF",
  text1: "#1d1d1f",
  text2: "#6e6e73",
  text3: "#86868b",
  text4: "#aeaeb2",
  border: "rgba(0,0,0,0.06)",
  borderHover: "rgba(0,0,0,0.12)",
  borderFocus: "rgba(0,0,0,0.22)",
  glass: "rgba(255,255,255,0.72)",
  glassHover: "rgba(255,255,255,0.82)",
  glassSolid: "rgba(255,255,255,0.92)",
  accent: "#1d1d1f",
  accentSoft: "rgba(0,0,0,0.04)",
};

const ACCENTS = [
  { dot: "#34C759", tint: "rgba(52,199,89,0.04)", border: "rgba(52,199,89,0.12)" },
  { dot: "#AF52DE", tint: "rgba(175,82,222,0.04)", border: "rgba(175,82,222,0.12)" },
  { dot: "#FF6B6B", tint: "rgba(255,107,107,0.04)", border: "rgba(255,107,107,0.12)" },
  { dot: "#007AFF", tint: "rgba(0,122,255,0.04)", border: "rgba(0,122,255,0.12)" },
  { dot: "#FF9500", tint: "rgba(255,149,0,0.04)", border: "rgba(255,149,0,0.12)" },
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }); },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".sec").forEach((s) => observer.observe(s));
    return () => document.querySelectorAll(".sec").forEach((s) => observer.unobserve(s));
  }, []);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("scalesteady_onboarding_v8");
      if (cached) {
        const parsed = JSON.parse(cached);
        setForm((prev) => ({ ...prev, ...parsed,
          email_names: Array.isArray(parsed.email_names) && parsed.email_names.length === 5 ? parsed.email_names : prev.email_names,
        }));
        if (parsed.routing_destination) {
          const parts = parsed.routing_destination.split(": ");
          if (parts.length > 1) { setRoutingSelect(parts[0]); setRoutingDetails(parts.slice(1).join(": ")); }
          else setRoutingDetails(parsed.routing_destination);
        }
      }
    } catch (e) { console.error(e); }
  }, []);

  const save = (d: OnboardingForm) => { try { localStorage.setItem("scalesteady_onboarding_v8", JSON.stringify(d)); } catch {} };
  const handleChange = (field: keyof OnboardingForm, value: string) => { const u = { ...form, [field]: value }; setForm(u); save(u); };

  useEffect(() => {
    const v = routingSelect && routingDetails ? `${routingSelect}: ${routingDetails}` : routingDetails;
    if (v !== form.routing_destination) handleChange("routing_destination", v);
  }, [routingSelect, routingDetails]);

  const handleNameBoxChange = (i: number, value: string) => {
    const clean = value.replace(/@.*$/, "").replace(/\s+/g, "").toLowerCase();
    const names = [...form.email_names]; names[i] = clean;
    const u = { ...form, email_names: names }; setForm(u); save(u);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const f = [form.company_name, form.contact_name, form.contact_details, form.brand_voice, form.core_services, form.patient_words, form.main_objection, form.edge, form.intro_offer, form.past_results, form.best_win, form.goals_90_days, form.email_angle, form.routing_destination];
    if (!f.every((x) => x.trim().length > 0) || !form.email_names.every((n) => n.trim().length > 0)) {
      setStatus("error"); setErrorMsg("Fill out every field before submitting."); return;
    }
    setStatus("submitting"); setErrorMsg("");
    try {
      const { error } = await supabase.from("onboarding_submissions").insert([{
        company_name: form.company_name, contact_name: form.contact_name, contact_details: form.contact_details, email_names: form.email_names,
        icp_description: `Target: ${form.email_angle}\nObjection: ${form.main_objection}`,
        brand_signature: `Voice: ${form.brand_voice}\nServices: ${form.core_services}\nEdge: ${form.edge}\nPatient Words: ${form.patient_words}`,
        campaign_offer: form.intro_offer,
        core_deal_value: `Past Results: ${form.past_results}\nBest Win: ${form.best_win}\n90-Day Goals: ${form.goals_90_days}`,
        geographic_target: "n/a", routing_destination: form.routing_destination,
      }]);
      if (error) throw new Error(error.message);
      setStatus("success"); localStorage.removeItem("scalesteady_onboarding_v8");
    } catch (err: any) { setStatus("error"); setErrorMsg(err.message || "Submission failed."); }
  };

  const ok = (f: keyof OnboardingForm) => f === "email_names" ? form.email_names.every((n) => n.trim().length > 0) : form[f].trim().length > 0;
  const FL: (keyof OnboardingForm)[] = ["company_name","contact_name","contact_details","brand_voice","core_services","patient_words","main_objection","edge","intro_offer","past_results","best_win","goals_90_days","email_angle","routing_destination","email_names"];
  const done = FL.filter(ok).length;
  const domain = form.company_name ? form.company_name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com" : "yourdomain.com";
  const act = (f: string) => activeField === f;

  if (status === "success") {
    return (
      <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="gcard" style={{ maxWidth: "520px", width: "100%", padding: "64px 48px", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(52,199,89,0.08)", border: "1px solid rgba(52,199,89,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <span style={{ color: "#34C759", fontSize: "22px" }}>&#10003;</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "clamp(28px, 4vw, 40px)", color: C.text1, fontWeight: 400, letterSpacing: "-0.03em", marginBottom: "12px" }}>Locked in.</h1>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: C.text2, maxWidth: "340px", margin: "0 auto 36px" }}>We'll review everything and reach out within 24 hours.</p>
          <Link href="/" className="submit-btn" style={{ display: "inline-block", padding: "14px 44px", textDecoration: "none" }}>Back to homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Ambient light blurs */}
      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(175,82,222,0.04) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-15%", left: "-10%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(0,122,255,0.03) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      {/* ═══ HERO ═══ */}
      <div style={{ position: "relative", zIndex: 2, padding: "120px 24px 56px", textAlign: "center" }}>
        <div style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="pill">
            <span className="pill-dot" />
            Cold Email Onboarding
          </div>
          <h1 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "clamp(36px, 5.5vw, 56px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.035em", color: C.text1, marginBottom: "16px" }}>
            Tell us about <em style={{ fontStyle: "italic" }}>your practice.</em>
          </h1>
          <p style={{ fontSize: "16px", color: C.text3, maxWidth: "380px", margin: "0 auto", lineHeight: 1.55, fontFamily: "var(--font-sans, sans-serif)" }}>
            15 questions. About 10 minutes.<br />We handle everything from here.
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
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: C.text3, fontWeight: 600 }}>{done}/15</span>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} style={{ position: "relative", zIndex: 2 }}>

        {/* SECTION 1 */}
        <Sec i={0} label="The Basics" title="Let's start simple.">
          <Field field="company_name" label="Practice name" active={act("company_name")} ai={0}>
            <input className="gi" {...ip("company_name", form, handleChange, setActiveField)} data-active={act("company_name")} />
          </Field>
          <Field field="contact_name" label="Your name" active={act("contact_name")} ai={0}>
            <input className="gi" {...ip("contact_name", form, handleChange, setActiveField)} data-active={act("contact_name")} />
          </Field>
          <Field field="contact_details" label="Best email or phone" active={act("contact_details")} ai={0} last>
            <input className="gi" {...ip("contact_details", form, handleChange, setActiveField)} data-active={act("contact_details")} />
          </Field>
        </Sec>

        {/* SECTION 2 */}
        <Sec i={1} label="Your Brand" title="How should we represent you?">
          <Field field="brand_voice" label="Describe your practice's vibe in a few words" active={act("brand_voice")} ai={1}>
            <input className="gi" {...ip("brand_voice", form, handleChange, setActiveField, "e.g. friendly, no-nonsense, family-oriented")} data-active={act("brand_voice")} />
          </Field>
          <Field field="core_services" label="Top 2-3 services you want booked solid" active={act("core_services")} ai={1}>
            <textarea className="gi gi-ta" {...tp("core_services", form, handleChange, setActiveField, "e.g. spinal decompression, sports rehab, corrective care")} data-active={act("core_services")} />
          </Field>
          <Field field="patient_words" label="What do your happiest patients say about you?" active={act("patient_words")} ai={1} last>
            <textarea className="gi gi-ta" {...tp("patient_words", form, handleChange, setActiveField, "In their words -- what do they tell friends or write in reviews?")} data-active={act("patient_words")} />
          </Field>
        </Sec>

        {/* SECTION 3 */}
        <Sec i={2} label="Your Edge" title="What makes you the pick?">
          <Field field="main_objection" label="What stops someone from booking with you?" active={act("main_objection")} ai={2}>
            <textarea className="gi gi-ta" {...tp("main_objection", form, handleChange, setActiveField, "Cost concerns, skepticism, didn't know you existed, etc.")} data-active={act("main_objection")} />
          </Field>
          <Field field="edge" label="Why do people pick you over everyone else?" active={act("edge")} ai={2}>
            <textarea className="gi gi-ta" {...tp("edge", form, handleChange, setActiveField, "What do you do that nobody else around you does?")} data-active={act("edge")} />
          </Field>
          <Field field="intro_offer" label="Got a new patient offer we can lead with?" active={act("intro_offer")} ai={2} last>
            <input className="gi" {...ip("intro_offer", form, handleChange, setActiveField, "e.g. $49 first visit with exam + X-rays")} data-active={act("intro_offer")} />
          </Field>
        </Sec>

        {/* SECTION 4 */}
        <Sec i={3} label="Results & Goals" title="What's worked, what's next.">
          <Field field="past_results" label="What marketing have you tried before?" active={act("past_results")} ai={3}>
            <textarea className="gi gi-ta" {...tp("past_results", form, handleChange, setActiveField, "Facebook ads, Google, mailers, referrals -- or none")} data-active={act("past_results")} />
          </Field>
          <Field field="best_win" label="Best thing that ever brought you new patients?" active={act("best_win")} ai={3}>
            <textarea className="gi gi-ta" {...tp("best_win", form, handleChange, setActiveField, "A specific ad, referral partner, Google listing, word-of-mouth")} data-active={act("best_win")} />
          </Field>
          <Field field="goals_90_days" label="What does a win look like in 90 days?" active={act("goals_90_days")} ai={3}>
            <textarea className="gi gi-ta" {...tp("goals_90_days", form, handleChange, setActiveField, "e.g. 20 new patients/month, fill Tuesday afternoons")} data-active={act("goals_90_days")} />
          </Field>
          <Field field="email_angle" label="Who should our cold emails target?" active={act("email_angle")} ai={3} last>
            <textarea className="gi gi-ta" {...tp("email_angle", form, handleChange, setActiveField, "e.g. desk workers 30-55, recent injury, athletes, families")} data-active={act("email_angle")} />
          </Field>
        </Sec>

        {/* SECTION 5 */}
        <div className="sec" style={{ padding: "56px 24px 100px" }}>
          <div className="sec-tint" style={{ background: ACCENTS[4].tint }} />
          <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ marginBottom: "44px", position: "relative" }}>
              <span className="sec-tag" style={{ color: ACCENTS[4].dot }}>Campaign Setup</span>
              <h2 className="sec-heading">Last step. Where do the leads go?</h2>
              <span className="sec-ghost">05</span>
            </div>

            <div className="fg" data-active={act("routing_destination")}>
              <label className="fl" data-active={act("routing_destination")}>Where should booked leads go?</label>
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
                  <option value="CRM Routing">CRM (Jane App, HubSpot, etc.)</option>
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
              <label className="fl" data-active={activeField?.startsWith("email_names")}>5 sender names from your team</label>
              <p style={{ fontSize: "13px", color: C.text4, marginBottom: "20px" }}>Real first names only. People reply to people.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {form.email_names.map((name, i) => {
                  const ba = activeField === `email_names_${i}`;
                  return (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono, monospace)", color: ba ? C.text1 : C.text4, fontWeight: 600 }}>Sender {i + 1}</span>
                        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono, monospace)", color: name ? C.text2 : C.text4 }}>{name || "name"}@{domain}</span>
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
              <div style={{ padding: "14px 18px", background: "rgba(255,59,48,0.06)", border: "1px solid rgba(255,59,48,0.12)", borderRadius: "12px", fontSize: "13px", color: "#FF3B30", marginBottom: "24px", lineHeight: 1.5 }}>{errorMsg}</div>
            )}

            <button type="submit" disabled={status === "submitting"} className="submit-btn submit-btn-full">
              {status === "submitting" ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}><span className="spin" /> Submitting...</span> : "Submit Marketing Info"}
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
          <h2 className="sec-heading">{title}</h2>
          <span className="sec-ghost">{String(i + 1).padStart(2, "0")}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ field, label, active, ai, last, children }: { field: string; label: string; active: boolean; ai: number; last?: boolean; children: React.ReactNode }) {
  return (
    <div className="fg" data-active={active} style={last ? { borderBottom: "none", marginBottom: 0 } : undefined}>
      <label className="fl" data-active={active}>{label}</label>
      {children}
    </div>
  );
}

function ip(field: string, form: Record<string, any>, onChange: (f: any, v: string) => void, setActive: (f: string | null) => void, placeholder?: string) {
  return { type: "text" as const, required: true, value: form[field] as string, placeholder, onFocus: () => setActive(field), onBlur: () => setActive(null), onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value) };
}
function tp(field: string, form: Record<string, any>, onChange: (f: any, v: string) => void, setActive: (f: string | null) => void, placeholder?: string) {
  return { required: true, value: form[field] as string, placeholder, onFocus: () => setActive(field), onBlur: () => setActive(null), onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(field, e.target.value) };
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
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 100px;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6e6e73;
  font-weight: 600;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}
.pill-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #34C759;
  animation: dotPulse 2.5s infinite ease-in-out;
}

/* ── Sticky progress ── */
.prog-wrap {
  position: sticky;
  top: 0; z-index: 50;
  padding: 14px 24px;
  background: rgba(245,245,247,0.82);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.prog-pip {
  height: 3px; flex: 1;
  border-radius: 1.5px;
  background: rgba(0,0,0,0.06);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.prog-pip[data-done="true"] {
  background: #1d1d1f;
}
.prog-pip[data-active="true"] {
  background: #007AFF;
  box-shadow: 0 0 8px rgba(0,122,255,0.25);
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
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.sec-heading {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 24px;
  font-weight: 400;
  color: #1d1d1f;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.sec-ghost {
  position: absolute;
  right: 0; top: -8px;
  font-family: var(--font-serif, Georgia, serif);
  font-size: 80px;
  font-weight: 300;
  color: rgba(0,0,0,0.025);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

/* ── Field group ── */
.fg {
  padding-bottom: 28px;
  margin-bottom: 28px;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  padding-left: 20px;
  border-left: 2px solid transparent;
  transition: border-color 0.3s, opacity 0.4s;
}
.fg[data-active="true"] {
  border-left-color: #007AFF;
}

/* ── Label ── */
.fl {
  display: block;
  font-family: var(--font-sans, -apple-system, sans-serif);
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
  transition: color 0.25s;
}
.fl[data-active="true"] { color: #1d1d1f; }
.fl-sm { font-size: 12px; color: #6e6e73; }

/* ── Glass input ── */
.gi {
  width: 100%;
  background: rgba(255,255,255,0.72);
  backdrop-filter: saturate(120%) blur(16px);
  -webkit-backdrop-filter: saturate(120%) blur(16px);
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 15px;
  font-family: var(--font-sans, -apple-system, sans-serif);
  font-weight: 400;
  color: #1d1d1f;
  outline: none;
  transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8);
}
.gi::placeholder {
  color: #aeaeb2;
  font-weight: 400;
}
.gi:hover {
  border-color: rgba(0,0,0,0.15);
  background: rgba(255,255,255,0.82);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9);
}
.gi:focus, .gi[data-active="true"] {
  border-color: rgba(0,122,255,0.4);
  background: rgba(255,255,255,0.92);
  box-shadow: 0 0 0 4px rgba(0,122,255,0.08), 0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1);
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
  background: #fff;
  color: #1d1d1f;
}
.gi-sel:invalid,
.gi-sel option[value=""] {
  color: #aeaeb2;
}

/* ── Glass card ── */
.gcard {
  background: rgba(255,255,255,0.72);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03);
}

/* ── Submit ── */
.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #1d1d1f;
  border: none;
  border-radius: 14px;
  padding: 16px 36px;
  font-family: var(--font-sans, -apple-system, sans-serif);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
.submit-btn:hover {
  background: #000;
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.18);
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
