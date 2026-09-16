# Website Audit Report

## 1. Executive Summary

A comprehensive, non-destructive audit and subsequent targeted remediation was performed on the **Northstar Group / Kalycor** web application. The codebase is a modern Next.js 16 (Turbopack) project built with React 19, TypeScript, and Tailwind CSS v4.

Overall technical condition: **READY FOR PRODUCTION (WITH FORM BACKEND CONFIGURATION)**.
All static and dynamic tests passed cleanly. TypeScript type-checking (`npx tsc --noEmit`), ESLint code-quality checks (`npx eslint .`), and Next.js production compilation (`npm run build`) all pass with **0 errors and 0 warnings**. The website has zero horizontal overflow across 10 responsive viewports, smooth sticky scrollytelling transitions, and verified client validation.

---

## 2. Audit Scope

The inspection and live testing covered:
- **Architecture & Config:** Next.js App Router (`src/app`), `next.config.ts`, `tsconfig.json`, `package.json`, `eslint.config.mjs`.
- **Layouts & Pages:** Root Layout (`src/app/layout.tsx`), Home Page (`src/app/page.tsx`), Loading UI (`src/app/loading.tsx`), 404 Error Page (`src/app/not-found.tsx`).
- **Styling & Design System:** `src/app/globals.css`, Tailwind CSS v4 `@theme`, Google Fonts (Manrope, DM Sans, Instrument Serif), custom animations, responsive breakpoints, reduced-motion queries.
- **Components & Sections:**
  - `HeroSection` (`src/components/sections/hero-section.tsx`)
  - `WhoWeAreSection` (`src/components/sections/who-we-are-section.tsx`)
  - `ServicesSection` & `ServicesShowcase` (`src/components/interactive/services-showcase.tsx`)
  - `EnquirySection` & `EnquiryForm` (`src/components/interactive/enquiry-form.tsx`)
  - `ConnectSection` & `ConnectForm` (`src/components/interactive/connect-form.tsx`)
  - `FooterSection` (`src/components/sections/footer-section.tsx`)
  - Interactive Utilities (`Navbar`, `CustomCursor`, `ScrollProgress`, UI primitives, `useIsMobile`).
- **Responsive Viewports:** 10 standard device resolutions (320px to 1920px).
- **Build & Lint Tools:** `npx tsc --noEmit`, `npx eslint .`, and `npm run build`.

---

## 3. Responsive Testing

| Viewport | Device Category | Result | Verified Observations |
| :--- | :--- | :--- | :--- |
| **320 × 568** | Mobile (iPhone SE 1st Gen) | **PASS** | No horizontal overflow (`scrollWidth === innerWidth`). Typography clamps smoothly; navbar hamburger button functions properly; mobile services counter `01 / 05` is visible and legible. |
| **375 × 667** | Mobile (iPhone 8 / SE 2nd) | **PASS** | Clean spacing; hero heading and subtitle wrap nicely without clipping. Form fields stack in 1 column. |
| **390 × 844** | Mobile (iPhone 12/13/14) | **PASS** | Touch-friendly margins, navbar sticky behavior works as expected; mobile navigation modal opens full-screen cleanly. |
| **430 × 932** | Mobile (iPhone 14/15 Pro Max) | **PASS** | Excellent proportion; images fill card boundaries with proper aspect ratio; full readability maintained. |
| **768 × 1024** | Tablet Portrait (iPad Mini) | **PASS** | Transition from mobile stacked layout to intermediate tablet layout; navbar switches to desktop nav links seamlessly. |
| **820 × 1180** | Tablet Portrait (iPad Air) | **PASS** | Balanced grid columns in Who We Are and Footer; Services showcase sticky pinning activates smoothly. |
| **1024 × 768** | Tablet Landscape / Small Laptop | **PASS** | Services left-hand sidebar navigation appears (`01 Staffing` to `05 Security`); card visual locks cleanly in sticky viewport. |
| **1280 × 720** | HD Laptop | **PASS** | Generous whitespace and padding; Enquiry form 2-column grid and Connect form horizontal layout align correctly. |
| **1440 × 900** | MacBook Pro | **PASS** | High-density rendering; images render crisp without distortion; cursor follower activates on hoverable items. |
| **1920 × 1080** | Full HD Desktop | **PASS** | Content constrained inside max-width container (`max-w-[1600px]`); background watermarks and grain textures scale properly without artifacting. |

---

## 4. Section-by-Section Audit

### 1. Navigation Bar (`src/components/interactive/navbar.tsx`)
- **Status:** **PASS**
- **Findings:**
  - Sticky header activates backdrop blur (`nav-scrolled`) upon scrolling past 24px (`window.scrollY > 24`).
  - Desktop nav links ("Who We Are", "Services", "Enquiry", "Connect") trigger smooth scrolling to target section IDs.
  - Mobile menu button correctly toggles full-screen drawer on screens `< 768px` and auto-closes upon item selection.
  - Accessible `aria-label` attributes present on navigation landmarks and buttons.

