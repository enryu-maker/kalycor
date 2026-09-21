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
  const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile scroll detection: update sticky video based on which service is in view
  useEffect(() => {
    const handleScroll = () => {
      // Only apply on mobile/tablet viewports (< 1024px)
      if (window.innerWidth >= 1024) return;

      mobileRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (
          rect.top < window.innerHeight * 0.65 &&
          rect.bottom > window.innerHeight * 0.25
        ) {
          setActiveService(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Ensure reveal-on-scroll elements animate properly
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    mobileRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const currentService = services[activeService] || services[0];

  return (
    <div className="grid gap-12 lg:grid-cols-[.35fr_1.65fr] lg:gap-16">
      {/* Desktop Left Navigation */}
      <div className="hidden lg:block">
        <div className="sticky top-32 space-y-6">
          {services.map((service, index) => {
            const isActive = activeService === index;
            return (
              <button
                key={service.number}
                type="button"
                onClick={() => setActiveService(index)}
                data-active={isActive}
                className={`service-nav-item relative block text-left text-sm uppercase tracking-[0.13em] cursor-pointer transition-all duration-300 ${
                  isActive ? "text-white font-semibold" : "text-[#94a3b8] hover:text-white"
                }`}
                data-cursor-hover
              >
                <span
                  className={`mr-4 font-mono transition-colors duration-300 ${
                    isActive ? "text-[#38bdf8] font-bold" : "text-[#38bdf8]"
                  }`}
                >
                  {service.number}
                </span>
                <span>{service.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Sticky Video Container + Content Below */}
      <div className="relative">
        {/* Sticky Visual/Video Container */}
        <div className="sticky top-20 sm:top-24 lg:top-28 z-10 mb-10 sm:mb-12 aspect-[1.08/1] max-h-[580px] w-full overflow-hidden rounded-sm bg-[#050d1a] border border-[#105080]/60 shadow-[0_20px_50px_rgba(5,13,26,0.8)]">
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
                  <video
                    src={service.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="service-visual size-full object-cover object-center"
                    data-cursor-hover
                    data-cursor-label
                  />
                </div>
              </div>
            );
          })}

          {/* Vignette Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#071326]/85 via-transparent to-transparent" />

          {/* Overlay Text & Arrow Icon */}
          <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between md:bottom-10 md:left-10 md:right-10">
            <div>
              <p className="mb-2 sm:mb-3 text-xs uppercase tracking-[0.16em] text-[#38bdf8]">
                {currentService.number}
              </p>
              <h3 className="display-font text-3xl font-semibold tracking-[-.05em] text-white sm:text-4xl md:text-6xl">
                {currentService.name}
              </h3>
            </div>
            <span className="hidden size-12 place-items-center rounded-full border border-white/60 md:grid">
              <ArrowDownRight className="size-5 text-white" />
            </span>
          </div>
        </div>

        {/* Mobile View: Vertical list of service titles and descriptions below video */}
        <div className="lg:hidden">
          {services.map((service, index) => {
            const isActive = activeService === index;
            return (
              <div
                key={service.number}
                ref={(el) => {
                  mobileRefs.current[index] = el;
                }}
                className={`reveal-on-scroll border-t border-[#105080]/40 py-12 sm:py-16 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-80"
                }`}
              >
                <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#38bdf8] font-mono font-medium">
                  {service.number}
                </p>
                <h3 className="display-font text-3xl font-semibold tracking-[-.05em] text-white sm:text-4xl">
                  {service.name}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#94a3b8]">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Desktop View: Active service description block with explore link below video */}
        <div className="hidden min-h-[25rem] border-t border-[#105080]/40 pt-10 lg:block">
          <p className="max-w-2xl text-[clamp(1.4rem,2.6vw,2.8rem)] leading-[1.12] tracking-[-.04em] text-white">
            {currentService.description}
          </p>
          <div className="mt-14 flex items-center justify-between border-t border-[#105080]/40 pt-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[#94a3b8]">
              Explore the possibility
            </p>
            <ArrowDownRight className="size-4 text-[#38bdf8]" />
          </div>
        </div>
      </div>
    </div>
  );
}
