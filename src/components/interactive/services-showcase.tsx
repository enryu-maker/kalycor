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
  const [activeService, setActiveService] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isSectionInView, setIsSectionInView] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rightStickyRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mobilePillsContainerRef = useRef<HTMLDivElement>(null);
  const mobilePillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useRef<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Section visibility detection for performance optimization
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionInView(entry.isIntersecting);
        });
      },
      { threshold: 0.01, rootMargin: "150px 0px 150px 0px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Synchronized scroll engine (Desktop only >= 1024px)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;
      const isDesktop = window.innerWidth >= 1024;

      if (!isDesktop) {
        // Mobile view: change video 1, 2, 3, etc. as the user scrolls through the service section
        const startY = winHeight * 0.70;
        const endY = 50;
        const totalDistance = startY - endY;
        const currentDistance = startY - rect.top;

        let targetIndex = 0;
        if (currentDistance <= 0) {
          targetIndex = 0;
        } else if (currentDistance >= totalDistance) {
          targetIndex = services.length - 1;
        } else {
          const progress = currentDistance / totalDistance;
          targetIndex = Math.min(
            services.length - 1,
            Math.max(0, Math.floor(progress * services.length))
          );
        }

        setActiveService((prev) => (prev !== targetIndex ? targetIndex : prev));
        return;
      }

      // SCROLL SYNCHRONIZATION: Section scroll progress -> activeService
      const stickyTop = 112; // 7rem in px
      const stickyHeight = rightStickyRef.current?.offsetHeight || 650;
      const totalScrollable = Math.max(1, containerRef.current.offsetHeight - stickyHeight);
      const currentScrolled = stickyTop - rect.top;

      let targetIndex = 0;
      if (currentScrolled <= 0) {
        targetIndex = 0;
      } else if (currentScrolled >= totalScrollable) {
        targetIndex = services.length - 1;
      } else {
        const progress = currentScrolled / totalScrollable;
        targetIndex = Math.min(
          services.length - 1,
          Math.max(0, Math.floor(progress * services.length))
        );
      }

      setActiveService((prev) => (prev !== targetIndex ? targetIndex : prev));

      // PARALLAX
      if (prefersReducedMotion.current) {
        containerRef.current.style.setProperty("--parallax-y", "0px");
        containerRef.current.style.setProperty("--services-progress", "0");
        return;
      }

      if (rect.bottom > -100 && rect.top < winHeight + 100) {
        const totalDistance = containerRef.current.offsetHeight + winHeight;
        const currentDistance = winHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
        const parallaxY = (progress - 0.5) * -16;

        containerRef.current.style.setProperty("--services-progress", progress.toFixed(4));
        containerRef.current.style.setProperty("--parallax-y", `${parallaxY.toFixed(2)}px`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Auto-scroll active mobile pill into view when activeService updates
  useEffect(() => {
    if (mobilePillRefs.current[activeService] && mobilePillsContainerRef.current) {
      const pill = mobilePillRefs.current[activeService];
      pill?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeService]);

  // Seamless video playback: Play active service video automatically when section is in view
  useEffect(() => {
    videoRefs.current.forEach((videoEl, index) => {
      if (!videoEl) return;
      if (index !== activeService || !isSectionInView) {
        videoEl.pause();
      } else {
        videoEl.muted = true;
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => { });
        }
      }
    });
  }, [activeService, isSectionInView]);

  // Click handler: smooth scroll on desktop, instant switch on mobile/tablet
  const handleServiceClick = (index: number) => {
    setActiveService(index);
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

    if (isDesktop && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const stickyTop = 112;
      const stickyHeight = rightStickyRef.current?.offsetHeight || 650;
      const totalScrollable = Math.max(1, containerRef.current.offsetHeight - stickyHeight);

      // Scroll to the midpoint of the targeted service's scroll segment
      const targetProgress = (index + 0.5) / services.length;
      const targetScrollY =
        window.scrollY +
        rect.top -
        stickyTop +
        targetProgress * totalScrollable;

      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    } else if (!isDesktop && containerRef.current) {
      const winHeight = window.innerHeight;
      const rect = containerRef.current.getBoundingClientRect();
      const startY = winHeight * 0.70;
      const endY = 50;
      const totalDistance = startY - endY;
      const targetDistance = ((index + 0.5) / services.length) * totalDistance;
      const targetScrollY = window.scrollY + rect.top - (startY - targetDistance);

      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  };

  // Touch swipe support for mobile video card
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        handleServiceClick((activeService + 1) % services.length);
      } else {
        handleServiceClick((activeService - 1 + services.length) % services.length);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="services-showcase-container grid gap-6 sm:gap-8 lg:grid-cols-[0.35fr_1.65fr] lg:gap-16 relative w-full min-w-0"
    >
      {/* 1. Left Sticky Navigation Column (Desktop only >= 1024px) with Vertical Progress Track */}
      <div className="hidden lg:block relative min-w-0">
        <div className="services-nav-column sticky top-28">
          <div className="relative pl-7">
            {/* Continuous Vertical Rail */}
            <div
              className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-white/10 rounded-full"
              aria-hidden="true"
            />
            {/* Smoothly Animated Vertical Active Slider Pill */}
            <div
              className="absolute left-0 w-[2px] h-7 bg-gradient-to-b from-[#20BCE5] via-[#20BCE5] to-[#0866C6] rounded-full shadow-[0_0_12px_rgba(32,188,229,0.85)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
              style={{
                transform: `translateY(${activeService * 52}px)`,
              }}
              aria-hidden="true"
            />

            <div className="space-y-6">
              {services.map((service, index) => {
                const isActive = activeService === index;
                const diff = index - activeService;

                const itemScale = isActive ? 1.03 : 0.98;
                const itemOpacity = isActive ? 1 : Math.max(0.45, 0.72 - Math.abs(diff) * 0.1);

                return (
                  <button
                    key={service.number}
                    type="button"
                    onClick={() => handleServiceClick(index)}
                    data-active={isActive}
                    className={`service-nav-item relative flex items-center h-7 w-full text-left text-sm uppercase tracking-[0.13em] cursor-pointer will-change-transform ${isActive ? "text-white font-semibold" : "text-[#94a3b8] hover:text-white"
                      }`}
                    style={{
                      transform: `scale(${itemScale})`,
                      opacity: itemOpacity,
                      transition:
                        "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, color 0.3s ease",
                    }}
                    data-cursor-hover
                  >
                    <div className="flex items-center">
                      <span
                        className={`mr-4 font-mono transition-all duration-300 ${isActive
                            ? "text-[#20BCE5] font-bold drop-shadow-[0_0_8px_rgba(32,188,229,0.55)]"
                            : "text-[#20BCE5]/70"
                          }`}
                      >
                        {service.number}
                      </span>
                      <span className="transition-colors duration-300">{service.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Unified Showcase Visual & Content (Sticky on Desktop, Tablet & Mobile) */}
      <div className="relative w-full min-w-0">
        <div ref={rightStickyRef} className="services-sticky-column w-full min-w-0">
          {/* Mobile / Tablet Horizontal Service Indicator Pills */}
          <div className="relative w-full max-w-full overflow-hidden lg:hidden mb-3 sm:mb-4">
            <div
              ref={mobilePillsContainerRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth w-full min-w-0"
            >
              {services.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <button
                    key={service.number}
                    ref={(el) => {
                      mobilePillRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => handleServiceClick(index)}
                    className={`shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer active:scale-95 ${isActive
                        ? "bg-[#0866C6]/50 border border-[#20BCE5] text-white shadow-[0_0_14px_rgba(32,188,229,0.4)] font-semibold scale-105"
                        : "bg-[#071A2D]/80 border border-white/10 text-[#94a3b8] hover:text-white"
                      }`}
                  >
                    <span className={isActive ? "text-[#20BCE5] font-bold" : "text-[#20BCE5]/70"}>
                      {service.number}
                    </span>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider">{service.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Visual Showcase with Parallax Float & Touch Swipe */}
          <div
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
            onPointerEnter={() => setIsVideoHovered(true)}
            onPointerLeave={() => setIsVideoHovered(false)}
            onClick={() => setIsVideoHovered((prev) => !prev)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            data-cursor-hover
            data-cursor-label="PLAY"
            className={`group relative z-10 aspect-[300/277] sm:aspect-[16/10] max-h-[calc(100vh-14rem)] sm:max-h-[calc(100vh-16rem)] min-h-[240px] sm:min-h-[280px] w-full min-w-0 overflow-hidden rounded-none lg:rounded-sm bg-[#040A14]/94 backdrop-blur-md cursor-pointer will-change-transform transition-[border-color,box-shadow] duration-400 ${isVideoHovered
                ? "border-0 lg:border lg:border-[#20BCE5]/60 lg:shadow-[0_28px_60px_rgba(32,188,229,0.25)]"
                : "border-0 lg:border lg:border-[#20BCE5]/25 shadow-[0_12px_30px_rgba(0,0,0,0.6)] lg:shadow-[0_24px_50px_rgba(2,6,12,0.85)]"
              }`}
            style={{
              transform: "translate3d(0, var(--parallax-y, 0px), 0)",
              transition: "transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {/* Sliding Vertical Video Reel with Inner Vertical Parallax */}
            <div
              className="absolute inset-x-0 top-0 w-full flex flex-col will-change-transform motion-reduce:transition-none"
              style={{
                height: `${services.length * 100}%`,
                transform: `translate3d(0, -${(activeService * 100) / services.length}%, 0)`,
                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {services.map((service, index) => {
                const diff = index - activeService;
                return (
                  <div
                    key={service.number}
                    className="relative w-full shrink-0 overflow-hidden"
                    style={{ height: `${100 / services.length}%` }}
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={service.video}
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="service-visual size-full object-cover object-center will-change-transform transition-transform duration-700 ease-out"
                      style={{
                        transform: `translate3d(0, ${diff * 8}%, 0) scale(${index === activeService ? 1 : 1.05})`,
                      }}
                      data-cursor-hover
                      data-cursor-label="PLAY"
                    />
                  </div>
                );
              })}
            </div>

            {/* Hover to Play State Indicator Pill (Desktop only) */}
            <div
              className={`pointer-events-none absolute right-2.5 top-2.5 sm:right-4 sm:top-4 z-20 hidden lg:flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md transition-all duration-300 ${isVideoHovered
                  ? "border-[#20BCE5]/40 bg-[#0866C6]/40 shadow-[0_0_16px_rgba(32,188,229,0.3)] opacity-95"
                  : "bg-[#071A2D]/85 opacity-85 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                }`}
            >
              <span className="relative flex size-1.5 sm:size-2">
                {isVideoHovered && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#20BCE5] opacity-75" />
                )}
                <span
                  className={`relative inline-flex size-1.5 sm:size-2 rounded-full transition-colors duration-300 ${isVideoHovered ? "bg-[#20BCE5]" : "bg-slate-400"
                    }`}
                />
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-medium tracking-wider uppercase text-white/90 whitespace-nowrap">
                {isVideoHovered ? "Playing" : "Preview"}
              </span>
            </div>

            {/* Vignette Gradient Overlay */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#040A14]/92 via-transparent to-transparent" />

            {/* Overlay Text & Arrow Icon */}
            <div className="pointer-events-none absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-end justify-between sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8">
              <div className="flex-1 min-w-0 pr-3 sm:pr-4">
                {/* Vertical Sliding Service Number */}
                <div className="relative h-4 sm:h-5 w-full overflow-hidden mb-1 sm:mb-2">
                  {services.map((service, index) => {
                    const diff = index - activeService;
                    const isActive = activeService === index;
                    return (
                      <p
                        key={service.number}
                        className={`absolute inset-0 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#D57A1C] lg:text-[#20BCE5] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                            ? "opacity-100 translate-y-0"
                            : diff > 0
                              ? "opacity-0 translate-y-full"
                              : "opacity-0 -translate-y-full"
                          }`}
                      >
                        {service.number}
                      </p>
                    );
                  })}
                </div>

                {/* Vertical Sliding Service Name */}
                <div className="relative h-8 sm:h-10 md:h-14 lg:h-16 w-full overflow-hidden">
                  {services.map((service, index) => {
                    const diff = index - activeService;
                    const isActive = activeService === index;
                    return (
                      <h3
                        key={service.number}
                        className={`absolute inset-0 display-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                            ? "opacity-100 translate-y-0"
                            : diff > 0
                              ? "opacity-0 translate-y-full"
                              : "opacity-0 -translate-y-full"
                          }`}
                      >
                        {service.name}
                      </h3>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const el = document.getElementById("enquiry");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label={`Enquire about ${services[activeService].name}`}
                className="pointer-events-auto hidden lg:flex size-8 sm:size-10 md:size-11 place-items-center justify-center rounded-full border border-white/30 transition-all duration-300 hover:scale-110 hover:border-[#20BCE5] hover:bg-[#071A2D]/90 hover:shadow-[0_0_20px_rgba(32,188,229,0.35)] active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#20BCE5]"
              >
                <ArrowDownRight className="size-3.5 sm:size-4 md:size-5 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Divider Line (< 1024px) */}
          <div className="w-full border-t border-white/10 lg:hidden mt-7 mb-7 sm:mt-8 sm:mb-8" />

          {/* Mobile Active Service Description (< 1024px) */}
          <div className="lg:hidden relative min-h-[4.5rem] w-full min-w-0">
            {services.map((service, index) => {
              const diff = index - activeService;
              const isActive = activeService === index;
              return (
                <div
                  key={service.number}
                  className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                      ? "opacity-100 translate-y-0 relative"
                      : diff > 0
                        ? "opacity-0 translate-y-4 pointer-events-none absolute inset-x-0 top-0"
                        : "opacity-0 -translate-y-4 pointer-events-none absolute inset-x-0 top-0"
                    }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed text-[#9e988f] max-w-md">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Desktop Active Service Description (>= 1024px) */}
          <div className="hidden lg:block relative min-h-[3.25rem] sm:min-h-[3.75rem] mt-3 sm:mt-4 w-full min-w-0 overflow-hidden">
            {services.map((service, index) => {
              const diff = index - activeService;
              const isActive = activeService === index;
              return (
                <p
                  key={service.number}
                  className={`absolute inset-x-0 top-0 w-full max-w-full text-xs sm:text-sm md:text-base leading-relaxed text-[#94a3b8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                      ? "opacity-100 translate-y-0"
                      : diff > 0
                        ? "opacity-0 translate-y-4 pointer-events-none"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
                >
                  {service.description}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
