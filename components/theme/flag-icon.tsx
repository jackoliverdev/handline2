"use client";

import React from "react";
import type { FlagCountry } from "@/lib/i18n/config";

interface FlagIconProps {
  country: FlagCountry;
  className?: string;
}

export function FlagIcon({ country, className }: FlagIconProps) {
  const uid = React.useId().replace(/:/g, "");

  const flags: Record<FlagCountry, React.ReactNode> = {
    GB: (
      <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <clipPath id={`${uid}-gb`}>
            <path fillOpacity=".7" d="M-85.3 0h682.6v512h-682.6z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-gb)`} transform="translate(80) scale(.94)">
          <g strokeWidth="1pt">
            <path fill="#006" d="M-256 0H768v512H-256z" />
            <path fill="#fff" d="M-256 0v57.2L653.5 512H768v-57.2L-141.5 0H-256zM768 0v57.2L-141.5 512H-256v-57.2L653.5 0H768z" />
            <path fill="#fff" d="M170.7 0v512h170.6V0H170.7zM-256 170.7v170.6H768V170.7H-256z" />
            <path fill="#c8102e" d="M-256 204.8v102.4H768V204.8H-256zM204.8 0v512h102.4V0H204.8zM-256 512L85.3 341.3h76.4L-256 512zM-256 0L85.3 170.7H9L-256 0zM768 0L426.7 170.7h76.3L768 0zM768 512L426.7 341.3H503L768 512z" />
          </g>
        </g>
      </svg>
    ),
    IT: (
      <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g fillRule="evenodd" strokeWidth="1pt">
          <path fill="#fff" d="M0 0h640v480H0z" />
          <path fill="#009246" d="M0 0h213.3v480H0z" />
          <path fill="#ce2b37" d="M426.7 0H640v480H426.7z" />
        </g>
      </svg>
    ),
    FR: (
      <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#fff" d="M0 0h640v480H0z" />
        <path fill="#002654" d="M0 0h213.3v480H0z" />
        <path fill="#ce1126" d="M426.7 0H640v480H426.7z" />
      </svg>
    ),
    DE: (
      <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#000" d="M0 0h640v160H0z" />
        <path fill="#d00" d="M0 160h640v160H0z" />
        <path fill="#ffce00" d="M0 320h640v160H0z" />
      </svg>
    ),
    ES: (
      <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#c60b1e" d="M0 0h640v480H0z" />
        <path fill="#ffc400" d="M0 120h640v240H0z" />
      </svg>
    ),
  };

  return <>{flags[country]}</>;
}
