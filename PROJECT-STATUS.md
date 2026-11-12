## 2026-11-12 — Testing standards page
The homepage button now targets /testing-standards/. The page includes the supplied release standards, origin and fulfillment steps, all seven tests, and all six quality-process steps. The two original brand references were changed to Method Clinical at the owner's direction. The owner-supplied statements are preview copy and were not independently substantiated.

Lint, TypeScript, production export, and an exported copy and link check passed. Chromium opened the page from the homepage CTA, rendered it at desktop width, and confirmed mobile reflow at 320 and 390 pixels without horizontal overflow.

## 2026-11-12 — Sourcing card copy
Updated the FDA Listed Facilities card with the supplied 503B outsourcing facility sourcing statement.

## 2026-11-12 — Smooth mint buttons
Lint, TypeScript, and the production export passed. The exported homepage uses the same smooth mint gradient on all three buttons.

## 2026-11-12: Registration header proportions
Chromium verified the 160 px wordmark, 24 px desktop and 22 px phone headings, and 12 px supporting copy at 1363 × 936 and 390 × 800. NPI fit in both opening views. Lint, TypeScript, and production export passed.

## 2026-11-12: On-site wholesale pricing form
The hero pricing CTA now targets the on-site placeholder. It has four editable fields and a disabled submit button. The site privacy notice describes the preview behavior. Lint, TypeScript, production export, and exported form and CTA checks passed.

## 2026-11-12 — Brushed mint buttons
Lint, TypeScript, and the production export passed. The exported homepage applies the shared brushed gradient to all three buttons.

## 2026-11-12: Registration screenshot fit
Chromium measured the centered desktop card at 560 px in a 1536 × 810 frame, with Website above the visible NPI field near the fold. At 390 × 800, the full NPI field fit and the page had no horizontal overflow. Both widths showed the full-width review button above the note. Lint, TypeScript, and production export passed.

## 2026-11-12 — Sign in button texture
Lint, TypeScript, and the production export passed. The exported homepage applies the same gradient to Sign in and both hero links. Sign in resolves to the exported login page.

## 2026-11-12: Registration form ending
Lint, TypeScript, and production export passed. Exported markup confirmed a full-width mint submit button above the centered preview note.

## 2026-11-12 — Hero button texture
Lint, TypeScript, and the production export passed. The exported homepage includes the mint gradient on both hero links and retains the pricing form and testing anchor destinations.

## 2026-11-12: Wholesale pricing inquiries
The homepage pricing button links to https://tally.so/r/o9e501. Responses are stored in the form’s Tally Submissions view. The privacy notice covers this collection. Lint, TypeScript, production export, and exported links passed. Chrome verified the published fields and blank-form validation. A completed production submission was not sent during QA.

## 2026-11-12: NPI visible on opening
Chromium measured the NPI input bottom at 559 px in a 1120 × 590 frame and 736 px in a 390 × 800 frame, both at zero scroll. It confirmed the 44 px control height, Website below NPI, paired names, and mint review button. Lint, TypeScript, and production export passed.

## 2026-11-12: Mint registration review button
Lint, TypeScript, and production export passed. The exported registration submit button uses the same mint, dark label, and outline classes as the catalog action.

## 2026-11-12: Registration review button
Chromium verified the outlined submit button on desktop and at 390 px, including its 48 px minimum height. Enter triggered native required-field validation and opened the local application preview once the sample form was complete. Lint, TypeScript, and the production export passed.

## 2026-11-12: Hero button shimmer trial
Integrated the shimmer on top of the centered registration release. Production export, TypeScript, lint, and static checks for both hero destinations passed. The managed preview URL refused the browser connection.

## 2026-11-12: Centered registration form
Chromium confirmed that the title and 560 px card share a center line at 1363 px. The name fields share one row and the phone is wider than the suffix. At 390 px, fields stack without horizontal overflow. Both widths retain 44 px input targets. Lint, TypeScript, and the production export passed.

## 2026-11-12: Registration page proportions
Built and linted the production export. Chromium at 1363 × 936 showed the contact and business profile sections in the opening viewport. At a 390 px frame width, the fields stacked without horizontal overflow. The first input measured 44 px high in both checks.

## 2026-11-11: Closed mobile vial
Removed the mobile scroll trigger. Chromium verified that the 390-pixel card stays closed after scrolling and selecting a test, and that the desktop hover still lifts the cap. Production export and TypeScript passed. Lint reported one existing warning.

## 2026-11-11: Hero button motion and vial backdrop
The two hero actions use color feedback and a small press response with stationary labels. The testing vial uses the new emerald studio WebP. Chromium verified hover color, stationary copy, keyboard focus, the studio image, desktop card motion, and the 390-pixel cap lift. Production export and TypeScript passed. Lint reported one existing warning.

## 2026-11-11: Testing section proportions
Balanced the desktop column widths, aligned the heading and introduction, and matched the closed test list to the vial card height. Chromium measured both columns at 446.6 pixels high in the desktop preview and confirmed that opening a test does not resize the card. Verified stacking and scroll-triggered vial motion at 390 pixels. Production export and TypeScript passed. Lint reported one existing warning.

## 2026-11-11: Testing section spacing
Moved the existing introduction above the test list on desktop to use the empty right column. Chromium confirmed the intro and list share a left edge, test selection still updates the caption, and the 390-pixel layout stays stacked with its scroll animation. Production export and TypeScript passed. Lint reported one existing warning.

