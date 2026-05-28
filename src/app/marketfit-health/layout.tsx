import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MarketFit Onboarding | ScaleSteady",
  description: "Tell us about your practice. 15 questions to build your cold email campaign.",
};

export default function MarketFitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        nav, footer, header { display: none !important; }
        main { padding-top: 0 !important; }
      `}} />
      {children}
    </>
  );
}
