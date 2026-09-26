import type { CSSProperties } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#091B2B] text-white"
    >
      {/* ==========================================================================
          ATMOSPHERIC BRAND GEOMETRY (Inspired directly by Kalycor Logo)
          - 45° Tilted Diamond Ambient Shield
          - Dynamic Royal Blue to Cyan Dual Wave Ribbons
          ========================================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Soft angular diamond ambient depth echoing the logo's outer shield */}
        <div
          className="absolute -left-[10%] -top-[15%] h-[950px] w-[950px] rotate-45 opacity-[0.10]"
          style={{
            background:
              "radial-gradient(circle, rgba(8, 102, 198, 0.5) 0%, rgba(7, 26, 45, 0.25) 50%, transparent 75%)",
          }}
        />

        {/* Ambient Cyan Glow at Top Right */}
        <div
          className="absolute -right-[10%] top-[10%] h-[750px] w-[750px] rounded-full opacity-[0.07] blur-[150px]"
          style={{
            background: "radial-gradient(circle, #20BCE5 0%, #0866C6 60%, transparent 80%)",
          }}
        />

        {/* Large sweeping curved wave ribbons matching Kalycor logo arcs */}
        <svg
          className="absolute inset-0 size-full opacity-65 mix-blend-screen"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="kalycor-wave-royal" x1="10%" y1="90%" x2="85%" y2="20%">
              <stop offset="0%" stopColor="#030813" stopOpacity="0" />
              <stop offset="30%" stopColor="#071A2D" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#0866C6" stopOpacity="0.6" />
              <stop offset="85%" stopColor="#20BCE5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6BE0FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="kalycor-wave-cyan" x1="15%" y1="80%" x2="80%" y2="30%">
              <stop offset="0%" stopColor="#071A2D" stopOpacity="0" />
              <stop offset="35%" stopColor="#0866C6" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#20BCE5" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#52CFEE" stopOpacity="0" />
            </linearGradient>
            <filter id="blur-crest" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="75" />
            </filter>
            <filter id="blur-deep" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="110" />
            </filter>
          </defs>

          {/* Deep secondary wave arc */}
          <path
            d="M-200,920 C280,960 560,760 920,490 C1220,260 1460,300 1860,130"
            fill="none"
            stroke="url(#kalycor-wave-cyan)"
            strokeWidth="220"
            strokeLinecap="round"
            filter="url(#blur-deep)"
          />

          {/* Primary sweeping crest curve */}
          <path
            d="M-100,830 C340,870 630,670 990,400 C1290,190 1520,220 1820,70"
            fill="none"
            stroke="url(#kalycor-wave-royal)"
            strokeWidth="160"
            strokeLinecap="round"
            filter="url(#blur-crest)"
          />
        </svg>

        {/* Subtle structural grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(32, 188, 229, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(32, 188, 229, 0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Hero Video Background */}
      <video
        src="/videos/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 size-full object-cover object-center opacity-70 pointer-events-none"
      />

      {/* Multi-stage Contrast Vignette */}
      <div className="hero-vignette absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* ==========================================================================
          HERO CONTENT CONTAINER (Aligned with Navbar max-w-[1600px])
          ========================================================================== */}
      <div className="relative z-10 w-full px-[var(--page-gutter)] pt-[clamp(5.5rem,11vh,9rem)] pb-[clamp(2.25rem,5.5vh,5rem)]">
        <div className="mx-auto max-w-[1600px]">
          {/* Top Eyebrow Badge */}
          <div className="mb-4 sm:mb-6 flex items-center gap-3">
            <span
              className="eyebrow word-reveal font-semibold text-[#20BCE5]"
              style={{ "--delay": "150ms" } as CSSProperties}
            >
              Global. Human. Future.
            </span>
            <span className="hidden h-px w-10 bg-gradient-to-r from-[#20BCE5]/60 to-transparent sm:inline-block" />
          </div>

          {/* Primary Hero Heading */}
          <h1 className="display-font max-w-5xl text-[clamp(2.85rem,7.5vw,9rem)] font-bold leading-[1.02] sm:leading-[0.98] md:leading-[0.96] tracking-[-0.065em] text-white">
            <span className="block word-reveal" style={{ "--delay": "250ms" } as CSSProperties}>
              Building a future
            </span>
            <span
              className="serif-font block mt-2 sm:mt-3 md:mt-4 font-normal italic text-[#52CFEE] word-reveal drop-shadow-[0_0_35px_rgba(32,188,229,0.35)]"
              style={{ "--delay": "380ms" } as CSSProperties}
            >
              of possibilities.
            </span>
          </h1>

          {/* Bottom Grid: Supporting Copy + Prominent Call-to-Action Buttons */}
          <div className="mt-[clamp(1.5rem,3.5vh,2.5rem)] grid gap-6 sm:gap-8 pt-4 border-t border-white/10 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-14">
            {/* Supporting Copy */}
            <p
              className="max-w-xl text-base sm:text-lg leading-relaxed text-[#94A3B8] word-reveal"
              style={{ "--delay": "450ms" } as CSSProperties}
            >
              We create the conditions for people, places and markets to move forward across staffing, real estate, agriculture, trade and security.
            </p>

            {/* CTAs & Scroll Link */}
            <div
              className="flex flex-wrap items-center gap-3 sm:gap-4 md:justify-end word-reveal"
              style={{ "--delay": "520ms" } as CSSProperties}
            >
              {/* Primary CTA Button */}
              <a
                href="#services"
                aria-label="Explore Kalycor services"
                className="group inline-flex items-center justify-center gap-2 rounded-sm border border-[#20BCE5]/40 bg-gradient-to-r from-[#0866C6] via-[#1178DE] to-[#20BCE5] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_0_24px_rgba(32,188,229,0.3)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(32,188,229,0.5)] hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              {/* Secondary Action */}
              <a
                href="#enquiry"
                aria-label="Make an enquiry with Kalycor"
                className="group inline-flex items-center justify-center gap-2 rounded-sm border border-[#20BCE5]/25 bg-[#071A2D]/80 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#20BCE5] backdrop-blur-md transition-all duration-300 hover:border-[#20BCE5] hover:bg-[#0A2946] hover:text-white cursor-pointer"
              >
                <span>Make an Enquiry</span>
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
