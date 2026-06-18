"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoAbstract from "../../../public/brand/logos/scalesteady_clean_monogram.png";

const NAV_LINKS = [
  { href: "/#approach", label: "How We Work" },
  { href: "/#pricing",  label: "The Offer"   },
  { href: "/#results",  label: "Results"     },
  { href: "/#team",     label: "Our Team"    },
  { href: "/build",     label: "Build"       },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const isOnboardingPage = pathname === "/marketfit-roofing" || pathname === "/marketfit-health" || pathname === "/marketfit-painmanagement";
  if (isOnboardingPage) return null;

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isBuildPage = pathname === "/build";

  // Background, border, and blur styles dynamically set based on page context and scroll status
  let background = "rgba(250, 249, 246, 0.85)"; // Warm cream matching var(--canvas)
  let backdropFilter = "blur(12px)";
  let borderBottom = "1px solid rgba(216, 214, 206, 0.6)"; // Warm border matching var(--ink-border)

  if (isBuildPage) {
    // Keep it permanently structured to prevent floating emptiness on light theme build page
    background = "rgba(250, 249, 246, 0.85)";
    backdropFilter = "blur(12px)";
    borderBottom = "1px solid rgba(216, 214, 206, 0.6)";
  } else if (pathname === "/" && !scrolled) {
    background = "transparent";
    backdropFilter = "none";
    borderBottom = "none";
  }

  // Use light colors ONLY when header is transparent on the home page (which has a dark hero background)
  const useLightText = pathname === "/" && !scrolled;

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full transition-all duration-300"
      style={{
        background,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        borderBottom,
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
              className={`object-contain ${useLightText ? "" : "mix-blend-multiply"}`}
              fill
              priority
              style={useLightText ? { filter: "brightness(10)" } : { filter: "grayscale(100%)" }}
            />
          </div>
          <div className="flex flex-col" style={{ gap: "4px" }}>
            <span
              className="leading-none block font-sans"
              style={{
                fontSize: "16px",
                fontWeight: 800,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: useLightText ? "#FAFAFA" : "#0A0A0A",
              }}
            >
              ScaleSteady
            </span>
            <span
              className="font-sans block"
              style={{
                fontSize: "7.5px",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: useLightText ? "rgba(255,255,255,0.45)" : "#888888",
              }}
            >
              Outbound Engineers
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-sans transition-colors duration-150"
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: useLightText ? "rgba(255,255,255,0.75)" : "#444444",
                letterSpacing: "-0.01em",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA / Phone Number */}
        <div className="hidden md:flex items-center flex-shrink-0">
          {isBuildPage ? (
            <a
              href="tel:+12244877847"
              className="font-sans text-sm md:text-base font-semibold tracking-wider transition-colors duration-200 hover:opacity-75"
              style={{
                color: "#0A0A0A",
              }}
            >
              224.487.7847
            </a>
          ) : (
            <Link
              href="/contact"
              className="font-sans font-semibold transition-colors duration-200"
              style={{
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: useLightText ? "#000000" : "#FFFFFF",
                background: useLightText ? "#FFFFFF" : "#0A0A0A",
                padding: "11px 24px",
                borderRadius: "0px",
              }}
            >
              Book a call
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="flex md:hidden items-center justify-center p-2 focus:outline-none"
          style={{ color: useLightText ? "#FAFAFA" : "#0A0A0A" }}
          aria-label="Toggle menu"
        >
          <div className="relative w-5 h-[14px] flex flex-col justify-between">
            <span
              className={`block w-full bg-current transform transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
              style={{ height: "1.5px" }}
            />
            <span
              className={`block w-full bg-current transition-all duration-200 ${
                isOpen ? "opacity-0" : ""
              }`}
              style={{ height: "1.5px" }}
            />
            <span
              className={`block w-full bg-current transform transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
              style={{ height: "1.5px" }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
        style={{ background: "#F4F4F4", borderTop: "1px solid #DEDEDE" }}
      >
        <div className="px-6 pt-4 pb-8 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="font-sans py-3 transition-colors block"
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#0A0A0A",
                borderBottom: "1px solid #E8E8E8",
              }}
            >
              {label}
            </Link>
          ))}
          <div className="pt-5">
            {isBuildPage ? (
              <a
                href="tel:+12244877847"
                className="flex items-center justify-center font-sans font-semibold"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#0A0A0A",
                  padding: "14px 0",
                  borderRadius: "0px",
                }}
              >
                Call 224.487.7847
              </a>
            ) : (
              <Link
                href="/contact"
                className="flex items-center justify-center font-sans font-semibold"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#0A0A0A",
                  padding: "14px 0",
                  borderRadius: "0px",
                }}
              >
                Book a call
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar (Mobile only) - only for non-build pages */}
      {!isBuildPage && (
        <div
          className="md:hidden w-full h-[2px] bg-transparent absolute bottom-0 left-0"
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              height: "100%",
              width: `${scrollProgress}%`,
              background: useLightText ? "#FFFFFF" : "#0A0A0A",
              transition: "width 0.08s ease-out",
            }}
          />
        </div>
      )}
    </header>
  );
}