## 2026-11-11: Flow artwork, whole-card tilt, and helix fade
Replaced the rendered vial logo with the approved Flow symbol and wordmark from `public/assets/flow-logo.png`, arranged in the existing stacked label format. The desktop card now tilts as a unit with its slate fixed in place, and the helix below Testing fades into the section surface. The three corrected 4K vial hero exports are in the Method Clinical Vial Heroes folder.

Verified the new vial asset, desktop hover and card transform, stationary slate layer, rendered helix mask, and 390-pixel scroll lift in Chromium. Production export and TypeScript passed. Lint reported one existing warning.

## 2026-11-11: Full-card hover and background motion
Desktop hover now applies to the entire testing figure. The slate and backplate respond to mouse position while the cap is lifted. The cap reseats and the background returns to center on exit. The mobile viewport trigger is unchanged.

Verified desktop header and footer hover, opposite-direction background shifts, reset on exit, the selected-layer caption, and the existing scroll lift at 390 pixels with static background layers. Production export and TypeScript passed. Lint reported one existing warning.

## 2026-11-11: Desktop hover trigger
Changed the testing vial to lift its cap only on mouse hover over the vial on desktop. The fixed silhouette keeps the trigger stable while the cap rises. Mobile retains the original viewport trigger.

Verified the desktop backdrop, vial entry and pointer exit in Chromium, and confirmed the 390-pixel preview opened on scroll. The production export and TypeScript passed. Lint reported one existing warning.

## 2026-11-11: Testing vial animation
Replaced the homepage testing diagram with an on-scroll exploded NAD+ 500 mg vial based on approved label option 02. The three optimized WebP assets in `public/assets/method-testing-*.webp` provide a separate cap, an uncapped vial, and the foreground cropped from the Green Slate hero. The seven native disclosure rows and their content are retained.

Verification: production export and TypeScript passed. Lint passed with one existing warning. In Chromium, confirmed the cap moves from seated to visibly separated, the glass mouth and base fit at desktop and 390-pixel widths, and selecting Mass spectrometry updates the figure caption and number. Reduced-motion behavior uses the existing spring preference; it was not tested with an OS preference change.

## 2026-11-10: Menu order
Catalog moved to 02 and FAQs to 03. The production build, changed-file lint, and checks for menu order and exported destinations passed.

## 2026-11-10: Standalone FAQ and registration-first menu
Added /faq/ with all eight existing disclosures and removed the accordion from the homepage. The main menu opens the new route and lists Register your clinic first. Production export, TypeScript, lint with one existing warning, and static checks passed.

## 2026-11-09: Longer mobile helix loop
Extended the native 2252 × 3840 mobile loop from 11.75 seconds to 22 seconds. Compared decoded frames across the wrap and checked the change against ordinary frame-to-frame motion.

## 2026-11-09: Native 4K mobile helix
Re-rendered the mobile loop and reduced-motion still at 2252 × 3840 from the particle shaders. Verified both dimensions and compared the new still against the previous portrait crop.

## 2026-11-09: Mobile hero publication follow-up
Version 67 contained the helix, but the live homepage returned the previous vial markup and cached 404 responses for helix media after redeployment. Rebuilt using content-versioned media URLs to avoid those cached misses.

## 2026-11-09: Compact registration form
Verified the form layout at 1200 × 800 and 390px. NPI and state license are visible in the desktop opening. The form remains preview-only.

## 2026-11-09: Mobile helix hero
Base: private version 66. Replaced the mobile vial backdrop with a portrait loop rendered from the desktop particle shaders. Added a still for reduced motion. Build and lint passed with existing warnings.

## 2026-11-08: Homepage hero actions
Base: private version 65. Added both homepage hero links. Chromium verified both destinations and the 390px layout without overflow. Build and lint passed with existing warnings.

## 2026-11-08: Remove hero highlights
Base: private version 64. Removed the four-item hero list and divider.

## 2026-11-08: Compact hero copy width
Base: private version 63. Capped the hero paragraph and highlights width. Chromium verified the copy and highlights share a 512px tablet width, with no overflow at phone, tablet, or desktop widths. Build and lint passed with existing warnings.

## 2026-11-08: Tighter mobile hero
Base: private version 62. Tightened the mobile hero opening. Chromium verified the headline starts 128px from the top at 390px and checked the vial crop. Build and lint passed with existing warnings.

## 2026-11-08: Selected mobile hero
Base: private version 61. Replaced the mobile hero with the selected vial image. Visually checked the vial crop and headline at 390px. Build and lint passed with existing warnings.

## 2026-11-08: Catalog formula formatting and mobile hero
Base: private version 60. Formatted catalog formulas and updated the mobile hero asset. Verified the exported subscripts for both reference examples and product details, blend line breaks, and the 390px mobile hero composition. Build and lint passed with existing warnings.

## 2026-11-08: Compact catalog controls
Base: private version 59. Reduced the sidebar and category pill footprint. Chromium verified wider table, smaller pills, category filtering and no horizontal overflow on desktop and phone layouts. Build and lint passed with existing warnings.

## 2026-11-08: Catalog reference photography
Base: private version 58. Added thumbnails and product photo galleries. Added 128 reference photos across 76 listings and widened the catalog layout. Verified all 128 image files in the export, desktop table width, gallery switching and phone reflow in Chromium. Build and lint passed with existing warnings.

## 2026-11-08: Full catalog reference preview
Base: private version 57. Imported 94 reference rows and added a static detail route for each. Verified all 94 static routes, browser category and search filters, detail navigation, strength selection, analytical disclosure, and phone reflow. Build and lint passed with existing warnings.

