'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { ContactForm } from './contact-form';
import { ContactInfo } from './contact-info';

export function ContactSection() {
  return (
    <section className="py-4 md:py-6 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
} 