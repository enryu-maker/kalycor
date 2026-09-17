import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import heroImage from "@/assets/hero-global.jpg";

export function HeroSection() {
  return (
    <section id="top" className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-[#071224]">
      <Image
        src={heroImage}
        alt="Kalycor global operations and architecture"
        priority
        fill
        className="hero-image object-cover object-center"
        sizes="100vw"
      />
      <div className="hero-vignette absolute inset-0" />
      <div className="relative z-10 w-full px-[var(--page-gutter)] pb-12 pt-40 md:pb-16">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow mb-6 text-[#38bdf8] word-reveal" style={{ "--delay": "180ms" } as CSSProperties}>
              Global. Human. Future.
            </p>
            <h1 className="display-font max-w-5xl text-[clamp(3.4rem,9.5vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white">
              <span className="block word-reveal" style={{ "--delay": "280ms" } as CSSProperties}>
                Building a future
              </span>
              <span
                className="serif-font block font-normal italic text-[#3b82f6] word-reveal"
                style={{ "--delay": "400ms" } as CSSProperties}
              >
                of possibilities.
              </span>
            </h1>
          </div>
          <div className="flex items-end gap-10 md:pb-2">
            <p className="hidden max-w-[14rem] text-sm leading-relaxed text-white/75 md:block">
              We create the conditions for people, places and markets to move forward.
            </p>
            <a
              href="#services"
              className="group flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white cursor-pointer"
            >
              <span className="grid size-11 place-items-center rounded-full border border-white/40 transition-all duration-300 group-hover:border-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white">
                <ArrowDownRight className="size-4" />
              </span>
              <span className="hidden sm:block">Scroll to explore</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
