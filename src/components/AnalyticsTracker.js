"use client"; // Indicating this is client-side code

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname(); // Hook to get the current route path

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      // Send page view to Google Analytics whenever the route changes
      window.gtag("config", "G-0HMGVSYBXD", {
        page_path: pathname,
        page_title:"Fjurnisujrurodjdjk"
      });

      // Optionally, send custom data to the dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "page_view",
          page_path: pathname,
          page_title:"Fjurnisujrurodjdjk"
        });
      }
    }
  }, [pathname]); // Trigger whenever pathname changes (route changes)

  return null; // This component does not render anything visually
}
