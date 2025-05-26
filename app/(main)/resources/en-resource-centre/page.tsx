import { Metadata } from "next";
import ENResourceRoot from "@/components/website/resources/en-resource/root";
import { getPublishedEnStandards } from "@/lib/en-standard-service";

export const metadata: Metadata = {
  title: "EN Resource Centre | HandLine",
  description: "Comprehensive information on European safety standards for personal protective equipment and our product compliance.",
};

export default async function ENResourceCentrePage() {
  const standards = await getPublishedEnStandards("en");
  
  return <ENResourceRoot standards={standards} />;
} 