"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConnectForm() {
  const [connectSent, setConnectSent] = useState(false);

  if (connectSent) {
    return (
      <div className="reveal-on-scroll is-visible max-w-xl rounded-sm border border-primary-foreground/30 bg-primary-foreground/10 p-8 backdrop-blur-sm">
        <span className="mb-4 grid size-10 place-items-center rounded-full bg-primary-foreground text-primary">
          <Check className="size-5" />
        </span>
        <h3 className="display-font text-3xl font-semibold">Message sent.</h3>
        <p className="mt-2 text-sm text-primary-foreground/80">
          Thank you for reaching out. We will connect with you soon.
        </p>
        <button
          type="button"
          onClick={() => setConnectSent(false)}
          className="mt-6 text-xs uppercase tracking-[0.16em] underline underline-offset-4 cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setConnectSent(true);
      }}
      className="grid items-end gap-12 lg:grid-cols-[1fr_auto] lg:gap-24"
    >
      <div className="grid max-w-3xl gap-x-10 gap-y-7 sm:grid-cols-2">
        <label className="form-field block py-3 border-primary-foreground/35">
          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">Name *</span>
          <input type="text" required aria-label="Name" className="text-base placeholder:text-current" />
        </label>
        <label className="form-field block py-3 border-primary-foreground/35">
          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">Email *</span>
          <input type="email" required aria-label="Email" className="text-base placeholder:text-current" />
        </label>
        <label className="form-field block py-3 border-primary-foreground/35">
          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">Phone</span>
          <input type="tel" aria-label="Phone" className="text-base placeholder:text-current" />
        </label>
        <label className="form-field block py-3 border-primary-foreground/35">
          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">Company</span>
          <input type="text" aria-label="Company" className="text-base placeholder:text-current" />
        </label>
        <label className="form-field block py-3 border-primary-foreground/35">
          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">City / Country</span>
          <input type="text" aria-label="City / Country" className="text-base placeholder:text-current" />
        </label>
        <label className="form-field block py-3 border-primary-foreground/35">
          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] opacity-65">How can we help? *</span>
          <input type="text" required aria-label="How can we help?" className="text-base placeholder:text-current" />
        </label>
      </div>
      <Button
        type="submit"
        variant="outline"
        size="lg"
        className="group h-14 border-primary-foreground/60 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground hover:text-primary cursor-pointer"
      >
        <span>Start a conversation</span>
        <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Button>
    </form>
  );
}
