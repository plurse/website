import Header from "@/components/contact/header";
import Methods from "@/components/contact/methods";

import DownloadCTA from "@/components/download-cta";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Plurse | Contact Us",
  description:
    "Get in touch with the Plurse team. We’re here to answer your questions, support your business, and help you make the most of Plurse.",
  alternates: {
    canonical: "https://plurse.com/contact",
  },
};


const Contact = () => {
  return (
    <>
        <Header />
        <Methods />
      <DownloadCTA />
    </>
  );
}

export default Contact;
