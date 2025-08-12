// Google Analytics configuration and tracking functions

export const GA_TRACKING_ID = 'G-PWXEKNTCM4';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  // Respect analytics consent
  try {
    const raw = localStorage.getItem('hl_cookie_consent_v1');
    if (!raw) return;
    const consent = JSON.parse(raw);
    if (!consent?.analytics) return;
  } catch {
    return;
  }
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action: string, parameters?: {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  try {
    const raw = localStorage.getItem('hl_cookie_consent_v1');
    if (!raw) return;
    const consent = JSON.parse(raw);
    if (!consent?.analytics) return;
  } catch {
    return;
  }
  window.gtag('event', action, parameters);
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
} 