import type { Metadata } from "next";
import { RegulationsHero } from "@/components/website/resources/regulations/hero";
import { RegulationsTabs } from "@/components/website/resources/regulations/tabs";

export const metadata: Metadata = {
  title: "PPE Regulations Overview | Hand Line",
  description: "Guide to PPE regulation, categories and standards across EU, UK and international frameworks.",
};

export default function RegulationsOverviewPage() {
  return (
    <>
      <RegulationsHero />
      <RegulationsTabs />
    </>
  );
}


