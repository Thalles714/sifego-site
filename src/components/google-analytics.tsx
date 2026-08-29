"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: unknown[][];
    gtag: (...args: unknown[]) => void;
  }
}

type GoogleAnalyticsProps = {
  measurementId: string;
};

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[data-analytics-event="whatsapp_click"]',
      );

      if (!link || typeof window.gtag !== "function") return;

      window.gtag("event", "whatsapp_click", {
        cta_location: link.dataset.ctaLocation ?? "unknown",
        link_url: link.href,
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="sifego-google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
