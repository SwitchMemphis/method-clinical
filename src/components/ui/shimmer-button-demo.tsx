"use client";

import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function ShimmerButtonDemo() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-8">
      <ShimmerButton onClick={() => window.alert("Hello from Shimmer Button!")}>
        Contact Us
      </ShimmerButton>
    </div>
  );
}
