"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import brandLogo from "@/assets/logo.png";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = useMemo(
    () => [
      { name: "Who We Are", id: "who-we-are", number: "01" },
      { name: "Services", id: "services", number: "02" },
      { name: "Enquiry", id: "enquiry", number: "03" },
    ],
    []
  );

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-[var(--page-gutter)] transition-all duration-500 ease-out ${
          scrolled ? "nav-scrolled py-3.5 md:py-4" : "nav-glass py-5 md:py-6"
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1600px] items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Brand Logo & Wordmark Lockup */}
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="group flex items-center gap-3.5 text-left cursor-pointer transition-transform focus:outline-none"
            aria-label="Kalycor Group home"
          >
            <div className="relative h-9 w-11 shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 sm:h-10 sm:w-12">
              <Image
                src={brandLogo}
                alt="Kalycor Group Logo"
                fill
                className="relative z-10 object-contain drop-shadow-[0_2px_12px_rgba(8,102,198,0.25)]"
                sizes="(max-width: 640px) 44px, 48px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="display-font text-sm font-bold tracking-[0.22em] text-white transition-colors duration-300 group-hover:text-white">
                KALYCOR<span className="text-[#20BCE5]">.</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links & Action Button */}
          <div className="hidden items-center gap-8 lg:gap-10 md:flex">
            <div className="flex items-center gap-7 lg:gap-9">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="line-link text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[#94A3B8] transition-colors duration-300 hover:text-white cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Prominent Brand CTA Button */}
            <Button
              type="button"
              onClick={() => scrollTo("enquiry")}
              variant="outline"
              size="sm"
              className="group relative border border-[#20BCE5]/30 bg-gradient-to-r from-[#071A2D]/90 via-[#0A233D]/80 to-[#071A2D]/90 px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#20BCE5] shadow-[0_4px_16px_rgba(8,102,198,0.18)] transition-all duration-300 hover:border-[#20BCE5] hover:bg-gradient-to-r hover:from-[#0866C6] hover:to-[#20BCE5] hover:text-white hover:shadow-[0_0_22px_rgba(32,188,229,0.40)] cursor-pointer backdrop-blur-md"
            >
              <span>Make an enquiry</span>
              <ArrowUpRight className="ml-1 size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-white md:hidden border border-white/10 bg-[#071A2D]/50 hover:bg-[#0A2946] hover:text-[#20BCE5] transition-all cursor-pointer"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </nav>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#02050B]/98 backdrop-blur-2xl px-[var(--page-gutter)] pt-28 pb-10 transition-all duration-500 ease-in-out md:hidden ${
          menuOpen
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Subtle Brand Ambient Glow in Mobile Menu */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(8,102,198,0.22),transparent_60%),radial-gradient(circle_at_20%_80%,rgba(32,188,229,0.12),transparent_50%)]"
          aria-hidden="true"
        />

        {/* Navigation Items with Numbers */}
        <div className="relative space-y-6 my-auto">
          {navItems.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="group flex w-full items-baseline justify-between border-b border-[#20BCE5]/10 pb-4 text-left cursor-pointer transition-colors"
            >
              <span className="display-font text-3xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#20BCE5]">
                {item.name}
              </span>
              <span className="font-mono text-xs text-[#20BCE5]/70 tracking-widest">
                {item.number}
              </span>
            </button>
          ))}

          {/* Mobile CTA */}
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

        {/* Mobile Footer Tagline */}
        <div className="relative flex items-center justify-between pt-6 border-t border-white/5">
          <p className="eyebrow text-[#20BCE5]">Global. Human. Future.</p>
          <span className="text-[0.7rem] text-[#94A3B8]">© Kalycor Group</span>
        </div>
      </div>
    </>
  );
}
