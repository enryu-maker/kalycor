"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const navItems = useMemo(() => ["Who We Are", "Services", "Enquiry", "Connect"], []);

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
        className={`fixed inset-x-0 top-0 z-50 border-b border-transparent px-[var(--page-gutter)] transition-all duration-500 ${
          scrolled ? "nav-scrolled py-4" : "py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between" aria-label="Primary navigation">
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="group flex items-center gap-3 text-left cursor-pointer"
            aria-label="Northstar Group home"
          >
            <span className="grid size-9 place-items-center border border-primary text-primary transition-transform duration-500 group-hover:rotate-45">
              <span className="block size-2 bg-primary" />
            </span>
            <span className="display-font text-sm font-bold tracking-[0.2em] text-foreground">
              NORTHSTAR<span className="text-primary">.</span>
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => scrollTo(item === "Who We Are" ? "who-we-are" : item.toLowerCase())}
                className="line-link text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                {item}
              </button>
            ))}
            <Button
              type="button"
              onClick={() => scrollTo("connect")}
              variant="outline"
              size="sm"
              className="border-primary/60 bg-transparent px-5 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Let&apos;s connect <ArrowUpRight className="ml-1 size-3.5" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-foreground md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-background px-[var(--page-gutter)] transition-all duration-500 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent_42%)]" />
        <div className="relative space-y-5">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => scrollTo(item === "Who We Are" ? "who-we-are" : item.toLowerCase())}
              className="display-font block text-4xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary text-left cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
        <p className="absolute bottom-8 left-[var(--page-gutter)] eyebrow">Global. Human. Future.</p>
      </div>
    </>
  );
}
