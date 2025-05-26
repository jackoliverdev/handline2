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
import { motion } from 'framer-motion';
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
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full pt-12 pb-8 md:pt-20 md:pb-12"
      >
        {/* Back Button - Floating */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute top-16 left-4 sm:left-6 lg:left-8 z-10"
        >
          <Button variant="outline" size="sm" asChild className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black/90 border-white/20 dark:border-white/10 hover:border-brand-primary/40 dark:hover:border-brand-primary/50 transition-all duration-200 backdrop-blur-md shadow-lg">
            <Link href="/resources/en-resource-centre" className="flex items-center gap-1.5 text-brand-dark dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary">
              <ChevronLeft className="h-4 w-4 text-brand-primary" />
              {t('standards.backToStandards')}
            </Link>
          </Button>
        </motion.div>

        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 border-b border-brand-primary/10">
          {/* Hero Content with Image Overlay */}
          <div className="relative">
            {/* Featured Image with Overlay Content */}
            {standard.image_url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-2xl"
              >
                <Image
                  src={standard.image_url}
                  alt={title}
                  fill
                  priority
                  className="object-cover transition-all duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 70vw"
                />
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-orange-500/20" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
                  {/* Standard Code & Tags Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap justify-between items-center gap-4 mb-4"
                  >
                    <div className="flex flex-wrap gap-2">
                      {/* Standard Code Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="inline-flex items-center rounded-full bg-white/20 border border-white/30 px-4 py-1.5 text-sm backdrop-blur-sm"
                      >
                        <Shield className="mr-2 h-4 w-4 text-white" />
                        <span className="text-white font-medium">
                          {standard.standard_code}
                        </span>
                      </motion.div>
                      
                      {tags.length > 0 && tags.map((tag: string, index) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        >
                          <Badge className="bg-white/90 text-gray-900 border-white/50 hover:bg-white backdrop-blur-sm font-medium">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                      >
                        <Badge className="bg-brand-primary/90 text-white border-brand-primary hover:bg-brand-primary backdrop-blur-sm font-medium">
                          {category}
                        </Badge>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-tight"
                    style={{
                      textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)'
                    }}
                  >
                    {title}
                  </motion.h1>

                  {/* Summary */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-xl text-white/90 leading-relaxed mb-4 max-w-4xl"
                  >
                    {summary}
                  </motion.p>

                  {/* Meta Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="flex flex-wrap items-center gap-6 text-white/90"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      <span>{category}</span>
                    </div>
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20 bg-white/10 backdrop-blur-sm">
                            <Share2 className="h-4 w-4 text-white" />
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
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full backdrop-blur-sm" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-brand-primary/20 rounded-full backdrop-blur-sm" />
              </motion.div>
            )}

            {/* Fallback for no image */}
            {!standard.image_url && (
              <div className="py-16 md:py-24 text-center">
                {/* Standard Code & Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap justify-center items-center gap-4 mb-6"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm border border-brand-primary/40 backdrop-blur-sm"
                  >
                    <Shield className="mr-2 h-4 w-4 text-brand-primary" />
                    <span className="text-brand-dark dark:text-white font-medium">
                      {standard.standard_code}
                    </span>
                  </motion.div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: string, index) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        >
                          <Badge variant="outline" className="bg-white/80 text-gray-800 hover:bg-white border-gray-300 hover:border-gray-400 font-medium">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-brand-primary font-medium">
                      {category}
                    </Badge>
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-dark dark:text-white mb-6 leading-tight"
                >
                  {title}
                </motion.h1>

                {/* Summary */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-xl text-brand-secondary dark:text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto"
                >
                  {summary}
                </motion.p>

                {/* Meta Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-wrap justify-center items-center gap-6 text-brand-secondary dark:text-gray-300 mb-8"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                      <Shield className="h-4 w-4 text-brand-primary" />
                    </div>
                    <span className="text-brand-primary font-medium">{category}</span>
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
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="w-full pt-0 md:pt-2 pb-12 md:pb-16">
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