"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [cursor, setCursor] = useState({
    hovering: false,
    label: false,
    text: "EXPLORE",
  });

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;

      if (dotRef.current) {
        dotRef.current.style.left = x;
        dotRef.current.style.top = y;
      }
      if (labelRef.current) {
        labelRef.current.style.left = x;
        labelRef.current.style.top = y;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverEl = target.closest("[data-cursor-hover]");
      const labelEl = target.closest("[data-cursor-label]");
      const customLabel = labelEl?.getAttribute("data-cursor-label");

      if (hoverEl || labelEl) {
        setCursor({
          hovering: true,
          label: Boolean(labelEl),
          text: customLabel?.trim() || "EXPLORE",
        });
      } else {
        setCursor((prev) =>
          prev.hovering ? { hovering: false, label: false, text: "EXPLORE" } : prev
        );
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${cursor.hovering ? "is-hovering" : ""}`}
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className={`cursor-label ${cursor.label ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        {cursor.text}
      </div>
    </>
  );
}