## 2026-11-08: Wholesale catalog preview
Base: private version 55. Implemented the /catalog/ preview. Chromium verified search, empty state, filters, sort, keyboard disclosure, and 390px reflow. Build and lint passed with existing warnings. Added the Catalog link to the shared menu. Chromium verified item 05 opens the catalog.

## 2026-11-08: Homepage closing section
Base: private version 54. Moved Clinic Growth after the FAQs, switched its backdrop, and removed the homepage access form. Added Register your clinic to the shared menu. Chromium verified final section order, desktop helix canvas, phone fit and menu-to-registration navigation. Build and lint passed with existing warnings.

## 2026-11-08: Account access options
Base: private version 53. Added login recovery controls and guest-order guidance. Authentication and email delivery are pending. Chromium verified both preview messages and disabled credential entry. Build and lint passed with existing warnings.

## 2026-11-08: Sign-in hero headline
Base: private version 52. Updated the sign-in hero to use a two-line headline. Chromium verified both phrases fit without wrapping or overflow at 1040px and 1280px. Build and lint passed with existing warnings.

## 2026-11-08: Sourcing heading
Base: private version 51. Removed the numbered Sourcing label and its heading offset.

## 2026-11-08: Sign-in hero
Base: private version 50. Replaced the separate login image panel with a full-bleed hero. Chromium verified the image spans the viewport and the card fits without horizontal overflow on desktop and phone. Build and lint passed with existing warnings.

## 2026-11-08: Provider login preview
Base: private version 49. Added the /login/ frontend and updated the header and menu action. Authentication is pending. Chromium verified homepage-to-login, disabled credential fields, phone fit and login-to-registration. Build and lint passed with existing warnings.

## 2026-11-08: Shared header menu
Based on private version 48 plus the approved mobile hero photo. Shared desktop and mobile menu implemented. Chromium verified desktop menu links, Testing navigation, and mobile Escape focus return. Build and lint passed with existing warnings.

## 2026-11-08: Mobile hero photography
Base: private version 48. Added the approved vial photo to the mobile opening. Chromium checked the photo and full-screen fit at 320×568 and 390×844 and verified the photo layer is hidden at 1280×900. Build and lint passed with existing warnings.

## 2026-11-08: Navbar states and mobile highlights
Base: private version 47. Updated the navbar and mobile hero highlights. Chromium verified transparent, compact, and expanded desktop states and the full-screen phone hero with the highlights and working menu. Build and lint passed with existing warnings.

## 2026-11-08: Testing section breathing room
Base: private version 46. Increased the desktop testing section padding. Chromium verified equal top and bottom padding at desktop and phone widths. Build, TypeScript and lint passed with existing warnings.

## 2026-11-08: Full-screen mobile hero
Base: private version 45. Mobile hero now fills the first viewport. Chromium verified the fold and no horizontal overflow at 320×568, 390×844, and 1280×900. Build and lint passed with existing warnings.

## 2026-11-08: Morphing navigation
Base: private version 44. Replaced the split header panels with a shared morphing navigation surface. Chromium verified desktop compaction and expansion and the mobile menu and CTA at 390px. Build and lint passed with existing warnings.

## 2026-11-08: Testing panel spacing
Base: private version 43. Updated the shared expanded testing panel spacing. Removed desktop viewport-height centering above the testing section.

## 2026-11-08: Sourcing card order
Base: private version 43. Reordered the sourcing cards and their matching icons.

## 2026-11-08: Two-line hero headline
Base: private version 42. Chromium verified two headline rows at 390px, 795px and 1280px. Build, TypeScript and lint passed with existing warnings.

## 2026-11-08: Compact Provider Access spacing
Base: private version 41. Verified the numbered label is absent at desktop and compact widths. At 390px and 780px the FAQ-to-heading gap is 81px and the form-to-footer gap is 32px. Verified compact anchor framing and no horizontal overflow. Build, TypeScript, lint and whitespace checks passed with existing warnings.

## 2026-11-08: Desktop-only opening DNA
Base: private version 40. Chromium verified no opening canvas at 390px and the desktop canvas visible at 1280px. Compact hero flows into Sourcing. Build, TypeScript, lint and whitespace checks passed with existing warnings.

## 2026-11-08: Wholesale policy drafts
Base: published balanced FAQ build. Five footer destinations populated as private review drafts. Verified all footer routes and anchors in static export, Terms and Privacy in Chromium, and mobile policy width without overflow. Build, TypeScript, lint and whitespace checks passed with existing warnings. Live ordering details and final legal review remain pending.

## 2026-11-08: Balanced FAQ spacing
Base: version 38. Verified matching 48px edges at 1280px and 390px, native keyboard expansion, build and lint.

## 2026-11-08: FAQ spacing and footer statement
Base: private version 37. Verified 19px from the final FAQ row to Provider Access at desktop and 49px on phone. Keyboard disclosure opens and the section grows with the answer. Verified the exact footer phrase without stars. Production build, TypeScript, lint and whitespace checks passed with existing warnings.

## 2026-11-08: Brighter lab backdrop
Base: private version 36. Visually checked the lighter lab backdrop at 1280px and 390px in Chromium. Production build, TypeScript, lint and whitespace checks passed with existing warnings.

## 2026-11-08: Larger registration card
Base: private version 35. Production export verified in Chromium at 1280px and 390px. Desktop card measures 461×341px, mobile card measures 335×310px, and neither viewport overflows. Mobile registration link opens the form. Build, TypeScript, lint and whitespace checks passed with existing warnings.

