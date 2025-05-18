"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import { useUser } from "reactfire";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const NavbarUserLinks: FC = () => {
  const { data, hasEmitted } = useUser();

  // Define the target URL based on user state
  const targetUrl = hasEmitted && data ? "/app" : "/login";

  return (
    <Button asChild size="sm" className="relative group overflow-hidden rounded-full bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:shadow-lg hover:shadow-brand-primary/20 transition-all duration-300 border-0 text-white font-medium px-6">
      <Link href={targetUrl} className="flex items-center gap-1.5">
        <span>Dashboard</span>
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "easeInOut",
            repeatDelay: 2
          }}
        >
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300" />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      </Link>
    </Button>
  );
};
