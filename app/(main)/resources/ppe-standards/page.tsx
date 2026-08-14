import { Metadata } from "next";
import ENResourceRoot from "@/components/website/resources/en-resource/root";
import { getService } from "@/lib/ppe-standards/service";
import { cookies } from 'next/headers';
import { parseLanguage } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: "PPE Standards Hub | HandLine",
  description: "Comprehensive information on European safety standards for personal protective equipment and our product compliance.",
};

export default async function ENResourceCentrePage() {
  const lang = parseLanguage(cookies().get('language')?.value);
  const svc = getService();
  const categories = await svc.getCategories(lang);
  return <ENResourceRoot categories={categories} />;
}


