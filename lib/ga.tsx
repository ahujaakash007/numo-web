'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Fire a named GA4 event. No-op until NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
export function gaEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;
  (window as any).gtag('event', name, params || {});
}

// App Router is a SPA — gtag won't auto-track client navigations, so we send a
// page_view on every pathname change. This is what powers GA4's step-by-step
// Funnel Exploration (each route = a funnel step).
function GAPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined' || !(window as any).gtag) return;
    const qs = searchParams?.toString();
    const path = qs ? `${pathname}?${qs}` : pathname;
    (window as any).gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);
  return null;
}

export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GAPageViews />
      </Suspense>
    </>
  );
}
