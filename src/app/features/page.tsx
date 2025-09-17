import Header from "@/components/features/header";
import ExperimentalFeatures from "@/components/features/experimental";
import BasicFeatures from "@/components/features/basic";
import ComparisonTable from "@/components/features/comparison-table";

import DownloadCTA from "@/components/download-cta";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Plurse | Features",
  description:
    "Explore the powerful features of Plurse – from smart money management and inventory tracking to AI-powered insights that help small businesses save time and grow with confidence.",
  alternates: {
    canonical: "https://plurse.com/features",
  },
};


export default function Features() {
  return (
    <>
      <Header />
      <ExperimentalFeatures />
      <BasicFeatures />
      <ComparisonTable />
      <DownloadCTA />
    </>
  );
}
