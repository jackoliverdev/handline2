"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Briefcase, Truck, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

// Partnership form schema
const partnershipFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy and terms of service',
  }),
});

// Distribution form schema
const distributionFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy and terms of service',
  }),
});

type PartnershipFormValues = z.infer<typeof partnershipFormSchema>;
type DistributionFormValues = z.infer<typeof distributionFormSchema>;

function PartnershipSection() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipFormSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      privacyConsent: false,
    },
  });

  async function onSubmit(data: PartnershipFormValues) {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: t("partners.partnerships.form.successTitle"),
        description: t("partners.partnerships.form.successMessage") + data.email,
      });
      form.reset();
    } catch (error) {
      toast({
        title: t("partners.partnerships.form.errorTitle"),
        description: t("partners.partnerships.form.errorMessage"),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Partnership Form with integrated description */}
      <div className="rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-black/50 p-6 shadow-lg backdrop-blur-sm">
        {/* Header with Icon, Title and Description */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Briefcase className="w-6 h-6 text-brand-primary" />
          </div>
          <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-4 font-heading">
            {t('partners.strategic.title')}
          </h2>
          <p className="text-brand-secondary dark:text-gray-300 mb-6">
            {t('partners.strategic.description')}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("partners.partnerships.form.fullName")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("partners.partnerships.form.fullNamePlaceholder")}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("partners.partnerships.form.company")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("partners.partnerships.form.companyPlaceholder")}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("partners.partnerships.form.email")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder={t("partners.partnerships.form.emailPlaceholder")}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("partners.partnerships.form.phone")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("partners.partnerships.form.phonePlaceholder")}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("partners.partnerships.form.details")}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("partners.partnerships.form.detailsPlaceholder")}
                      className="min-h-[120px] bg-white/50 dark:bg-gray-800/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacyConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-brand-secondary dark:text-gray-300 leading-relaxed font-normal">
                      {t('forms.privacyConsent')}{' '}
                      <Link href="/legal?tab=privacy" className="text-brand-primary hover:underline">
                        {t('forms.privacyPolicy')}
                      </Link>{' '}
                      {t('forms.and')}{' '}
                      <Link href="/legal?tab=terms" className="text-brand-primary hover:underline">
                        {t('forms.terms')}
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full group font-medium bg-brand-primary hover:bg-brand-primary/90"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t("partners.partnerships.form.submitting")}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {t("partners.partnerships.form.submit")}
                  <Send className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function DistributionSection() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<DistributionFormValues>({
    resolver: zodResolver(distributionFormSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      privacyConsent: false,
    },
  });

  async function onSubmit(data: DistributionFormValues) {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: t("partners.distributionPage.form.successTitle"),
        description: t("partners.distributionPage.form.successMessage") + data.email,
      });
      form.reset();
    } catch (error) {
      toast({
        title: t("partners.distributionPage.form.errorTitle"),
        description: t("partners.distributionPage.form.errorMessage"),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Distribution Form with integrated description */}
      <div className="rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-black/50 p-6 shadow-lg backdrop-blur-sm">
        {/* Header with Icon, Title and Description */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Truck className="w-6 h-6 text-brand-primary" />
          </div>
          <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-4 font-heading">
            {t('partners.distribution.title')}
          </h2>
          <p className="text-brand-secondary dark:text-gray-300 mb-6">
            {t('partners.distribution.description')}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("partners.distributionPage.form.fullName")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("partners.distributionPage.form.fullNamePlaceholder")}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("partners.distributionPage.form.company")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("partners.distributionPage.form.companyPlaceholder")}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("partners.distributionPage.form.email")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder={t("partners.distributionPage.form.emailPlaceholder")}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("partners.distributionPage.form.phone")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("partners.distributionPage.form.phonePlaceholder")}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("partners.distributionPage.form.details")}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("partners.distributionPage.form.detailsPlaceholder")}
                      className="min-h-[120px] bg-white/50 dark:bg-gray-800/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacyConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-brand-secondary dark:text-gray-300 leading-relaxed font-normal">
                      {t('forms.privacyConsent')}{' '}
                      <Link href="/legal?tab=privacy" className="text-brand-primary hover:underline">
                        {t('forms.privacyPolicy')}
                      </Link>{' '}
                      {t('forms.and')}{' '}
                      <Link href="/legal?tab=terms" className="text-brand-primary hover:underline">
                        {t('forms.terms')}
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full group font-medium bg-brand-primary hover:bg-brand-primary/90"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t("partners.distributionPage.form.submitting")}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {t("partners.distributionPage.form.submit")}
                  <Send className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export function PartnersCardGrid() {
  return (
    <section className="relative overflow-hidden bg-[#F5EFE0]/80 dark:bg-transparent pt-4 pb-16 md:pt-6 md:pb-24">
      <div className="absolute -top-32 -right-32 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-brand-primary/5 blur-3xl dark:bg-brand-primary/10"></div>
      <div className="absolute -bottom-32 -left-32 h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/5"></div>
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Strategic Partnerships Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PartnershipSection />
          </motion.div>
          
          {/* Distribution Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DistributionSection />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 