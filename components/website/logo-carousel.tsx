"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoCarouselProps {
  className?: string;
}

export default function LogoCarousel({ className }: LogoCarouselProps) {
  // Array of logos from well-known brands
  const logos = [
    { name: "Google", src: "/logos/google.svg", width: 120 },
    { name: "Apple", src: "/logos/apple.svg", width: 40 },
    { name: "Tesla", src: "/logos/tesla.svg", width: 120 },
    { name: "Samsung", src: "/logos/samsung.svg", width: 120 },
    { name: "Nike", src: "/logos/nike.svg", width: 80 },
    { name: "Coca Cola", src: "/logos/cocacola.svg", width: 120 },
    { name: "BMW", src: "/logos/bmw.svg", width: 100 },
    { name: "Meta", src: "/logos/meta.svg", width: 120 },
  ];

  return (
    <div className={cn("relative overflow-hidden pt-6 pb-6", className)}>
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
          Trusted by <span className="text-primary">innovative companies</span> worldwide
        </h3>
        
        {/* Single carousel animation */}
        <div className="relative select-none mt-4 overflow-hidden">
          <div className="flex items-center justify-center overflow-hidden">
            <motion.div
              className="flex items-center space-x-10 pl-10"
              animate={{ x: [-1500, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                  repeatDelay: 0,
                },
              }}
            >
              {/* First set */}
              {logos.map((logo, index) => (
                <div
                  key={`logo-1-${index}`}
                  className="flex-shrink-0 h-16 flex items-center"
                >
                  <div className="h-10 flex items-center justify-center px-5 opacity-60 hover:opacity-100 transition-opacity duration-500 filter grayscale hover:grayscale-0 transition-filter duration-500">
                    <Image 
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={30}
                      className="h-10 w-auto object-contain dark:brightness-[10] dark:invert"
                    />
                  </div>
                </div>
              ))}
              
              {/* Second set - duplicate for no breaks */}
              {logos.map((logo, index) => (
                <div
                  key={`logo-2-${index}`}
                  className="flex-shrink-0 h-16 flex items-center"
                >
                  <div className="h-10 flex items-center justify-center px-5 opacity-60 hover:opacity-100 transition-opacity duration-500 filter grayscale hover:grayscale-0 transition-filter duration-500">
                    <Image 
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={30}
                      className="h-10 w-auto object-contain dark:brightness-[10] dark:invert"
                    />
                  </div>
                </div>
              ))}
              
              {/* Third set - triplicate to ensure no gaps */}
              {logos.map((logo, index) => (
                <div
                  key={`logo-3-${index}`}
                  className="flex-shrink-0 h-16 flex items-center"
                >
                  <div className="h-10 flex items-center justify-center px-5 opacity-60 hover:opacity-100 transition-opacity duration-500 filter grayscale hover:grayscale-0 transition-filter duration-500">
                    <Image 
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={30}
                      className="h-10 w-auto object-contain dark:brightness-[10] dark:invert"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Enhanced gradient overlays with stronger fade effect */}
          <div className="absolute pointer-events-none inset-y-0 left-0 w-40 bg-gradient-to-r from-background via-background/95 to-transparent z-10" />
          <div className="absolute pointer-events-none inset-y-0 right-0 w-40 bg-gradient-to-l from-background via-background/95 to-transparent z-10" />
        </div>
      </div>
    </div>
  );
} 