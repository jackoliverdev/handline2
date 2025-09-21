"use client";
import { useLanguage } from '@/lib/context/language-context';
import { BlogCard } from './blog-card';
import { MarkdownContent } from './markdown-content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Clock, User, Share2, Linkedin, X as XIcon, Copy, Check, Mail } from 'lucide-react';
import { RelatedProducts } from '@/components/website/products/slug/RelatedProducts';
import { BlogImagesGallery } from './BlogImagesGallery';
import { getRelatedProducts } from '@/lib/products-service';
import type { BlogPost } from '@/lib/blog-service';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { language, t } = useLanguage();
  const title = post.title_locales?.[language] || post.title;
  const summary = post.summary_locales?.[language] || post.summary;
  const content = post.content_locales?.[language] || post.content;
  const tags = post.tags_locales?.[language] || post.tags || [];
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    // Set the current URL when the component mounts (client-side only)
    setCurrentUrl(window.location.href);
    // Load related products if any IDs are present
    const ids = [post.related_product_id_1, post.related_product_id_2, post.related_product_id_3, post.related_product_id_4].filter(Boolean) as string[];
    (async () => {
      try {
        if (ids.length === 0) return;
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('id', ids);
        if (!error && data) setRelatedProducts(data);
      } catch (e) {
        console.error('Failed to fetch related products for blog:', e);
      }
    })();
  }, []);

  // Handle share link copying
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      toast({
        title: "Link copied!",
        description: "The blog post link has been copied to your clipboard.",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Calculate reading time (approximately 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

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
  const emailShareUrl = `mailto:?subject=${encodedTitle}&body=${encodedSummary}%0A%0A${encodeURIComponent(currentUrl)}`;

  // Category from canonical column
  const canonicalCategory = (post as any).category || '';
  const firstTagLower = canonicalCategory.toLowerCase();
  const category = canonicalCategory || t('blog.categoriesBuckets.buckets.other.title');
  const categoryClass = firstTagLower.includes('innovation')
    ? 'bg-[#F28C38]/10 text-[#F28C38] border-[#F28C38]/20'
    : firstTagLower.includes('sustain')
    ? 'bg-[#3BAA36]/10 text-[#3BAA36] border-[#3BAA36]/20'
    : (firstTagLower.includes('compliance') || firstTagLower.includes('safety'))
    ? 'bg-[#0F5B78]/10 text-[#0F5B78] border-[#0F5B78]/20'
    : 'bg-gray-200/40 text-gray-800 border-gray-300/50';

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
        className="relative w-full pt-20 pb-8 md:pt-28 md:pb-12"
      >
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content with Image Overlay */}
          <div className="relative">
            {/* Featured Image with Overlay Content */}
            {post.image_url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-2xl min-h-[360px] sm:min-h-0"
              >
                <Image
                  src={post.image_url}
                  alt={title}
                  fill
                  priority
                  className="object-cover transition-all duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 70vw"
                />
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-brand-primary/20" />
                
                {/* Back Button - Top Left of Image */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="absolute top-4 left-4 z-10"
                >
                  <Button variant="outline" size="sm" asChild className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:border-white/50 backdrop-blur-md shadow-lg font-medium transition-all duration-200 h-8 px-3">
                    <Link href="/resources/blog" className="flex items-center gap-1.5 hover:text-brand-primary">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline text-sm">{t('blog.backToBlogs')}</span>
                    </Link>
                  </Button>
                </motion.div>

                {/* Mobile: Tags row under back button */}
                {tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute top-16 left-4 right-4 z-10 sm:hidden"
                  >
                    <div className="flex flex-wrap gap-2 justify-start">
                      {tags.slice(0, 3).map((tag: string, index) => (
                        <motion.div
                          key={`${tag}-m-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, delay: 0.25 + index * 0.08 }}
                        >
                          <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-md shadow-lg font-medium h-7">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-12">
                  {/* Top Spacer to create space from back button and tags */}
                  <div className="flex-shrink-0 h-28 sm:h-16 md:h-20"></div>
                  
                  {/* Bottom Content */}
                  <div className="flex-shrink-0 pb-12 sm:pb-6 md:pb-8">
                    {/* Category badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="mb-2"
                    >
                      <Badge className={`border ${categoryClass} backdrop-blur-sm`}>{category}</Badge>
                    </motion.div>
                    {/* Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-3 sm:mb-4 leading-tight"
                      style={{
                        textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      {title}
                    </motion.h1>

                    {/* Desktop: tags in top-right */}
                    {tags.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="absolute top-4 right-4 z-10 hidden sm:block"
                      >
                        <div className="flex flex-wrap gap-2 justify-end">
                          {tags.slice(0, 3).map((tag: string, index) => (
                            <motion.div
                              key={`${tag}-${index}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            >
                              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-md shadow-lg font-medium h-8">
                                {tag}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Meta Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/90"
                    >
                      {post.published_at && (
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                            <Calendar className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm sm:text-base">{formatDate(post.published_at)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm sm:text-base">{readingTime} {t('blog.minRead')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white font-medium text-sm sm:text-base">{post.author}</span>
                      </div>
                      <div className="ml-auto">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20 bg-white/10 backdrop-blur-sm h-8 w-8">
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
                                <XIcon className="mr-2 h-4 w-4" />
                                <span>Share to X</span>
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a 
                                href={emailShareUrl}
                                className="flex cursor-pointer items-center"
                              >
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Share via Email</span>
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
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full backdrop-blur-sm" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-brand-primary/20 rounded-full backdrop-blur-sm" />
              </motion.div>
            )}

            {/* Fallback for no image */}
            {!post.image_url && (
              <div className="py-16 md:py-24 text-center">
                {/* Author & Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap justify-center items-center gap-4 mb-6"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                      <User className="h-4 w-4 text-brand-primary" />
                    </div>
                    <span className="text-brand-dark dark:text-white font-medium">{post.author}</span>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: string, index) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        >
                          <Badge variant="outline" className="bg-white/80 text-gray-800 hover:bg-white border-gray-300 hover:border-gray-400 font-medium">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
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

                {/* Meta Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-wrap justify-center items-center gap-6 text-brand-secondary dark:text-gray-300 mb-8"
                >
                  {post.published_at && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                        <Calendar className="h-4 w-4 text-brand-primary" />
                      </div>
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                      <Clock className="h-4 w-4 text-brand-primary" />
                    </div>
                    <span>{readingTime} {t('blog.minRead')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                      <User className="h-4 w-4 text-brand-primary" />
                    </div>
                    <span className="text-brand-primary font-medium">{post.author}</span>
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
                            <XIcon className="mr-2 h-4 w-4" />
                            <span>Share to X</span>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a 
                            href={emailShareUrl}
                            className="flex cursor-pointer items-center"
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Share via Email</span>
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
      <section className="w-full pt-0 md:pt-2 pb-6 md:pb-8">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <MarkdownContent 
              content={content} 
              images={Array.isArray((post as any).extra_images_locales) && (post as any).extra_images_locales.length > 0 
                ? (post as any).extra_images_locales.map((i: any) => ({ url: i.url }))
                : undefined
              }
            />
          </div>
        </div>
      </section>


      {relatedProducts.length > 0 && (
        <div className="bg-[#F5EFE0]/60 dark:bg-transparent pt-4 md:pt-6">
          <RelatedProducts relatedProducts={relatedProducts as any} />
        </div>
      )}
    </main>
  );
} 