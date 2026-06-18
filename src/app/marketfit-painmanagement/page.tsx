"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ScaleSteady Premium Clinical Sage Light Theme (Eucalyptus & Alabaster)
const C = {
  bg: "#FAF8F5", // Warm Alabaster canvas background
  cardBg: "#FFFFFF", // Premium pure white card container
  border: "#E2DFD8",   // Bone White Border
  borderHover: "#6D7E6A", // Muted Eucalyptus Sage
  borderFocus: "#6D7E6A", // Muted Eucalyptus Sage
  textPrimary: "#1C2E24", // Deep Forest Charcoal primary readability
  textSecondary: "#5C665F", // Readable Slate Muted secondary text
  textMuted: "#8C9690", // Readable Slate Light placeholder / helper text
  accentTeal: "#6D7E6A", // Muted Eucalyptus Sage
  accentTealMuted: "rgba(109, 126, 106, 0.15)",
  accentObsidian: "#E2DFD8",
};

const ACCENTS = [
  { dot: "#4A6D5E", tint: "rgba(74,109,94,0.01)", border: "rgba(74,109,94,0.08)" },
  { dot: "#4A6D5E", tint: "rgba(74,109,94,0.01)", border: "rgba(74,109,94,0.08)" },
  { dot: "#4A6D5E", tint: "rgba(74,109,94,0.01)", border: "rgba(74,109,94,0.08)" },
  { dot: "#4A6D5E", tint: "rgba(74,109,94,0.01)", border: "rgba(74,109,94,0.08)" },
  { dot: "#4A6D5E", tint: "rgba(74,109,94,0.01)", border: "rgba(74,109,94,0.08)" },
];

const ICP_OPTIONS = [
  { value: "Personal Injury & Auto Accident Attorneys", label: "Personal Injury & Auto Accident Attorneys (Lien-Based Medical-Legal Cases)" },
  { value: "Auto Body Shops, Towing Services & Collision Centers", label: "Auto Body Shops, Towing Services & Collision Centers (Post-Crash Referral Loops)" },
  { value: "Dentists, Orthodontists & Oral Surgeons", label: "Dentists, Orthodontists & Oral Surgeons (TMJ & Jaw Tension Referral Loops)" },
  { value: "Primary Care Physicians (PCPs) & Medical Clinics", label: "Primary Care Physicians (PCPs) & Medical Clinics (Evidence-Based Clinical Networks)" },
  { value: "CrossFit Gyms, Personal Trainers & Athletic Directors", label: "CrossFit Gyms, Personal Trainers & Athletic Directors (Sports Performance & Injury Loops)" },
  { value: "Pilates, Yoga & Postural Re-Alignment Studios", label: "Pilates, Yoga & Postural Re-Alignment Studios (Postural Movement & Chronic Tension)" },
  { value: "Corporate HR Managers & Local Employers", label: "Corporate HR Managers & Local Employers (Ergonomic Screening & Posture Workshops)" },
  { value: "Massage Therapists, LMTs & Bodyworkers", label: "Massage Therapists, LMTs & Bodyworkers (Workshop Attendees & Modality Training)" },
];

