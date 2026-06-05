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
        html, body {
          background-color: #0C0D0E !important;
          background: #0C0D0E !important;
        }
        nav, footer, header { display: none !important; }
        main { padding-top: 0 !important; }
      `}} />
      {children}
    </>
  );
}
