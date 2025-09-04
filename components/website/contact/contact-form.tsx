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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.description'),
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
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
          <div id="contact-form" className="rounded-lg bg-white dark:bg-black/50 p-6 shadow-lg hover:shadow-2xl backdrop-blur-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.name')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('contact.form.namePlaceholder')}
                            className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
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
                        <FormLabel>{t('contact.form.company')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('contact.form.companyPlaceholder')}
                            className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
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
                      <FormLabel>{t('contact.form.email')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('contact.form.emailPlaceholder')}
                          className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
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
                      <FormLabel>{t('contact.form.subject')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('contact.form.subjectPlaceholder')}
                          className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
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
                      <FormLabel>{t('contact.form.message')}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t('contact.form.messagePlaceholder')}
                          rows={5}
                          className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary resize-none"
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
                          {t('forms.privacyConsent')}
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
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
