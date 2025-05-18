"use client";

import { AuthCard } from "@/components/auth-card";
import { ProviderLoginButtons } from "@/components/auth/provider-login-buttons";
import { OrSeparator } from "@/components/ui/or-separator";
import { useLanguage } from '@/lib/context/language-context';

export default function LoginClient() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-brand-light dark:bg-background pt-16 sm:pt-16">
      <div className="flex flex-1 items-center justify-center py-12 sm:py-20">
        <div className="w-full max-w-lg mx-auto px-4 sm:px-0 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-brand-dark dark:text-white">
              {t('auth.customerPortal')}
            </h1>
            <p className="text-brand-secondary dark:text-gray-300 font-body">
              {t('auth.customerPortalDesc')}
            </p>
          </div>
          <AuthCard />
          <div className="space-y-4">
            <OrSeparator />
            <ProviderLoginButtons />
          </div>
          <div className="text-center text-xs text-brand-secondary dark:text-gray-400 font-body">
            {t('auth.agreeTo')} {" "}
            <a href="/legal?tab=terms" className="underline underline-offset-4 hover:text-brand-primary">
              {t('auth.terms')}
            </a>{" "}
            {t('common.and') || 'and'} {" "}
            <a href="/legal?tab=privacy" className="underline underline-offset-4 hover:text-brand-primary">
              {t('auth.privacy')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 