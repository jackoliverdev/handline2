"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Layers, Zap, ShieldCheck, Sparkles, ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

const stats = [
  { value: '4', suffix: '+', label: 'Core Services' },
  { value: '100', suffix: '%', label: 'Customer Focus' },
  { value: '99', suffix: '%', label: 'Uptime Guarantee' },
];

function StatCounter({ 
  value, 
  suffix = '', 
  delay = 0 
}: { 
  value: string; 
  suffix?: string; 
  delay?: number 
}) {
  const [count, setCount] = React.useState(0);
  const targetValue = parseInt(value);
  
  React.useEffect(() => {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(progress * targetValue);
        
        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(targetValue);
        } else {
          setCount(currentCount);
        }
      }, frameDuration);
      
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [targetValue, delay]);

  return <span>{count}{suffix}</span>;
}

function FloatingIcon({ Icon, delay, x, y }: { Icon: any; delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_CONFIG, delay }}
    >
      <motion.div
        className="rounded-xl border border-primary/20 bg-primary/10 p-3 backdrop-blur-sm"
        animate={{
          y: [-10, 10, -10],
          rotate: [-5, 5, -5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Icon className="h-6 w-6 text-primary" />
      </motion.div>
    </motion.div>
  );
}

export const ServicesHero = () => {
  return (
    <section
      className="relative flex min-h-[80vh] items-center overflow-hidden pb-16 pt-20 md:min-h-[70vh]"
    >
      <div className="container">
        <div className="flex flex-col items-center text-center">
          {/* Icon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING_CONFIG}
            className="mb-8"
          >
            <div className="relative inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm ring-1 ring-primary/20 backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Enterprise Solutions
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.1 }}
            className="relative"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Our <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Services</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.2 }}
            className="mt-6"
          >
            <p className="max-w-2xl text-lg text-muted-foreground">
              We provide comprehensive business solutions designed to help your organization
              thrive in today's competitive landscape.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.3 }}
            className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary">
                  <StatCounter value={stat.value} suffix={stat.suffix} delay={index * 100} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link href="#services-list" className="flex items-center gap-2">
                <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-1" />
                <span>View Services</span>
                <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group font-medium rounded-lg border-2 hover:bg-background/5 transition-all duration-300"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-2">
                <span>Get a Quote</span>
                <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Floating Icons */}
      <FloatingIcon Icon={BarChart3} delay={0.5} x="20%" y="30%" />
      <FloatingIcon Icon={ShieldCheck} delay={0.7} x="75%" y="30%" />
      <FloatingIcon Icon={Zap} delay={0.9} x="15%" y="65%" />
      <FloatingIcon Icon={Layers} delay={1.1} x="80%" y="65%" />
    </section>
  );
}; 