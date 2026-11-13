import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "./blogs-3.module.css";

type ArticleMetadata = {
  date: string;
  readTime: number;
};

export function ArticleByline({ date, readTime }: ArticleMetadata) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-utility-small leading-snug text-foreground-muted">
      <span>by The Mint Team</span>
      <span className="whitespace-nowrap">
        <span aria-hidden="true">• </span>
        <time dateTime={date}>{date}</time>
      </span>
      <span className="whitespace-nowrap">
        <span aria-hidden="true">• </span>
        {readTime} min read
      </span>
    </p>
  );
}

type BlogCard = ArticleMetadata & {
  category: string;
  title: string;
  summary: string;
  href: string;
  image: string;
};

export function BlogsSection({ articles }: { articles: readonly BlogCard[] }) {
  return (
    <ul role="list" className={`${styles.grid} grid border-t border-border-subtle md:grid-cols-2 xl:grid-cols-3`}>
      {articles.map(({ category, title, summary, href, image, date, readTime }) => (
        <li key={href} className="min-w-0">
          <Link
            href={href}
            className={`${styles.card} group grid rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
          >
            <div className={`${styles.thumbnail} relative overflow-hidden rounded-card bg-surface-section-deep`}>
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 380px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 40px)"
              />
            </div>
            <div className={`${styles.copy} grid`}>
              <ArticleByline date={date} readTime={readTime} />
              <p className="text-utility-small font-semibold text-accent">{category}</p>
              <h2 className={`${styles.title} font-bold tracking-tight group-hover:underline group-focus-visible:underline`}>{title}</h2>
              <p className={`${styles.summary} text-utility-body text-pretty text-foreground-muted`}>{summary}</p>
            </div>
            <span aria-hidden="true" className={`${styles.action} inline-flex items-center gap-2 text-utility-small font-semibold text-accent`}>
              Read guide <ArrowUpRight size={16} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
