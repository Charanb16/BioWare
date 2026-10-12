# BioWare Frontend — Proposed Plan

**Status:** Approved scope; foundation and an initial catalog slice are implemented. Continue the remaining frontend incrementally, pausing for review at milestone boundaries.

## Product scope

BioWare is a proposed, quote-led B2B storefront for product discovery and business inquiries about biodegradable products made from agricultural biomass and agricultural waste. Phase 1 has an ecommerce-style catalog and RFQ path, but no direct checkout, payment processing, customer accounts, wishlist, or live order tracking.

The planned experience covers Home and About; a product catalog with categories, search, and filters; product details; an RFQ basket; sample requests; custom-manufacturing inquiries with file uploads; sustainability, materials, manufacturing-process, and standards content; Contact and FAQ; privacy and terms; submission confirmation; and a 404 page.

No supplied specifications, API contract, verified company contact details, certifications, manufacturing capabilities, product performance guarantees, or substantiated environmental claims are present yet. Content must not imply any of those facts. Fictional product specifications, prices, stock, certifications, and environmental claims must be visibly identified as **TEST FIXTURE** data wherever they are used.

## Proposed project structure

```text
public/
  manus-routes.json          # Static route manifest, kept in sync with implemented routes
src/
  app/
    App.jsx                  # Route tree and app-level composition
  layouts/
    SiteLayout.jsx           # Shared header, navigation, main landmark, and footer
  components/
    navigation/              # Responsive navigation and skip link
    ui/                      # Small accessible shared primitives as they become needed
  pages/
    HomePage.jsx             # First milestone; later route-level pages live here
    NotFoundPage.jsx         # First milestone fallback; 404-only route excluded from manifest
  services/
    index.js                 # Future UI-facing service interface; mock implementation first
    mocks/                   # Mock behavior kept separate from view components
  data/
    fixtures/                # Explicitly labeled TEST FIXTURE content, not mixed into app logic
  hooks/                     # Reusable stateful UI behavior, added when needed
  schemas/                   # Form validation schemas, added with inquiry milestones
  utils/                     # Small shared helpers, added when needed
  styles/
    index.css                # Tailwind entry and small project design tokens
  main.jsx                   # Vite entry point and router bootstrap
```

The first milestone should only create the Vite/React foundation, shared responsive site shell, a restrained Home page, and a useful 404. It should not scaffold every future route, form, or product feature. Later modules are added as each milestone is reviewed.

## Implementation approach and dependencies

- Use the requested React + Vite + JavaScript (ESNext) stack, React Router for client-side page routing, Tailwind CSS for styling, and Axios reserved for the service layer.
- Start with mock services so UI development does not depend on a backend. Keep network calls out of page and component files. Do not invent endpoint paths or backend request/response fields; connect Axios to a separately developed backend only when its specification is supplied.
- Keep product fixtures separate from UI code and clearly display **TEST FIXTURE** labels around fictional data. Avoid fabricating business facts in the initial shell.
- Implement forms later with client-side validation, explicit loading/success/error feedback, and in-memory-only drafts. Do not save customer details, addresses, files, or drafts to localStorage. File uploads stay in the current form state unless a future backend and retention policy are specified.
- The frontend is served as a Vite single-page application in Preview. No backend, database, authentication, payment integration, or persistence is requested for Phase 1.
- Pin the Node package manager and dependency versions; document permitted install lifecycle scripts before the first install. Add dependencies only when their first milestone needs them.

## Design direction proposed for review

