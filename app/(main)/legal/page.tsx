import { LegalHero } from "@/components/website/legal/hero";
import { LegalTabs } from "@/components/website/legal/tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Information | HandLine Company",
  description: "Terms of Service, Privacy Policy, Cookie Policy and EN-Standards for HandLine Company. Read our legal documents to understand your rights and responsibilities when using our products.",
};

export default function LegalPage() {
  return (
    <>
      <LegalHero />
      <LegalTabs />
    </>
  );
} 