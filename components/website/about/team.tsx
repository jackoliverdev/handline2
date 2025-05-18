"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/language-context";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  department: string;
  socialLinks?: {
    linkedin?: string;
    email?: string;
    website?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Marco Rossi",
    position: "Chief Executive Officer",
    bio: "Marco has led HandLine for over 15 years, driving our international expansion and commitment to innovation in safety equipment.",
    imageUrl: "/images/team/ceo.jpg",
    department: "Leadership",
    socialLinks: {
      linkedin: "https://linkedin.com/in/marcorossi",
      email: "marco.rossi@handline.com"
    }
  },
  {
    id: "2",
    name: "Alessandra Bianchi",
    position: "Chief Technical Officer",
    bio: "A material scientist with over 20 years experience, Alessandra leads our R&D team and has pioneered our latest heat-resistant technologies.",
    imageUrl: "/images/team/cto.jpg",
    department: "Leadership",
    socialLinks: {
      linkedin: "https://linkedin.com/in/alessandrabianchi",
      email: "alessandra.bianchi@handline.com"
    }
  },
  {
    id: "3",
    name: "Roberto Marino",
    position: "Head of Production",
    bio: "Roberto ensures that all HandLine products meet our exacting quality and safety standards while optimising manufacturing efficiency.",
    imageUrl: "/images/team/production.jpg",
    department: "Operations",
    socialLinks: {
      email: "roberto.marino@handline.com"
    }
  },
  {
    id: "4",
    name: "Sofia Esposito",
    position: "Design Director",
    bio: "With a background in industrial design, Sofia ensures our products combine superior protection with ergonomic comfort and aesthetic appeal.",
    imageUrl: "/images/team/design.jpg",
    department: "Design",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sofiaesposito",
      website: "https://sofiaesposito.design"
    }
  },
  {
    id: "5",
    name: "Giovanni Ricci",
    position: "Global Sales Director",
    bio: "Giovanni manages our international sales network and has been instrumental in expanding HandLine's presence across Europe and beyond.",
    imageUrl: "/images/team/sales.jpg",
    department: "Sales",
    socialLinks: {
      linkedin: "https://linkedin.com/in/giovanniricci",
      email: "giovanni.ricci@handline.com"
    }
  },
  {
    id: "6",
    name: "Elisa Conti",
    position: "Quality Assurance Manager",
    bio: "Elisa ensures that all products meet international safety standards and comply with regulations across our global markets.",
    imageUrl: "/images/team/quality.jpg",
    department: "Operations",
    socialLinks: {
      email: "elisa.conti@handline.com"
    }
  }
];

export const Team = () => {
  const { t } = useLanguage();
  return (
    <section id="our-team" className="py-10 pb-24 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container">
        <div className="text-center mb-8">
          <Badge className="mb-2 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
            {t('about.team.badge')}
          </Badge>
          <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-2">
            {t('about.team.heading')}
          </h2>
          <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
            {t('about.team.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {teamMembers.map((member) => (
            <Card 
              key={member.id} 
              className="overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent border-brand-primary/10 dark:border-brand-primary/20 hover:shadow-sm transition-all duration-300"
            >
              <div className="relative h-36 w-full overflow-hidden bg-white dark:bg-transparent">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <CardContent className="p-3">
                <h4 className="text-sm font-bold text-brand-dark dark:text-white leading-tight line-clamp-1">{member.name}</h4>
                <p className="text-xs text-brand-primary font-medium line-clamp-1 mb-1">{member.position}</p>
                
                {member.socialLinks && (
                  <div className="flex space-x-1 mt-1">
                    {member.socialLinks.linkedin && (
                      <Link 
                        href={member.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                      >
                        <Linkedin size={14} />
                      </Link>
                    )}
                    {member.socialLinks.email && (
                      <Link 
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                      >
                        <Mail size={14} />
                      </Link>
                    )}
                    {member.socialLinks.website && (
                      <Link 
                        href={member.socialLinks.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                      >
                        <Globe size={14} />
                      </Link>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 