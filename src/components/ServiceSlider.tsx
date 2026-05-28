"use client";

import { useGSAP } from "@gsap/react";
import { flavorList } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Icon map for each service
const serviceIcons: Record<string, React.ReactNode> = {
  "Web Development": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  "UI/UX Design": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  "Interactive Animations": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  "SEO & Optimization": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
};

interface ServiceSliderProps {
  // Receives the section ref from ServiceSection so the pin ScrollTrigger
  // can target the correct parent element without a global selector
  sectionEl: HTMLElement | null;
}

const ServiceSlider = ({ sectionEl }: ServiceSliderProps) => {
  // ✅ Skill: refs for scoping — sliderRef is the scroll container
  const sliderRef = useRef<HTMLDivElement>(null);

  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // ✅ Skill: useGSAP with scope: sliderRef for card entrance (scoped selectors)
  // Cleanup and ScrollTrigger revert happen automatically on unmount.
  useGSAP(() => {
    if (!sliderRef.current) return;

    // --- Card entrance — animate per card so they reveal correctly on mobile scroll ---
    const cards = gsap.utils.toArray<HTMLElement>(".service-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // trigger when the top of the card is 85% down the viewport
          },
        }
      );
    });
  }, { scope: sliderRef, dependencies: [isTablet] });

  // ✅ Skill: pin / horizontal scroll — targets the PARENT section element directly.
  // We compute per-card snap positions from actual DOM rects so every card
  // centers precisely in the viewport, accounting for the 57% title offset.
  useGSAP(() => {
    if (!sliderRef.current || !sectionEl || isTablet) return;

    // Read all card positions BEFORE any animation
    const cards = Array.from(
      sliderRef.current.querySelectorAll<HTMLElement>(".service-card")
    );
    if (!cards.length) return;

    const sectionRect = sectionEl.getBoundingClientRect();
    const halfVW = window.innerWidth / 2;

    // Calculate how far the section must translate left for EACH card to center
    const cardOffsets = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      // Distance from section's left edge to this card's center
      const cardCenterFromSectionLeft =
        rect.left - sectionRect.left + card.offsetWidth / 2;
      // How much to translate so this card center == 50vw
      return Math.max(0, cardCenterFromSectionLeft - halfVW);
    });

    const scrollAmount = cardOffsets[cardOffsets.length - 1];
    if (scrollAmount <= 0) return;

    // Normalise each card's offset to 0-1 for GSAP snap
    const snapValues = cardOffsets.map((offset) => offset / scrollAmount);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,                     // ✅ direct DOM element — no global selector
        start: "top top",
        end: `+=${scrollAmount}px`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: snapValues,                   // ✅ per-card exact positions
          duration: { min: 0.2, max: 0.6 },
          ease: "power1.inOut",
        },
      },
    });

    tl.to(sectionEl, {
      x: `-${scrollAmount}px`,
      ease: "none",
    });
  }, { dependencies: [isTablet, sectionEl] });  // ✅ no scope — targeting external element directly

  const handleConsult = (serviceName: string) => {
    const message = `Halo Inovazi, saya ingin berkonsultasi mengenai layanan *${serviceName}*. Bisa dibantu?`;
    window.open(`https://wa.me/6282253303646?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorList.map((flavor) => {
          const isYellow = flavor.color === "yellow";
          const accentColor = isYellow ? "#ffce32" : "#1d63ff";

          return (
            <div
              key={flavor.name}
              className={`service-card flex-none z-30 flex flex-col justify-between
                lg:w-[38vw] md:w-[60vw] w-[85vw]
                lg:h-[62vh] md:h-[55vh] h-[450px]
                rounded-[2rem] overflow-hidden
                transition-all duration-500 cursor-default
                p-7 md:p-9
                ${isYellow
                  /* ✅ True glassmorphism: translucent bg, strong blur, colored border glow */
                  ? "glass-card-yellow"
                  : "glass-card-blue"
                }`}
            >
              {/* Top: Icon + Title + Subtitle */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon badge */}
                  <div
                    className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-none"
                    style={{ backgroundColor: "rgba(0,0,0,0.07)", color: "#000000" }}
                  >
                    {serviceIcons[flavor.name]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="font-pogonia font-bold text-slate-900 text-lg md:text-xl xl:text-2xl tracking-tight leading-snug">
                      {flavor.name}
                    </h2>
                    <p className="font-paragraph text-slate-500 text-[11px] md:text-xs xl:text-[13px] mt-1 leading-relaxed">
                      {flavor.subtitle}
                    </p>
                  </div>
                </div>

                {/* Accent divider */}
                <div
                  className="w-full h-[1.5px] mb-4 rounded-full opacity-15"
                  style={{ backgroundColor: "#000000" }}
                />

                {/* Feature checklist — 2-column */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {flavor.features?.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <svg
                        className="w-3.5 h-3.5 mt-0.5 flex-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#000000"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-paragraph text-slate-700 text-[10px] md:text-[11px] xl:text-xs leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-5 pt-4 border-t border-white/30">
                <button
                  onClick={() => handleConsult(flavor.name)}
                  className="group flex items-center gap-2 font-paragraph font-semibold text-xs
                    px-5 py-2.5 rounded-full transition-all duration-300
                    bg-black text-white shadow-md hover:shadow-xl hover:bg-neutral-800 active:scale-95 cursor-pointer"
                >
                  <span>Konsultasi Gratis</span>
                  <svg
                    className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSlider;