### 2. Hero Section (`src/components/sections/hero-section.tsx`)
- **Status:** **PASS**
- **Findings:**
  - Full-screen height (`min-h-[100svh]`) with prioritized Next.js `<Image priority fill />` background.
  - Staggered word reveal animations (`rise-in`) trigger smoothly via inline CSS variables (`--delay`).
  - "Scroll to explore" anchor link (`href="#services"`) smoothly transitions down to the services track.

### 3. Section 01 — Who We Are (`src/components/sections/who-we-are-section.tsx`)
- **Status:** **PASS**
- **Findings:**
  - Clean two-column editorial typography layout with serif highlight.
  - IntersectionObserver (`reveal-on-scroll`) smoothly activates visibility and subtle slide-in when entering viewport.

### 4. Section 02 — Services Showcase (`src/components/interactive/services-showcase.tsx`)
- **Status:** **PASS**
- **Findings:**
  - Scrollytelling behavior functions smoothly through the `550vh` scroll track.
  - Clicking desktop sidebar tabs (`01` through `05`) smoothly scrolls the window to the exact offset.
  - Image crossfades, scaling transitions, and staggered text animations operate cleanly.
  - Next.js Image fill wrapper contains `position: relative` (`relative size-full ...`), eliminating all development console warnings.
  - Unused `ArrowUpRight` import removed.

### 5. Section 03 — Enquiry Section & Form (`src/components/interactive/enquiry-form.tsx`)
- **Status:** **PASS (Client-Side Validated, Backend Integration Pending)**
- **Findings:**
  - Form layout adapts from 1 column on mobile to 2 columns on tablet/desktop.
  - Required fields (`Full name *`, `Email *`) enforce browser validation when empty.
  - Successful submission displays the confirmation state ("Enquiry received").
  - "Send another enquiry" button resets state back to the input form.
  - *Backend Status:* No API endpoint exists in the project; currently uses client-side simulated state (`event.preventDefault() -> setSent(true)`). Real email/CRM integration is documented as pending.

### 6. Section 04 — Connect Section & Form (`src/components/interactive/connect-form.tsx`)
- **Status:** **PASS (Client-Side Validated, Backend Integration Pending)**
- **Findings:**
  - Primary color background styling with multiply-blend background image and decorative background typography watermark.
  - Responsive grid layout: input fields align with the "Start a conversation" submit button.
  - Enforces required fields (`Name *`, `Email *`, `How can we help? *`).
  - Submission displays the confirmation box ("Message sent") with a reset toggle.
  - *Backend Status:* Same as EnquiryForm; client-side mock submission only.

### 7. Footer Section (`src/components/sections/footer-section.tsx`)
- **Status:** **PASS (Placeholders Documented)**
- **Findings:**
  - Contains organized link columns for Explore, Services, and Contact.
  - Logo and Privacy/Terms links direct smoothly to `#top`.
  - External link to LinkedIn includes `target="_blank"` and `rel="noreferrer"` security attributes.
  - *Contact Status:* Retains placeholder values (`hello@northstar.group` and `+1 000 000 0000`) pending live company credentials.

### 8. 404 Not Found Page (`src/app/not-found.tsx`)
- **Status:** **PASS**
- **Findings:**
  - Renders custom branded error screen with "Return to Overview" CTA link returning to `/`.

---

## 5. Functionality Audit

| Feature | Status | Evidence / Verified Details |
| :--- | :--- | :--- |
| **Navbar Sticky Header** | **PASS** | Transitions class to `.nav-scrolled` on scroll (> 24px) with backdrop blur. |
| **Navbar Navigation Links** | **PASS** | Smooth scrolls to `#who-we-are`, `#services`, `#enquiry`, and `#connect`. |
| **Mobile Drawer Menu** | **PASS** | Opens/closes correctly on mobile viewport; clicking any link closes drawer and navigates to target. |
| **Hero Section Visuals** | **PASS** | Background image loads with `priority`, vignette gradient ensures text contrast. |
| **Services Scrollytelling** | **PASS** | Scroll progress smoothly transitions active service index 0 through 4. |
| **Services Sidebar Nav** | **PASS** | Clicking 01–05 triggers `window.scrollTo` with calculated proportional offset. |
| **Custom Cursor Follower** | **PASS** | Active on desktop pointers; scales to 64px on `data-cursor-hover` items; auto-hidden on mobile touch. |
| **Scroll Progress Bar** | **PASS** | Fixed 2px top bar tracks page scroll depth from 0% to 100%. |
| **Enquiry Form Validation** | **PASS** | HTML5 validation prevents submission when required inputs are blank; success view renders on submit. |
| **Connect Form Validation** | **PASS** | HTML5 validation prevents submission when required inputs are blank; success view renders on submit. |
| **Footer Navigation & Links** | **PASS** | All section anchor links and mailto/tel protocols navigate cleanly. |

---

## 6. Services Showcase Audit

All 5 services were verified individually:

