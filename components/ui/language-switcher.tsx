import React from 'react';
import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  currentLanguage: 'en' | 'it';
  onLanguageChange: (language: 'en' | 'it') => void;
  className?: string;
}

const FlagIcon = ({ country, className }: { country: 'GB' | 'IT', className?: string }) => {
  const flags = {
    GB: (
      <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="a">
            <path fillOpacity=".7" d="M-85.3 0h682.6v512h-682.6z"/>
          </clipPath>
        </defs>
        <g clipPath="url(#a)" transform="translate(80) scale(.94)">
          <g strokeWidth="1pt">
            <path fill="#006" d="M-256 0H768v512H-256z"/>
            <path fill="#fff" d="M-256 0v57.2L653.5 512H768v-57.2L-141.5 0H-256zM768 0v57.2L-141.5 512H-256v-57.2L653.5 0H768z"/>
            <path fill="#fff" d="M170.7 0v512h170.6V0H170.7zM-256 170.7v170.6H768V170.7H-256z"/>
            <path fill="#c8102e" d="M-256 204.8v102.4H768V204.8H-256zM204.8 0v512h102.4V0H204.8zM-256 512L85.3 341.3h76.4L-256 512zM-256 0L85.3 170.7H9L-256 0zM768 0L426.7 170.7h76.3L768 0zM768 512L426.7 341.3H503L768 512z"/>
          </g>
        </g>
      </svg>
    ),
    IT: (
      <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
        <g fillRule="evenodd" strokeWidth="1pt">
          <path fill="#fff" d="M0 0h640v480H0z"/>
          <path fill="#009246" d="M0 0h213.3v480H0z"/>
          <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
        </g>
      </svg>
    )
  };
  
  return flags[country];
};

export function LanguageSwitcher({ currentLanguage, onLanguageChange, className = "" }: LanguageSwitcherProps) {
  return (
    <div className={`flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}>
      <Button
        type="button"
        variant={currentLanguage === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLanguageChange('en')}
        className="flex items-center gap-2 px-3 py-1.5 h-auto"
      >
        <FlagIcon country="GB" className="h-4 w-4" />
        <span className="text-sm font-medium">English</span>
      </Button>
      <Button
        type="button"
        variant={currentLanguage === 'it' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLanguageChange('it')}
        className="flex items-center gap-2 px-3 py-1.5 h-auto"
      >
        <FlagIcon country="IT" className="h-4 w-4" />
        <span className="text-sm font-medium">Italiano</span>
      </Button>
    </div>
  );
} 