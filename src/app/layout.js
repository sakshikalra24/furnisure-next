// app/layout.js (Client-Side)

import AnalyticsTracker from "../components/AnalyticsTracker"; // Import the Analytics Tracker

export default function RootLayout({ children }) {
  return (
    <>
      {/* Google Analytics Script */}
      <Head>
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

      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          id="root"
        >
          {/* Include the AnalyticsTracker to track page views on route change */}
          <AnalyticsTracker />
          {children}
        </body>
      </html>
    </>
  );
}
