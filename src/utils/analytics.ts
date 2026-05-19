// Google Analytics event tracking

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackPromoCopy(company: string, code: string, category: string) {
  trackEvent('promo_copy', {
    company,
    promo_code: code,
    category,
  });
}

export function trackCategoryView(category: string) {
  trackEvent('category_view', { category });
}