| # | Service Name | Image Asset | Scroll Pinning | Tab Switch Transition | Text & Counter Display |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **Staffing** | `service-staffing.jpg` | **PASS** | **PASS** | Displays `01`, "Staffing", and description with staggered slide/fade. |
| **02** | **Real Estate** | `service-real-estate.jpg` | **PASS** | **PASS** | Smooth crossfade; desktop indicator line updates; mobile badge displays `02 / 05`. |
| **03** | **Agriculture** | `service-agriculture.jpg` | **PASS** | **PASS** | Smooth crossfade; desktop indicator line updates; mobile badge displays `03 / 05`. |
| **04** | **Import / Export** | `service-trade.jpg` | **PASS** | **PASS** | Smooth crossfade; desktop indicator line updates; mobile badge displays `04 / 05`. |
| **05** | **Security** | `service-security.jpg` | **PASS** | **PASS** | Smooth crossfade; pins until final scroll boundary is reached; exits cleanly to Enquiry section. |

---

## 7. Accessibility Findings

1. **Heading Hierarchy:**
   - Single `<h1>` tag properly located in the Hero Section.
   - `<h2>` and `<h3>` tags follow a logical, semantic structure throughout Who We Are, Services, Enquiry, and Connect sections.
2. **Color Contrast:**
   - Dark background (`oklch(0.13 0.018 70)`) with high-contrast text (`oklch(0.95 0.018 84)`) exceeds WCAG AA contrast ratio standards.
   - Dark gradient overlays on showcase cards (`from-black/90 via-black/35 to-black/10`) ensure white text remains readable across all image backgrounds.
3. **Reduced Motion:**
   - `@media (prefers-reduced-motion: reduce)` is implemented in `globals.css` (lines 316–328) to neutralize animations for users requesting reduced motion.
4. **Keyboard Accessibility:**
   - Interactive buttons and inputs receive default `:focus-visible` ring outlines.
   - Custom cursor element has `pointer-events: none` and `aria-hidden="true"`, ensuring it does not intercept accessibility tools or assistive technologies.

---

## 8. Performance Findings

1. **Image Optimization:**
   - All 6 raster images (`hero-global.jpg` and the 5 service photos) are stored locally in `src/assets` and rendered via Next.js `next/image` with optimized responsive `sizes` attribute.
2. **Scroll Processing:**
   - `handleScroll` listeners in `Navbar` and `ServicesShowcase` use `requestAnimationFrame` ticking throttling and `{ passive: true }` flags to avoid blocking the main browser thread.
3. **Bundle Size & Dependencies:**
   - Zero heavy third-party animation libraries (e.g. GSAP, Framer Motion, Three.js) are loaded. Animations rely strictly on hardware-accelerated CSS transitions and transforms.

---

## 9. Console / Runtime Errors

- **Runtime Crashes:** 0 errors.
- **Development Warnings:** 0 warnings (resolved Next.js Image parent warning).

---

## 10. TypeScript / ESLint / Build Results

### 1. `npx tsc --noEmit`
- **Result:** **PASSED (Exit code 0)** — 0 TypeScript errors.

### 2. `npx eslint .`
- **Result:** **PASSED (Exit code 0)** — 0 ESLint errors, 0 warnings.

### 3. `npm run build`
- **Result:** **PASSED (Exit code 0)** — Output:
  ```text
  ▲ Next.js 16.3.5 (Turbopack)
  ✓ Running next.config.ts took 190ms
    Creating an optimized production build ...
  ✓ Compiled successfully in 9.2s
    Running TypeScript ...
    Finished TypeScript in 14.7s ...
    Collecting page data using 5 workers ...
  ✓ Generating static pages using 5 workers (4/4) in 3.1s
    Finalizing page optimization ...

  Route (app)
  ┌ ○ /
  └ ○ /_not-found
  ○ (Static) prerendered as static content
  ```

---

## 11. Fixed Issues Summary

1. **`src/hooks/use-mobile.tsx`:**
   - Replaced synchronous `setState` in `useEffect` with React 19 standard `React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`.
   - Result: Fixed `react-hooks/set-state-in-effect` ESLint error.
2. **`src/components/interactive/services-showcase.tsx`:**
   - Added `relative` class to the immediate wrapper `div` of `<Image fill />`.
   - Result: Eliminated Next.js position "static" container runtime warning.
3. **`src/components/interactive/services-showcase.tsx`:**
   - Removed unused `ArrowUpRight` import.
   - Result: Fixed `@typescript-eslint/no-unused-vars` ESLint warning.

---

## 12. Remaining Configuration Items (Pre-Production)

1. **Form Backend Handlers:**
   - `EnquiryForm` and `ConnectForm` currently execute client-side state transitions. A backend endpoint or Server Action (e.g., Resend, SendGrid, or Nodemailer) must be hooked up when live customer communication is launched.
2. **Footer Contact Details:**
   - Replace placeholder email (`hello@northstar.group`) and phone number (`+1 000 000 0000`) in `src/components/sections/footer-section.tsx` with production client credentials.

---

## 13. Final Status

**READY FOR PRODUCTION (WITH FORM BACKEND CONFIGURATION)**
