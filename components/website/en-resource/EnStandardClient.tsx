"use client";
import { useLanguage } from '@/lib/context/language-context';
import { EnStandardCard } from './en-standard-card';
import { MarkdownContent } from '../blog/markdown-content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Shield, Download, Copy, Check, Share2, Linkedin, Twitter, Facebook } from 'lucide-react';
import type { EnStandard } from '@/lib/en-standard-service';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

export default function EnStandardClient({ standard, relatedStandards }: { 
  standard: EnStandard,
  relatedStandards?: EnStandard[]
}) {
  const { language, t } = useLanguage();
  const title = standard.title_locales?.[language] || standard.title;
  const summary = standard.summary_locales?.[language] || standard.summary;
  const content = standard.content_locales?.[language] || standard.content;
  const category = standard.category_locales?.[language] || standard.category;
  const tags = standard.tags_locales?.[language] || standard.tags || [];
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

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
        description: "The standard page link has been copied to your clipboard.",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Encoded values for share links
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);
  
  // Share URLs
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodedTitle}&summary=${encodedSummary}&source=HandLine`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodedTitle}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  return (
    <main className="flex flex-col min-h-[100dvh] bg-[#F5EFE0]/80 dark:bg-transparent pt-8 md:pt-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid-primary/[0.02] absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute -top-1/3 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-brand-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-brand-primary/10 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-4 pb-8 md:py-12">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 border-b border-brand-primary/10">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="outline" size="sm" asChild className="bg-[#F5EFE0]/90 hover:bg-[#F5EFE0] dark:bg-transparent dark:hover:bg-black/20 border-brand-primary/20 hover:border-brand-primary/40 dark:border-brand-primary/30 dark:hover:border-brand-primary/50 transition-all duration-200">
              <Link href="/resources/en-resource-centre" className="flex items-center gap-1.5 text-brand-dark dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary">
                <ChevronLeft className="h-4 w-4 text-brand-primary" />
                {t('standards.backToStandards')}
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            {/* Standard Code Badge */}
            <div className="inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm border border-brand-primary/40 backdrop-blur-sm">
              <Shield className="mr-2 h-4 w-4 text-brand-primary" />
              <span className="text-brand-dark dark:text-white font-medium">
                {standard.standard_code}
              </span>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-brand-primary">
                    {tag}
                  </Badge>
                ))}
                <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-brand-primary">
                  {category}
                </Badge>
              </div>
            )}

            {/* Featured Image */}
            {standard.image_url && (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
                <Image
                  src={standard.image_url}
                  alt={title}
                  fill
                  priority
                  className="object-cover transition-all duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 70vw"
                />
                <div className="absolute inset-0 rounded-xl border border-brand-primary/10 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white text-shadow-lg">{standard.standard_code}</span>
                </div>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-brand-dark dark:text-white">
              {title}
            </h1>

            {/* Summary */}
            <p className="text-xl text-brand-secondary dark:text-gray-300 leading-relaxed">
              {summary}
            </p>

            {/* Meta & Sharing */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-primary/10 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                  <Shield className="h-4 w-4 text-brand-primary" />
                </div>
                <span className="text-brand-secondary dark:text-gray-300">{category}</span>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-brand-primary/10">
                      <Share2 className="h-4 w-4 text-brand-primary" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <a 
                        href={linkedinShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex cursor-pointer items-center"
                      >
                        <Linkedin className="mr-2 h-4 w-4 text-[#0077B5]" />
                        <span>Share to LinkedIn</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a 
                        href={twitterShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex cursor-pointer items-center"
                      >
                        <Twitter className="mr-2 h-4 w-4 text-[#1DA1F2]" />
                        <span>Share to Twitter</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a 
                        href={facebookShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex cursor-pointer items-center"
                      >
                        <Facebook className="mr-2 h-4 w-4 text-[#4267B2]" />
                        <span>Share to Facebook</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={copyToClipboard} className="flex cursor-pointer items-center">
                      {copySuccess ? (
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      <span>{copySuccess ? "Copied!" : "Copy link"}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-8 md:py-12">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <MarkdownContent content={content} />
            </div>
            
            {/* Sidebar with Downloads */}
            <div className="space-y-6">
              {standard.downloads && standard.downloads.length > 0 && (
                <div className="rounded-lg border border-brand-primary/10 dark:border-brand-primary/20 bg-white/80 dark:bg-gray-800/30 p-6 shadow-sm backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4 text-brand-dark dark:text-white">{t('standards.downloads')}</h3>
                  <div className="space-y-3">
                    {standard.downloads.map((download, index) => {
                      const localizedTitle = download.title_locales?.[language] || download.title;
                      return (
                        <Button 
                          key={index}
                          variant="outline" 
                          size="default"
                          className="w-full justify-start border-brand-primary/20 hover:bg-brand-primary/10 hover:text-brand-primary"
                          asChild
                        >
                          <a 
                            href={download.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-brand-dark dark:text-white"
                          >
                            <Download className="mr-2 h-4 w-4 text-brand-primary" />
                            <span className="flex-1 text-left">{localizedTitle}</span>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {download.type ? download.type.toUpperCase() : 'FILE'}
                            </Badge>
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Related Standards */}
              {relatedStandards && relatedStandards.length > 0 && (
                <div className="rounded-lg border border-brand-primary/10 dark:border-brand-primary/20 bg-white/80 dark:bg-gray-800/30 p-6 shadow-sm backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4 text-brand-dark dark:text-white">{t('standards.relatedStandards')}</h3>
                  <div className="space-y-4">
                    {relatedStandards.map((relatedStandard, index) => {
                      const relatedTitle = relatedStandard.title_locales?.[language] || relatedStandard.title;
                      return (
                        <Link 
                          key={index}
                          href={`/resources/en-resource-centre/${relatedStandard.slug}`}
                          className="flex items-center p-3 rounded-md hover:bg-brand-primary/5 border border-transparent hover:border-brand-primary/10 transition-all"
                        >
                          <Shield className="flex-shrink-0 h-5 w-5 mr-3 text-brand-primary" />
                          <div>
                            <div className="font-medium text-brand-dark dark:text-white">{relatedStandard.standard_code}</div>
                            <div className="text-sm text-brand-secondary dark:text-gray-300 line-clamp-1">{relatedTitle}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 