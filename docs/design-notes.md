# Frontend redesign

Apple-inspired web aesthetic using the existing React, Tailwind, and Radix foundation.

DESIGN_VARIANCE: 7. An asymmetric hero and unequal content columns.
MOTION_INTENSITY: 5. A single entrance sequence, section reveals, and result feedback. Reduced-motion settings disable animation.
VISUAL_DENSITY: 3. Generous spacing and short, functional copy.

## Audit and decisions

The original site repeated analytics on multiple pages, used green, purple, and amber result decorations, and included mock accuracy and multilingual claims. Preserve the Home, Dashboard, and About routes, local trie matching, example messages, keyboard shortcut, and browser history. Replace the presentation with neutral surfaces, one blue accent, and actual category data. Red is reserved for warning states.

The dashboard uses actual seven-day and thirty-day calendar windows. Export and clear-history controls now work. React-rendered text replaces HTML injection in the result highlighter. Route chunks keep analytics code out of the homepage download.

The TypeScript application check excludes unreferenced shadcn templates with undeclared optional dependencies. Components imported by the application remain checked. The ESLint flat configuration now uses the declared TypeScript parser and plugin.

## Research

- https://www.apple.com/mac/
- https://www.apple.com/privacy/
- https://developer.apple.com/design/human-interface-guidelines/motion
- https://developer.apple.com/design/human-interface-guidelines/accessibility

## Hero asset

Created with the built-in image-generation tool. Final asset: public/images/sentinel-shield.webp. Transparent alpha retained, resized to 1000 pixels, and compressed to approximately 85 KB. Geist is self-hosted with its license in public/fonts.

Prompt: Premium Apple-inspired website hero, isolated transparent 3D product sculpture. One rounded shield made from satin silver aluminum with an optical glass central face and an embossed silver checkmark. Three-quarter perspective, soft studio lighting, monochrome silver and graphite. No text, branding, UI, green, purple, glow, or extra objects. Fully transparent background.

## Display and appearance updates

The page width expands from 1080 to 1440 CSS pixels for larger monitors. Headings, artwork, controls, and supporting text scale together, with bounded font sizes and native text rendering after entrance animations. Light, Dark, and System choices use a persistent next-themes provider. The favicon reuses the actual Lucide shield glyph from the header, with SVG, multi-resolution ICO, and touch-icon versions.
