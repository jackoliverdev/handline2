"use client";

import React from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";

interface SampleModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
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
            {t('productPage.requestSample')} - {product.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 bg-[#F5EFE0]/95 dark:bg-transparent">
          <div className="space-y-4">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="company">{t('forms.company')} *</Label>
              <Input
                id="company"
                name="company"
                required
                className="bg-white/50 dark:bg-gray-900/50"
              />
            </div>

            {/* Company Size */}
            <div className="space-y-2">
              <Label htmlFor="companySize">{t('forms.companySize')} *</Label>
              <Select name="companySize" required>
                <SelectTrigger className="bg-white/50 dark:bg-gray-900/50">
                  <SelectValue placeholder={t('forms.selectCompanySize')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="201-500">201-500</SelectItem>
                  <SelectItem value="501+">501+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry">{t('forms.industry')} *</Label>
              <Input
                id="industry"
                name="industry"
                required
                className="bg-white/50 dark:bg-gray-900/50"
              />
            </div>

            {/* Size Needed */}
            <div className="space-y-2">
              <Label htmlFor="size">{t('forms.sizeNeeded')} *</Label>
              <Input
                id="size"
                name="size"
                required
                className="bg-white/50 dark:bg-gray-900/50"
              />
            </div>

            {/* Contact Details */}
            <div className="space-y-2">
              <Label htmlFor="contactDetails">{t('forms.contactDetails')} *</Label>
              <Input
                id="contactDetails"
                name="contactDetails"
                type="email"
                required
                className="bg-white/50 dark:bg-gray-900/50"
                placeholder={t('forms.emailPlaceholder')}
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