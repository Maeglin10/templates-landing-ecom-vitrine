"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t p-4 md:p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-foreground space-y-2 flex-1">
        <p>
          Nous utilisons des cookies pour améliorer votre expérience sur notre site, analyser le trafic et personnaliser le contenu. 
          Consultez notre <Link href="/cookies" className="underline font-semibold hover:text-primary">Politique de Cookies</Link> pour en savoir plus ou modifier vos préférences.
        </p>
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <button
          onClick={declineCookies}
          className="flex-1 md:flex-none px-4 py-2 border border-input rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Refuser
        </button>
        <button
          onClick={acceptCookies}
          className="flex-1 md:flex-none px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
