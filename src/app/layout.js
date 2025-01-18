"use client"

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FurniSure Rentals",
};

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Hook to get the current path

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      // Send page view when the route changes
      window.gtag("config", "G-0HMGVSYBXD", {
        page_path: pathname,
      });

      // Optionally push custom event to the dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "page_view",
          page_path: pathname,
        });
      }
    }
  }, [pathname]); // Re-run effect when pathname changes

  return (
    <html lang="en">
      <Head>
        {/* Meta tags */}
        <meta name="theme-color" content="#ffffff" />

        {/* Google Analytics Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0HMGVSYBXD"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0HMGVSYBXD');
            `,
          }}
        />
      </Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        id="root"
      >
        {children}
      </body>
    </html>
  );
}
