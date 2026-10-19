"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";

export interface ServiceItem {
  number: string;
  name: string;
  video: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    number: "01",
    name: "Staffing",
    video: "/videos/video1.mp4",
    description:
      "Connecting businesses with exceptional people and creating opportunities that move organizations forward.",
  },
  {
    number: "02",
    name: "Real Estate",
    video: "/videos/video3.mp4",
    description:
      "Creating and shaping spaces designed for people, businesses and long-term value.",
  },
  {
    number: "03",
    name: "Agriculture",
    video: "/videos/video4.mp4",
    description:
      "Building sustainable pathways from cultivation to markets through modern agricultural opportunities.",
  },
  {
    number: "04",
    name: "Import / Export",
    video: "/videos/video5.mp4",
    description:
      "Connecting markets, products and opportunities across borders through dependable global trade.",
  },
  {
    number: "05",
    name: "Security",
    video: "/videos/video2.mp4",
    description:
      "Protecting people, places and businesses through integrated security and surveillance solutions.",
  },
];

export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const pillTrackRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;

    const onChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.01, rootMargin: "150px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const el = rootRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const winH = window.innerHeight;
        const isDesktop = window.innerWidth >= 1024;

        const stickyTop = isDesktop ? 112 : 72;
        const stickyH = stickyRef.current?.offsetHeight || (isDesktop ? 650 : 500);
        const scrollable = Math.max(1, el.offsetHeight - stickyH);
        const scrolled = stickyTop - rect.top;

        let index = 0;
        if (scrolled <= 0) {
          index = 0;
        } else if (scrolled >= scrollable) {
          index = services.length - 1;
        } else {
          const ratio = scrolled / scrollable;
          index = Math.min(
            services.length - 1,
            Math.max(0, Math.floor(ratio * services.length))
          );
        }

        setActive((prev) => (prev !== index ? index : prev));

        if (prefersReducedMotion.current) {
          el.style.setProperty("--parallax-y", "0px");
          el.style.setProperty("--services-progress", "0");
          return;
        }

        if (rect.bottom > -100 && rect.top < winH + 100) {
          const totalDist = el.offsetHeight + winH;
          const currentDist = winH - rect.top;
          const progress = Math.max(0, Math.min(1, currentDist / totalDist));
          const parallax = isDesktop ? (progress - 0.5) * -16 : 0;

          el.style.setProperty("--services-progress", progress.toFixed(4));
          el.style.setProperty("--parallax-y", `${parallax.toFixed(2)}px`);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const track = pillTrackRef.current;
    if (track && track.scrollWidth > track.clientWidth) {
      pillRefs.current[active]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [active]);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      const isCurrent = i === active;
      const shouldPlay = isCurrent && (inView || (isDesktop && hovered));

      if (shouldPlay) {
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, hovered, inView]);

  const selectService = (index: number) => {
    setActive(index);
    const el = rootRef.current;
    if (!el) return;

    const isDesktop = window.innerWidth >= 1024;
    const rect = el.getBoundingClientRect();
    const stickyTop = isDesktop ? 112 : 72;
    const stickyH = stickyRef.current?.offsetHeight || (isDesktop ? 650 : 500);
    const scrollable = Math.max(1, el.offsetHeight - stickyH);

    // Midpoint of target service scroll segment
    const segmentProgress = (index + 0.5) / services.length;
    const targetY = window.scrollY + rect.top - stickyTop + segmentProgress * scrollable;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) {
        selectService((active + 1) % services.length);
      } else {
        selectService((active - 1 + services.length) % services.length);
      }
    }
    touchStart.current = null;
  };

  return (
    <div
      ref={rootRef}
      className="services-showcase-container grid gap-6 sm:gap-8 lg:grid-cols-[0.35fr_1.65fr] lg:gap-16 relative w-full min-w-0"
    >
      <aside className="hidden lg:block relative min-w-0">
        <div className="services-nav-column sticky top-28">
          <div className="relative pl-7">
            <div
              className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-white/10 rounded-full"
              aria-hidden="true"
            />
            <div
              className="absolute left-0 w-0.5 h-7 bg-linear-to-b from-[#20BCE5] via-[#20BCE5] to-[#0866C6] rounded-full shadow-[0_0_12px_rgba(32,188,229,0.85)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
              style={{ transform: `translateY(${active * 52}px)` }}
              aria-hidden="true"
            />

            <div className="space-y-6">
              {services.map((item, index) => {
                const isActive = active === index;
                const distance = Math.abs(index - active);
                const scale = isActive ? 1.03 : 0.98;
                const opacity = isActive ? 1 : Math.max(0.45, 0.72 - distance * 0.1);

                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => selectService(index)}
                    data-active={isActive}
                    className={`service-nav-item relative flex items-center h-7 w-full text-left text-sm uppercase tracking-[0.13em] cursor-pointer will-change-transform ${
                      isActive ? "text-white font-semibold" : "text-[#94a3b8] hover:text-white"
                    }`}
                    style={{
                      transform: `scale(${scale})`,
                      opacity,
                      transition:
                        "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, color 0.3s ease",
                    }}
                    data-cursor-hover
                  >
                    <div className="flex items-center">
                      <span
                        className={`mr-4 font-mono transition-all duration-300 ${
                          isActive
                            ? "text-[#20BCE5] font-bold drop-shadow-[0_0_8px_rgba(32,188,229,0.55)]"
                            : "text-[#20BCE5]/70"
                        }`}
                      >
                        {item.number}
                      </span>
                      <span className="transition-colors duration-300">{item.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      <div className="relative w-full min-w-0">
        <div ref={stickyRef} className="services-sticky-column w-full min-w-0">
          <div className="relative w-full max-w-full lg:hidden mb-3.5 sm:mb-4">
            <div
              ref={pillTrackRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar px-1.5 py-1.5 scroll-smooth w-full min-w-0"
            >
              {services.map((item, index) => {
                const isActive = active === index;
                return (
                  <button
                    key={item.number}
                    ref={(el) => {
                      pillRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => selectService(index)}
                    className={`shrink-0 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer active:scale-95 ${
                      isActive
                        ? "bg-[#0866C6]/50 border border-[#20BCE5] text-white shadow-[0_0_14px_rgba(32,188,229,0.4)] font-semibold scale-105"
                        : "bg-[#071A2D]/80 border border-white/10 text-[#94a3b8] hover:text-white"
                    }`}
                  >
                    <span className={isActive ? "text-[#20BCE5] font-bold" : "text-[#20BCE5]/70"}>
                      {item.number}
                    </span>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider whitespace-nowrap">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onClick={() => setHovered((prev) => !prev)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            data-cursor-hover
            data-cursor-label="PLAY"
            className={`group relative z-10 h-[50vh] min-h-[380px] max-h-[480px] sm:h-auto sm:aspect-16/10 sm:max-h-[calc(100vh-16rem)] w-full min-w-0 overflow-hidden rounded-none lg:rounded-sm bg-[#040A14]/94 backdrop-blur-md cursor-pointer transition-[border-color,box-shadow] duration-400 ${
              hovered
                ? "border-0 lg:border lg:border-[#20BCE5]/60 lg:shadow-[0_28px_60px_rgba(32,188,229,0.25)]"
                : "border-0 lg:border lg:border-[#20BCE5]/25 shadow-[0_12px_30px_rgba(0,0,0,0.6)] lg:shadow-[0_24px_50px_rgba(2,6,12,0.85)]"
            }`}
            style={
              isDesktop
                ? {
                    transform: "translate3d(0, var(--parallax-y, 0px), 0)",
                    transition:
                      "transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease",
                  }
                : {
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                  }
            }
          >
            {isDesktop ? (
              <div
                className="absolute inset-x-0 top-0 w-full flex flex-col will-change-transform motion-reduce:transition-none"
                style={{
                  height: `${services.length * 100}%`,
                  transform: `translate3d(0, -${(active * 100) / services.length}%, 0)`,
                  transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {services.map((item, index) => {
                  const diff = index - active;
                  return (
                    <div
                      key={item.number}
                      className="relative w-full shrink-0 overflow-hidden"
                      style={{ height: `${100 / services.length}%` }}
                    >
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                          if (el) {
                            el.disablePictureInPicture = true;
                            el.disableRemotePlayback = true;
                          }
                        }}
                        src={item.video}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        className="service-visual pointer-events-none size-full object-cover object-center will-change-transform transition-transform duration-700 ease-out"
                        style={{
                          transform: `translate3d(0, ${diff * 8}%, 0) scale(${index === active ? 1 : 1.05})`,
                        }}
                        data-cursor-hover
                        data-cursor-label="PLAY"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="absolute inset-0 size-full overflow-hidden">
                {services.map((item, index) => {
                  const isCurrent = index === active;
                  return (
                    <div
                      key={item.number}
                      className={`absolute inset-0 size-full transition-opacity duration-500 ease-out ${
                        isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                          if (el) {
                            el.disablePictureInPicture = true;
                            el.disableRemotePlayback = true;
                          }
                        }}
                        src={item.video}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        className="service-visual pointer-events-none size-full object-cover object-center"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            <div
              className={`pointer-events-none absolute right-2.5 top-2.5 sm:right-4 sm:top-4 z-20 hidden lg:flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md transition-all duration-300 ${
                hovered
                  ? "border-[#20BCE5]/40 bg-[#0866C6]/40 shadow-[0_0_16px_rgba(32,188,229,0.3)] opacity-95"
                  : "bg-[#071A2D]/85 opacity-85 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
              }`}
            >
              <span className="relative flex size-1.5 sm:size-2">
                {hovered && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#20BCE5] opacity-75" />
                )}
                <span
                  className={`relative inline-flex size-1.5 sm:size-2 rounded-full transition-colors duration-300 ${
                    hovered ? "bg-[#20BCE5]" : "bg-slate-400"
                  }`}
                />
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-medium tracking-wider uppercase text-white/90 whitespace-nowrap">
                {hovered ? "Playing" : "Preview"}
              </span>
            </div>

            <div className="absolute inset-0 z-10 bg-linear-to-t from-[#040A14]/92 via-transparent to-transparent pointer-events-auto" />

            <div className="pointer-events-none absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-end justify-between sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8">
              <div className="flex-1 min-w-0 pr-3 sm:pr-4">
                <div className="relative h-4 sm:h-5 w-full overflow-hidden mb-1 sm:mb-2">
                  {services.map((item, index) => {
                    const diff = index - active;
                    const isActive = active === index;
                    return (
                      <p
                        key={item.number}
                        className={`absolute inset-0 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#D57A1C] lg:text-[#20BCE5] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "opacity-100 translate-y-0"
                            : diff > 0
                              ? "opacity-0 translate-y-full"
                              : "opacity-0 -translate-y-full"
                        }`}
                      >
                        {item.number}
                      </p>
                    );
                  })}
                </div>

                <div className="relative h-8 sm:h-10 md:h-14 lg:h-16 w-full overflow-hidden">
                  {services.map((item, index) => {
                    const diff = index - active;
                    const isActive = active === index;
                    return (
                      <h3
                        key={item.number}
                        className={`absolute inset-0 display-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "opacity-100 translate-y-0"
                            : diff > 0
                              ? "opacity-0 translate-y-full"
                              : "opacity-0 -translate-y-full"
                        }`}
                      >
                        {item.name}
                      </h3>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label={`Enquire about ${services[active].name}`}
                className="pointer-events-auto hidden lg:flex size-8 sm:size-10 md:size-11 place-items-center justify-center rounded-full border border-white/30 transition-all duration-300 hover:scale-110 hover:border-[#20BCE5] hover:bg-[#071A2D]/90 hover:shadow-[0_0_20px_rgba(32,188,229,0.35)] active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#20BCE5]"
              >
                <ArrowDownRight className="size-3.5 sm:size-4 md:size-5 text-white" />
              </button>
            </div>
          </div>

          <div className="w-full border-t border-white/10 lg:hidden mt-2.5 mb-2 sm:mt-6 sm:mb-6" />

          <div className="lg:hidden relative min-h-12 sm:min-h-18 w-full min-w-0">
            {services.map((item, index) => {
              const diff = index - active;
              const isActive = active === index;
              return (
                <div
                  key={item.number}
                  className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "opacity-100 translate-y-0 relative"
                      : diff > 0
                        ? "opacity-0 translate-y-4 pointer-events-none absolute inset-x-0 top-0"
                        : "opacity-0 -translate-y-4 pointer-events-none absolute inset-x-0 top-0"
                  }`}
                >
                  <p className="text-xs sm:text-base leading-relaxed text-[#94a3b8] max-w-md">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:block relative min-h-13 sm:min-h-15 mt-3 sm:mt-4 w-full min-w-0 overflow-hidden">
            {services.map((item, index) => {
              const diff = index - active;
              const isActive = active === index;
              return (
                <p
                  key={item.number}
                  className={`absolute inset-x-0 top-0 w-full max-w-full text-xs sm:text-sm md:text-base leading-relaxed text-[#94a3b8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : diff > 0
                        ? "opacity-0 translate-y-4 pointer-events-none"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                  }`}
                >
                  {item.description}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
