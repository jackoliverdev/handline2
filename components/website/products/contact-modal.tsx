"use client";

import React from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";

interface ContactModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      productName: product.name,
    };

    try {
      const response = await fetch('/api/product-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry');
      }

      // Show success message
      alert('Your inquiry has been sent successfully! We will contact you soon.');
      onClose();
    } catch (error) {
      alert('Failed to send inquiry. Please try again or contact us directly.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-w-[95vw] p-0 gap-0 bg-white dark:bg-black backdrop-blur-sm dark:backdrop-blur-none max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 right-0 p-2 z-20 flex justify-end">
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-brand-primary/10 hover:bg-brand-primary/20 absolute top-2 right-2">
              <X className="h-4 w-4 text-brand-primary" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </div>
        
        <DialogHeader className="p-4 sm:p-6 pt-8 sm:pt-6 border-b border-brand-primary/10 dark:border-brand-primary/20 bg-white dark:bg-transparent">
          <DialogTitle className="text-lg sm:text-xl font-bold text-brand-dark dark:text-white">
            {t('contact.section.title')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 bg-[#F5EFE0]/95 dark:bg-transparent">
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">{t('contact.form.fields.name')} *</Label>
              <Input
                id="name"
                name="name"
                required
                className="bg-white/50 dark:bg-gray-900/50"
                placeholder={t('contact.form.fields.namePlaceholder')}
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">{t('contact.form.fields.company')}</Label>
              <Input
                id="company"
                name="company"
                className="bg-white/50 dark:bg-gray-900/50"
                placeholder={t('contact.form.fields.companyPlaceholder')}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('contact.form.fields.email')} *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-white/50 dark:bg-gray-900/50"
                placeholder={t('contact.form.fields.emailPlaceholder')}
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">{t('contact.form.fields.subject')} *</Label>
              <Input
                id="subject"
                name="subject"
                required
                className="bg-white/50 dark:bg-gray-900/50"
                placeholder={t('contact.form.fields.subjectPlaceholder')}
                defaultValue={`${t('products.product')}: ${product.name}`}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">{t('contact.form.fields.message')} *</Label>
              <Textarea
                id="message"
                name="message"
                required
                className="min-h-[150px] bg-white/50 dark:bg-gray-900/50"
                placeholder={t('contact.form.fields.messagePlaceholder')}
              />
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="privacy" name="privacy" required className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="privacy"
                  className="text-sm text-brand-secondary dark:text-gray-300 leading-relaxed"
                >
                  {t('forms.privacyConsent')}{' '}
                  <Link href="/legal?tab=privacy" className="text-brand-primary hover:underline">
                    {t('forms.privacyPolicy')}
                  </Link>{' '}
                  {t('forms.and')}{' '}
                  <Link href="/legal?tab=terms" className="text-brand-primary hover:underline">
                    {t('forms.terms')}
                  </Link>
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 sm:pt-6">
            <Button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300"
            >
              {t('forms.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 