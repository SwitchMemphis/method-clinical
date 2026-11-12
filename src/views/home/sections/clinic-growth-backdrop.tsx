import { LazyDnaInk } from "@/components/scene/dna-ink";

export function ClinicGrowthBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_84%,transparent)]">
      <div className="absolute inset-0 bg-[url('/assets/helix-scene-poster.webp')] bg-cover bg-center opacity-45 lg:inset-x-auto lg:left-1/2 lg:aspect-[12/13] lg:h-full lg:max-w-full lg:-translate-x-1/2 lg:opacity-65 lg:[mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]" />
      <div className="absolute inset-y-0 left-1/2 hidden w-[71.125rem] -translate-x-1/2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-safe:lg:block">
        <LazyDnaInk className="block size-full" controls={false} />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-surface-section/75 via-surface-section/20 to-surface-section/75" />
    </div>
  );
}
