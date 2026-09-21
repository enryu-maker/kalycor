"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";

export interface ServiceItem {
  number: string;
  name: string;
  image?: StaticImageData;
  video?: string;
  description?: string;
}

export const services: ServiceItem[] = [
  {
    number: "01",
    name: "Staffing",
    video: "/videos/video1.mp4",
  },
  {
    number: "02",
    name: "Real Estate",
    video: "/videos/video3.mp4",
  },
  {
    number: "03",
    name: "Agriculture",
    video: "/videos/video4.mp4",
  },
  {
    number: "04",
    name: "Import / Export",
    video: "/videos/video5.mp4",
  },
  {
    number: "05",
    name: "Security",
    video: "/videos/video2.mp4",
  },
];

export function ServicesShowcase() {
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const pillButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollDistance = containerRef.current.offsetHeight - window.innerHeight;

    if (totalScrollDistance <= 0) return;

    // Sticky offset from the top of the viewport
    const stickyTopOffset = window.innerWidth >= 1024 ? 96 : 80;
    const scrolled = stickyTopOffset - rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));

    // Distribute thresholds evenly among the services
    const rawIndex = Math.floor(progress * services.length);
    const nextIndex = Math.min(services.length - 1, Math.max(0, rawIndex));

    setActiveService((prev) => (prev !== nextIndex ? nextIndex : prev));
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [handleScroll]);

  // Auto-scroll the mobile pill container whenever activeService changes
  useEffect(() => {
    const activeBtn = pillButtonRefs.current[activeService];
    const container = pillsContainerRef.current;
    if (activeBtn && container) {
      const containerWidth = container.offsetWidth;
      const btnLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      const scrollTarget = btnLeft - (containerWidth / 2) + (btnWidth / 2);

      container.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: "smooth",
      });
    }
  }, [activeService]);

  const scrollToService = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY || window.pageYOffset;
    const containerTop = rect.top + currentScrollY;
    const totalScrollDistance = containerRef.current.offsetHeight - window.innerHeight;
    const stickyTopOffset = window.innerWidth >= 1024 ? 96 : 80;

    const stepDistance = totalScrollDistance / services.length;
    const targetScrollY = containerTop - stickyTopOffset + (index + 0.5) * stepDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} className="relative h-[650vh] sm:h-[750vh] lg:h-[850vh]">
      {/* Sticky showcase container - positioned below fixed navbar */}
      <div className="sticky top-20 lg:top-24">
        {/* Mobile Navigation Pills with auto-centering and hidden scrollbar */}
        <div className="relative mb-3 lg:hidden">
          <div
            ref={pillsContainerRef}
            className="flex overflow-x-auto pb-2 pt-1 px-1 gap-2 no-scrollbar scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {services.map((service, index) => {
              const isActive = activeService === index;
              return (
                <button
                  key={service.number}
                  ref={(el) => {
                    pillButtonRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => scrollToService(index)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#105080] to-[#2563eb] text-white font-semibold border border-[#38bdf8]/60 shadow-[0_0_14px_rgba(56,189,248,0.35)] scale-[1.02]"
                      : "bg-[#0a1c36]/90 text-[#94a3b8] hover:text-white border border-[#105080]/40"
                  }`}
                >
                  <span className={isActive ? "text-[#66c8f5] font-bold" : ""}>{service.number}</span>
                  <span className="whitespace-nowrap">{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr] xl:grid-cols-[260px_1fr] lg:gap-10 xl:gap-14">
          {/* Desktop Left Nav Tabs */}
          <div className="hidden lg:block py-4 min-w-[220px]">
            <div className="space-y-6 xl:space-y-7">
              {services.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <button
                    key={service.number}
                    type="button"
                    onClick={() => scrollToService(index)}
                    data-active={isActive}
                    className="service-nav-item group relative flex items-center text-left text-sm uppercase tracking-[0.13em] cursor-pointer transition-all duration-300 whitespace-nowrap"
                    data-cursor-hover
                  >
                    <span
                      className={`mr-4 font-mono font-medium transition-colors duration-300 shrink-0 ${
                        isActive
                          ? "text-[#38bdf8] font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                          : "text-[#94a3b8] group-hover:text-white"
                      }`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`whitespace-nowrap transition-colors duration-300 ${
                        isActive ? "text-white font-semibold" : "text-[#94a3b8] group-hover:text-white"
                      }`}
                    >
                      {service.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Showcase Visual Container with optimized width and height */}
          <div className="relative">
            <div className="relative h-[48vh] sm:h-[52vh] min-h-[280px] max-h-[460px] lg:h-[calc(100vh-10rem)] lg:min-h-[380px] lg:max-h-[680px] w-full overflow-hidden rounded-md bg-[#050d1a] border border-[#105080]/60 shadow-[0_20px_50px_rgba(5,13,26,0.8)]">
              {services.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <div
                    key={service.number}
                    className={`absolute inset-0 size-full transition-opacity duration-700 ease-in-out ${
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <div
                      className={`relative size-full transform transition-transform duration-1000 ease-out ${
                        isActive ? "scale-100" : "scale-[1.03]"
                      }`}
                    >
                      {service.video ? (
                        <video
                          src={service.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          className="service-visual size-full object-cover object-center"
                        />
                      ) : service.image ? (
                        <Image
                          src={service.image}
                          alt={`${service.name} service`}
                          fill
                          priority={index === 0}
                          className="service-visual size-full object-cover object-center"
                          sizes="(max-width: 1024px) 100vw, 1400px"
                          data-cursor-hover
                          data-cursor-label
                        />
                      ) : null}
                    </div>

                    {/* Bottom Info Overlay for crisp service context */}
                    <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#050d1a]/90 via-[#050d1a]/40 to-transparent p-4 sm:p-5 lg:p-7 flex items-end justify-between pointer-events-none">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block size-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] animate-pulse"></span>
                          <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#38bdf8] uppercase whitespace-nowrap">
                            {service.number} // Sector Showcase
                          </span>
                        </div>
                        <h3 className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-white display-font drop-shadow-md whitespace-nowrap">
                          {service.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
