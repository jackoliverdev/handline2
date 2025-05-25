"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, FileText, User, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { CareerPost } from "@/lib/career-service";

interface JobApplicationModalProps {
  post: CareerPost;
  isOpen: boolean;
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  post,
  isOpen,
  onClose,
}) => {
  const { language, t } = useLanguage();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  
  const title = post.title_locales?.[language] || post.title;
  const department = post.department_locales?.[language] || post.department;
  const location = post.location_locales?.[language] || post.location;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Job application submitted for:', title);
    onClose();
  };

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

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 bg-[#F5EFE0]/95 dark:bg-transparent">
          <div className="space-y-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-dark dark:text-white flex items-center">
                <User className="mr-2 h-5 w-5 text-brand-primary" />
                {t('careers.application.personalInfo')}
              </h3>
              
              {/* Full Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t('careers.application.firstName')} *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    className="bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t('careers.application.lastName')} *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    className="bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('careers.application.email')} *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-white/50 dark:bg-gray-900/50"
                    placeholder={t('forms.emailPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('careers.application.phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
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
                <Label htmlFor="cv">{t('careers.application.cv')} *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={(e) => handleFileUpload(e, 'cv')}
                    className="bg-white/50 dark:bg-gray-900/50"
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
                <Label htmlFor="coverLetter">{t('careers.application.coverLetter')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="coverLetter"
                    name="coverLetter"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'coverLetter')}
                    className="bg-white/50 dark:bg-gray-900/50"
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
              <div className="space-y-2">
                <Label htmlFor="message">{t('careers.application.message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="bg-white/50 dark:bg-gray-900/50 resize-none"
                  placeholder={t('careers.application.messagePlaceholder')}
                />
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate">{t('careers.application.availableFrom')}</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className="bg-white/50 dark:bg-gray-900/50"
                />
              </div>
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
              {t('careers.application.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 