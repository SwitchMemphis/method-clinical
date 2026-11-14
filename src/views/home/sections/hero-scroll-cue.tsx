"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroScrollCue() {
  const [pastTop, setPastTop] = useState(false);

  useEffect(() => {
    const update = () => setPastTop(window.scrollY > 0);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <p
      aria-hidden={pastTop || undefined}
      className={`pointer-events-none absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2 px-5 text-xs font-medium text-foreground-muted transition-opacity duration-200 motion-reduce:transition-none md:bottom-7 ${pastTop ? "opacity-0" : "opacity-100"}`}
    >
      <ArrowDown aria-hidden="true" className="size-3.5 text-accent" />
      Scroll to learn more
    </p>
  );
}
