"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { MoveRight } from "lucide-react";

import staffingImage from "@/assets/service-staffing.jpg";
import realEstateImage from "@/assets/service-real-estate.jpg";
import agricultureImage from "@/assets/service-agriculture.jpg";
import tradeImage from "@/assets/service-trade.jpg";
import securityImage from "@/assets/service-security.jpg";

export interface ServiceItem {
  number: string;
  name: string;
  image: StaticImageData;
  description: string;
}

export const services: ServiceItem[] = [
  {
    number: "01",
    name: "Staffing",
    image: staffingImage,
    description: "Connecting businesses with exceptional people and creating opportunities that move organizations forward.",
  },
  {
    number: "02",
    name: "Real Estate",
    image: realEstateImage,
    description: "Creating and shaping spaces designed for people, businesses and long-term value.",
  },
  {
    number: "03",
    name: "Agriculture",
    image: agricultureImage,
    description: "Building sustainable pathways from cultivation to markets through modern agricultural opportunities.",
  },
  {
    number: "04",
    name: "Import / Export",
    image: tradeImage,
    description: "Connecting markets, products and opportunities across borders through dependable global trade.",
  },
  {
    number: "05",
    name: "Security",
    image: securityImage,
    description: "Protecting people, places and businesses through integrated security and surveillance solutions.",
  },
];

export function ServicesShowcase() {
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollDistance = containerRef.current.offsetHeight - window.innerHeight;

    if (totalScrollDistance <= 0) return;

    // The sticky offset from the top of the viewport where the showcase pins
    const stickyTopOffset = window.innerWidth >= 1024 ? 80 : 64;
    const scrolled = stickyTopOffset - rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));

    // Distribute thresholds evenly among the 5 services
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

  const scrollToService = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY || window.pageYOffset;
    const containerTop = rect.top + currentScrollY;
    const totalScrollDistance = containerRef.current.offsetHeight - window.innerHeight;
    const stickyTopOffset = window.innerWidth >= 1024 ? 80 : 64;

    const stepDistance = totalScrollDistance / services.length;
    const targetScrollY = containerTop - stickyTopOffset + (index + 0.5) * stepDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} className="relative h-[650vh] sm:h-[750vh] lg:h-[850vh]">
      {/* Sticky showcase container */}
      <div className="sticky top-16 lg:top-20">
        <div className="grid items-start gap-8 lg:grid-cols-[.28fr_1.72fr] lg:gap-12">
          {/* Desktop Left Nav Tabs */}
          <div className="hidden lg:block pt-6">
            <div className="space-y-6 xl:space-y-7">
              {services.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <button
                    key={service.number}
                    type="button"
                    onClick={() => scrollToService(index)}
                    data-active={isActive}
                    className="service-nav-item group relative flex items-center text-left text-sm uppercase tracking-[0.13em] cursor-pointer transition-all duration-300"
                    data-cursor-hover
                  >
                    <span
                      className={`mr-4 font-mono font-medium transition-colors duration-300 ${
                        isActive ? "text-[#38bdf8] font-bold" : "text-[#94a3b8] group-hover:text-white"
                      }`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`transition-colors duration-300 ${
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

          {/* Showcase Visual with clean image and content section directly BELOW the image */}
          <div className="relative flex flex-col justify-between">
            {/* Image Container dynamically filling the screen height */}
            <div className="relative h-[calc(100vh-17rem)] sm:h-[calc(100vh-16rem)] lg:h-[calc(100vh-14.5rem)] min-h-[300px] max-h-[660px] w-full overflow-hidden rounded-sm bg-[#060e1a] border border-[#1e385c]/60 shadow-xl">
              {services.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <div
                    key={service.number}
                    className={`absolute inset-0 size-full transition-opacity duration-700 ease-in-out ${
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    {/* Background image with subtle scale transition */}
                    <div
                      className={`relative size-full transform transition-transform duration-1000 ease-out ${
                        isActive ? "scale-100" : "scale-[1.03]"
                      }`}
                    >
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
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Content BELOW Image */}
            <div className="relative mt-4 min-h-[85px] sm:min-h-[75px]">
              {services.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <div
                    key={service.number}
                    className={`transition-all duration-500 ease-out ${
                      isActive
                        ? "relative opacity-100 translate-y-0 z-10"
                        : "absolute inset-0 opacity-0 translate-y-2 pointer-events-none z-0"
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="max-w-2xl pr-2">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#38bdf8]">
                            {service.number}
                          </span>
                          <span className="text-[#94a3b8]/50 text-xs">/</span>
                          <h3 className="display-font text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                            {service.name}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-[#94a3b8]">
                          {service.description}
                        </p>
                      </div>

                      <span className="grid size-10 sm:size-11 shrink-0 place-items-center rounded-full border border-[#2563eb]/60 text-[#38bdf8] transition-all duration-300 hover:bg-[#2563eb] hover:text-white hover:scale-105">
                        <MoveRight className="size-4 sm:size-5" />
                      </span>
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