## 2026-11-08: Mirrored photo and shorter landing page
Base: private version 34. Mirrored photo and compacted page verified at 1280px and 390px in Chromium. No horizontal overflow. Static HTML audit found no retired section IDs or links across exported pages. Build, TypeScript, lint and whitespace checks passed with existing warnings.

## 2026-11-08: Analytical lab backdrop
Base: private version 33. Implemented approved Clinic Growth direction A. Production export verified in Chromium at 1280px and 390px with no horizontal overflow. Desktop scroll moved the image independently of the content. Phone crop and navigation from the registration CTA to the form verified. Reduced-motion styling is in place. Build, TypeScript, lint and whitespace checks passed with existing warnings.

## 2026-11-08: Footer notice and contact placeholders
Base: private version 32. Checked footer copy and desktop layout in Chromium, no horizontal overflow at 390px, and verified the inline link opens the local Terms section. Production build, TypeScript, lint and whitespace checks passed with existing warnings.

## 2026-11-08: Compact footer
Base: private version 31. Chromium measured a 268px upper footer at 1280px and 44px link targets at 390px. Neither viewport showed horizontal overflow. The footer privacy link opened its page. Build, TypeScript, lint and whitespace checks passed with existing warnings.

## 2026-11-08: Testing section spacing
Base: private version 30. Chromium verified three intro lines and a 720px section at 1280×720 and 2048×720. The heading gap measures 20px and panel gap 29px at those sizes. At 390px, gaps measure 28px and 40px with no horizontal overflow. Production build, TypeScript, lint and whitespace checks passed with existing warnings.

## 2026-11-08: Testing paragraph measure
Base: private version 29. Testing introduction renders in three lines at 1280×800 and 2048×800 in Chromium. At 390px the page has no horizontal overflow. Static build, TypeScript, lint and whitespace checks passed with the existing lint warning.

# Project status

## 2026-11-08: Testing heading and stacked introduction
Base: private Site version 28/source d4b822ed623f96115ec069b92fe874af23aaee63. Local correction complete.
CONTENT: heading now reads exactly “The 7-layer test”. Existing right-column paragraph moved below the title without any wording change. All seven entries, selected-layer behavior and other sections remain unchanged.
CRAFT: inspected the production export in Chromium at 1280×720 and 320×844. Heading is white/mint on one line at these viewports; paragraph is below with 12px desktop and 24px phone gap. Desktop section remains 720px high with all seven collapsed rows and documentation action visible. Body remains 16px. No horizontal overflow: client/scroll widths 1265/1265 and 305/305. Evidence: obsidian/reviews/assets/method-testing-stacked-heading.png and method-testing-stacked-mobile.png (QA viewport frame included).
FUNCTIONAL/ENGINEERING: production build and TypeScript pass. Lint zero errors, one existing unused-disable warning in opengraph-image. Existing font/static-export warnings remain. Diff whitespace check passes. Application diff is limited to two title values and Testing header markup/classes. No dependency, shared CSS, interaction or animation changes.
LIMITS: local Chromium viewport inspection, not physical-device or Safari testing. Existing claims retained as supplied. Ready for owner-private publication; native deployment result records actual outcome.

## 2026-11-08: Registration, footer, Testing introduction and larger opening paragraph
Base: private Site version 27/source c5d2b6e552cd7e5ab434bf10a4ee2a3284534c1b. All four active requests implemented.
CONTENT: Clinic Growth registration action opens /register with contact, business/credentials, address, referral and notes. Optional SMS, instant access and competitor contact details are not copied. Footer uses approved identity and supplied FAQ shipping/professional-use copy, with real contact/policy/COA routes. Terms and returns explicitly await final copy. Testing title is “The seven-layer test.” and introduction matches the supplied paragraph. Hero description wording is unchanged and enlarged. All seven testing entries remain unchanged. Existing Provider Access source is byte-identical and is still the final main section; footer follows it.
CRAFT: inspected local production export in Chromium at 1280×720, 390×844 and 320×844. Registration has a two-column desktop composition and stacked phone layout; no horizontal overflow (client/scroll widths 1265/1265, 375/375, 305/305). Inputs remain 16px and at least 48px high; footer links 44px minimum. Testing still measures 720px high with all seven collapsed rows and action at laptop size. New Hero paragraph measures 20.87px with 33.92px line-height at laptop size, ending at 499px in the 720px hero. At 320px it is 18px/29.25px and fits without horizontal overflow. Evidence: obsidian/reviews/assets/method-registration-desktop.png, method-footer-desktop.png, method-footer-mobile.png, method-testing-copy-update.png, method-hero-larger-copy.png, method-hero-mobile.png. Screenshots include a QA-only viewport frame.
FUNCTIONAL: clicked actual Clinic Growth CTA and verified /register at scrollY 0. Required fields focus the first invalid control; invalid NPI syntax rejected. NPI mismatch, reseller permit/certificate and representative conditional fields checked; switching reseller to No removes its required file control. Sample application reaches local review explicitly marked Not submitted with no account/NPI success claim. Valid and invalid phone formats checked after correcting HTML Unicode-v pattern escaping. Footer Terms link reaches /policies/#terms; back-to-site and registration links work. Static export checks find footer on all four main routes and every new local route/anchor. Registration submit is disabled in server HTML until hydration. Testing row six expands with preserved detail and selected-layer state.
ENGINEERING: final production build/TypeScript pass. Lint zero errors, one pre-existing unused-disable warning in opengraph-image. Existing font fallback/static-export warnings remain. No new dependencies, third-party calls, credentials or persistence. Self-review covered correctness, architecture, readability, security and added runtime work. Native validation and conditional state stay in registration leaves; footer/policy views are server-rendered. Protected contact/sourcing/header/DNA/button/dependency files are unchanged. Hero diff only updates paragraph size/measure classes; Testing diff only updates introduction rendering/width.
LIMITS: local production export in Chromium only, not physical devices, Safari or screen-reader certification. Existing WebGL context failures occurred in this cloud browser and the retained fallback remained visible; animation behavior is not re-certified and scene code is unchanged. File chooser appearance/required state and validation implementation inspected, but actual upload was not tested because there is no upload service. No applications, credentials or files are sent; sample data is not persisted. Final Method contact details, terms/returns and all real registration integrations remain future work. Owner-provided medical/business claims remain unverified drafts.
Ready for owner-private publication. Native Sites deployment response records actual outcome. Next: owner review; preserve current unrelated sections.


