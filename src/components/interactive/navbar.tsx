"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import brandLogo from "@/assets/WhatsApp Image 2026-09-16 at 6.45.46 PM.jpeg";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = useMemo(() => ["Who We Are", "Services", "Enquiry"], []);

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
        className={`fixed inset-x-0 top-0 z-50 border-b border-transparent px-[var(--page-gutter)] transition-all duration-500 ${scrolled ? "nav-scrolled py-4" : "py-6"
          }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between" aria-label="Primary navigation">
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="group flex items-center gap-3.5 text-left cursor-pointer"
            aria-label="Kalycor Group home"
          >
            <div className="relative h-10 w-12 shrink-0 overflow-hidden rounded-md border border-[#2563eb]/40 bg-[#08162b] shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-[#38bdf8]">
              <Image
                src={brandLogo}
                alt="Kalycor Group Logo"
                fill
                className="object-contain p-0.5"
                sizes="48px"
                priority
              />
            </div>
            <span className="display-font text-sm font-bold tracking-[0.2em] text-white">
              KALYCOR<span className="text-[#38bdf8]">.</span>
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => scrollTo(item === "Who We Are" ? "who-we-are" : item.toLowerCase())}
                className="line-link text-xs uppercase tracking-[0.14em] text-[#94a3b8] transition-colors hover:text-white cursor-pointer"
              >
                {item}
              </button>
            ))}
            <Button
              type="button"
              onClick={() => scrollTo("enquiry")}
              variant="outline"
              size="sm"
              className="border-[#2563eb] bg-transparent px-5 text-[#38bdf8] hover:bg-[#2563eb] hover:text-white transition-all cursor-pointer"
            >
              Make an enquiry <ArrowUpRight className="ml-1 size-3.5" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-white md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-[#071224] px-[var(--page-gutter)] transition-all duration-500 md:hidden ${menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
          }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="relative space-y-5">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => scrollTo(item === "Who We Are" ? "who-we-are" : item.toLowerCase())}
              className="display-font block text-4xl font-semibold tracking-tight text-white transition-colors hover:text-[#38bdf8] text-left cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
        <p className="absolute bottom-8 left-[var(--page-gutter)] eyebrow text-[#38bdf8]">Global. Human. Future.</p>
      </div>
    </>
  );
}
