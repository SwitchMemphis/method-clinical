# Method Clinical catalog artwork

The emerald studio photographs in `templates/` are the bases for the vial, nasal spray, tablet and capsule bottle, dissolvable-strip carton, and supply carton. The gallery shows mockups. The existing Method Clinical Flow symbol comes from `public/assets/flow-logo.png`. Product names and strengths come from `src/data/mocks/catalog-reference.json`. The approved NAD+ 500 mg label is the layout reference for the purity line and the source reference for the clean green contour texture in vial-label-contours.webp.

To refresh the exports, install Pillow and ImageMagick 7, then run `python3 artwork/catalog/render.py --font /path/to/latin-google-sans-flex.woff2` from the repository root. Use the Latin variable Google Sans Flex font already bundled by the site build in `.next/static/media`. The script updates the image URLs in the catalog and writes 960 px square WebPs to `public/assets/method-catalog/`. Remove obsolete exports after removing or renaming a product. Pass `--sample` to render representative packshots without updating the catalog manifest.

Custom Boxes & Packaging uses a single representative carton mockup. The catalog does not describe the construction of the five box styles.
