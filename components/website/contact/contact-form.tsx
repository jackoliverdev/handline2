'use client';

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles, Send } from "lucide-react";
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
import { motion } from 'framer-motion';
import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy and terms of service',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      subject: '',
      message: '',
      privacyConsent: false,
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.description'),
      });
      form.reset();
    } catch (error) {
      toast({
        title: t('contact.form.error.title'),
        description: t('contact.form.error.description'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-left"
            id="contact-form-title"
            style={{ scrollMarginTop: "60px" }}
          >
            <h2 className="text-2xl font-bold tracking-tight text-brand-dark dark:text-white mb-2">{t('contact.form.title')}</h2>
            <p className="text-brand-secondary dark:text-gray-300 mb-6">{t('contact.form.description')}</p>
          </motion.div>
          <div id="contact-form" className="rounded-lg border border-brand-primary/10 dark:border-brand-primary/20 bg-[#F5EFE0]/80 dark:bg-transparent p-6 shadow-sm backdrop-blur-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.fields.name')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('contact.form.fields.namePlaceholder')}
                            className="bg-white/50 dark:bg-gray-800/50 border-brand-primary/20 dark:border-gray-700"
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
                        <FormLabel>{t('contact.form.fields.company')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('contact.form.fields.companyPlaceholder')}
                            className="bg-white/50 dark:bg-gray-800/50 border-brand-primary/20 dark:border-gray-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.fields.email')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder={t('contact.form.fields.emailPlaceholder')}
                          className="bg-white/50 dark:bg-gray-800/50 border-brand-primary/20 dark:border-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.fields.subject')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('contact.form.fields.subjectPlaceholder')}
                          className="bg-white/50 dark:bg-gray-800/50 border-brand-primary/20 dark:border-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.fields.message')}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t('contact.form.fields.messagePlaceholder')}
                          className="min-h-[150px] bg-white/50 dark:bg-gray-800/50 border-brand-primary/20 dark:border-gray-700"
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
                  className="w-full sm:w-auto group font-medium rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 dark:bg-brand-primary dark:hover:bg-brand-primary/90 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {t('contact.form.submitting')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t('contact.form.submit')}
                      <Send className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