## 2026-11-08: Flow logo in Provider Access and browser icons
Base: version 26/source 6f19801ac01bd988340848cc19f61455344e1136. Replaced the legacy DNA symbol in the Provider Access tile and generated browser/Apple icons with the approved Flow mark. Shared metadata mark now uses the same asset, also updating its share-card symbol.
CONTENT: no copy, form, navigation or section-order changes. Approved flow-logo.png is byte-identical to base and the SVG embeds those exact bytes; only its symbol viewport is shown.
CRAFT: inspected production export at 1280×720 and 390×844 in Chromium. Provider tile renders the contained symbol on both. Phone image box is 28px; client/scroll widths both 375px. Browser and Apple outputs are valid 512×512/180×180 PNGs and were shown at 24px in the review bar. Favicon shape and padding visually checked at full resolution. Evidence: obsidian/reviews/assets/method-clinical-logo-update.png.
FUNCTIONAL: image loaded in desktop and phone DOM, generated favicon link uses /icon?1665d4fe93919cb4. Existing form stays disabled; no submission attempted.
ENGINEERING: build and TypeScript pass. Lint has zero errors and one existing unused-disable warning in opengraph-image. Whitespace check passes. Exact comparison confirms Contact changes are only icon import/element; source data, header, preloader, order and dependencies unchanged. No new runtime loop or service.
LIMITS: Chromium viewport inspection only; browser metadata verified in local production output, not a physical Safari tab. Existing metadata share-card copy and other pre-existing behavior are outside this local logo edit. Ready for owner-private publication; native deployment result records outcome.

## 2026-11-08: FAQ heading spacing
Base: version 25/source bdd17a9718eb3fa5476bd976197d795faa77ff16. Local FAQ header correction complete.
CONTENT: all copy unchanged. Final section remains Provider Access immediately after FAQ.
CRAFT: production export inspected in Chromium at 1280×720 and 320×844. Laptop header gap measures 18px, heading word spacing 2.7648px, normal letter tracking. All eight questions remain visible with the longest account/action expansion; last row ends 635.2px from section top inside a 720px section. Phone gap 21.1px, body 16px, no horizontal overflow (305px client and scroll widths). Laptop widths match at 1265px. Evidence: obsidian/reviews/assets/method-faq-header-spacing.png.
FUNCTIONAL: account disclosure opens normally; native grouped disclosure code unchanged. Source order, copy, protected sections and dependencies unchanged.
ENGINEERING: production build/TypeScript pass; full lint zero errors, three existing icon/OG warnings. Diff whitespace review passes. Only FAQ component and local FAQ tokens change application code.
LIMITS: Chromium viewport checks only, not physical devices or Safari. Existing animation and disabled form behavior unchanged. Ready for private publication; native deployment result records outcome.

## 2026-11-08: Compact FAQ and Provider Access restored to final position
Base: version 24/source 73cf270d05f386e3c45b517686dac0c05a3afaba. Both active requests complete: compact FAQ and final Provider Access. FAQ copy is identical to base. Contact source is identical; HomeView ordering places it immediately after FAQ and last in main.

CONTENT: no content edits. Data source comparison against base is empty. All eight questions preserved.
CRAFT: production export inspected in Chromium at 1280×720 and 2048×1416 plus 390×844 and 320×844. At laptop size FAQ section is exactly 720px high. Collapsed question list ends 515px from section top; each of the eight expanded states ends between 569px and 616px. Thus all questions remain within one laptop viewport even with any one answer open. At 2048×1416, heading is bounded at 48px and the last expanded row ends at 809px. Body remains 16px. Desktop and phone client/scroll widths match: 1265/1265, 2033/2033, 375/375, 305/305. Phone minimum row target 48px. Evidence: obsidian/reviews/assets/method-faq-screen-fit.png (QA-only frame surrounding 1280×720 view).
FUNCTIONAL: all eight expanded states checked; native exclusivity retained. Keyboard Enter opens account answer. Its link reaches Contact, verified as main's final element with FAQ immediately before it. Existing preview form notice remains and no submission attempted.
ENGINEERING: production build and TypeScript pass. Full lint zero errors and three pre-existing icon/OG unused-disable warnings. Whitespace and exact protected-source/data/dependency checks pass. Global CSS change only adds FAQ-scoped primitive/semantic/theme tokens. No shared style overrides, new state, dependency, asset or animation.
LIMITS: Chromium viewport inspection, not physical-device, Safari or screen-reader certification. Existing DNA source not changed or separately re-certified. Narrow phones retain natural page scrolling rather than shrinking answers below reading size.

Ready for owner-private publication through Sites; native deployment result records publication. Next: owner review of FAQ sizing and the final page sequence.

