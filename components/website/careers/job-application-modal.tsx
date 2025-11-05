"use client";

import React, { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { X, Upload, FileText, User, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { CareerPost } from "@/lib/career-service";

interface JobApplicationModalProps {
  post: CareerPost;
  isOpen: boolean;
  onClose: () => void;
}

// Zod schema for form validation
const applicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
  startDate: z.string().optional(),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy and terms of service",
  }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  post,
  isOpen,
  onClose,
}) => {
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  
  const title = post.title_locales?.[language] || post.title;
  const department = post.department_locales?.[language] || post.department;
  const location = post.location_locales?.[language] || post.location;

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      startDate: "",
      privacyConsent: false,
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'cv') {
        setCvFile(file);
      } else {
        setCoverLetterFile(file);
      }
    }
  };

  async function onSubmit(values: ApplicationFormValues) {
    // Check if CV is uploaded (required)
    if (!cvFile) {
      toast({
        title: t('contact.form.error.title') || 'Error',
        description: 'Please upload your CV/Resume',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare attachments
      const attachments: { filename: string; content: string; contentType?: string }[] = [];

      // Convert CV to base64
      const cvArrayBuffer = await cvFile.arrayBuffer();
      const cvBase64 = Buffer.from(cvArrayBuffer).toString('base64');
      attachments.push({
        filename: cvFile.name,
        content: cvBase64,
        contentType: cvFile.type,
      });

      // Convert cover letter to base64 if provided
      if (coverLetterFile) {
        const clArrayBuffer = await coverLetterFile.arrayBuffer();
        const clBase64 = Buffer.from(clArrayBuffer).toString('base64');
        attachments.push({
          filename: coverLetterFile.name,
          content: clBase64,
          contentType: coverLetterFile.type,
        });
      }

      // Format message for email
      let emailMessage = `JOB APPLICATION\n\nPosition: ${title}\nDepartment: ${department}\nLocation: ${location}\n\n`;
      emailMessage += `=== CANDIDATE INFORMATION ===\n`;
      emailMessage += `Name: ${values.firstName} ${values.lastName}\n`;
      emailMessage += `Email: ${values.email}\n`;
      if (values.phone) emailMessage += `Phone: ${values.phone}\n`;
      if (values.startDate) emailMessage += `Available From: ${values.startDate}\n`;
      if (values.message) emailMessage += `\n=== CANDIDATE MESSAGE ===\n${values.message}\n`;

      // Submit to /api/contact endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          subject: `Job Application: ${title}`,
          message: emailMessage,
          attachments,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      // Success!
      toast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.description'),
      });

      // Reset form and close modal
      form.reset();
      setCvFile(null);
      setCoverLetterFile(null);
      onClose();
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: t('contact.form.error.title') || 'Error',
        description: t('contact.form.error.description') || 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-w-[95vw] p-0 gap-0 bg-white dark:bg-black backdrop-blur-sm dark:backdrop-blur-none max-h-[90vh] overflow-y-auto">
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
            {t('careers.application.title')}
          </DialogTitle>
          <div className="mt-2 space-y-1">
            <p className="text-brand-primary font-semibold">{title}</p>
            <div className="flex flex-wrap gap-4 text-sm text-brand-secondary dark:text-gray-300">
              <span>{department}</span>
              <span>•</span>
              <span>{location}</span>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4 bg-white dark:bg-black/50">
            <div className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white flex items-center">
                  <User className="mr-2 h-5 w-5 text-brand-primary" />
                  {t('careers.application.personalInfo')}
                </h3>
                
                {/* Full Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('careers.application.firstName')} *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('careers.application.lastName')} *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('careers.application.email')} *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder={t('forms.emailPlaceholder')}
                            className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
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
                        <FormLabel>{t('careers.application.phone')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-brand-primary" />
                  {t('careers.application.documents')}
                </h3>
                
                {/* CV Upload */}
                <div className="space-y-2">
                  <FormLabel>{t('careers.application.cv')} *</FormLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'cv')}
                      className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
                    />
                    <Upload className="h-4 w-4 text-brand-primary" />
                  </div>
                  {cvFile && (
                    <p className="text-sm text-brand-secondary dark:text-gray-300">
                      {t('careers.application.fileSelected')}: {cvFile.name}
                    </p>
                  )}
                </div>

                {/* Cover Letter Upload */}
                <div className="space-y-2">
                  <FormLabel>{t('careers.application.coverLetter')}</FormLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      id="coverLetter"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'coverLetter')}
                      className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
                    />
                    <Upload className="h-4 w-4 text-brand-primary" />
                  </div>
                  {coverLetterFile && (
                    <p className="text-sm text-brand-secondary dark:text-gray-300">
                      {t('careers.application.fileSelected')}: {coverLetterFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-brand-primary" />
                  {t('careers.application.additionalInfo')}
                </h3>
                
                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('careers.application.message')}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder={t('careers.application.messagePlaceholder')}
                          className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Start Date */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('careers.application.availableFrom')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          className="bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-brand-primary dark:focus:border-brand-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Privacy Policy Checkbox */}
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
            </div>

            <DialogFooter className="pt-4 sm:pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300"
              >
                {isSubmitting ? t('contact.form.submitting') : t('careers.application.submit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}; 