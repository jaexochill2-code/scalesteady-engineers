import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Your Campaign | ScaleSteady Pipeline Engineers",
  description: "Review your campaign scope, terms, and complete your $500 infrastructure investment. ScaleSteady builds your outbound system and defers all labor fees until you close revenue.",
};

export default function BuildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
