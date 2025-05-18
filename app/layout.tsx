import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { MyFirebaseProvider } from "@/components/firebase-providers";
import { RoleProvider } from "@/components/role-provider";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
import { LanguageProvider } from "@/lib/context/language-context";

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
  title: "HandLine Company | Industrial Safety Gloves",
  description:
    "HandLine Company - Italian manufacturer of high-performance safety gloves and hand protection for industrial settings. 40+ years of expertise in heat-resistant and cut-resistant gloves.",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  icons: {
    icon: [
      { url: "/handline-logo.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/handline-logo.png",
    apple: "/handline-logo.png",
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
        <LanguageProvider>
          <MyFirebaseProvider>
            <RoleProvider>
              {children}
              <Toaster />
            </RoleProvider>
          </MyFirebaseProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
