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
    padding: "14px 16px",
    fontSize: "15px",
    fontFamily: "var(--font-sans, sans-serif)",
    color: "#111111",
    outline: "none",
    transition: "border-color 0.15s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#6B6B6B",
    marginBottom: "8px",
    fontFamily: "var(--font-sans, sans-serif)",
  };

  const sectionNumStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#C4431B",
    fontFamily: "var(--font-sans, sans-serif)",
    marginBottom: "6px",
    display: "block",
  };

  if (status === "success") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0D2B4A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "560px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(196,67,27,0.15)",
              border: "1px solid #C4431B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 32px",
            }}
          >
            <span style={{ color: "#C4431B", fontSize: "24px" }}>&#10003;</span>
          </div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#C4431B",
              fontFamily: "var(--font-sans, sans-serif)",
              marginBottom: "16px",
            }}
          >
            Consultation Requested
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            We will be in touch.
          </h1>
          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.7",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-sans, sans-serif)",
              marginBottom: "40px",
            }}
          >
            Your consultation request has been received. A member of our team will
            reach out to confirm your time and prepare for your session.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "#C4431B",
              padding: "14px 32px",
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF8F6",
      }}
    >
      {/* Page header band */}
      <div
        style={{
          background: "#0D2B4A",
          padding: "clamp(64px, 10vw, 120px) 0 clamp(48px, 8vw, 96px)",
        }}
      >
        <div
          className="mx-auto px-8 sm:px-12 lg:px-24"
          style={{ maxWidth: "880px" }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#C4431B",
              fontFamily: "var(--font-sans, sans-serif)",
              marginBottom: "20px",
            }}
          >
            ScaleSteady
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(36px, 5.5vw, 68px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            Book a Consultation
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 1.8vw, 18px)",
              lineHeight: "1.65",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-sans, sans-serif)",
              maxWidth: "560px",
            }}
          >
            15 minutes. No pitch. We review your market, your current pipeline,
            and whether outbound infrastructure is the right fit for your business.
          </p>
        </div>
      </div>

      {/* Form area */}
      <div
        className="mx-auto px-8 sm:px-12 lg:px-24"
        style={{ maxWidth: "880px", paddingTop: "clamp(48px, 8vw, 96px)", paddingBottom: "clamp(64px, 10vw, 120px)" }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

            {/* Section 1: Line of Business */}
            <div>
              <span style={sectionNumStyle}>01 -- Line of Business</span>
              <p style={labelStyle}>What industry are you in?</p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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
                        ? "1px solid #0D2B4A"
                        : "1px solid #DDD8D0",
                      background: form.line_of_business === lob ? "#0D2B4A" : "#FFFFFF",
                      color: form.line_of_business === lob ? "#FFFFFF" : "#4A4A4A",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {lob}
                  </button>
                ))}
              </div>
              {form.line_of_business === "" && status === "error" && (
                <p style={{ fontSize: "12px", color: "#C4431B", marginTop: "8px" }}>Please select an industry.</p>
              )}
            </div>

            {/* Section 2: Date and Time */}
            <div>
              <span style={sectionNumStyle}>02 -- Date and Time</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>Preferred date</label>
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
                  <label style={labelStyle}>Preferred time (CST)</label>
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
              <label style={labelStyle}>Your full name</label>
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
              <label style={labelStyle}>Best way to reach you</label>
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
              <label style={labelStyle}>Optional -- anything you want us to prepare for</label>
              <textarea
                rows={4}
                placeholder="What's your current monthly lead volume? What markets are you targeting?"
                value={form.questions}
                onChange={(e) => handleChange("questions", e.target.value)}
                style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
              />
            </div>

            {/* Validation guard */}
            {status === "error" && (
              <div
                style={{
                  padding: "14px 20px",
                  background: "rgba(196,67,27,0.08)",
                  border: "1px solid rgba(196,67,27,0.3)",
                  fontSize: "13px",
                  color: "#C4431B",
                  fontFamily: "var(--font-sans, sans-serif)",
                }}
              >
                {errorMsg || "Something went wrong. Please try again."}
              </div>
            )}

            {/* Submit */}
            <div style={{ borderTop: "1px solid #E8E8E8", paddingTop: "32px", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={status === "submitting" || !form.line_of_business}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: status === "submitting" ? "#4A4A4A" : "#0D2B4A",
                  padding: "16px 40px",
                  border: "none",
                  cursor: status === "submitting" ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-sans, sans-serif)",
                  transition: "background 0.2s",
                }}
              >
                {status === "submitting" ? "Submitting..." : "Request Consultation"}
              </button>
              <p
                style={{
                  fontSize: "12px",
                  color: "#9B9B9B",
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
