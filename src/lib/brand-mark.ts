import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The approved Method Clinical Flow symbol, isolated from flow-logo.png by an
 * SVG viewport. The embedded original pixels are unchanged. The alpha mask
 * lets generated metadata images use a brand color without redrawing the logo.
 * Server-only consumers: icon and apple-icon routes.
 */
const flowMarkSvg = readFileSync(
  join(process.cwd(), "public/assets/flow-mark.svg"),
  "utf8",
);

export const brandMarkDataUri = (fill: string): string => {
  const svg = flowMarkSvg.replace('fill="currentColor"', `fill="${fill}"`);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};
