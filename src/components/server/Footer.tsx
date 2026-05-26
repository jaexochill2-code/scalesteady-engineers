export default function Footer() {
  return (
    <footer
      style={{
        background: "#050D1C",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "48px 0 40px",
      }}
    >
      <div
        className="mx-auto px-8 sm:px-12 lg:px-24"
        style={{ maxWidth: "1280px" }}
      >

        {/* Top row: wordmark + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
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
                marginTop: "6px",
              }}
            >
              Outbound Engineers
            </p>
          </div>

          <a
            href="/contact"
            className="font-sans font-semibold inline-flex items-center justify-center"
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "#1B4F8A",
              padding: "12px 28px",
              borderRadius: "0px",
              alignSelf: "flex-start",
            }}
          >
            Book a discovery call
          </a>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "36px 0 28px" }} />

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
            ScaleSteady operates as a B2B outbound infrastructure firm. We design and manage email outreach systems for qualified meeting generation. Results depend on target market volume, offer positioning, and market conditions. We do not engage in spam practices.
          </p>
        </div>

      </div>
    </footer>
  );
}
