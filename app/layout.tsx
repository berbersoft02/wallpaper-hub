import type { Metadata } from "next";
import { VT323, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import PageTransition from "./components/PageTransition";

const pixelFont = VT323({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://saidahriken.site'),
  title: {
    default: "Only_dias Ocean | Ultra HD 4K Anime Wallpapers & Digital Assets",
    template: "%s | Only_dias Ocean"
  },
  description: "Explore a curated collection of premium 4K upscaled anime wallpapers, matching social media icons, and PFPs. Our hand-picked gallery features high-resolution digital art for mobile and desktop, enhanced with AI upscaling for maximum clarity.",
  keywords: ["4K Anime Wallpapers", "High Resolution Anime Art", "AI Upscaled Wallpapers", "Anime PFPs", "Anime Discord Icons", "Desktop Backgrounds", "Mobile Anime Wallpapers", "Digital Art Gallery"],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-7463641924793744",
  },
  verification: {
    other: {
      "google-adsense-account": ["ca-pub-7463641924793744"],
      "p:domain_verify": ["44ba79e2f07c396861d8b93e40cbcd81"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7463641924793744" />
        <script src="https://pl29025161.profitablecpmratenetwork.com/e5/01/87/e50187535e5220ba9c70d0dfb512b73b.js" async></script>
      </head>
      <body
        className={`${pixelFont.variable} ${bodyFont.variable} antialiased bg-gray-950 text-white font-body`}
      >
        {/* Global CRT Scanline Overlay */}
        <div className="crt-overlay" />

        {/* Google Funding Choices (Consent Management) */}
        <Script
          id="google-funding-choices"
          async
          src="https://fundingchoicesmessages.google.com/i/pub-7463641924793744?ers=1"
          strategy="beforeInteractive"
        />
        <Script
          id="google-fc-present"
          strategy="beforeInteractive"
        >
          {`(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`}
        </Script>
        
        {/* Google AdSense Script */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7463641924793744"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CRV860CNKL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CRV860CNKL');
          `}
        </Script>
        
        <PageTransition>
          {children}
        </PageTransition>
        
        <CookieBanner />

        {/* SVG Filter for Pixelated Loading */}
        <svg className="hidden">
          <filter id="pixelate" x="0" y="0">
            <feFlood x="4" y="4" height="2" width="2" />
            <feComposite width="10" height="10" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="5" />
          </filter>
        </svg>
      </body>
    </html>
  );
}