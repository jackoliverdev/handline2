import { LegalHero } from "@/components/website/legal/hero";
import { LegalTabs } from "@/components/website/legal/tabs";
import { getLegalDocuments } from "@/lib/legal-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Information | Hand Line",
  description: "Terms of Service, Privacy Policy, Cookie Policy and EN-Standards for Hand Line. Read our legal documents to understand your rights and responsibilities when using our products.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LegalPage() {
  const documents = await getLegalDocuments();

  return (
    <>
      <LegalHero />
      <LegalTabs documents={documents} />
    </>
  );
} 