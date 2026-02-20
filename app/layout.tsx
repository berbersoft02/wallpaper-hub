import type { Metadata } from "next";
import { VT323, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";

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
    default: "Only_dias Ocean | Premium 4K Anime Wallpapers",
    template: "%s | Only_dias Ocean"
  },
  description: "Download high-quality 4K upscaled anime wallpapers, matching icons, and PFPs. Hand-picked collections for mobile and desktop.",
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
      </head>
      <body
        className={`${pixelFont.variable} ${bodyFont.variable} antialiased bg-gray-950 text-white font-body`}
      >
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
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
