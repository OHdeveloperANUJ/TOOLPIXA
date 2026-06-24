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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          id="material-symbols-css"
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=123,account_balance,account_balance_wallet,add,analytics,arrow_back,arrow_forward,article,aspect_ratio,auto_stories,bolt,briefcase,broken_image,build,calculate,check,check_circle,chevron_right,close,code,compare,compress,cookie,crop,dark_mode,data_object,delete_forever,description,device_thermostat,directions_car,dns,domain,edit_document,encrypted,event,expand_more,favorite,fitness_center,format_list_bulleted,format_list_numbered,gavel,grid_view,health_and_safety,history,home,home_max,home_work,image,indian_rupee,info,ios_share,keyboard_arrow_down,light_mode,link,mail,menu,menu_book,monitor_heart,monitoring,movie,open_in_new,park,payments,percent,person,photo_library,photo_size_select_large,picture_as_pdf,public,qr_code,receipt,receipt_long,rotate_right,savings,scale,schedule,school,science,search,search_off,security,sell,set_meal,share,shopping_bag,speed,star,straighten,swap_calls,swap_horiz,sync_alt,timer,trending_down,trending_up,two_wheeler,verified,verified_user,view_list,warning,water_drop,youtube&display=swap" 
          media="print"
        />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var link = document.getElementById('material-symbols-css');
            if (link) {
              link.addEventListener('load', function() { link.media = 'all'; });
              if (link.sheet) link.media = 'all';
            }
          })();
        ` }} />
      </head>
      <body className="min-h-full w-full flex flex-col font-body-md text-on-background selection:bg-primary/30">
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
