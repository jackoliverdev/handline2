import { Metadata } from "next";
import { HomeClient } from "@/components/website/home/home-client";

export const metadata: Metadata = {
  title: "HandLine Company | Industrial Safety Gloves",
  description: "Italian manufacturer of high-performance safety gloves for industrial settings. 40+ years of expertise in heat-resistant and cut-resistant hand protection.",
};

export default async function HomePage() {
  return <HomeClient />;
} 