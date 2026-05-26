import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#050D1C",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "64px 0 40px",
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
            <a
              href="/contact"
              className="font-sans font-semibold inline-flex items-center justify-center self-start"
              style={{
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                background: "#1B4F8A",
                padding: "11px 24px",
                borderRadius: "0px",
                marginTop: "8px",
              }}
            >
              Book a discovery call
            </a>
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
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "48px 0 28px" }} />

        {/* Bottom: copyright + legal */}
        <div className="flex flex-col gap-4">
          <p
            className="font-sans"
            style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.02em" }}
          >
            &copy; {new Date().getFullYear()} ScaleSteady. All rights reserved.
          </p>
          <p
            className="font-sans"
            style={{ fontSize: "10px", lineHeight: "1.7", color: "rgba(255,255,255,0.18)", maxWidth: "680px" }}
          >
            ScaleSteady is a trusted outbound engineering firm. We design and manage email outreach systems for qualified meeting generation. Results depend on target market volume, offer positioning, and market conditions. We do not engage in spam practices.
          </p>
        </div>

      </div>
    </footer>
  );
}
