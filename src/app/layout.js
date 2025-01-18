  import { Geist, Geist_Mono } from "next/font/google";
  import Head from "next/head";

  import AnalyticsTracker from "../components/AnalyticsTracker";

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
    return (
      <html lang="en">
        <head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-0HMGVSYBXD"
          ></script>
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
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          id="root"
        >
          <AnalyticsTracker />
          {children}
        </body>
      </html>
    );
  }
