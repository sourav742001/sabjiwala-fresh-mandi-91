declare global {
  interface Window {
    gtag?: (...args) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-GXW85EMBFP";

export const pageview = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};
