import React from "react";
import Image from "next/image";

// Statically import high-resolution cropped assets.
// Next.js automatically handles cache-busting via hash generation and optimizes dimensions.
import logoTransparent from "../../../public/brand/logos/pipeline-engineers-logo-transparent.png";
import logoAbstract from "../../../public/brand/logos/pipeline-engineers-logo-abstract-variant.png";
import logoReversed from "../../../public/brand/logos/pipeline-engineers-logo-reversed-dark.png";

interface LogoProps {
  variant?: "full" | "monogram" | "reversed";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "full", className = "", size = "md" }: LogoProps) {
  // Dimensions mapping for CSS classes matching our cropped, high-resolution assets:
  // - Monogram variants are perfectly square (1:1 aspect ratio)
  // - Full and Reversed lockups are horizontal widescreen (3.5:1 aspect ratio)
  const sizeClasses = {
    sm: variant === "monogram" ? "h-12 w-12" : "h-14 w-48",
    md: variant === "monogram" ? "h-16 w-16" : "h-18 w-64",
    lg: variant === "monogram" ? "h-40 w-40" : "h-28 w-96",
  };

  // If a custom height or width is supplied via className (e.g. h-full w-full for watermarks),
  // we bypass the default preset classes to ensure absolute visual flexibility.
  const hasCustomSizing = className.includes("h-") || className.includes("w-");
  const currentSizeClass = hasCustomSizing ? "" : sizeClasses[size];

  // Map variants to statically imported image objects
  const sources = {
    full: logoTransparent,
    monogram: logoAbstract,
    reversed: logoReversed,
  };

  const src = sources[variant];
  const alt = variant === "monogram" ? "Pipeline Engineers Monogram" : "Pipeline Engineers Logo";

  // Strategic blend mode settings for JPEG assets
  // - Multiply makes a white JPEG background transparent on light backgrounds
  // - Screen makes a black/dark JPEG background transparent on dark backgrounds
  const blendClass =
    variant === "monogram"
      ? "mix-blend-multiply dark:mix-blend-screen"
      : variant === "reversed"
      ? "mix-blend-screen"
      : "";

  return (
    <div className={`relative flex items-center justify-center select-none ${currentSizeClass} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`object-contain transition-all duration-300 ${blendClass}`}
        priority
      />
    </div>
  );
}
