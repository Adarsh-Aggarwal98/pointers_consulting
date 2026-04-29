import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  function gtag(...args: unknown[]): void;
}

export function usePageTracking() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof gtag !== "function") return;
    gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
}
