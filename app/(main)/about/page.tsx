import { Metadata } from "next";
import { AboutHero } from "@/components/website/about/hero";
// import { Mission } from "@/components/website/about/mission";
import { Different } from "@/components/website/about/different";
import { CompanyHistory } from "@/components/website/about/company-history";
import { Certifications } from "@/components/website/about/certifications";

export const metadata: Metadata = {
  title: "About Us | Hand Line",
  description: "Learn about Hand Line's commitment to safety innovation and quality manufacturing since 1981.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <AboutHero />
      
      {/* <Mission /> */}
      
      <Different />
      
      <CompanyHistory />
      
      <Certifications />
    </main>
  );
} 