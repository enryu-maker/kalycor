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
    const stickyTopOffset = window.innerWidth >= 1024 ? 96 : 80;
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
    const stickyTopOffset = window.innerWidth >= 1024 ? 96 : 80;

    const stepDistance = totalScrollDistance / services.length;
    const targetScrollY = containerTop - stickyTopOffset + (index + 0.5) * stepDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} className="relative h-[450vh] sm:h-[500vh] lg:h-[550vh]">
      {/* Sticky showcase container */}
      <div className="sticky top-20 lg:top-24">
        <div className="grid items-center gap-8 lg:grid-cols-[.32fr_1.68fr] lg:gap-14">
          {/* Desktop Left Nav Tabs */}
          <div className="hidden lg:block">
            <div className="space-y-5 xl:space-y-6">
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
                        isActive ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`transition-colors duration-300 ${
                        isActive ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {service.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Showcase Visual with bottom-left text overlay & bottom-right arrow */}
          <div className="relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[calc(100svh-7rem)] sm:max-h-[calc(100vh-8rem)] overflow-hidden rounded-sm bg-background">
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

                    {/* Gradient Overlay for high readability at bottom */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Content Overlay: Number & Title at bottom-left, Circular Arrow at bottom-right */}
                    <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8 lg:bottom-10 lg:left-10 lg:right-10 xl:bottom-12 xl:left-12 xl:right-12">
                      <div className="max-w-2xl pr-4">
                        {/* Service Number above title */}
                        <p
                          className={`mb-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-all duration-500 ease-out ${
                            isActive ? "translate-y-0 opacity-100 delay-100" : "translate-y-3 opacity-0"
                          }`}
                        >
                          {service.number}
                        </p>

                        {/* Service Title */}
                        <h3
                          className={`display-font text-3xl font-bold tracking-tight text-white transition-all duration-700 ease-out sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] ${
                            isActive ? "translate-y-0 opacity-100 delay-200" : "translate-y-4 opacity-0"
                          }`}
                        >
                          {service.name}
                        </h3>
                      </div>

                      {/* Circular Right Arrow Button */}
                      <span
                        className={`grid size-10 sm:size-11 md:size-12 shrink-0 place-items-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition-all duration-700 ease-out ${
                          isActive ? "translate-y-0 opacity-100 delay-300 scale-100" : "translate-y-3 opacity-0 scale-90"
                        }`}
                      >
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

