"use client";

import { SignInForm } from "@/components/auth/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "reactfire";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from '@/lib/context/language-context';

export const AuthCard = () => {
  // Temporarily disable sign-up — only show sign-in form
  const { data: user } = useUser();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (user) {
      // Check if user is admin (jackoliverdev@gmail.com) before redirecting
      if (user.email === "jackoliverdev@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, router]);
  
  return (
    <Card className="w-full border-border/40 shadow-lg bg-white dark:bg-black/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {t('auth.welcomeBack')}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {t('auth.signInDesc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={"signin"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <SignInForm />
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
