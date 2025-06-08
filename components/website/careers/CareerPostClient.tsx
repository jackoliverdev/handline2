"use client";
import { useLanguage } from '@/lib/context/language-context';
import { CareerMarkdownContent } from './career-markdown-content';
import { JobApplicationModal } from './job-application-modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Calendar, MapPin, Building, Briefcase, Share2, Linkedin, Twitter, Facebook, Copy, Check, Clock, Euro, Users } from 'lucide-react';
import type { CareerPost } from '@/lib/career-service';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

export default function CareerPostClient({ post }: { post: CareerPost }) {
  const { language, t } = useLanguage();
  const title = post.title_locales?.[language] || post.title;
  const summary = post.summary_locales?.[language] || post.summary;
  const description = post.description_locales?.[language] || post.description;
  const responsibilities = post.responsibilities_locales?.[language] || post.responsibilities;
  const requirements = post.requirements_locales?.[language] || post.requirements;
  const benefits = post.benefits_locales?.[language] || post.benefits;
  const location = post.location_locales?.[language] || post.location;
  const department = post.department_locales?.[language] || post.department;
  const jobType = post.job_type_locales?.[language] || post.job_type;
  const salaryRange = post.salary_range_locales?.[language] || post.salary_range;
  
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  useEffect(() => {
    // Set the current URL when the component mounts (client-side only)
    setCurrentUrl(window.location.href);
  }, []);

  // Handle share link copying
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      toast({
        title: "Link copied!",
        description: "The job posting link has been copied to your clipboard.",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Format the date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'it' ? 'it-IT' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Encoded values for share links
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);
  
  // Share URLs
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodedTitle}&summary=${encodedSummary}&source=HandLine`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodedTitle}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  // Format array content for markdown
  const formatListItems = (items: string[]) => {
    return items.map(item => `- ${item}`).join('\n');
  };

  // Combine content sections for markdown rendering
  const fullContent = `
# ${t('careers.post.aboutRole')}

${description}

# ${t('careers.post.responsibilities')}

${formatListItems(responsibilities)}

# ${t('careers.post.requirements')}

${formatListItems(requirements)}

# ${t('careers.post.benefits')}

${formatListItems(benefits)}

${salaryRange ? `# ${t('careers.post.salary')}\n\n${salaryRange}` : ''}
  `;

  return (
    <main className="min-h-screen bg-[#F5EFE0]/80 dark:bg-background pt-20">
      {/* Back Navigation */}
      <div className="bg-[#F5EFE0]/90 dark:bg-background border-b border-brand-primary/20 dark:border-gray-700 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="mb-6 bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black/90 border-brand-primary/30 dark:border-brand-primary/50 hover:border-brand-primary text-brand-primary hover:text-brand-primary transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm group"
          >
            <Link href="/careers" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <Briefcase className="h-4 w-4" />
              <span className="font-medium">{t('careers.post.backToCareers')}</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#F5EFE0]/80 dark:bg-background py-12 lg:py-16">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Department Badge */}
          <div className="mb-4">
            <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              {department}
            </Badge>
          </div>
          
          {/* Job Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-dark dark:text-white mb-4">
            {title}
          </h1>
          
          {/* Job Summary */}
          <p className="text-xl text-brand-secondary dark:text-gray-300 leading-relaxed mb-8">
            {summary}
          </p>
          
          {/* Job Meta and Quick Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Job Meta Tiles */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-black/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center text-brand-secondary dark:text-gray-300">
                  <MapPin className="mr-3 h-5 w-5 text-brand-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-brand-secondary/70 dark:text-gray-400">{t('careers.post.location')}</p>
                    <p className="font-semibold text-brand-dark dark:text-white">{location}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-black/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center text-brand-secondary dark:text-gray-300">
                  <Clock className="mr-3 h-5 w-5 text-brand-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-brand-secondary/70 dark:text-gray-400">{t('careers.post.jobType')}</p>
                    <p className="font-semibold text-brand-dark dark:text-white">{jobType}</p>
                  </div>
                </div>
              </div>
              {salaryRange && (
                <div className="bg-white dark:bg-black/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                  <div className="flex items-center text-brand-secondary dark:text-gray-300">
                    <Euro className="mr-3 h-5 w-5 text-brand-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-brand-secondary/70 dark:text-gray-400">{t('careers.post.salary')}</p>
                      <p className="font-semibold text-brand-dark dark:text-white">{salaryRange}</p>
                    </div>
                  </div>
                </div>
              )}
              {post.published_at && (
                <div className="bg-white dark:bg-black/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                  <div className="flex items-center text-brand-secondary dark:text-gray-300">
                    <Calendar className="mr-3 h-5 w-5 text-brand-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-brand-secondary/70 dark:text-gray-400">{t('careers.post.posted')}</p>
                      <p className="font-semibold text-brand-dark dark:text-white">{formatDate(post.published_at)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-black/50 rounded-xl p-6 h-full border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm flex flex-col">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-6">
                  {t('careers.post.quickActions')}
                </h3>
                
                {/* Apply Button */}
                <Button 
                  size="lg" 
                  className="bg-brand-primary text-white hover:bg-brand-primary/90 transition-all duration-300 px-6 py-3 text-base font-medium"
                  onClick={() => setIsApplicationModalOpen(true)}
                >
                  {t('careers.post.applyNow')}
                </Button>
                
                {/* Share Options */}
                <div className="border-t border-brand-primary/20 dark:border-gray-700 pt-4 mt-auto">
                  <h4 className="text-sm font-medium text-brand-dark dark:text-white mb-3">
                    {t('careers.post.sharePosition')}
                  </h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 text-[#0077B5]" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-4 w-4 text-[#4267B2]" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      {copySuccess ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-[#F5EFE0]/80 dark:bg-background py-6 lg:py-8">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CareerMarkdownContent content={fullContent} />
          
          {/* Bottom Apply Section */}
          <div className="mt-12 relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-black/50 dark:via-gray-900/50 dark:to-black/50 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-primary/[0.02] [mask-image:radial-gradient(white,transparent_70%)]" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-primary/10 to-brand-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-primary/10 to-brand-primary/10 rounded-full blur-2xl" />
            
            {/* Content */}
            <div className="relative text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center mb-4 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-primary/10 px-4 py-2 text-sm border border-brand-primary/20 backdrop-blur-sm">
                <Users className="mr-2 h-4 w-4 text-brand-primary" />
                <span className="text-brand-dark dark:text-white font-medium">
                  {t('careers.post.readyToJoinBadge')}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-4 leading-relaxed">
                {t('careers.post.readyToJoin')}
              </h3>
              
              {/* Description */}
              <p className="text-brand-secondary dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                {t('careers.post.excitedToLearn')}
              </p>
              
              {/* Action Button */}
              <Button 
                size="lg" 
                className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform px-8"
                onClick={() => setIsApplicationModalOpen(true)}
              >
                {t('careers.post.applyNow')}
              </Button>

              {/* Trust Indicator */}
              <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-brand-secondary dark:text-gray-400">
                  {t('careers.post.joinTeamIndicator')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Application Modal */}
      <JobApplicationModal
        post={post}
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
      />
    </main>
  );
} 