import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { MyFirebaseProvider } from "@/components/firebase-providers";
import { RoleProvider } from "@/components/role-provider";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
import { LanguageProvider } from "@/lib/context/language-context";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import CookieConsent from "@/components/website/common/cookie-consent";

// Load Montserrat font for headings (weights: 600, 700)
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
});

// Load Open Sans font for body text (weights: 400, 500, 600)
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Hand Line | Safety Gloves and PPE",
  description:
    "Hand Line – Italian manufacturer of high-performance safety gloves and PPE for industrial settings. 40+ years of expertise in heat-resistant and cut-resistant gloves.",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  icons: {
    icon: "/Logo-HLC.png",
    shortcut: "/Logo-HLC.png",
    apple: "/Logo-HLC.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden bg-[#F5EFE0] dark:bg-[#121212]">
      <body className={cn(
        openSans.variable,
        montserrat.variable,
        "font-sans overflow-x-hidden w-full max-w-[100vw] bg-[#F5EFE0] dark:bg-[#121212]"
      )}>
        <GoogleAnalytics />
        <LanguageProvider>
          <MyFirebaseProvider>
            <RoleProvider>
              {children}
              <Toaster />
              <CookieConsent />
            </RoleProvider>
          </MyFirebaseProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
