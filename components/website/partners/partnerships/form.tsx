'use client';

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { MessageSquare, Briefcase, Send } from "lucide-react";
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

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export function PartnershipForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Simulate form submission
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
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-left"
            id="partnership-form"
            style={{ scrollMarginTop: "60px" }}
          >
            <h2 className="text-2xl font-bold tracking-tight text-brand-dark dark:text-white mb-2">{t("partners.partnerships.form.title")}</h2>
            <p className="text-brand-secondary dark:text-gray-300 mb-4">{t("partners.partnerships.form.description")}</p>
            <p className="text-brand-secondary dark:text-gray-300 mb-6">
              {t("partners.partnerships.form.emailAlternative")}{" "}
              <a 
                href="mailto:partnerships@handlineco.com" 
                className="text-brand-primary hover:underline"
              >
                {t("partners.partnerships.form.emailAddress")}
              </a>
            </p>
          </motion.div>
          <div className="rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-black/50 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                            className="bg-white/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50"
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
                            className="bg-white/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                            className="bg-white/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50"
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
                            className="bg-white/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50"
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
                          className="min-h-[150px] bg-white/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50"
                        />
                      </FormControl>
                      <FormMessage />
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
      </div>
    </div>
  );
} 