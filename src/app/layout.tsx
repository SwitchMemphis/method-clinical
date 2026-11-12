import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex } from "next/font/google";

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

/**
 * Google Sans Flex — the Figma design's only typeface.
 *
 * A variable font: one file covers the whole 100–1000 weight range, so the
 * design's Light (300) and Medium (500) cost nothing extra. The weight axis
 * alone: the mockup pins `GRAD 0, ROND 0` and the normal width, which are the
 * axes' defaults — exactly what the weight-only file renders. Requesting
 * `GRAD`/`ROND`/`wdth` too made the preloaded face 267 KB, competing with the
 * hero for the first seconds of a phone's bandwidth (optimize-load §LCP).
 */
const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={`${googleSansFlex.variable} font-sans`}>
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
