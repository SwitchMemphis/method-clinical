"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(width < 64rem) and (prefers-reduced-motion: no-preference)");
    let visible = false;
    function updatePlayback() {
      if (!video) return;
      if (visible && motion.matches && !document.hidden) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(video);
    motion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className="absolute inset-0 hidden size-full object-cover motion-safe:max-lg:block"
      loop
      muted
      playsInline
      preload="none"
    >
      <source src="/assets/mobile-hero-helix.4k.3d8606b9.mp4" type="video/mp4" media="(width < 64rem) and (prefers-reduced-motion: no-preference)" />
    </video>
  );
}
