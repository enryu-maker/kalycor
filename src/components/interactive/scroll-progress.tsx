"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((element) => observer.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-[2.5px] bg-gradient-to-r from-[#105080] via-[#2563eb] to-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.7)] transition-all duration-150"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
