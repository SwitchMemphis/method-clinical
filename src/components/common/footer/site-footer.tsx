import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FOOTER_CONTENT as content } from "@/data/mocks/footer";

const linkClass = "inline-flex min-h-utility-target items-center gap-2 text-footer-copy lg:pointer-fine:min-h-footer-link text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative z-10 border-t border-border-subtle bg-background text-foreground">
      <div className="mx-auto grid max-w-utility-content gap-6 px-utility-gutter py-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-8">
        <div className="flex flex-col items-start gap-3">
          <Link href="/" aria-label="Mint Clinical home" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <Image src="/assets/mint-clinical-wordmark-accent.png" alt="Mint Clinical" width={548} height={175} className="h-auto w-utility-logo-compact" />
          </Link>
          <p className="max-w-xs text-footer-copy leading-relaxed text-foreground-muted">{content.descriptor}</p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-utility-label font-semibold tracking-widest text-accent uppercase">{content.shippingTitle}</h2>
          <p className="text-footer-copy leading-relaxed text-foreground-muted">{content.shipping}</p>
          <Link href="/policies/#shipping" className={linkClass}>Shipping information <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <nav aria-label="Footer contact" className="flex flex-col items-start gap-3">
          <h2 className="text-utility-label font-semibold tracking-widest text-accent uppercase">{content.contactTitle}</h2>
          <p className="text-footer-copy leading-relaxed text-foreground-muted">{content.contact}</p>
          <div className="flex flex-col items-start">
            {content.contactLinks.map(link => <Link key={link.href} href={link.href} className={linkClass}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}
          </div>
        </nav>
        <nav aria-label="Footer legal and resources" className="flex flex-col items-start gap-3">
          <h2 className="text-utility-label font-semibold tracking-widest text-accent uppercase">{content.legalTitle}</h2>
          <div className="flex flex-col items-start">
            {content.legalLinks.map(link => <Link key={link.href} href={link.href} className={linkClass}>{link.label}</Link>)}
          </div>
        </nav>
      </div>
      <div className="border-y border-border-subtle bg-surface-section-deep px-utility-gutter py-5 text-center text-utility-body font-semibold tracking-wide text-accent">
        {content.promise}
      </div>
      <div className="mx-auto flex max-w-utility-content flex-col gap-6 px-utility-gutter py-8">
        <p className="max-w-4xl text-utility-small leading-relaxed text-foreground-muted">
          <strong className="font-semibold text-foreground">{content.noticeTitle}</strong>{" "}
          {content.notice} {content.purchaseNotice}{" "}
          <Link href={content.terms.href} className="underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{content.terms.label}</Link>.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 text-utility-small text-foreground-muted">
          <p className="flex flex-wrap gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} Mint Clinical</span>
            {content.contactPlaceholders.map(placeholder => (
              <span key={placeholder}><span aria-hidden="true">·</span> {placeholder}</span>
            ))}
          </p>
          <p>{content.preview}</p>
        </div>
      </div>
    </footer>
  );
}
