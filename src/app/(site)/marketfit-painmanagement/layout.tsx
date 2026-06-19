import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical Campaign Onboarding | ScaleSteady",
  description: "Define your practice focus area. 15 questions to launch your outbound campaigns.",
};

export default function MarketFitPainManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          background-color: #F7F5F0 !important;
          background: #F7F5F0 !important;
        }
        nav, footer, header { display: none !important; }
        main { padding-top: 0 !important; }
      `}} />
      {children}
    </>
  );
}
