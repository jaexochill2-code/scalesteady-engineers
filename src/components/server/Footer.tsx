"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/build") return null;
  return (
    <>
      {/* ── DARK ZONE: Brand / Nav / Office ── */}
      <footer
        style={{
          background: "var(--blue-midnight)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "64px 0 56px",
        }}
      >
        <div
          className="mx-auto px-8 sm:px-12 lg:px-24"
          style={{ maxWidth: "1280px" }}
        >
          {/* Three-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">

            {/* Col 1: Brand */}
            <div className="flex flex-col gap-4">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                ScaleSteady
              </span>
              <p
                className="font-sans"
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.28)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Outbound Engineers
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div className="flex flex-col gap-4">
              <p
                className="font-sans"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: "4px",
                }}
              >
                Navigation
              </p>
              {[
                { href: "#approach", label: "How We Work" },
                { href: "#pricing",  label: "Pricing" },
                { href: "#results",  label: "Results" },
                { href: "#team",     label: "Our Team" },
                { href: "/contact",  label: "Contact" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="font-sans"
                  style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", letterSpacing: "-0.01em" }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Col 3: Office */}
            <div className="flex flex-col gap-3">
              <p
                className="font-sans"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: "4px",
                }}
              >
                Office
              </p>
              <address
                className="font-sans not-italic"
                style={{
                  fontSize: "13px",
                  lineHeight: "1.85",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                2735 Hassert Blvd, Suite 135<br />
                Naperville, IL 60564<br />
                United States
              </address>
              <a
                href="tel:+12244877847"
                className="font-sans"
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.01em",
                  marginTop: "4px",
                }}
              >
                224.487.7847
              </a>
              <a
                href="mailto:help@scalesteady.co"
                className="font-sans"
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.01em",
                }}
              >
                help@scalesteady.co
              </a>
            </div>

          </div>
        </div>
      </footer>

      {/* ── WHITE LEGAL ZONE ── */}
      <div
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid #E8E8E8",
          padding: "40px 0 48px",
        }}
      >
        <div
          className="mx-auto px-8 sm:px-12 lg:px-24"
          style={{ maxWidth: "1280px" }}
        >

          {/* Copyright line */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <p
              className="font-sans"
              style={{ fontSize: "12px", color: "#1A1A1A", fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              &copy; {new Date().getFullYear()} ScaleSteady LLC. All rights reserved.
            </p>
            <p
              className="font-sans"
              style={{ fontSize: "11px", color: "#6B6B6B", letterSpacing: "0.01em" }}
            >
              Naperville, IL &nbsp;&middot;&nbsp; 224.487.7847 &nbsp;&middot;&nbsp; CAN-SPAM Compliant
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "#E8E8E8", marginBottom: "24px" }} />

          {/* Compliance disclaimers */}
          <div className="flex flex-col gap-4">

            <p
              className="font-sans"
              style={{ fontSize: "10.5px", lineHeight: "1.75", color: "#5A5A5A" }}
            >
              <strong style={{ color: "#1A1A1A", fontWeight: 600 }}>Legal Entity &amp; Compliance.</strong>{" "}
              ScaleSteady LLC is a registered outbound infrastructure firm providing managed cold email systems for B2B businesses. All commercial email campaigns designed, deployed, or managed by ScaleSteady comply with the CAN-SPAM Act of 2003 (15 U.S.C. &sect; 7701 et seq.), including accurate sender identification, valid physical postal address disclosure in all outbound communications, and functional opt-out mechanisms honored within ten (10) business days of receipt.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "10.5px", lineHeight: "1.75", color: "#5A5A5A" }}
            >
              <strong style={{ color: "#1A1A1A", fontWeight: 600 }}>Results Disclosure.</strong>{" "}
              Results referenced on this site, including meeting volumes, response rates, inbox placement figures, and ROI benchmarks, represent outcomes achieved by specific clients under specific market conditions and are provided for illustrative purposes only. Individual results will vary based on factors including target market size, offer positioning, industry vertical, competitive landscape, and prevailing economic conditions. No specific outcome, revenue figure, or meeting volume is guaranteed. Forward-looking statements are based on reasonable assumptions and are subject to market risk.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "10.5px", lineHeight: "1.75", color: "#5A5A5A" }}
            >
              <strong style={{ color: "#1A1A1A", fontWeight: 600 }}>Data Sourcing &amp; Anti-Spam Policy.</strong>{" "}
              Contact data used in ScaleSteady-managed outreach campaigns is sourced exclusively from commercially available, lawfully obtained business databases and publicly accessible professional records. ScaleSteady does not purchase, rent, or utilize third-party consumer email lists. We expressly prohibit the use of our infrastructure for unsolicited bulk email or any activity that violates the CAN-SPAM Act, the Canadian Anti-Spam Legislation (CASL), or any applicable local, state, federal, or international anti-spam regulation.
            </p>

            <p
              className="font-sans"
              style={{ fontSize: "10.5px", lineHeight: "1.75", color: "#5A5A5A" }}
            >
              <strong style={{ color: "#1A1A1A", fontWeight: 600 }}>Privacy &amp; Regulatory Awareness.</strong>{" "}
              ScaleSteady acknowledges and operates in compliance with the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and other applicable data protection frameworks for recipients located in regulated jurisdictions. Professionals and business contacts who receive emails through ScaleSteady-managed campaigns may request removal from active outreach at any time by replying with an opt-out request, which will be honored within the timeframe required by applicable law. This website and its contents do not constitute legal, financial, tax, or investment advice.
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
