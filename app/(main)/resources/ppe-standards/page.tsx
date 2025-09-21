import { Metadata } from "next";
import ENResourceRoot from "@/components/website/resources/en-resource/root";
import { getService } from "@/lib/ppe-standards/service";
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: "PPE Standards Hub | HandLine",
  description: "Comprehensive information on European safety standards for personal protective equipment and our product compliance.",
};

export default async function ENResourceCentrePage() {
  const lang = (cookies().get('language')?.value as 'en' | 'it') || 'en';
  const svc = getService();
  const categories = await svc.getCategories(lang);
  return <ENResourceRoot categories={categories} />;
}


