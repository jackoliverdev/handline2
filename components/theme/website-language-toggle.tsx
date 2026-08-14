"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGE_META, SUPPORTED_LANGUAGES } from "@/lib/i18n/config";
import { FlagIcon } from "@/components/theme/flag-icon";

interface LanguageToggleProps {
  className?: string;
}

export function WebsiteLanguageToggle({ className }: LanguageToggleProps) {
  const { t, language, setLanguage } = useLanguage();
  const currentMeta = LANGUAGE_META[language];
  const currentLanguage = t(currentMeta.labelKey);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`bg-white dark:bg-black border-slate-200 dark:border-slate-700 hover:bg-brand-primary dark:hover:bg-brand-primary hover:border-brand-primary dark:hover:border-brand-primary transition-all duration-300 hover:scale-105 hover:shadow-xl group !focus:ring-0 !focus:ring-offset-0 !focus-visible:ring-0 !focus-visible:ring-offset-0 !focus-visible:outline-none !focus:outline-none !outline-none [&:focus]:outline-none [&:focus-visible]:outline-none [&:focus]:ring-0 [&:focus-visible]:ring-0 ${className}`}
          aria-label={`Current language: ${currentLanguage}. Click to change language`}
          tabIndex={0}
          style={{
            outline: 'none !important',
            boxShadow: 'none !important',
            border: 'none !important',
          }}
          data-no-focus-ring="true"
        >
          <FlagIcon
            country={currentMeta.flag}
            className="h-[1.2rem] w-[1.2rem] transition-all duration-300 group-hover:scale-110"
          />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/100 dark:bg-black/100 border-slate-200 dark:border-[#333333] shadow-xl"
      >
        {SUPPORTED_LANGUAGES.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code)}
            className={`text-slate-900 dark:text-white hover:bg-slate-100/100 dark:hover:bg-slate-800/100 transition-colors cursor-pointer ${
              language === code ? 'bg-brand-primary/10 text-brand-primary' : ''
            }`}
          >
            <FlagIcon country={LANGUAGE_META[code].flag} className="w-4 h-4 mr-2" />
            {t(LANGUAGE_META[code].labelKey)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