## 2026-11-08: Eight FAQs added at the bottom
Base: Site version 23, source a4f0117c6f65618196afce28701098fd6dad632f. Added owner-provided FAQ content as the final section, after intact Provider Access. Typed content: src/data/mocks/faq.ts. Server component: src/views/home/sections/faq.tsx. HomeView imports and inserts it.

CONTENT: all eight disclosures opened in Chromium and checked against both supplied screenshots. AP Labs references changed to Method Clinical. Account-answer adaptation is recorded in PROJECT-BRIEF.md; no competitor contact, fabricated email or working instant-access claim. Supplied business assertions remain drafts, not independently substantiated. Existing private-review, illustrative-data and disabled-form notices retained.
CRAFT: production export inspected at 1280×720, native desktop 1348px, and 390×844/320×844 iframe viewports. No horizontal overflow: client/scroll widths match 1265/1265, 375/375 and 305/305. Mobile answer text 16px; minimum disclosure target 64px. Long testing answer expands fully with natural page scroll. All eight collapsed questions visible in native desktop screenshot. Evidence: obsidian/reviews/assets/method-faq-desktop.png and method-faq-mobile.png. Phone evidence includes QA-only frame chrome.
FUNCTIONAL: every row opened; native one-open exclusivity verified. Enter opens a row and summary receives visible keyboard focus. Account link scrolls to #contact, whose existing preview notice and disabled form remain. FAQ is the last child of main. No form submission or real account workflow tested.
ENGINEERING: production build and TypeScript pass. Full lint zero errors, three pre-existing unused-disable warnings in icon/OG files. Whitespace check passes. Exact protected-source comparison against base passes for all prior sections, global CSS, shared components, assets and dependencies. Review found no added client state, data transmission, dependency or animation cost beyond static content/icons.
LIMITS: Chromium viewport checks, not physical devices, Safari or screen-reader certification. No new motion behavior introduced. Existing live DNA source remains untouched; no motion certification claimed.

Ready for owner-private publication. Native deployment result records the actual outcome. Next: owner review of the FAQ. Preserve the rest of the site unless explicitly reopened.

## 2026-11-08: Full testing detail and clinic-growth section
Base: private Site version 22, source c340beec9d9835e49040144a0c87781444a77827. Both active user requests implemented. Testing includes all supplied summaries, six Why it matters / What sets us apart pairs, and the seventh fresh-COA banner copy. Added Clinic Growth between Documents and the original Provider Access.

CONTENT: all seven rows opened and visible content checked against the supplied screenshot transcription. All five clinic benefits, headline, invitation and CTA present. Existing draft notices, illustrative COA guide and disabled form retained. User-supplied claims are not substantiated by this work.
CRAFT: production export inspected in Chromium at 1280×720 and 1440×900, plus 390×844 and 320×844 phone frames. Growth is two columns on desktop and stacked on phones. Client/scroll widths match at 1265/1265, 1425/1425, 375/375 and 305/305. Mobile text is 16px, heading 36px; registration target 54px high. Testing collapsed overview remains exactly 720px tall at 1280×720. Long detail expands the document without truncation. Mobile row targets measured 62px. Evidence in obsidian/reviews/assets/method-clinic-growth-desktop.png, method-clinic-growth-mobile.png and method-testing-copy-mobile.png. Mobile evidence includes the QA viewport frame, absent from the published app.
FUNCTIONAL: all seven disclosures update selected plane/caption and preserve one-open exclusivity. Keyboard Enter opens the seventh row. Registration scrolls to #contact; the COA link reaches #about. No submission was attempted. Existing form remains disabled.
ENGINEERING: production build and TypeScript pass. Full lint has zero errors and only three pre-existing unused-disable warnings in icon/OG files. Whitespace check passes; protected-source and dependency-input diffs are empty. Self-review covered correctness, semantics, module boundaries, security and added runtime work. No new dependency, external call, asset or animation loop.
LIMITS: Chromium viewport emulation, not physical devices or Safari. No screen-reader or OS reduced-motion check. Existing DNA code untouched; this pass does not certify its motion. Forms and actual lot retrieval remain unconnected as before.

Ready for private publication through the supported Sites workflow. Native deployment result is the authoritative outcome. Next: owner review of the new section and expanded testing copy. Preserve all other sections.

## 2026-11-08: Testing fits the desktop screen
Local correction to version 21/source 8ac0f7cc16cd6ab4acad13ade4b7b8ee44471e92. Heading, seven disclosure rows, layer visual and documentation CTA now fit together in one desktop viewport. No text or interaction logic changed.

CONTENT: testing data and all existing section sources unchanged, verified by exact diff against base.
CRAFT: Chromium iframe viewports inspected at 1280×720, 1440×900, 2048×1187 and 390×844. Section heights were exactly 720/900/1187px on desktop; CTA bottom positions within their sections were 663/808/1009px. All seven rows and the action visible. No horizontal overflow at any measured width. Phone remains a stacked reading layout with 36px heading and matching client/scroll width of 375px. Proof: obsidian/reviews/assets/method-testing-screen-fit.png.
FUNCTIONAL: seventh-row expansion and return to first update the selected graphic; expanded seventh-row content also fits at laptop height. Existing action destination retained. Production build and TypeScript pass; full lint passes with three pre-existing icon/OG warnings. Protected-source and whitespace checks pass. No physical-device or Safari test. Existing WebGL animation source remains unchanged.

Ready for private publication. Next: owner review of the sizing correction only. Native Sites deployment result records publication outcome.


