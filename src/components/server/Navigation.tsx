"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logoAbstract from "../../../public/brand/logos/scalesteady_clean_monogram.png";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/team", label: "Our Team" },
  { href: "/process", label: "Process" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full bg-white"
      style={{ borderBottom: "1px solid #E8E8E8" }}
    >
      <div
        className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 lg:px-14"
        style={{ height: "80px" }}
      >

        {/* Wordmark — stacked, single typeface, two weights */}
        <Link href="/" className="flex items-center gap-3.5 flex-shrink-0">
          <div className="relative flex-shrink-0" style={{ width: "48px", height: "48px" }}>
            <Image
              src={logoAbstract}
              alt="ScaleSteady"
              className="object-contain mix-blend-multiply"
              fill
              priority
            />
          </div>
          <div className="flex flex-col" style={{ gap: "4px" }}>
            {/* Wordmark — split color, single typeface */}
            <span className="font-sans leading-none block" style={{ fontSize: "17px", fontWeight: 800, letterSpacing: "-0.03em" }}>
              <span style={{ color: "#111111" }}>Scale</span><span style={{ color: "#C4431B" }}>Steady</span>
            </span>
            {/* Descriptor — same typeface, whisper weight, fully subordinate */}
            <span
              className="font-sans block hidden sm:block"
              style={{ fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <span style={{ color: "#C4431B" }}>Pipeline</span>
              <span style={{ color: "#ABABAB" }}> Engineers</span>
            </span>
          </div>
        </Link>

        {/* Nav links — full black, clean */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="font-sans transition-colors duration-150"
                style={{
                  fontSize: "14px",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#1A6B50" : "#111111",
                  letterSpacing: "-0.01em",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA -- lighter mid-green, prominent on white */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <Link
            href="/contact"
            className="font-sans font-semibold rounded-full transition-colors duration-200"
            style={{
              fontSize: "13.5px",
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
              background: "#1A6B50",
              padding: "10px 22px",
            }}
          >
            Book a call
          </Link>
        </div>

        {/* Mobile hamburger */}
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

      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen" : "max-h-0"}`}
        style={{ background: "#FFFFFF", borderTop: "1px solid #E8E8E8" }}
      >
        <div className="px-6 pt-4 pb-8 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-sans py-3 transition-colors"
              style={{ fontSize: "15px", fontWeight: 500, color: "#111111", borderBottom: "1px solid #F0F0F0" }}
            >
              {label}
            </Link>
          ))}
          <div className="pt-5">
            <Link
              href="/contact"
              className="flex items-center justify-center font-sans font-semibold rounded-full"
              style={{ fontSize: "14px", color: "#FFFFFF", background: "#0F3B2E", padding: "14px 0" }}
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
}
