import Link from "next/link";
import { POLICIES_CONTENT as content } from "@/data/mocks/policies";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";

export const policiesMetadata = generateMetadata({ title: "Policies & information | Mint Clinical", description: content.intro, url: "/policies/" });
export function PoliciesView() {
  return <main className="mx-auto flex max-w-policy-content flex-col gap-10 px-utility-gutter py-utility-section text-utility-body">
    <Link href="/" className="inline-flex min-h-utility-target items-center text-accent underline underline-offset-4">← Mint Clinical</Link>
    <header className="flex flex-col gap-6"><h1 className="text-registration-title font-bold leading-display">{content.title}</h1><p className="leading-relaxed text-foreground-muted">{content.intro}</p><p className="rounded-panel border border-border-subtle p-5 text-utility-small leading-relaxed text-foreground-muted">{content.notice}</p></header>
    <nav aria-label="Policies" className="flex flex-wrap gap-x-5 gap-y-3">
      {content.sections.map(({ id, title }) => (
        <Link key={id} href={`#${id}`} className="text-accent underline underline-offset-4">{title}</Link>
      ))}
      <Link href="/privacy-policy/" className="text-accent underline underline-offset-4">Privacy notice</Link>
    </nav>
    {content.sections.map(({ id, title, topics }) => (
      <section key={id} id={id} className="flex scroll-mt-10 flex-col gap-6 border-t border-border-subtle pt-8">
        <h2 className="text-utility-section-title font-semibold text-accent">{title}</h2>
        {topics.map(({ heading, body }) => (
          <div key={heading} className="flex flex-col gap-2">
            <h3 className="font-semibold">{heading}</h3>
            <p className="leading-relaxed text-foreground-muted">{body}</p>
          </div>
        ))}
      </section>
    ))}
  </main>;
}
