"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const LINES_OF_BUSINESS = ["Health", "Home Services", "Tech"];

const TIMES = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "1:00 PM",
  "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM", "4:30 PM",
];

type FormState = {
  line_of_business: string;
  preferred_date: string;
  preferred_time: string;
  contact_name: string;
  phone_or_email: string;
  questions: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    line_of_business: "",
    preferred_date: "",
    preferred_time: "",
    contact_name: "",
    phone_or_email: "",
    questions: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const { error } = await supabase.from("bookings").insert([
      {
        line_of_business: form.line_of_business,
        preferred_date: form.preferred_date,
        preferred_time: form.preferred_time,
        contact_name: form.contact_name,
        phone_or_email: form.phone_or_email,
        questions: form.questions || null,
      },
    ]);

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("success");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#FFFFFF",
    border: "1px solid #DDD8D0",
    borderRadius: "0px",
    padding: "15px 18px",
    fontSize: "15px",
    fontFamily: "var(--font-sans, sans-serif)",
    color: "#111111",
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  };

  const sectionNumStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#C4431B",
    fontFamily: "var(--font-sans, sans-serif)",
    marginBottom: "10px",
    display: "block",
  };

  const fieldLabelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#888880",
    marginBottom: "10px",
    fontFamily: "var(--font-sans, sans-serif)",
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#03080F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "560px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(196,67,27,0.12)",
              border: "1px solid rgba(196,67,27,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 36px",
            }}
          >
            <span style={{ color: "#C4431B", fontSize: "22px" }}>&#10003;</span>
          </div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C4431B",
              fontFamily: "var(--font-sans, sans-serif)",
              marginBottom: "20px",
            }}
          >
            Consultation Requested
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              color: "#FAF8F6",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            We will be<br />
            <span style={{ color: "#C4431B", fontStyle: "italic" }}>in touch.</span>
          </h1>
          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.75",
              color: "rgba(250,248,246,0.45)",
              fontFamily: "var(--font-sans, sans-serif)",
              marginBottom: "44px",
              maxWidth: "400px",
              margin: "0 auto 44px",
            }}
          >
            Your request has been received. A member of our team will
            reach out to confirm your time and prepare for your session.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "#C4431B",
              padding: "16px 40px",
              fontFamily: "var(--font-sans, sans-serif)",
              textDecoration: "none",
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // ── Main page ──────────────────────────────────────────────────────────────
  return (
    <div
      className="contact-grid"
      style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}
    >
      <style>{`
        @media (max-width: 1023px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-left { position: static !important; height: auto !important; padding: 120px 32px 56px !important; }
          .contact-right { padding: 48px 32px 80px !important; }
        }
      `}</style>

      {/* ── LEFT: Dark authority panel ── */}
      <div
        className="contact-left"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(48px, 8vw, 96px) clamp(40px, 6vw, 80px)",
          background: "#03080F",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          overflowY: "auto",
        }}
      >
        {/* Overline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "clamp(24px, 4vw, 40px)",
          }}
        >
          <div style={{ width: "28px", height: "2px", background: "#C4431B", flexShrink: 0 }} />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C4431B",
              fontFamily: "var(--font-sans, sans-serif)",
            }}
          >
            Consultation
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display, serif)",
            fontSize: "clamp(44px, 5.5vw, 76px)",
            fontWeight: 400,
            lineHeight: "1.03",
            letterSpacing: "-0.03em",
            color: "#FAF8F6",
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}
        >
          15 minutes.<br />
          <span style={{ color: "#C4431B", fontStyle: "italic" }}>No pitch.</span>
        </h1>

        {/* Body */}
        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.75",
            color: "rgba(250,248,246,0.40)",
            fontFamily: "var(--font-sans, sans-serif)",
            maxWidth: "360px",
            marginBottom: "clamp(36px, 5vw, 56px)",
          }}
        >
          We review your market, your current pipeline, and whether
          outbound infrastructure is the right fit for your business.
        </p>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            marginBottom: "clamp(28px, 4vw, 44px)",
          }}
        />

        {/* Contact details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.18)",
              fontFamily: "var(--font-sans, sans-serif)",
              marginBottom: "14px",
            }}
          >
            Direct Contact
          </p>
          <a
            href="mailto:help@scalesteady.co"
            style={{
              fontSize: "14px",
              color: "rgba(250,248,246,0.50)",
              fontFamily: "var(--font-sans, sans-serif)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "color 0.15s",
            }}
          >
            help@scalesteady.co
          </a>
          <a
            href="tel:+12244877847"
            style={{
              fontSize: "14px",
              color: "rgba(250,248,246,0.50)",
              fontFamily: "var(--font-sans, sans-serif)",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            224.487.7847
          </a>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(250,248,246,0.22)",
              fontFamily: "var(--font-sans, sans-serif)",
              lineHeight: "1.65",
              marginTop: "8px",
            }}
          >
            2735 Hassert Blvd, Suite 135<br />
            Naperville, IL 60564
          </p>
        </div>
      </div>

      {/* ── RIGHT: Form panel ── */}
      <div
        className="contact-right"
        style={{
          background: "#FAF8F6",
          padding: "clamp(80px, 10vw, 120px) clamp(40px, 6vw, 88px) clamp(64px, 8vw, 96px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>

            {/* Section 1: Line of Business */}
            <div>
              <span style={sectionNumStyle}>01 -- Line of Business</span>
              <p style={fieldLabelStyle}>What industry are you in?</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {LINES_OF_BUSINESS.map((lob) => (
                  <button
                    key={lob}
                    type="button"
                    onClick={() => handleChange("line_of_business", lob)}
                    style={{
                      padding: "13px 28px",
                      fontSize: "13px",
                      fontWeight: form.line_of_business === lob ? 600 : 400,
                      fontFamily: "var(--font-sans, sans-serif)",
                      letterSpacing: "0.01em",
                      border: form.line_of_business === lob
                        ? "1px solid #C4431B"
                        : "1px solid #DDD8D0",
                      background: form.line_of_business === lob ? "#C4431B" : "#FFFFFF",
                      color: form.line_of_business === lob ? "#FFFFFF" : "#4A4A4A",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {lob}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 2: Date and Time */}
            <div>
              <span style={sectionNumStyle}>02 -- Date and Time</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={fieldLabelStyle}>Preferred date</label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={form.preferred_date}
                    onChange={(e) => handleChange("preferred_date", e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={fieldLabelStyle}>Preferred time (CST)</label>
                  <select
                    required
                    value={form.preferred_time}
                    onChange={(e) => handleChange("preferred_time", e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="">Select a time</option>
                    {TIMES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Contact Person */}
            <div>
              <span style={sectionNumStyle}>03 -- Contact Person</span>
              <label style={fieldLabelStyle}>Your full name</label>
              <input
                type="text"
                required
                placeholder="Jane Smith"
                value={form.contact_name}
                onChange={(e) => handleChange("contact_name", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Section 4: Phone or Email */}
            <div>
              <span style={sectionNumStyle}>04 -- Phone or Email</span>
              <label style={fieldLabelStyle}>Best way to reach you</label>
              <input
                type="text"
                required
                placeholder="jane@company.com or 312-555-0100"
                value={form.phone_or_email}
                onChange={(e) => handleChange("phone_or_email", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Section 5: Questions */}
            <div>
              <span style={sectionNumStyle}>05 -- Any Questions?</span>
              <label style={fieldLabelStyle}>Optional -- anything you want us to prepare for</label>
              <textarea
                rows={4}
                placeholder="What's your current monthly lead volume? What markets are you targeting?"
                value={form.questions}
                onChange={(e) => handleChange("questions", e.target.value)}
                style={{ ...inputStyle, resize: "vertical", lineHeight: "1.65" }}
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <div
                style={{
                  padding: "14px 20px",
                  background: "rgba(196,67,27,0.07)",
                  border: "1px solid rgba(196,67,27,0.25)",
                  fontSize: "13px",
                  color: "#C4431B",
                  fontFamily: "var(--font-sans, sans-serif)",
                }}
              >
                {errorMsg || "Something went wrong. Please try again."}
              </div>
            )}

            {/* Submit */}
            <div
              style={{
                borderTop: "1px solid #E0DDD6",
                paddingTop: "32px",
                display: "flex",
                alignItems: "center",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="submit"
                disabled={status === "submitting" || !form.line_of_business}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: status === "submitting" ? "#999" : "#C4431B",
                  padding: "18px 48px",
                  border: "none",
                  cursor: status === "submitting" || !form.line_of_business ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-sans, sans-serif)",
                  transition: "background 0.2s",
                  opacity: !form.line_of_business ? 0.5 : 1,
                }}
              >
                {status === "submitting" ? "Submitting..." : "Request Consultation"}
              </button>
              <p
                style={{
                  fontSize: "12px",
                  color: "#ABABAB",
                  fontFamily: "var(--font-sans, sans-serif)",
                }}
              >
                15 minutes. No commitment.
              </p>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
