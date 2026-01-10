import type { Metadata } from "next";
import { VT323, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
  title: "Only_dias Ocean",
  description: "Exclusive Anime and Pixel Art Wallpapers for your devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7463641924793744"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${pixelFont.variable} ${bodyFont.variable} antialiased bg-gray-950 text-white font-body`}
      >
        {children}
      </body>
    </html>
  );
}