- **Design movement:** Contemporary biophilic editorial design with restrained industrial-material cues.
- **Core principles:** (1) Calm, factual presentation; (2) visible separation between confirmed project scope and test-only sample data; (3) editorial hierarchy rather than a generic centered dashboard; (4) accessible, low-friction navigation.
- **Color philosophy:** Warm mineral paper and deep ink create a grounded, legible base; a distinctive “field green” signals the agricultural-material subject; muted clay is reserved for secondary emphasis. Color must never be the only way to communicate a state or fixture warning.
- **Layout paradigm:** A left-aligned editorial spine, generous whitespace, and offset content blocks, with responsive stacking on narrow screens. Avoid a uniform grid of generic marketing cards.
- **Signature elements:** A simple seed-and-fiber line motif; fine crop-mark dividers; compact uppercase “TEST FIXTURE” labels on mock content.
- **Interaction philosophy:** Direct links, clear focus states, keyboard-operable navigation, reduced-motion support, and plain-language feedback. No decorative interaction should obscure content or block access.
- **Animation:** Minimal, short transitions for menu expansion and hover/focus feedback; honor `prefers-reduced-motion`; do not use continuous or scroll-triggered motion in the foundation.
- **Typography system:** A sturdy sans serif such as Manrope for navigation and interface text paired with a readable editorial serif such as Source Serif 4 for display headings; establish responsive type scales and preserve high contrast.
- **Brand essence:** A proposed B2B discovery experience for teams exploring biodegradable products made from agricultural biomass and waste; distinct through clear product exploration and inquiry paths. Personality: grounded, precise, exploratory.
- **Brand voice:** Specific and informative, avoiding unsupported claims. Example lines: “Explore materials made from agricultural biomass.” “Tell us what you’re evaluating; we’ll route your inquiry.”
- **Wordmark & logo concept:** A typographic BioWare wordmark paired with a small abstract seed/fiber mark; avoid implying certification or verified performance.
- **Signature brand color:** Field green, used as an ownable navigation/action accent rather than a blanket background.

This is a design proposal, not an assertion about an existing brand system. Adjust it before implementation if you prefer another direction.

## Incremental milestones

1. **Frontend foundation and shared layout:** Initialize the requested stack; add the responsive site shell, accessible navigation landmarks and skip link, a modest Home page, and a 404 state. No fabricated product claims or contact details. Stop for review.
2. **Catalog and product discovery:** Add catalog/category/search/filter and product detail experiences; keep any fictional sample content visibly labeled TEST FIXTURE.
3. **Inquiry flows:** Add RFQ basket, sample request, and custom-manufacturing inquiry forms with validation, file selection, mock submission states, and no browser storage.
4. **Trust and information pages:** Add sustainability, materials, manufacturing-process, standards, About, Contact, FAQ, privacy, and terms content, using supplied specifications as the source of truth.
5. **Integration and refinement:** Align mock services with any supplied backend contract, centralize Axios usage, and refine accessibility, responsiveness, and loading/empty/success/error behavior.

**Review gate:** Stop after each agreed milestone and wait for the user's review before beginning the next milestone.


## Plan approval

**Approved by the user on 2026-10-10.** The user later confirmed the quote-led B2B storefront scope and frontend-only, mock-backed approach. Build in small increments and wait for review at milestone boundaries.


## User-supplied catalog and folder proposal — implementation addendum

The user supplied four proposed catalog categories: Cutlery, Coffee Cups, Bowls & Plates, and Food Packaging Boxes, plus category paths `/products/cutlery`, `/products/coffee-cups`, `/products/bowls-plates`, and `/products/food-packaging`. Treat these as the proposed site taxonomy only; their inclusion does not assert confirmed manufacturing or availability. The first catalog slice will visibly label this taxonomy as **TEST FIXTURE**, provide category search/navigation, and show an honest empty state where no verified product records exist. Do not add fictional product specifications, imagery that implies real BioWare products, prices, availability, environmental claims, or certifications.

Adopt only the supplied folder-tree areas needed within the existing project: shared product UI under `src/components/products/`, catalog helpers under `src/features/catalog/`, clearly labeled data under `src/data/fixtures/`, and reusable document-title behavior under `src/hooks/`. Retain the current app, layout, page, service, and style modules instead of creating unused account, auth, wishlist, order-tracking, cart, checkout, or payment scaffolding. The original Phase 1 exclusions remain in force.


## Scope decision — confirmed by user

The user selected the **quote-led B2B storefront** option. Build the complete frontend experience around product discovery and business inquiries, with no direct checkout, payments, customer accounts, wishlist, or order tracking. Keep the implementation frontend-only and mock-backed until an approved backend specification is supplied; do not invent API endpoints or payloads. Make the site feel like a professional product storefront while keeping proposed categories distinct from confirmed manufacturing claims.

Category illustrations are conceptual artwork only. Disclose on the site that they are not BioWare product photography and do not verify product designs, materials, availability, or performance.


## Inquiry-form increment — approved

The user approved continuing with sample-request and custom-manufacturing inquiry forms. Both use the supplied category fixtures, separate validation schemas, and service-layer mock behavior. Custom file selection remains in React memory, can be removed, and is not uploaded in Preview. Neither form claims real success, sample availability, or custom-manufacturing capability. The next validation should confirm route-manifest coverage, production build, form-schema behavior, and absence of browser-storage or network-upload behavior. Pause for user review after this increment.
