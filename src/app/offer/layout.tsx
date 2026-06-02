import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Offer | ScaleSteady",
  description:
    "We build your cold email infrastructure for $500. Then we work for free until you hit $5,000 in new client revenue. If we fail, you keep everything and owe us nothing.",
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
