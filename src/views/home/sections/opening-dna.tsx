"use client";

import { useSyncExternalStore } from "react";
import { LazyDnaInk } from "@/components/scene/dna-ink";

const desktop = () => window.matchMedia("(min-width: 64rem)");
const getSnapshot = () => desktop().matches;
const getServerSnapshot = () => null;

function subscribe(listener: () => void) {
  const media = desktop();
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

export function OpeningDna() {
  const isDesktop = useSyncExternalStore<boolean | null>(subscribe, getSnapshot, getServerSnapshot);
  if (!isDesktop) return null;
  return <LazyDnaInk className="block size-full" gatesPreload />;
}
