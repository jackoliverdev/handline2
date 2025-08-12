"use client";

import { useEffect, useState } from "react";

type Consent = {
  analytics: boolean;
  date: string;
  version: string;
};

const CONSENT_STORAGE_KEY = "hl_cookie_consent_v1";

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Consent;
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    // Also mirror as a simple cookie for server-side awareness (non-essential)
    document.cookie = `${CONSENT_STORAGE_KEY}=${encodeURIComponent(
      JSON.stringify(consent)
    )}; path=/; max-age=${60 * 60 * 24 * 180}; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: consent }));
  } catch {}
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if consent not set
    const existing = readConsent();
    setVisible(!existing);
  }, []);

  const acceptAll = () => {
    writeConsent({ analytics: true, date: new Date().toISOString(), version: "1.0" });
    setVisible(false);
  };

  const declineAll = () => {
    writeConsent({ analytics: false, date: new Date().toISOString(), version: "1.0" });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[1000] p-4 md:p-5">
      <div className="mx-auto max-w-5xl rounded-xl border border-brand-primary/20 bg-white/90 backdrop-blur-md shadow-lg dark:bg-black/70 dark:border-brand-primary/30">
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm leading-5 text-brand-dark dark:text-gray-100">
            We use essential cookies to make this website work. With your consent, we will use analytics cookies to understand how you use our site and to improve our services. You can change your choice at any time in our{' '}
            <a href="/legal?tab=privacy" className="text-[#F28C38] hover:underline">Privacy Policy</a>{' '}or{' '}
            <a href="/legal?tab=cookies" className="text-[#F28C38] hover:underline">Cookie Policy</a>.
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={declineAll}
              className="rounded-md border border-brand-primary/30 px-3 py-2 text-sm text-brand-dark hover:bg-white dark:text-white dark:hover:bg-black/60"
            >
              Decline
            </button>
            <button
              onClick={acceptAll}
              className="rounded-md bg-[#F28C38] px-3 py-2 text-sm font-medium text-white hover:bg-[#e6802f]"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


