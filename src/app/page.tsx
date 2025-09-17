import type { Metadata } from "next";

import Header from "@/components/home/header";
import FeatureOverview from "@/components/home/features-overview";
import ValueProposition from "@/components/home/value-proposition";
import DemoSection from "@/components/home/demo-section";
import Testimonials from "@/components/home/testimonials";

import DownloadCTA from "@/components/download-cta";


export const metadata: Metadata = {
  title: "Plurse | Intelligent Tools for Small Business Growth",
  description:
    "Plurse helps small businesses do more with every transaction. Track inventory, manage money, and get intelligent insights for pricing, sales strategies, and growth.",
  alternates: {
    canonical: "https://plurse.com",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <FeatureOverview />
      <ValueProposition />
      <DemoSection />
      <Testimonials />
      <DownloadCTA />
    </>
  );
}
