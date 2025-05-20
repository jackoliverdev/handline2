import { Metadata } from "next";
import { ProductDisclaimerHero } from "@/components/website/product-disclaimer/hero";

export const metadata: Metadata = {
  title: "Product Disclaimer | HandLine",
  description: "Important information regarding the proper use, limitations, and care of HandLine safety products.",
};

export default function ProductDisclaimerPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <ProductDisclaimerHero language="en" />
      
      <section className="py-16 md:py-24 bg-[#F5EFE0]/80 dark:bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div id="disclaimer-content" className="max-w-4xl mx-auto prose prose-headings:text-brand-dark prose-headings:font-bold dark:prose-headings:text-white prose-p:text-brand-secondary dark:prose-p:text-gray-300" style={{ scrollMarginTop: "80px" }}>
            <h2>Product Usage Disclaimer</h2>
            <p>
              HandLine products are designed to provide protection in specific work environments when used correctly. 
              Please read and understand all accompanying documentation before using any of our products.
            </p>
            
            <h3>General Guidelines</h3>
            <p>
              All HandLine safety products must be inspected before each use. Do not use damaged items. 
              Follow all care instructions to maintain the protective properties of the equipment.
            </p>
            
            <h3>Limitations</h3>
            <p>
              No personal protective equipment can provide complete protection against all hazards. 
              Our products are tested to specific standards and are designed to protect against designated risks only.
            </p>
            
            <h3>Proper Selection</h3>
            <p>
              It is the responsibility of the employer and user to assess the type of hazard and select the appropriate 
              protective equipment. Consult industry professionals if uncertain about the suitability of a product 
              for your specific environment.
            </p>
            
            <h3>Modification</h3>
            <p>
              Any modification to HandLine products voids all certification and warranty claims. Products should be used 
              only as designed and intended.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 