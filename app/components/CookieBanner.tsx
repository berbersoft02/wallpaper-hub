"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const accepted = localStorage.getItem("cookieConsent");
    if (!accepted) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-bg/95 backdrop-blur-md border-t-2 border-neon-cyan p-4 z-[100] shadow-[0_-4px_20px_rgba(5,217,232,0.2)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-300 text-sm md:text-base text-center md:text-left">
          <p>
            We use cookies to improve your experience and display personalized ads. 
            By using our site, you agree to our{" "}
            <Link href="/privacy" className="text-neon-cyan hover:text-neon-pink underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-neon-cyan hover:text-neon-pink underline">
              Terms of Service
            </Link>.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={acceptCookies}
            className="font-pixel px-6 py-2 bg-neon-cyan text-dark-bg hover:bg-white transition-all rounded shadow-[0_0_12px_rgba(5,217,232,0.5)] whitespace-nowrap"
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  );
}
