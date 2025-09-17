import Header from "@/components/about/header";
import MissionVision from "@/components/about/mission-vision";

import DownloadCTA from "@/components/download-cta";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Plurse | About Us",
  description:
    "Learn about Plurse – our mission, vision, and commitment to helping small businesses thrive with smarter tools for money management, inventory tracking, and intelligent insights.",
  alternates: {
    canonical: "https://plurse.com/about",
  },
};


const About = () => {
  return (
    <>
        <Header />
        <MissionVision />
      <DownloadCTA />
    </>
  );
}

export default About;