const DEMOGRAPHIC_OPTIONS = [
  { value: "Personal Injury & Auto Accidents", label: "Personal Injury & Auto Accidents (Auto trauma, whiplash, lien cases)" },
  { value: "Chronic Spine & Joint Decompression", label: "Chronic Spine & Joint Decompression (Sciatica, disc herniations, stenosis)" },
  { value: "TMJ Disorders & Chronic Jaw Tension", label: "TMJ Disorders & Chronic Jaw Tension (Intra-oral release, SCM, masseter, pterygoid, headaches)" },
  { value: "Myofascial Postural Overload (Tech Neck)", label: "Myofascial Postural Overload (Tech Neck, forward head posture, rounded shoulders)" },
  { value: "Desk Workers & Corporate Wellness", label: "Desk Workers & Corporate Wellness (Postural fatigue, occupational strain, tension headaches)" },
  { value: "Sports Injury & Athlete Recovery", label: "Sports Injury & Athlete Recovery (CrossFitters, runners, acute injuries)" },
  { value: "Family Wellness & Preventative Care", label: "Family Wellness & Preventative Care (Pediatric, prenatal/Webster, wellness plans)" },
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
    "Target personal injury law firms.",
    "Scale medical doctor referrals.",
    "Engage auto accident patients.",
    "Target collision center loops.",
    "Engage dentist referral lines.",
    "Fill posture & TMJ workshops.",
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
  const [demographicTargets, setDemographicTargets] = useState<string[]>([]);
  const [geoRadius, setGeoRadius] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Form visibility observer removed to guarantee all fields are fully visible by default and prevent layout shifting.

  useEffect(() => {
    try {
      const cached = localStorage.getItem("scalesteady_onboarding_v13_painmanagement");
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
            const focusPart = parts[0].replace("Focus: ", "");
            setDemographicTargets(focusPart ? focusPart.split("; ") : []);
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
      localStorage.setItem("scalesteady_onboarding_v13_painmanagement", JSON.stringify(d));
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
    const focusStr = demographicTargets.join("; ");
    const combined = focusStr || geoRadius ? `Focus: ${focusStr} | Area: ${geoRadius}` : "";
    if (combined !== form.geographic_target) {
      const u = { ...form, geographic_target: combined };
      setForm(u);
      save(u);
    }
  }, [demographicTargets, geoRadius]);

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
    if (demographicTargets.length === 0) {
      setStatus("error");
      setErrorMsg("Please select at least one clinical patient target segment under Question 5.");
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
          icp_description: `Target Focus: ${form.primary_icp}\nClinical Modalities: ${form.ideal_job_size}\nPreferred objection leverage: ${form.main_objection}`,
          brand_signature: `Authorized Signoff: ${form.edge}\nClinical Case Study: ${form.best_win}`,
          campaign_offer: form.intro_offer,
          core_deal_value: `Compliance constraints: ${form.copy_constraints}\nGoals & timing: ${form.goals_90_days}\nHandling skepticism: ${form.past_results}`,
          geographic_target: form.geographic_target,
          routing_destination: form.routing_destination,
        },
      ]);
      if (error) throw new Error(error.message);
      setStatus("success");
      localStorage.removeItem("scalesteady_onboarding_v13_painmanagement");
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
  const domain = form.company_name 
    ? form.company_name.toLowerCase().replace(/[^a-z0-9]/g, "") + (form.company_name.toLowerCase().includes("chiro") ? "chiro.com" : "wellness.com")
    : "yourclinic.com";
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

  const secCompleted = [
    ok("company_name") && ok("contact_name") && ok("contact_details"),
    ok("primary_icp") && ok("geographic_target") && ok("ideal_job_size"),
    ok("intro_offer") && ok("copy_constraints") && ok("best_win"),
    ok("main_objection") && ok("edge") && ok("goals_90_days") && ok("past_results"),
    ok("routing_destination") && ok("email_names")
  ];

  if (status === "success") {
    return (
      <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="gcard" style={{ maxWidth: "520px", width: "100%", padding: "64px 48px", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(74, 109, 94, 0.08)", border: `1px solid ${C.accentTeal}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <span style={{ color: C.accentTeal, fontSize: "22px" }}>&#10003;</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", color: C.textPrimary, fontWeight: 400, letterSpacing: "-0.03em", marginBottom: "12px" }}>Locked in.</h1>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: C.textSecondary, maxWidth: "340px", margin: "0 auto 36px" }}>
            Your clinical marketing profile has been updated. We are analyzing your ideal targets and clinical assets to draft your outbound sequence campaigns.
          </p>
          <Link href="/" className="submit-btn" style={{ display: "inline-flex", padding: "16px 48px", textDecoration: "none", borderRadius: "6px" }}>
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", position: "relative", color: C.textPrimary }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Ambient warm clinic blurs */}
      <div style={{ position: "fixed", top: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(230, 223, 213, 0.3) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-10%", left: "-5%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(74, 109, 94, 0.04) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      {/* ═══ HERO ═══ */}
      <div style={{ position: "relative", zIndex: 2, padding: "90px 24px 30px", textAlign: "center" }}>
        <div style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="pill">
            <span className="pill-dot" />
            Outbound Campaign Setup
          </div>
          
          {/* Typewriter Headings */}
          <h1 style={{ fontSize: "clamp(32px, 5.5vw, 64px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.035em", color: C.textPrimary, marginBottom: "16px", minHeight: "2.3em" }}>
            <span style={{ display: "block", fontSize: "0.55em", color: C.accentTeal, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, marginBottom: "8px" }}>
              Clinical Outbound Setup
            </span>
            <span style={{ borderRight: "3px solid #4A6D5E", paddingRight: "4px", display: "inline-block" }}>
              {typedHeadline || "\u00A0"}
            </span>
          </h1>
          
          <p style={{ fontSize: "15px", color: C.textSecondary, maxWidth: "460px", margin: "0 auto", lineHeight: 1.6 }}>
            15 questions to define your practice focus and bypass referral partner objections.
          </p>
        </div>
      </div>

      {/* ═══ STICKY PROGRESS ═══ */}
      <div className="prog-wrap">
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ height: "6px", background: "#E2EAE6", borderRadius: "100px", flex: 1, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(done / 15) * 100}%`, background: "#4A6D5E", transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }} />
          </div>
          <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#4A6D5E", fontWeight: 700 }}>
            {String(done).padStart(2, "0")} / 15
          </span>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} style={{ position: "relative", zIndex: 2 }}>

        {/* SECTION 1 */}
        <Sec i={0} label="01 / CLINIC IDENTIFICATION" title="Practice Anchor & Direct Lines" isActive={activeSec === 0} isCompleted={secCompleted[0]}>
          <Field field="company_name" label="1. Registered Practice, Clinic, or Brand Name" active={act("company_name")}>
            <input className="gi" {...ip("company_name", form, handleChange, setActiveField, "e.g. Pasadena Health & Wellness, Elite Chiropractic, or Back & Neck Clinic")} data-active={act("company_name")} />
          </Field>
          <Field field="contact_name" label="2. Lead Practitioner / Clinic Director Name" active={act("contact_name")}>
            <input className="gi" {...ip("contact_name", form, handleChange, setActiveField, "e.g. Dr. Sarah Jenkins, DC")} data-active={act("contact_name")} />
          </Field>
          <Field field="contact_details" label="3. Secure Clinic Email & Direct Phone Number" active={act("contact_details")} last>
            <input className="gi" {...ip("contact_details", form, handleChange, setActiveField, "e.g. contact@elitechiro.com or 555-0199")} data-active={act("contact_details")} />
          </Field>
        </Sec>

        {/* SECTION 2 */}
        <Sec i={1} label="02 / PRACTICE FOCUS CALIBRATION" title="Target Patient Segments & Referral Partnerships" isActive={activeSec === 1} isCompleted={secCompleted[1]}>
          <Field field="primary_icp" label="4. Select B2B target channels & strategic referral partners (Select all that apply):" active={act("primary_icp")}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginTop: "8px" }}>
              {ICP_OPTIONS.map((opt) => {
                const selectedList = form.primary_icp ? form.primary_icp.split("; ") : [];
                const isSelected = selectedList.includes(opt.value);
                
                const handleToggle = () => {
                  let newList;
                  if (isSelected) {
                     newList = selectedList.filter((v) => v !== opt.value);
                  } else {
                     newList = [...selectedList, opt.value];
                  }
                  handleChange("primary_icp", newList.join("; "));
                };
                
                return (
                  <div
                    key={opt.value}
                    onClick={handleToggle}
                    onFocus={() => setActiveField("primary_icp")}
                    onBlur={() => setActiveField(null)}
                    className="icp-card-btn"
                    data-selected={isSelected}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        handleToggle();
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className="icp-chk" data-selected={isSelected}>
                        {isSelected && <span>&#10003;</span>}
                      </div>
                      <span style={{ fontSize: "14px", textAlign: "left", lineHeight: 1.4 }}>{opt.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Field>
          <Field field="geographic_target" label="5. Clinical target segments & patient demographics (Select all that apply):" active={act("geographic_target")}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginTop: "8px", marginBottom: "20px" }}>
              {DEMOGRAPHIC_OPTIONS.map((opt) => {
                const isSelected = demographicTargets.includes(opt.value);
                
                const handleToggle = () => {
                  let newList;
                  if (isSelected) {
                    newList = demographicTargets.filter((v) => v !== opt.value);
                  } else {
                    newList = [...demographicTargets, opt.value];
                  }
                  setDemographicTargets(newList);
                };
                
                return (
                  <div
                    key={opt.value}
                    onClick={handleToggle}
                    onFocus={() => setActiveField("geographic_target")}
                    onBlur={() => setActiveField(null)}
                    className="icp-card-btn"
                    data-selected={isSelected}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        handleToggle();
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className="icp-chk" data-selected={isSelected}>
                        {isSelected && <span>&#10003;</span>}
                      </div>
                      <span style={{ fontSize: "14px", textAlign: "left", lineHeight: 1.4 }}>{opt.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <label className="fl fl-sm" style={{ display: "block", marginBottom: "8px" }}>Target Locations / Geography (e.g. within 15 miles of clinic, or specific zip codes)</label>
            <input 
              className="gi" 
              type="text"
              required
              value={geoRadius}
              placeholder="e.g. Within 15 miles of clinic location"
              onFocus={() => setActiveField("geographic_target")}
              onBlur={() => setActiveField(null)}
              onChange={(e) => setGeoRadius(e.target.value)}
              data-active={act("geographic_target")} 
            />
          </Field>
          <Field field="ideal_job_size" label="6. Clinical Modalities & Care Offerings (e.g. Chiropractic adjustment, myofascial release, decompression, TMJ/intra-oral release)" active={act("ideal_job_size")} last>
            <textarea className="gi gi-ta" {...tp("ideal_job_size", form, handleChange, setActiveField, "List your primary adjustive techniques, soft-tissue modalities, active rehab protocols, or structural integration systems...")} data-active={act("ideal_job_size")} />
          </Field>
        </Sec>

        {/* SECTION 3 */}
        <Sec i={2} label="03 / CLINICAL VALUE COUPLING" title="Low-Friction Clinical Offers & Risk Mitigation" isActive={activeSec === 2} isCompleted={secCompleted[2]}>
          <Field field="intro_offer" label="7. Low-Friction Introductory Offer (e.g. Complete Postural Assessment, First Visit Special, or Initial Chiropractic Consultation & Adjustment)" active={act("intro_offer")}>
            <input className="gi" {...ip("intro_offer", form, handleChange, setActiveField, "e.g. $49 New Patient Assessment & Treatment, or Free Postural Alignment Screening")} data-active={act("intro_offer")} />
            <p style={{ fontSize: "12.5px", color: C.textMuted, marginTop: "8px", lineHeight: 1.5 }}>Specialized offers bypass initial skepticism. We recommend a low-friction diagnostic or screening special.</p>
          </Field>
          <Field field="copy_constraints" label="8. Compliance Constraints, Licensure & Clinical Boundaries (e.g. State board restrictions, Webster certified, X-ray requirements)" active={act("copy_constraints")}>
            <textarea className="gi gi-ta" {...tp("copy_constraints", form, handleChange, setActiveField, "State any specific marketing restrictions, Medicare/Medicaid compliance limits, or required clinical protocols...")} data-active={act("copy_constraints")} />
          </Field>
          <Field field="best_win" label="9. Case Study: Describe one major patient success story or local rehabilitation win (e.g. severe whiplash resolved in 6 weeks, chronic TMJ/migraine relief)" active={act("best_win")} last>
            <textarea className="gi gi-ta" {...tp("best_win", form, handleChange, setActiveField, "e.g. Resolved severe chronic migraines in a desk worker, eliminating daily tension headaches and neck stiffness within 8 visits...")} data-active={act("best_win")} />
          </Field>
        </Sec>

        {/* SECTION 4 */}
        <Sec i={3} label="04 / OBJECTION BYPASS" title="Referral Partner Mitigation & Authority Leverage" isActive={activeSec === 3} isCompleted={secCompleted[3]}>
          <Field field="main_objection" label="10. When prospective patients or referral sources say 'I already have a chiropractor/therapist' or 'I don't believe in chiropractic,' how do you bypass this?" active={act("main_objection")}>
            <textarea className="gi gi-ta" {...tp("main_objection", form, handleChange, setActiveField, "e.g. We focus on objective digital posture scans, evidence-based orthopedic testing, and co-managing care with their primary MDs...")} data-active={act("main_objection")} />
          </Field>
          <Field field="edge" label="11. Whose name and title should sign the outbound campaign emails?" active={act("edge")}>
            <input className="gi" {...ip("edge", form, handleChange, setActiveField, "e.g. Dr. John Smith, DC (or Sarah, Patient Coordinator to make outreach feel peer-to-peer)")} data-active={act("edge")} />
            <p style={{ fontSize: "12.5px", color: C.textMuted, marginTop: "8px", lineHeight: 1.5 }}>We recommend signing emails from either the Lead Practitioner or a Patient Care Coordinator.</p>
          </Field>
          <Field field="goals_90_days" label="12. Do you want to run direct B2B campaigns targeting attorneys on liens for personal injury cases, PCPs, or local gyms/employers?" active={act("goals_90_days")}>
            <textarea className="gi gi-ta" {...tp("goals_90_days", form, handleChange, setActiveField, "Specify which B2B referral loops you want to prioritize (e.g., PI attorneys, family doctors, CrossFit trainers)...")} data-active={act("goals_90_days")} />
          </Field>
          <Field field="past_results" label="13. How do you address skepticism regarding chiropractic care, high-pressure sales packages, or clinic reputation?" active={act("past_results")} last>
            <textarea className="gi gi-ta" {...tp("past_results", form, handleChange, setActiveField, "e.g. We don't sell long-term prepay packages, we are evidence-based, we have 200+ 5-star Google reviews...")} data-active={act("past_results")} />
          </Field>
        </Sec>

        {/* SECTION 5 */}
        <Sec i={4} label="05 / PIPELINE ROUTING" title="Booking Platform Integration & Outbound Sender Setup" isActive={activeSec === 4} isCompleted={secCompleted[4]}>
          <div className="fg" data-active={act("routing_destination")}>
            <label className="fl" data-active={act("routing_destination")}>14. Which clinical EHR or booking platform integration targets do you use?</label>
            <div style={{ position: "relative" }}>
              <select className="gi gi-sel" required value={routingSelect}
                onFocus={() => setActiveField("routing_destination")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => setRoutingSelect(e.target.value)}
                data-active={act("routing_destination")}
              >
                <option value="" disabled>Select EHR or booking integration target</option>
                <option value="Jane App">Jane App (Clinical Booking & Charting)</option>
                <option value="ChiroTouch EHR">ChiroTouch (EHR Lead Intake)</option>
                <option value="Genesis Chiropractic Software">Genesis Chiropractic Software</option>
                <option value="Mindbody Online">Mindbody Online (Studio & Client Scheduling)</option>
                <option value="Vagaro Studio Software">Vagaro (Wellness & Bodywork Scheduling)</option>
                <option value="ClassPass Partner API">ClassPass Partner API</option>
                <option value="GoHighLevel / Practice CRM">GoHighLevel or Practice CRM</option>
                <option value="Email Intake Routing">Direct Email Intake</option>
              </select>
            </div>
            {routingSelect && (
              <div style={{ marginTop: "14px" }}>
                <label className="fl fl-sm" data-active={true}>
                  {routingSelect === "Email Intake Routing" ? "Enter your intake email" : "Enter EHR / booking URL, API key name, or integration details"}
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
            <p style={{ fontSize: "13px", color: C.textMuted, marginBottom: "20px", lineHeight: 1.5 }}>Real first names only (e.g. sarah, drjenkins). Emails will be sent from name@{domain}.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
              {form.email_names.map((name, i) => {
                const ba = activeField === `email_names_${i}`;
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: ba ? "#4A6D5E" : "#5C6E6A", fontWeight: 600 }}>Sender {i + 1}</span>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: name ? "#2A3331" : "#7A8E89" }}>{name || "name"}@{domain}</span>
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
            <div style={{ padding: "14px 18px", background: "rgba(255,59,48,0.1)", border: "1px solid rgba(255,59,48,0.3)", borderRadius: "6px", fontSize: "13px", color: "#FF3B30", margin: "24px 0", lineHeight: 1.5 }}>
              {errorMsg}
            </div>
          )}

          <button type="submit" disabled={status === "submitting"} className="submit-btn submit-btn-full" style={{ borderRadius: "6px", marginTop: "32px" }}>
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

      {/* Grounding Footer Buffer */}
      <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: "11px", color: C.textSecondary, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          ScaleSteady Onboarding &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

function Sec({ i, label, title, isActive, isCompleted, children }: { i: number; label: string; title: string; isActive: boolean; isCompleted: boolean; children: React.ReactNode }) {
  const a = ACCENTS[i];
  const highlight = isActive || isCompleted;
  return (
    <div className="sec sec-layout" style={{ padding: "24px 24px" }} data-active={isActive}>
      <div className="sec-tint" style={{ background: a.tint }} />
      
      <div className="sec-grid">
        {/* Left column (Rail) */}
        <div className="sec-rail">
          <div className="sec-circle" data-active={highlight} data-completed={isCompleted} style={{ borderColor: highlight ? C.accentTeal : "rgba(42, 51, 49, 0.15)" }}>
            {String(i + 1).padStart(2, "0")}
          </div>
          {i < 4 && (
            <div className="sec-line" data-active={isCompleted} style={isCompleted ? { background: C.accentTeal } : undefined} />
          )}
        </div>
        
        {/* Right column (Card) */}
        <div className="sec-card" data-active={isActive}>
          <div style={{ marginBottom: "40px", position: "relative" }}>
            <span className="sec-tag" style={{ color: highlight ? C.accentTeal : "#7A8B9E" }}>{label}</span>
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
  background: #EBF1F0;
  border: 1px solid #D5E1DF;
  border-radius: 100px !important;
  font-family: monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6D7E6A;
  font-weight: 600;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(109, 126, 106, 0.06);
}
.pill-dot {
  width: 6px; height: 6px;
  border-radius: 50% !important;
  background: #6D7E6A;
  animation: dotPulse 2.5s infinite ease-in-out;
}

/* ── Sticky progress ── */
.prog-wrap {
  position: sticky;
  top: 0; z-index: 50;
  padding: 14px 24px;
  background: rgba(250, 248, 245, 0.95); /* matching C.bg */
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid #E2DFD8; /* matching C.border */
}

/* ── Section & Grid ── */
.sec {
  position: relative;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
}
.sec:sec-layout {
  padding: 24px 24px;
}
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
  border: 1.5px solid #E2DFD8; /* clean solid border */
  border-radius: 50% !important; /* Soft circular badge */
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #5C665F; /* C.textSecondary */
  background: #FFFFFF;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  letter-spacing: 0.05em;
  z-index: 2;
}
.sec-circle[data-active="true"] {
  border-color: #6D7E6A;
  background: #FFFFFF;
  color: #1C2E24;
  box-shadow: 0 0 0 3px rgba(109, 126, 106, 0.15);
}
.sec-circle[data-completed="true"] {
  background: #6D7E6A !important;
  border-color: #6D7E6A !important;
  color: #FFFFFF !important;
}
.sec-line {
  position: absolute;
  top: 38px;
  bottom: -38px;
  left: 50%;
  width: 2px;
  background: rgba(109, 126, 106, 0.1); /* Solid track */
  z-index: 1;
  transition: background 0.3s ease;
}

/* ── Card Container ── */
.sec-card {
  background: #FFFFFF; /* Pure White card */
  border: 1px solid rgba(226, 223, 216, 0.7); /* subtle sage border */
  border-radius: 12px !important; /* soft rounded edges */
  padding: 48px;
  box-shadow: 0 12px 40px rgba(29, 62, 53, 0.03), 0 2px 4px rgba(0, 0, 0, 0.01);
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  color: #1C2E24; /* C.textPrimary */
  margin-bottom: 40px;
}
.sec-card[data-active="true"] {
  border-color: #6D7E6A !important; /* Eucalyptus focus */
  box-shadow: 0 20px 48px rgba(29, 62, 53, 0.05), 0 0 0 3px rgba(109, 126, 106, 0.05);
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
  border-bottom: 1px solid rgba(42, 51, 49, 0.06);
  padding-left: 20px;
  border-left: 2px solid transparent;
  transition: border-color 0.3s, opacity 0.4s;
}
.fg[data-active="true"] {
  border-left-color: #6D7E6A; /* Eucalyptus active bar */
}

/* ── Label ── */
.fl {
  display: block;
  font-size: 14.5px;
  font-weight: 600;
  color: #1E2B25; /* C.textPrimary */
  margin-bottom: 10px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition: color 0.25s;
}
.fl[data-active="true"] { color: #000000; }
.fl-sm { font-size: 12px; color: #5C665F; }

/* ── Glass input ── */
.gi {
  width: 100%;
  background-color: #FFFFFF;
  border: 1.5px solid #E2DFD8; /* robust clean sage border */
  border-radius: 8px !important; /* soft input corners */
  padding: 14px 16px;
  font-size: 15px;
  color: #1C2E24;
  outline: none;
  transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
  box-shadow: inset 0 1px 2px rgba(45, 64, 59, 0.03);
}
.gi::placeholder {
  color: #8C9690;
  font-weight: 400;
  font-style: normal;
  opacity: 1;
}
.gi:hover {
  border-color: #6D7E6A;
}
.gi:focus, .gi[data-active="true"] {
  border-color: #6D7E6A !important;
  background: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(109, 126, 106, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05) !important;
}
.gi-ta {
  resize: none !important;
  min-height: 110px;
  line-height: 1.6;
}

/* ── Select ── */
.gi-sel {
  appearance: none;
  cursor: pointer;
  padding-right: 44px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%236D7E6A' stroke-width='2' stroke-linecap='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 14px;
}
.gi-sel option {
  background: #FFFFFF;
  color: #1C2E24;
}
.gi-sel:invalid,
.gi-sel option[value=""] {
  color: #8C9690;
}

/* ── Multiselect Bento Card Option Toggles ── */
.icp-card-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 18px 20px;
  background-color: #FFFFFF;
  border: 1.5px solid #E2DFD8;
  border-radius: 12px !important;
  color: #1C2E24;
  cursor: pointer;
  transition: all 0.2s ease-out;
  outline: none;
}
.icp-card-btn:hover {
  border-color: #6D7E6A;
  background-color: #FAF8F5;
  transform: translateY(-1px);
}
.icp-card-btn[data-selected="true"] {
  border-color: #6D7E6A !important;
  background-color: #E9EFE9;
  color: #1C2E24;
}
.icp-chk {
  width: 20px;
  height: 20px;
  border: 2px solid #6D7E6A;
  border-radius: 4px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #FFFFFF;
  color: #6D7E6A;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.15s ease;
  margin-right: 12px;
}
.icp-card-btn[data-selected="true"] .icp-chk {
  background-color: #6D7E6A;
  border-color: #6D7E6A;
  color: #FFFFFF;
}

/* ── Glass card ── */
.gcard {
  background: #FFFFFF;
  border: 1px solid rgba(226, 223, 216, 0.7);
  border-radius: 12px !important;
  box-shadow: 0 24px 64px rgba(45, 74, 67, 0.04);
  color: #1C2E24;
}

/* ── Submit ── */
.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #2D5A4E 0%, #1A3F35 100%);
  border: none;
  border-radius: 8px !important; /* Radius md */
  padding: 16px 36px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #FFFFFF;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(28, 46, 36, 0.2);
  transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
}
.submit-btn:hover {
  background-color: #263E30;
  transform: translateY(-1.5px);
  box-shadow: 0 6px 20px rgba(28, 46, 36, 0.3);
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
