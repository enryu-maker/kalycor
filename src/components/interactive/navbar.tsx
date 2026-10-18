"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import brandLogo from "@/assets/logo.png";

const NAV_LINKS = [
  { label: "Who We Are", target: "who-we-are", index: "01" },
  { label: "Services", target: "services", index: "02" },
  { label: "Enquiry", target: "enquiry", index: "03" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-[var(--page-gutter)] transition-all duration-500 ease-out ${
          scrolled ? "nav-scrolled py-3 md:py-3.5" : "nav-glass py-4 md:py-5"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out ${
            scrolled ? "opacity-100" : "opacity-0"
          } bg-gradient-to-b from-[#0D1B2E] to-[#081421]`}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent"
          aria-hidden="true"
        />

        <nav
          className="relative mx-auto flex max-w-[1600px] items-center justify-between"
          aria-label="Primary navigation"
        >
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="group flex items-center gap-3.5 sm:gap-4 text-left cursor-pointer transition-transform focus:outline-none"
            aria-label="Kalycor Group home"
          >
            <div className="relative h-11 w-12 shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 sm:h-13 sm:w-14 md:h-14 md:w-15">
              <Image
                src={brandLogo}
                alt="Kalycor Group Logo"
                fill
                className="relative z-10 object-contain drop-shadow-[0_2px_14px_rgba(32,188,229,0.35)] transition-all duration-300 group-hover:drop-shadow-[0_4px_22px_rgba(32,188,229,0.6)]"
                sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="display-font text-base sm:text-lg md:text-xl font-bold tracking-[0.20em] text-white transition-colors duration-300 group-hover:text-white">
                KALYCOR<span className="text-[#20BCE5]">.</span>
              </span>
            </div>
          </button>

          <div className="hidden items-center gap-8 lg:gap-10 md:flex">
            <div className="flex items-center gap-7 lg:gap-9">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollTo(item.target)}
                  className="line-link text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[#94A3B8] transition-colors duration-300 hover:text-white cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollTo("enquiry")}
              className="group relative inline-flex items-center justify-center rounded-md border border-[#20BCE5]/30 bg-gradient-to-r from-[#071A2D]/90 via-[#0A233D]/80 to-[#071A2D]/90 px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#20BCE5] shadow-[0_4px_16px_rgba(8,102,198,0.18)] transition-all duration-300 hover:border-[#20BCE5] hover:bg-gradient-to-r hover:from-[#0866C6] hover:to-[#20BCE5] hover:text-white hover:shadow-[0_0_22px_rgba(32,188,229,0.40)] cursor-pointer backdrop-blur-md"
            >
              <span>Make an enquiry</span>
              <ArrowUpRight className="ml-1 size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <button
            type="button"
            className="flex items-center justify-center size-9 rounded-md text-white md:hidden border border-white/10 bg-[#071A2D]/50 hover:bg-[#0A2946] hover:text-[#20BCE5] transition-all cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#0A1725]/96 backdrop-blur-2xl px-[var(--page-gutter)] pt-28 pb-10 transition-all duration-500 ease-in-out md:hidden ${
          open
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(8,102,198,0.22),transparent_60%),radial-gradient(circle_at_20%_80%,rgba(32,188,229,0.12),transparent_50%)]"
          aria-hidden="true"
        />

        <div className="relative space-y-6 my-auto">
          {NAV_LINKS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollTo(item.target)}
              className="group flex w-full items-baseline justify-between border-b border-[#20BCE5]/10 pb-4 text-left cursor-pointer transition-colors"
            >
              <span className="display-font text-3xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#20BCE5]">
                {item.label}
              </span>
              <span className="font-mono text-xs text-[#20BCE5]/70 tracking-widest">
                {item.index}
              </span>
            </button>
          ))}

          <div className="pt-4">
            <button
              type="button"
              onClick={() => scrollTo("enquiry")}
              className="flex w-full items-center justify-center gap-2 rounded-sm border border-[#20BCE5]/40 bg-gradient-to-r from-[#0866C6] to-[#20BCE5] py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(32,188,229,0.3)] transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>Make an enquiry</span>
              <ArrowUpRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-between pt-6 border-t border-white/5">
          <p className="eyebrow text-[#20BCE5]">Global. Human. Future.</p>
          <span className="text-[0.7rem] text-[#94A3B8]">© Kalycor Group</span>
        </div>
      </div>
    </>
  );
}