## 2026-11-08: Concept A implemented and verified
Base: source 7a76f2c181d03fe00cab2a1ed95c5884f83c9b8a, Site appgprj_6aef848972f88191b89dbccc88337955. Owner selected A. Added the Method Index testing section immediately after Sourcing and before Catalog. Seven native disclosure rows control a seven-plane graphic. Existing Button links to the lot guide at #about. No existing section, navigation, shared button, or DNA source was changed.

CONTENT: all seven titles/descriptions checked against the approved concept. User-supplied purity and re-testing claims remain draft business assertions; no substantiation was added or implied. Existing private-review note, illustrative catalog/COA labels and disabled form remain intact.

CRAFT: production export inspected in Chromium at 1348px desktop and 390px, 320px and 768px iframe widths. Corrected tablet heading wrapping by retaining a stacked introduction below 1024px. No horizontal overflow in the new section at the narrowest and tablet widths (305/305 and 753/753 client/scroll widths). At 320px each disclosure target measured 62px high. Desktop and full mobile evidence: obsidian/reviews/assets/method-testing-desktop.png and method-testing-mobile.png. Mobile evidence includes the QA-only viewport frame, which is not part of the published app.

FUNCTIONAL: mouse selection changes the open row and selected-plane caption; native exclusivity verified; Enter opens the seventh row; returning to the first row restores Purity selection. The last row exposes the complete fresh-COA description. The documentation CTA scrolls to #about (96px from viewport top). Keyboard-visible button focus checked, with one visible arrow in its active state. Native HTML disclosures retain content access without a new motion loop.

ENGINEERING: final production build and TypeScript pass. Full lint zero errors with three pre-existing unused-disable warnings in icon/OG files; changed-file lint passes after the final adjustment. Whitespace and exact protected-source comparisons pass. Existing Yarn v1 lockfile preserved, packageManager pinned to yarn@1.22.22 so the supported installer is reproducible. No new runtime dependency. Architecture, accessibility semantics, factual scope and secret/client boundaries reviewed; no material new issue found.

LIMITS: no physical-device, Safari or screen-reader test. The cloud browser disables WebGL; existing helix poster fallback rendered, so this pass cannot certify the live DNA animation. Animation source is byte-identical to the base. Reduced-motion transition removal is implemented; an OS preference toggle and JavaScript-disabled browser pass were not performed. Forms and lot retrieval remain preview-only as before.

Ready for private publication through Sites. The native deployment response is the authoritative publication outcome. Next: owner review of the new Testing section; preserve all other sections unless explicitly reopened.

Capabilities: source/build/publish helpers and Chromium review available. Devver 00, 04, 05 and 08 retrieved from the configured System folder; Module 09 was absent. Existing README, component notes and these records provide continuation instructions. No new generated image is required.

## 2026-11-07: hero eyebrow removed
Owner explicitly requested removal of the screenshot label "01 FLOW / PROVIDER SUPPLY". Removed that rendered eyebrow and its unused motion import only. Headline, description, navigation, DNA, Sourcing and Provider Access are unchanged. This is a local exception to the Hero lock. Build and TypeScript pass; changed-file ESLint and whitespace checks pass. Exported hero HTML confirms the label is absent. Other section sources are byte-identical. No new browser visual review for this text-only removal.


## Current pass: sourcing panel (2026-11-07)
Implemented the owner-selected rounded-panel and icon-card direction for the second section only. All existing sourcing copy and two action destinations retained. Header strings moved to SOURCING_CONTENT. Existing three statements have FlaskConical, MapPin and Building2 decorative icons. No new dependencies. Shared helix and reduced-motion handling remain unchanged.

CONTENT: verified all three titles/descriptions and action labels against prior source; no additional claims. Existing private-draft note retained.
CRAFT: inspected the production export in Chromium at 1348px desktop, and 390px/320px iframe viewports. Equal desktop cards, readable stacked phone cards, intact heading and CTAs. Document client/scroll widths matched at 375/375 and 305/305 (scrollbars account for the difference from iframe width). Screenshots: obsidian/reviews/assets/method-sourcing-desktop.png and method-sourcing-mobile.png.
FUNCTIONAL: Browse catalog scrolled to Services; View lot documentation scrolled to About. Static build and TypeScript pass. Full ESLint: zero errors, three existing unused-disable warnings in icon/OG files. Git whitespace and protected-file checks pass. No physical-device or Safari check. No new animation preference test; existing reduced-motion behavior preserved.

Source/build ready for private publication. Native Sites deployment response is the authoritative outcome. Next action: owner review of Sourcing; keep all other sections locked unless explicitly reopened.

2026-11-07: lower-page refinement implemented on the existing private Site checkout. Hero, Sourcing and the last Provider Access section are protected. Provider Access has been restored byte-for-byte to its prior source. Current scope and decision provenance are in PROJECT-BRIEF.md and DESIGN-DECISIONS.md.

## Implemented
- 21st-derived tabbed compound showcase with approved Flow artwork.
- Interactive Certificate of Analysis field guide.
- Expanding-arrow action links adapted to react-spring.
- Original Provider Access page restored, including DNA, typography, form layout and button. The newly introduced footer is removed with that restoration.
- Responsive composition at desktop and narrow browser widths.

## Review
Content: sample catalog preserved, no invented COA values, explicit preview form, existing opening draft claims unchanged.
Craft: desktop composition and all three lower sections inspected at 390px. A 320px check found cramped button/graphic details; these were corrected and rechecked. The 320px document viewport measured 305px client width and 305px scroll width, with no horizontal overflow.
Functional: tab selection, horizontal/vertical arrow-key navigation, visible focus state, expanding button and access anchor checked in Chromium. Form remains disabled.

