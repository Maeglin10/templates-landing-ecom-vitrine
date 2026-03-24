export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const trackEvent = (event: AnalyticsEvent): void => {
  // Google Analytics
  if (GA_ID && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.name, event.properties || {});
  }

  // Meta Pixel
  if (PIXEL_ID && typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', event.name, event.properties || {});
  }

  // Log all events
  console.log('[Analytics]', event.name, event.properties);
};

export const trackPageView = (path: string): void => {
  trackEvent({
    name: 'page_view',
    properties: { path },
  });
};

export const trackCustomEvent = (
  eventName: string,
  properties?: Record<string, any>
): void => {
  trackEvent({
    name: eventName,
    properties,
  });
};
