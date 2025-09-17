import Header from "@/components/download/header";
import Platforms from "@/components/download/platforms";
import InstallationGuide from "@/components/download/installation-guide";
import VersionInfo from "@/components/download/version-info";
import SafetyBadges from "@/components/download/safety-badges";
import BasicWaitlist from "@/components/download/basic-waitlist";

import DownloadCTA from "@/components/download-cta";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Plurse | Download",
  description:
    "Download Plurse and start managing your business smarter today. Get the tools you need to track inventory, manage money, and grow with intelligent insights.",
  alternates: {
    canonical: "https://plurse.com/download",
  },
};


export default function Download() {
  return (
    <>
      <Header />
      <Platforms />
      <InstallationGuide />
      <VersionInfo />
      <SafetyBadges />
      <BasicWaitlist />
      <DownloadCTA />
    </>
  );
}
