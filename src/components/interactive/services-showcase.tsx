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
  const [isHovered, setIsHovered] = useState(false);
  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Play/pause desktop video based on active service and hover state
  useEffect(() => {
    desktopVideoRefs.current.forEach((videoEl, index) => {
      if (!videoEl) return;
      if (index === activeService && isHovered) {
        videoEl.play().catch(() => {});
      } else {
        videoEl.pause();
      }
    });
  }, [activeService, isHovered]);

  // IntersectionObserver to reveal items smoothly on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = mobileContainerRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const currentService = services[activeService] || services[0];

  return (
    <div>
      {/* ============================================================ */}
      {/* MOBILE / RESPONSIVE VIEW (< 1024px)                          */}
      {/* Layout: Video > Border > Number > Title > Description > Border */}
      {/* ============================================================ */}
      <div ref={mobileContainerRef} className="space-y-12 sm:space-y-16 lg:hidden">
        {services.map((service) => (
          <div
            key={service.number}
            className="reveal-on-scroll"
          >
            {/* 1. Video Container with Overlay */}
            <div className="relative aspect-[1.08/1] sm:aspect-[16/10] w-full overflow-hidden rounded-sm bg-[#040A14]/94 backdrop-blur-md border border-[#20BCE5]/25 shadow-[0_24px_50px_rgba(2,6,12,0.85)]">
              <video
                src={service.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="service-visual size-full object-cover object-center"
              />
              {/* Vignette Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#040A14]/92 via-transparent to-transparent" />

              {/* Overlay inside bottom-left of Video */}
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
                <div>
                  <p className="mb-1.5 text-xs uppercase tracking-[0.16em] text-[#20BCE5]">
                    {service.number}
                  </p>
                  <h3 className="display-font text-3xl font-semibold tracking-[-.05em] text-white sm:text-4xl">
                    {service.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* 2. Border Divider Line directly between Video and Number */}
            <div className="my-8 border-t border-[#0866C6]/25" />

            {/* 3. Number > 4. Title > 5. Description Content */}
            <div className="px-1">
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#20BCE5] font-mono font-medium">
                {service.number}
              </p>
              <h3 className="display-font text-3xl font-semibold tracking-[-.05em] text-white sm:text-4xl">
                {service.name}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#94a3b8]">
                {service.description}
              </p>
            </div>

            {/* 6. Border Divider Line at the bottom of the section */}
            <div className="mt-8 border-t border-[#0866C6]/25" />
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/* DESKTOP VIEW (>= 1024px)                                     */}
      {/* Left Navigation + Right Active Service Video Only            */}
      {/* ============================================================ */}
      <div className="hidden lg:grid lg:grid-cols-[.35fr_1.65fr] lg:gap-16">
        {/* Left Nav Buttons */}
        <div>
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
                      isActive ? "text-[#20BCE5] font-bold" : "text-[#20BCE5]"
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

        {/* Right Active Service Video Only (Plays on Hover) */}
        <div className="relative">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative aspect-[1.08/1] max-h-[580px] w-full overflow-hidden rounded-sm bg-[#040A14]/94 backdrop-blur-md border border-[#20BCE5]/25 shadow-[0_24px_50px_rgba(2,6,12,0.85)] cursor-pointer"
          >
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
                      ref={(el) => {
                        desktopVideoRefs.current[index] = el;
                      }}
                      src={service.video}
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
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#040A14]/92 via-transparent to-transparent" />

            {/* Overlay Text & Arrow Icon */}
            <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between md:bottom-10 md:left-10 md:right-10">
              <div>
                <p className="mb-2 sm:mb-3 text-xs uppercase tracking-[0.16em] text-[#20BCE5]">
                  {currentService.number}
                </p>
                <h3 className="display-font text-4xl font-semibold tracking-[-.05em] text-white md:text-6xl">
                  {currentService.name}
                </h3>
              </div>
              <span className="hidden size-12 place-items-center rounded-full border border-white/30 md:grid transition-all duration-300 group-hover:scale-110 group-hover:border-[#20BCE5] group-hover:bg-[#071A2D]/80">
                <ArrowDownRight className="size-5 text-white" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
