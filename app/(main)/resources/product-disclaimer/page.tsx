import { Metadata } from "next";
import { ProductDisclaimerHero } from "@/components/website/resources/product-disclaimer/hero";
import { ProductDisclaimerContent } from "@/components/website/resources/product-disclaimer/content";

export const metadata: Metadata = {
  title: "Product Disclaimer | HandLine",
  description: "Important information regarding the proper use, limitations, and care of HandLine safety gloves and protective equipment.",
};

export default function ProductDisclaimerPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <ProductDisclaimerHero language="en" />
      <ProductDisclaimerContent language="en" />
    </main>
  );
} 