import { SiteHeader } from "@/components/common/header/site-header";
import { RobotPreload } from "@/components/common/preloader";
import { RobotProvider, RobotView } from "@/components/common/robot-view";
import {
  HEADER_CTA,
  HERO_CONTENT,
  SITE_NAV,
  TEAM_CONTENT,
  SOURCING_CONTENT,
} from "@/data/mocks/home";

import { ClinicGrowth } from "./sections/clinic-growth";
import { Hero } from "./sections/hero";
import { OpeningDna } from "./sections/opening-dna";
import { Sourcing } from "./sections/sourcing";
import { Testing } from "./sections/testing";
import { TESTING_CONTENT } from "@/data/mocks/testing";
import { CLINIC_GROWTH_CONTENT } from "@/data/mocks/clinic-growth";

/**
 * Home view — a Server Component assembling the Dantora landing page.
 *
 * Sections run in Figma order and take their copy through props from
 * `src/data/mocks/home.ts`, so nothing is hardcoded in a component.
 *
 */
/**
 * `robot`: the proxy's robot form (D-016) — the same sections at rest: the
 * layout's curtain hidden from the first paint (the style below — it lives in
 * the root layout, outside this tree), the preload context already done, no
 * WebGL scene.
 */
export const HomeView = ({ robot = false }: { robot?: boolean }) => {
  const page = (
    <>
      <SiteHeader
        navLinks={SITE_NAV}
        cta={HEADER_CTA}
        socials={TEAM_CONTENT.socials}
      />
      <main>
        <div className="relative isolate overflow-clip bg-surface-section">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block [&:has([data-scene-unavailable])]:mix-blend-screen">
            <div className="sticky top-0 h-lvh">
              <div className="absolute inset-y-0 left-[22.5625rem] w-[71.25rem] [mask-image:linear-gradient(to_bottom,black_76%,transparent)]">
                <OpeningDna />
              </div>
            </div>
          </div>
          <Hero content={HERO_CONTENT} />
          <Sourcing content={SOURCING_CONTENT} />
        </div>
        <Testing content={TESTING_CONTENT} />
        <ClinicGrowth content={CLINIC_GROWTH_CONTENT} />
      </main>
    </>
  );
  if (!robot) return page;
  return (
    <RobotProvider robot>
      <RobotView />
      <style>{"[data-preloader]{display:none!important}"}</style>
      <RobotPreload>{page}</RobotPreload>
    </RobotProvider>
  );
};

