"use client";
import { useLanguage } from '@/lib/context/language-context';
import { CareerMarkdownContent } from './career-markdown-content';
import { JobApplicationModal } from './job-application-modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Calendar, MapPin, Building, Briefcase, Share2, Linkedin, Copy, Check, Clock, Euro, Users, Car, Mail } from 'lucide-react';
import type { CareerPost } from '@/lib/career-service';
import { useState, useEffect } from 'react';
import { CareersDetailCTA } from './careers-detail-cta';
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
  const workSite = post.work_site_locales?.[language] || post.work_site;
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
                <div className="flex items-start text-brand-secondary dark:text-gray-300">
                  <MapPin className="mr-3 h-5 w-5 text-brand-primary flex-shrink-0" />
                  <div className="flex flex-col min-h-[72px]">
                    <p className="text-sm text-brand-secondary/70 dark:text-gray-400">{t('careers.post.location')}</p>
                    <div className="flex-1 flex items-center">
                      <p className="font-semibold text-brand-dark dark:text-white">{location}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-black/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-start text-brand-secondary dark:text-gray-300">
                  <Clock className="mr-3 h-5 w-5 text-brand-primary flex-shrink-0" />
                  <div className="flex flex-col min-h-[72px]">
                    <p className="text-sm text-brand-secondary/70 dark:text-gray-400">{t('careers.post.jobType')}</p>
                    <div className="flex-1 flex items-center">
                      <p className="font-semibold text-brand-dark dark:text-white">{jobType}</p>
                    </div>
                  </div>
                </div>
              </div>
              {workSite && (
                <div className="bg-white dark:bg-black/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                  <div className="flex items-start text-brand-secondary dark:text-gray-300">
                    <Car className="mr-3 h-5 w-5 text-brand-primary flex-shrink-0" />
                    <div className="flex flex-col min-h-[72px]">
                      <p className="text-sm text-brand-secondary/70 dark:text-gray-400">{t('careers.post.workSite') || 'Work Site'}</p>
                      <div className="flex-1 flex items-center">
                        <p className="font-semibold text-brand-dark dark:text-white">{workSite}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Salary tile intentionally removed as per new layout (replaced by Work Site) */}
              {post.published_at && (
                <div className="bg-white dark:bg-black/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                  <div className="flex items-start text-brand-secondary dark:text-gray-300">
                    <Calendar className="mr-3 h-5 w-5 text-brand-primary flex-shrink-0" />
                    <div className="flex flex-col min-h-[72px]">
                      <p className="text-sm text-brand-secondary/70 dark:text-gray-400">{t('careers.post.posted')}</p>
                      <div className="flex-1 flex items-center">
                        <p className="font-semibold text-brand-dark dark:text-white">{formatDate(post.published_at)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-black/50 rounded-xl p-6 h-full border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm flex flex-col">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-6">
                  {t('careers.post.readyToJoin')}
                </h3>
                
                {/* Apply Button */}
                <Button 
                  size="lg" 
                  className="bg-brand-primary text-white hover:bg-brand-primary/90 transition-all duration-300 px-6 py-3 text-base font-medium border-0 shadow-none"
                  onClick={() => setIsApplicationModalOpen(true)}
                >
                  {t('careers.post.applyNow')}
                </Button>
                
                {/* Share Options */}
                <div className="pt-4 mt-auto">
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
                      <a href={`mailto:?subject=${encodedTitle}&body=${encodeURIComponent(currentUrl)}%0D%0A%0D%0A${encodedSummary}`}>
                        <Mail className="h-4 w-4" />
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
          
          <CareersDetailCTA onApply={() => setIsApplicationModalOpen(true)} />
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