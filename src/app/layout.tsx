import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { WaitlistModalProvider } from "@/components/waitlist-modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Plurse – Helping Small Businesses Grow",
    template: "%s | Plurse",
  },
  description:
    "Plurse helps small businesses manage money, track inventory, and grow with intelligent insights for pricing, sales, and customer satisfaction.",
  keywords: [
    "small business",
    "inventory management",
    "AI pricing",
    "business growth",
    "Plurse",
  ],
  authors: [{ name: "Plurse Team", url: "https://www.linkedin.com/company/plurse" }],
  openGraph: {
    title: "Plurse – Helping Small Businesses Grow",
    description:
      "Manage money, track inventory, and optimize pricing with Plurse.",
    url: "https://plurse.com",
    siteName: "Plurse",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Plurse Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Plurse – Helping Small Businesses Grow",
    description:
      "Intelligent business tools for money management, inventory, and growth.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://plurse.com",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL("https://plurse.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>
          <WaitlistModalProvider>
            {children}
          </WaitlistModalProvider>
        </main>
        <Footer />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Plurse",
              url: "https://plurse.com",
              logo: "https://plurse.com/logo.png",
              sameAs: ["https://www.linkedin.com/company/plurse"],
            }),
          }}
        />

      </body>
    </html>
  );
}
