"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoAbstract from "../../../public/brand/logos/scalesteady_clean_monogram.png";

const NAV_LINKS = [
  { href: "#approach", label: "How We Work" },
  { href: "#pricing",  label: "Pricing"     },
  { href: "#results",  label: "Results"     },
  { href: "#team",     label: "Our Team"    },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isOfferPage = pathname === "/offer";

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full"
      style={{
        background: isOfferPage ? "transparent" : "#FFFFFF",
        borderBottom: isOfferPage ? "none" : "1px solid #E8E8E8",
      }}
    >
      <div
        className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 lg:px-14"
        style={{ height: "80px" }}
      >

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3.5 flex-shrink-0">
          <div className="relative flex-shrink-0" style={{ width: "48px", height: "48px" }}>
            <Image
              src={logoAbstract}
              alt="ScaleSteady"
              className={`object-contain ${isOfferPage ? '' : 'mix-blend-multiply'}`}
              fill
              priority
              style={isOfferPage ? { filter: 'brightness(10)' } : undefined}
            />
          </div>
          <div className="flex flex-col" style={{ gap: "4px" }}>
            <span
              className="leading-none block"
              style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", color: isOfferPage ? "#FAF8F6" : "#111111" }}
            >
              ScaleSteady
            </span>
            <span
              className="font-brand block"
              style={{ fontSize: "7.5px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C4431B" }}
            >
              Outbound Engineers
            </span>
          </div>
        </Link>

        {/* Nav links -- anchor scroll (hidden on /offer) */}
        {!isOfferPage && (
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-sans transition-colors duration-150"
                style={{ fontSize: "14px", fontWeight: 400, color: "#111111", letterSpacing: "-0.01em" }}
              >
                {label}
              </a>
            ))}
          </nav>
        )}

        {/* CTA (hidden on /offer) */}
        {!isOfferPage && (
          <div className="hidden md:flex items-center flex-shrink-0">
            <Link
              href="/contact"
              className="font-sans font-semibold transition-colors duration-200"
              style={{
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                background: "#1B4F8A",
                padding: "11px 24px",
                borderRadius: "0px",
              }}
            >
              Book a call
            </Link>
          </div>
        )}

        {/* Mobile hamburger (hidden on /offer) */}
        {!isOfferPage && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="flex md:hidden items-center justify-center p-2 focus:outline-none"
            style={{ color: "#111111" }}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-[14px] flex flex-col justify-between">
              <span className={`block w-full bg-current transform transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} style={{ height: "1.5px" }} />
              <span className={`block w-full bg-current transition-all duration-200 ${isOpen ? "opacity-0" : ""}`} style={{ height: "1.5px" }} />
              <span className={`block w-full bg-current transform transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} style={{ height: "1.5px" }} />
            </div>
          </button>
        )}

      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen" : "max-h-0"}`}
        style={{ background: "#FFFFFF", borderTop: "1px solid #E8E8E8" }}
      >
        <div className="px-6 pt-4 pb-8 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="font-sans py-3 transition-colors"
              style={{ fontSize: "15px", fontWeight: 500, color: "#111111", borderBottom: "1px solid #F0F0F0" }}
            >
              {label}
            </a>
          ))}
          <div className="pt-5">
            <Link
              href="/contact"
              className="flex items-center justify-center font-brand font-semibold"
              style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#FFFFFF", background: "#1B4F8A", padding: "14px 0", borderRadius: "0px" }}
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
}
