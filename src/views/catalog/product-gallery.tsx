"use client";

import Image from "next/image";
import { useProductStrength } from "./product-options";

export function ProductGallery({ productName, images }: { productName: string; images: readonly string[] }) {
  const { strengths, selectedIndex, setSelectedIndex } = useProductStrength();
  const hasVariantImages = images.length === strengths.length;
  const selected = hasVariantImages ? selectedIndex : 0;
  const strength = hasVariantImages && strengths[selected] !== "Not specified" ? strengths[selected] : "";

  return (
    <figure className="flex min-w-0 flex-col justify-center rounded-card border border-border-subtle bg-surface-section-deep p-5 md:p-8">
      <Image
        src={images[selected]}
        alt={[productName, strength, "Mint Clinical packaging mockup"].filter(Boolean).join(" · ")}
        width={640}
        height={640}
        className="mx-auto aspect-square w-full max-w-sm object-contain"
        priority
      />
      {hasVariantImages && images.length > 1 && (
        <div role="group" aria-label="Packaging by strength" className="mt-4 flex flex-wrap justify-center gap-2">
          {images.map((src, index) => (
            <button
              type="button"
              key={src}
              aria-label={`View ${strengths[index]} packaging`}
              aria-pressed={index === selected}
              onClick={() => setSelectedIndex(index)}
              className="size-14 cursor-pointer overflow-hidden rounded-panel border border-border-subtle bg-surface-section aria-pressed:border-accent"
            >
              <Image src={src} alt="" width={56} height={56} className="size-full object-contain" />
            </button>
          ))}
        </div>
      )}
      <figcaption className="mt-4 text-center text-sm text-foreground-muted">Mint Clinical packaging mockup</figcaption>
    </figure>
  );
}
