"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, hovering: false, label: false });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "touch") {
        setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }));
      }
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const hoverEl = target.closest("[data-cursor-hover]");
      const labelEl = target.closest("[data-cursor-label]");
      if (hoverEl || labelEl) {
        setCursor((c) => ({
          ...c,
          hovering: true,
          label: Boolean(labelEl),
        }));
      } else {
        setCursor((c) => ({
          ...c,
          hovering: false,
          label: false,
        }));
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
        className={`cursor-dot ${cursor.hovering ? "is-hovering" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      />
      <div
        className={`cursor-label ${cursor.label ? "is-visible" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      >
        EXPLORE
      </div>
    </>
  );
}
