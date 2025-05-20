import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, Truck, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Partner With Us | HandLine",
  description: "Explore partnership and distribution opportunities with HandLine. Join our global network of safety solution providers.",
};

export default function PartnersPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-[#F5EFE0]/80 dark:bg-transparent pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="absolute -top-32 -right-32 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-brand-primary/5 blur-3xl dark:bg-brand-primary/10"></div>
        <div className="absolute -bottom-32 -left-32 h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/5"></div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark dark:text-white mb-6 font-heading">
              Partner with <span className="text-brand-primary">HandLine</span>
            </h1>
            <p className="max-w-2xl text-lg text-brand-secondary dark:text-gray-300 mb-8">
              Join our global network of partners and distributors to bring HandLine's innovative safety solutions to more workers around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Partnerships Card */}
            <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-brand-primary/10 dark:border-brand-primary/20 transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="p-6 md:p-8">
                <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="w-6 h-6 text-brand-primary" />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-4 font-heading">Strategic Partnerships</h2>
                <p className="text-brand-secondary dark:text-gray-300 mb-6">
                  We're looking for industry leaders to collaborate on innovative safety solutions. Build a strategic alliance with HandLine to enhance worker protection and productivity.
                </p>
                <Button 
                  className="group font-medium bg-brand-primary hover:bg-brand-primary/90"
                  asChild
                >
                  <Link href="/partners/partnerships" className="flex items-center">
                    <span>Explore Partnerships</span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Distribution Card */}
            <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-brand-primary/10 dark:border-brand-primary/20 transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="p-6 md:p-8">
                <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full flex items-center justify-center mb-6">
                  <Truck className="w-6 h-6 text-brand-primary" />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-4 font-heading">Distribution Network</h2>
                <p className="text-brand-secondary dark:text-gray-300 mb-6">
                  Join our growing network of distributors to bring HandLine's safety products to your region. We offer exclusive territories, competitive margins and comprehensive support.
                </p>
                <Button 
                  className="group font-medium bg-brand-primary hover:bg-brand-primary/90"
                  asChild
                >
                  <Link href="/partners/distribution" className="flex items-center">
                    <span>Become a Distributor</span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 