Production static build and TypeScript pass. Full ESLint passes with zero errors and three pre-existing unused-disable warnings in icon/OG files. Privacy navigation reaches the existing privacy notice. Protected opening source diff and git whitespace check pass. Ready for publication; native Sites response records the deployment result.

## Boundaries and next action
No live ordering, authentication, lot retrieval or form delivery. No physical-device, Safari or screen-reader certification. Reduced-motion behavior inherits the existing global react-spring skipAnimation handler; an OS preference toggle was not tested in this pass.
After publication, collect owner feedback on the lower page only. Keep Hero, Sourcing and Provider Access locked unless explicitly reopened.

## Owner correction
Restored only src/views/home/sections/contact.tsx from 1c7b17ed085bb2ec27422bf40dac8e37ada74a16. Catalog, document guide and their new buttons are retained. Verification: exact prior-source comparison and production build; no new browser review for this narrow restoration.

## Authorized hero typography adjustment
Owner supplied the “Scale Smarter, Not Harder” screenshot and requested that text treatment on the first page. Apply extra-bold existing Google Sans Flex, tight tracking, mint emphasis on “licensed providers.” and quieter, more relaxed supporting copy. Preserve the actual words, first-page layout, DNA scene, buttons, Sourcing and restored Provider Access. This is a local typography exception to the Hero lock, not a broader redesign.

## Authorized hero bottom-row removal
Remove the entire lower hero furniture shown in the owner screenshot: Method Clinical / 01 Flow label, short divider, Request provider access and Browse catalog buttons, and the Compound catalog / Lot documentation / Provider access pills. Header navigation, header access CTA, DNA, headline and supporting paragraph remain. Provider Access remains restored to its original source.

## Verification limit for this typography pass
The managed preview daemon is occupied by the separate Ascend project. It was not stopped or repointed. The new hero typography and bottom-row removal are source/build verified; fresh browser visual QA for these hero changes remains pending. Provider Access is byte-identical to its approved source.

Final checks for the restoration, typography and removal: production build and TypeScript pass; changed-file lint passes; exported hero markup contains none of the removed bottom-row labels; original Provider Access source comparison passes. Publication uses the existing private Site.

## Mobile verification card

Browser preview checked at 320px and 390px iframe widths. The vial stays closed, all seven markers fit below it, and selecting Mass spectrometry updates the caption to 02 / Identity. The desktop preview retains the vertical markers and opens the vial on mouse entry. Production build and lint completed with existing warnings.

## Catalog artwork replacement

Rendered 148 branded 960 × 960 WebPs for all 94 catalog listings, including 10 nasal sprays and 19 previously unillustrated listings. Removed the 128 third-party image files from the catalog. The five generated studio templates and label renderer are in artwork/catalog. Followed the existing-project path in Devver modules 00, 03, 08, and 08A.

Verified all 94 exported detail routes and their artwork paths against the catalog, every WebP decoded, and all catalog data fields other than image URLs matched the previous version. Reviewed all primary packshots in contact sheets. In desktop browser preview, the Liquid / spray filter returned 10 branded nasal listings, and the NAD+ strength radios and gallery thumbnails selected the correct 500 mg and 1000 mg images in both directions. In a 390 px browser frame, the Adamax spray artwork loaded at full width within its card. Build and lint passed with existing font and Open Graph lint warnings.

## Catalog hero
Added the 1800 × 720 WebP at public/assets/method-catalog-banner.webp. Reviewed desktop and 390 px mobile browser previews. All three vials and their caps remain visible, and the existing catalog text is readable at both sizes. The production build passed.

## Testing section catalog link
Production build passed. The new link follows the last disclosure and opened /catalog/ in desktop and 390 px browser previews.

## Vial label copy and contour background
Rebuilt 120 vial packshots using the reconstructed emerald contour artwork from the supplied NAD+ label reference. Updated the catalog banner artwork and kept the already-correct homepage verification image. OCR confirmed both lines on all 124 displayed vial depictions across the packshots, banner and verification asset. Verified catalog export bindings for all 94 detail pages. Production build and lint passed with existing warnings.

## Desktop hover recovery
Browser-tested with physical mouse movement and a touch-first media-query fixture. The vial opened and tilted on movement and closed on pointer exit. The WebGL fallback changed its background position on mouse movement without a click. In a 390 px browser preview, the vial stayed closed and the mobile hero retained its video. The preview browser did not initialize WebGL, so the WebGL-specific hover path was source-reviewed. The production build passed.


## Catalog, registration and menu sign-in buttons

Production build and TypeScript checks passed. ESLint reported one existing warning and no errors. Browser preview opened all three destinations. The menu sign-in fill and keyboard focus outline were visually checked at desktop width and in a 390 px browser frame.


## Mint button backgrounds

Production build and changed-file lint passed. Checked that the exported hero links have identical style classes, point to their existing destinations, and use the same mint background as the catalog and registration buttons. The overlay Sign in uses the same shared arrow-fill component.

## Homepage header logo spacing

Production build and changed-file lint passed. Visually checked the rounded header in desktop and 320px browser frames. The logo has more left clearance and fits beside Sign in and the menu control.

## Website link preview

Production build and changed-file lint passed. Verified the exported homepage and catalog each have one absolute HTTPS Open Graph image tag and one Twitter image tag pointing to the 1200 × 630 JPEG. Checked the artwork at full size and with a centered square crop.

## Sign-in button contrast

Production build and lint passed. Verified the exported login button has the deep green label, mint fill, and disabled preview state. The label and fill colors have a 14.1:1 contrast ratio.
