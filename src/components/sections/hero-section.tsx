import type { CSSProperties } from "react";
import { ArrowDownRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="top" className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-[#071326]">
      <video
        src="/videos/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover object-center pointer-events-none"
      />
      <div className="hero-vignette absolute inset-0" />
      <div className="relative z-10 w-full px-[var(--page-gutter)] pb-12 pt-40 md:pb-16">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow mb-6 text-[#38bdf8] word-reveal tracking-[0.2em]" style={{ "--delay": "180ms" } as CSSProperties}>
              Global. Human. Future.
            </p>
            <h1 className="display-font max-w-5xl text-[clamp(3.4rem,9.5vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white">
              <span className="block word-reveal" style={{ "--delay": "280ms" } as CSSProperties}>
                Building a future
              </span>
              <span
                className="serif-font block font-normal italic text-[#66c8f5] word-reveal drop-shadow-[0_0_35px_rgba(56,189,248,0.25)]"
                style={{ "--delay": "400ms" } as CSSProperties}
              >
                of possibilities.
              </span>
            </h1>
          </div>
          <div className="flex items-end gap-10 md:pb-2">
            <p className="hidden max-w-[14rem] text-sm leading-relaxed text-[#94a3b8] md:block">
              We create the conditions for people, places and markets to move forward.
            </p>
            <a
              href="#services"
              className="group flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white cursor-pointer"
            >
              <span className="grid size-11 place-items-center rounded-full border border-white/30 transition-all duration-300 group-hover:border-[#38bdf8] group-hover:bg-[#105080] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.35)] group-hover:text-white">
                <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </span>
              <span className="hidden sm:block text-[#94a3b8] transition-colors group-hover:text-white">Scroll to explore</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
