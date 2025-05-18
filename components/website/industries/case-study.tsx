"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  image_url: string;
}

export interface CaseStudyProps {
  caseStudy: CaseStudy;
  isEven?: boolean;
}

export const CaseStudy: React.FC<CaseStudyProps> = ({ caseStudy, isEven = false }) => {
  // Format the case study slug for URL
  const caseStudySlug = caseStudy.slug || encodeURIComponent(caseStudy.title.toLowerCase().replace(/\s+/g, '-'));

  // Directly determine image URL based on title
  let imageUrl = caseStudy.image_url;
  
  // Override with hardcoded image URLs for specific case studies - using includes() for partial matches
  const title = caseStudy.title.toLowerCase();
  
  if (title.includes("automotive") && title.includes("hand injuries")) {
    imageUrl = "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/website//Hand%20Injuries%20in%20Automotive.png";
  }
  else if (title.includes("laboratory") && title.includes("hazard mitigation")) {
    imageUrl = "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/website//Laboratory%20Hazard%20Mitigation.png";
  }

  // For debugging - Remove this in production
  console.log(`Case study title: "${caseStudy.title}", Using image: ${imageUrl}`);

  return (
    <div className="py-12 border-b border-brand-primary/10 dark:border-brand-primary/20">
      <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
        {/* Image Column */}
        <div className="w-full md:w-5/12">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-md border border-brand-primary/10 dark:border-brand-primary/20">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={caseStudy.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[#F5EFE0]/80 dark:bg-gray-800/20 flex items-center justify-center">
                <span className="text-brand-secondary dark:text-gray-400">No image available</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Badge className="bg-brand-primary text-white">
                {caseStudy.industry}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="w-full md:w-7/12">
          <h3 className="text-2xl font-bold mb-4 text-brand-dark dark:text-white">
            {caseStudy.title}
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-brand-primary">The Challenge</h4>
              <p className="text-brand-secondary dark:text-gray-300">
                {caseStudy.challenge}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-brand-primary">Our Solution</h4>
              <p className="text-brand-secondary dark:text-gray-300">
                {caseStudy.solution}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-brand-primary">Results</h4>
              <ul className="space-y-2">
                {caseStudy.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-brand-secondary dark:text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {caseStudy.testimonial && (
              <Card className="bg-[#F5EFE0]/80 dark:bg-transparent border-brand-primary/10 dark:border-brand-primary/20 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Quote className="h-8 w-8 text-brand-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="italic text-brand-secondary dark:text-gray-300 mb-3">
                        "{caseStudy.testimonial.quote}"
                      </p>
                      <div className="text-sm">
                        <p className="font-semibold text-brand-dark dark:text-white">
                          {caseStudy.testimonial.author}
                        </p>
                        <p className="text-brand-secondary dark:text-gray-400">
                          {caseStudy.testimonial.position}, {caseStudy.testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div>
              <Button 
                variant="default" 
                className="bg-brand-primary text-white hover:bg-brand-primary/90 mt-4"
                asChild
              >
                <Link href={`/case-studies/${caseStudySlug}`} className="flex items-center gap-2">
                  <span>Read Full Case Study</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 