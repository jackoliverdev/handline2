import { Metadata } from "next";
import { HomeClient } from "@/components/website/home/home-client";

export const metadata: Metadata = {
  title: "Hand Line | Safety Gloves and PPE",
  description: "Italian manufacturer of high-performance safety gloves and PPE for industrial settings. 40+ years of expertise in heat-resistant and cut-resistant hand protection.",
};

export default async function HomePage() {
  return <HomeClient />;
} 