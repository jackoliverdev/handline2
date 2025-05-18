'use client';

import * as React from 'react';
import { useLanguage } from "@/lib/context/language-context";

import { ContactHero } from './hero';
import { ContactSection } from './contact-section';
import { ContactFaq } from './faq';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main>
      <ContactHero />
      <ContactSection />
      <ContactFaq />
    </main>
  );
} 