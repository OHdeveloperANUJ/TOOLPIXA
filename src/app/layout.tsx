import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import AmazonGlobalRouter from '@/components/AmazonGlobalRouter';
import { CurrencyProvider } from "@/components/CurrencyProvider";
import "./globals.css";
import PwaRegistry from "@/components/PwaRegistry";
import OfflineBanner from "@/components/OfflineBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = 'https://www.toolpixa.space';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ToolPixa — 115+ Free Precision Calculators & Tools",
    template: "%s | ToolPixa",
  },
  description:
    "Free online calculators and utility tools for finance, loans, SIP, taxes, health, students, developers, PDF, and image compression. Instant client-side precision with no sign-ups.",
  keywords: [
    "online calculators",
    "EMI calculator",
    "SIP calculator",
    "home loan calculator",
    "income tax calculator",
    "BMI calculator",
    "CGPA to percentage",
    "PDF compressor",
    "image size reducer",
    "developer tools",
    "ToolPixa",
  ],
  authors: [{ name: "ToolPixa Editorial & Engineering Team", url: siteUrl }],
  creator: "ToolPixa",
  publisher: "ToolPixa",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ToolPixa",
    title: "ToolPixa — 115+ Free Precision Calculators & Tools",
    description:
      "Free online calculators and utility tools for finance, loans, SIP, taxes, health, students, developers, PDF, and image compression. Instant client-side precision with no sign-ups.",
    images: [
      {
        url: "/assets/sip_vs_lumpsum_cover.png",
        width: 1200,
        height: 630,
        alt: "ToolPixa — 115+ Free Precision Calculators & Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolPixa — 115+ Free Precision Calculators & Tools",
    description:
      "Free online calculators and utility tools for finance, loans, SIP, taxes, health, students, developers, PDF, and image compression. Instant client-side precision with no sign-ups.",
    images: ["/assets/sip_vs_lumpsum_cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "ToolPixa",
        description:
          "115+ Free Online Precision Calculators & Utility Tools for Finance, Health, Students, Developers, PDF & Images.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/categories?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "ToolPixa",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F172A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          id="material-symbols-css"
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
        />
      </head>
      <body className="min-h-full w-full flex flex-col font-body-md text-text-primary bg-background selection:bg-primary/30">
        <PwaRegistry />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <CurrencyProvider>
            <OfflineBanner />
            <AmazonGlobalRouter />
            <Header />
            <div className="flex-1 w-full flex flex-col">
              {children}
            </div>
            <Footer />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
