"use client";

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GA_TRACKING_ID, pageview } from '@/lib/analytics';

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!pathname) return;
    if (!enabled) return;
      const url = pathname + (searchParams ? `?${searchParams.toString()}` : '');
      pageview(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams, enabled]);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const raw = localStorage.getItem('hl_cookie_consent_v1');
        const consent = raw ? JSON.parse(raw) : null;
        setEnabled(Boolean(consent?.analytics));
      } catch {
        setEnabled(false);
      }
    };
    checkConsent();
    const handler = () => checkConsent();
    window.addEventListener('cookie-consent-changed', handler as any);
    return () => window.removeEventListener('cookie-consent-changed', handler as any);
  }, []);

  return (
    <>
      {enabled && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_location: window.location.href,
                  page_title: document.title,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
} 