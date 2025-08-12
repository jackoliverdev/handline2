import React from "react";
import type { Metadata } from "next";

import { ContactHero } from "@/components/website/contact/hero";
import { ContactSection } from "@/components/website/contact/contact-section";
import { ContactFaq } from "@/components/website/contact/faq";

export const metadata: Metadata = {
  title: "Contact | Hand Line",
  description: "Get in touch with Hand Line for industrial safety gloves and PPE. Our experts are here to help with your protective equipment needs.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#F5EFE0] dark:bg-transparent">
      <ContactHero />
      <ContactSection />
      <ContactFaq />
    </div>
  );
} 