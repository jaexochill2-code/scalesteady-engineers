"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/server/Logo";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-brand-border bg-brand-cashmere/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        
        {/* Responsive Brand Logo */}
        <Link href="/" className="flex items-center group">
          <Logo variant="full" size="sm" className="transition-transform group-hover:scale-[1.01]" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center space-x-10 md:flex">
          <Link 
            href="/services" 
            className="font-sans text-[15px] font-semibold text-brand-charcoal/80 hover:text-brand-orange transition-colors"
          >
            Services
          </Link>
          <Link 
            href="/work" 
            className="font-sans text-[15px] font-semibold text-brand-charcoal/80 hover:text-brand-orange transition-colors"
          >
            Work
          </Link>
          <Link 
            href="/team" 
            className="font-sans text-[15px] font-semibold text-brand-charcoal/80 hover:text-brand-orange transition-colors"
          >
            Team
          </Link>
          <Link 
            href="/process" 
            className="font-sans text-[15px] font-semibold text-brand-charcoal/80 hover:text-brand-orange transition-colors"
          >
            Process
          </Link>
        </nav>

        {/* Desktop CTA Button — Bold White text on Arc Orange for ultimate premium contrast */}
        <div className="hidden md:block">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center bg-brand-orange px-6 py-3 rounded-full font-sans text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-charcoal transition-all duration-300 transform active:scale-95 shadow-sm shadow-brand-orange/20"
          >
            Book a discovery call
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 text-brand-charcoal hover:text-brand-orange focus:outline-none transition-colors"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <div className="relative w-6 h-5 flex flex-col justify-between items-center group">
              {/* Top line */}
              <span 
                className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-45 translate-y-[9px]" : ""
                }`} 
              />
              {/* Middle line */}
              <span 
                className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ease-in-out ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`} 
              />
              {/* Bottom line */}
              <span 
                className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`} 
              />
            </div>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu Overlay */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 w-full bg-brand-cashmere border-b border-brand-border md:hidden shadow-lg z-40 animate-fade-in"
          id="mobile-menu"
        >
          <div className="px-6 py-8 space-y-6 flex flex-col items-center text-center">
            <Link 
              href="/services" 
              onClick={() => setIsOpen(false)}
              className="block font-sans text-lg font-semibold text-brand-charcoal hover:text-brand-orange transition-colors py-2"
            >
              Services
            </Link>
            <Link 
              href="/work" 
              onClick={() => setIsOpen(false)}
              className="block font-sans text-lg font-semibold text-brand-charcoal hover:text-brand-orange transition-colors py-2"
            >
              Work
            </Link>
            <Link 
              href="/team" 
              onClick={() => setIsOpen(false)}
              className="block font-sans text-lg font-semibold text-brand-charcoal hover:text-brand-orange transition-colors py-2"
            >
              Team
            </Link>
            <Link 
              href="/process" 
              onClick={() => setIsOpen(false)}
              className="block font-sans text-lg font-semibold text-brand-charcoal hover:text-brand-orange transition-colors py-2"
            >
              Process
            </Link>
            <div className="pt-4 w-full max-w-[260px]">
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center bg-brand-orange px-6 py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-charcoal transition-all duration-300 transform active:scale-95 text-center shadow-md shadow-brand-orange/10"
              >
                Book a discovery call
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
