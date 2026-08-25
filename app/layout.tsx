import type { Metadata, Viewport } from "next";
import { VT323, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import PageTransition from "./components/PageTransition";
import GlowSync from "./components/GlowSync";

const pixelFont = VT323({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#05d9e8",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://saidahriken.site'),
  title: {
    default: "Only_Gohan Ocean | Ultra HD 4K Anime Wallpapers & Digital Assets",
    template: "%s | Only_Gohan Ocean"
  },
  description: "Explore a curated collection of premium 4K upscaled anime wallpapers, matching social media icons, and PFPs. Our hand-picked gallery features high-resolution digital art for mobile and desktop, enhanced with AI upscaling for maximum clarity.",
  keywords: ["4K Anime Wallpapers", "High Resolution Anime Art", "AI Upscaled Wallpapers", "Anime PFPs", "Anime Discord Icons", "Desktop Backgrounds", "Mobile Anime Wallpapers", "Digital Art Gallery"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saidahriken.site',
    siteName: 'Only_Gohan Ocean',
    title: 'Only_Gohan Ocean | Ultra HD 4K Anime Wallpapers & Digital Assets',
    description: 'Explore a curated collection of premium 4K upscaled anime wallpapers, matching social media icons, and PFPs.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Only_Gohan Ocean - 4K Anime Wallpapers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SaidAhrikenchi2',
    creator: '@SaidAhrikenchi2',
    title: 'Only_Gohan Ocean | Ultra HD 4K Anime Wallpapers',
    description: 'Explore a curated collection of premium 4K upscaled anime wallpapers, matching social media icons, and PFPs.',
    images: ['/og-image.jpg'],
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Only_Gohan Ocean",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/icon.webp",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: 'Only_Gohan Ocean',
                  url: 'https://saidahriken.site',
                  description:
                    'Curated 4K upscaled anime wallpapers, social media icons, and PFPs.',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://saidahriken.site/?search={search_term_string}',
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'Person',
                  name: 'GOHAN',
                  url: 'https://saidahriken.site/about',
                  sameAs: [
                    'https://x.com/SaidAhrikenchi2',
                    'https://www.tiktok.com/@noxzx_kb',
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${pixelFont.variable} ${bodyFont.variable} antialiased bg-gray-950 text-white font-body`}
      >
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-neon-cyan focus:text-black focus:font-pixel focus:rounded-lg focus:shadow-[0_0_30px_rgba(5,217,232,0.8)]"
        >
          Skip to main content
        </a>
        <GlowSync />
        {/* Global CRT Scanline Overlay */}
        <div className="crt-overlay" aria-hidden="true" />

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