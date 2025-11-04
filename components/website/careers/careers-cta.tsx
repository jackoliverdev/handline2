"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FileText, Mail, Send, Upload } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + (i * 0.1), duration: 0.4, ease: "easeOut" }
  })
};

// Schemas
const openApplicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  idea: z.string().min(20),
  privacyConsent: z.boolean().refine(v => v === true, {
    message: "You must agree to the privacy policy and terms of service",
  }),
});
type OpenApplicationValues = z.infer<typeof openApplicationSchema>;

const interestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  privacyConsent: z.boolean().refine(v => v === true, {
    message: "You must agree to the privacy policy and terms of service",
  }),
});
type InterestValues = z.infer<typeof interestSchema>;

export function CareersCTA() {
  const { t } = useLanguage();
  const [openApplicationOpen, setOpenApplicationOpen] = React.useState(false);
  const [interestOpen, setInterestOpen] = React.useState(false);
  const [submittingOpen, setSubmittingOpen] = React.useState(false);
  const [submittingInterest, setSubmittingInterest] = React.useState(false);

  const openForm = useForm<OpenApplicationValues>({
    resolver: zodResolver(openApplicationSchema),
    defaultValues: { name: "", email: "", idea: "", privacyConsent: false },
  });

  const [cvFile, setCvFile] = React.useState<File | null>(null);

  const interestForm = useForm<InterestValues>({
    resolver: zodResolver(interestSchema),
    defaultValues: { name: "", email: "", privacyConsent: false },
  });

  async function submitOpenApplication(values: OpenApplicationValues) {
    setSubmittingOpen(true);
    try {
      // Prepare attachment if provided
      let attachments: { filename: string; content: string; contentType?: string }[] | undefined = undefined;
      if (cvFile) {
        const arrayBuffer = await cvFile.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        attachments = [{ filename: cvFile.name, content: base64, contentType: cvFile.type }];
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: 'Open Application',
          message: `${t('careers.cta.ideaLabel')}:\n${values.idea}`,
          attachments,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      toast({ title: t('contact.form.success.title'), description: t('contact.form.success.description') });
      openForm.reset();
      setCvFile(null);
      setOpenApplicationOpen(false);
    } catch (e) {
      toast({ title: t('contact.form.error.title') ?? 'Error', description: t('contact.form.error.description') ?? 'Please try again', variant: 'destructive' });
    } finally {
      setSubmittingOpen(false);
    }
  }

  async function submitInterest(values: InterestValues) {
    setSubmittingInterest(true);
    try {
      const payload = {
        name: values.name,
        email: values.email,
        subject: 'Careers Interest Subscription',
        message: t('careers.cta.keepDescription'),
      };
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed');
      toast({ title: t('contact.form.success.title'), description: t('contact.form.success.description') });
      interestForm.reset();
      setInterestOpen(false);
    } catch (e) {
      toast({ title: t('contact.form.error.title') ?? 'Error', description: t('contact.form.error.description') ?? 'Please try again', variant: 'destructive' });
    } finally {
      setSubmittingInterest(false);
    }
  }

  return (
    <section className="relative py-12 md:py-16">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-black/50 dark:via-gray-900/50 dark:to-black/50 border border-gray-100 dark:border-gray-700/50 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-xl">
          <div className="pointer-events-none absolute inset-0 bg-grid-primary/[0.02] [mask-image:radial-gradient(white,transparent_70%)]" />
          {/* Accent blurs */}
          <motion.div
            variants={itemVariants}
            className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-brand-primary/10 blur-2xl" />
          <motion.div
            variants={itemVariants}
            className="pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-brand-primary/10 blur-2xl" />

          {/* Badge */}
          <div className="flex justify-center mb-3">
            <Badge className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary/10">
              <Mail className="h-4 w-4 text-brand-primary" />
              {t('careers.cta.badge')}
            </Badge>
          </div>

          {/* Heading and description */}
          <motion.h2 variants={itemVariants} className="text-center text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-3">
            {t('careers.cta.title')}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-center text-brand-secondary dark:text-gray-300 max-w-4xl mx-auto">
            {t('careers.cta.description')}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="mt-6 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-2">
            <motion.div
              custom={0}
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-all duration-300 hover:shadow-xl transform text-sm md:text-base h-11 md:h-12"
                onClick={() => setOpenApplicationOpen(true)}
              >
                <FileText className="h-4 w-4 mr-2" /> {t('careers.cta.buttons.openApplication')}
              </Button>
            </motion.div>
            <motion.div
              custom={1}
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg transition-all duration-300 text-sm md:text-base h-11 md:h-12"
                onClick={() => setInterestOpen(true)}
              >
                <Mail className="h-4 w-4 mr-2" /> {t('careers.cta.buttons.keepInformed')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicator removed per feedback */}
        </div>
      </motion.div>

      {/* Open Application Modal */}
      <Dialog open={openApplicationOpen} onOpenChange={setOpenApplicationOpen}>
        <DialogContent className="sm:max-w-[640px] max-w-[95vw] bg-white dark:bg-black/90">
          <DialogHeader>
            <DialogTitle className="text-brand-dark dark:text-white">{t('careers.cta.openTitle')}</DialogTitle>
          </DialogHeader>
          <Form {...openForm}>
            <form onSubmit={openForm.handleSubmit(submitOpenApplication)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField name="name" control={openForm.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.name')}</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="email" control={openForm.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.email')}</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="space-y-2">
                <FormLabel>{t('careers.application.cv')}</FormLabel>
                <div className="flex items-center gap-2">
                  <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary" />
                  <Upload className="h-4 w-4 text-brand-primary" />
                </div>
                {cvFile && (
                  <p className="text-sm text-brand-secondary dark:text-gray-300">{t('careers.application.fileSelected')}: {cvFile.name}</p>
                )}
              </div>
              <FormField name="idea" control={openForm.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('careers.cta.ideaLabel')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="privacyConsent" control={openForm.control} render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-brand-secondary dark:text-gray-300 leading-relaxed font-normal">
                      {t('forms.privacyConsent')}<Link href="/legal?tab=privacy" className="text-brand-primary hover:underline">{t('forms.privacyPolicy')}</Link> {t('forms.and')} <Link href="/legal?tab=terms" className="text-brand-primary hover:underline">{t('forms.terms')}</Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="submit" disabled={submittingOpen} className="bg-brand-primary hover:bg-brand-primary/90 text-white">
                  <Send className="h-4 w-4 mr-2" /> {submittingOpen ? t('contact.form.submitting') : t('careers.cta.submitOpen')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Keep Informed Modal */}
      <Dialog open={interestOpen} onOpenChange={setInterestOpen}>
        <DialogContent className="sm:max-w-[540px] max-w-[95vw] bg-white dark:bg-black/90">
          <DialogHeader>
            <DialogTitle className="text-brand-dark dark:text-white">{t('careers.cta.keepTitle')}</DialogTitle>
          </DialogHeader>
          <Form {...interestForm}>
            <form onSubmit={interestForm.handleSubmit(submitInterest)} className="space-y-4">
              <FormField name="name" control={interestForm.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.form.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="email" control={interestForm.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.form.email')}</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <p className="text-sm text-brand-secondary dark:text-gray-300">
                {t('careers.cta.keepDescription')}
              </p>
              <FormField name="privacyConsent" control={interestForm.control} render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-brand-secondary dark:text-gray-300 leading-relaxed font-normal">
                      {t('forms.privacyConsent')} <Link href="/legal?tab=privacy" className="text-brand-primary hover:underline">{t('forms.privacyPolicy')}</Link> {t('forms.and')} <Link href="/legal?tab=terms" className="text-brand-primary hover:underline">{t('forms.terms')}</Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="submit" disabled={submittingInterest} className="bg-brand-primary hover:bg-brand-primary/90 text-white">
                  <Send className="h-4 w-4 mr-2" /> {submittingInterest ? t('contact.form.submitting') : t('careers.cta.submitKeep')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
}


