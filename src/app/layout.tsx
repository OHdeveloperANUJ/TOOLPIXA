import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import AmazonGlobalRouter from '@/components/AmazonGlobalRouter';
import { CurrencyProvider } from "@/components/CurrencyProvider";
import Script from "next/script";
import "./globals.css";
import PwaRegistry from "@/components/PwaRegistry";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from '@vercel/analytics/next';

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

export const metadata: Metadata = {
  title: "ToolPixa | 600+ Precision Calculators & Tools",
  description: "Instant. No Signups. Engineered for Precision. Every tool you'll ever need, delivered in a refined glass-grade interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F172A" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID" crossOrigin="anonymous" strategy="afterInteractive" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body className="min-h-full w-full flex flex-col font-body-md text-on-background selection:bg-primary/30">
        <PwaRegistry />
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <CurrencyProvider>
            <AmazonGlobalRouter />
              <Header />
              <div className="flex-1 w-full flex flex-col">
                {children}
              </div>
              <Footer />
            </CurrencyProvider>
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
