import type { Metadata, Viewport } from "next";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { LazyCookie } from "@/components/common/Cookie";
import { CONSENT_FLAG_SCRIPT } from "@/components/common/Cookie/consent-flag";
import { AdaptiveGrid } from "@/components/common/grid";
import { PreloadProvider, Preloader } from "@/components/common/preloader";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { ScrollLayout } from "@/layouts/scroll-layout";

import { SiteFooter } from "@/components/common/footer/site-footer";
import "@/app/globals.css";

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `data-consent` is set on <html> by CONSENT_FLAG_SCRIPT before hydration.
    <html suppressHydrationWarning lang="en">
      <body className="font-sans">
        {/* Before anything is parsed: marks a returning visitor's choice so the
            server-rendered consent banner is hidden before its first paint. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_FLAG_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        {/* The provider wraps everything so any subtree can wait for the
            curtain; the page itself still renders underneath it from the first
            byte, which is what keeps the document crawlable. */}
        <PreloadProvider>
          <Preloader />
          <ScrollLayout>
            <AdaptiveGrid />
            <ReducedMotion />
            <LazyCookie />
            {children}
            <SiteFooter />
          </ScrollLayout>
        </PreloadProvider>
      </body>
    </html>
  );
}
