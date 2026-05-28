"use client";

import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { nutrientList } from "../constants";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

// Icon per metric
const metricIcons: Record<string, React.ReactNode> = {
  "Conversion Rate": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  "Page Load Speed": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  "Google SEO Score": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  "GSAP Animation": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "Server Uptime": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
};

const NutritionSection = () => {
  // ✅ Skill: containerRef as scope for all GSAP selectors
  const containerRef = useRef<HTMLElement>(null);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const displayList = isMobile ? nutrientList.slice(0, 3) : nutrientList;

  // ✅ Skill: useGSAP with scope — selectors like .nutrition-title are scoped
  // to containerRef, cleanup runs automatically on unmount
  useGSAP(() => {
    // --- Headline SplitText animation ---
    const labelSplit = SplitText.create(".nutrition-label", { type: "words" });
    const titleSplit = SplitText.create(".nutrition-title", { type: "chars" });
    const descSplit  = SplitText.create(".nutrition-desc",  { type: "words" });

    gsap.set(labelSplit.words, { yPercent: 100, opacity: 0 });
    gsap.set(descSplit.words,  { yPercent: 60,  opacity: 0 });
    gsap.set(titleSplit.chars, { yPercent: 120, display: "inline-block", color: "white" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,  // ✅ direct ref, not a selector string
        start: "top 55%",
      },
    });

    tl
      // 1. Label slides up
      .to(labelSplit.words, {
        yPercent: 0, opacity: 1,
        stagger: 0.04, duration: 0.5, ease: "power2.out",
      })
      // 2. Title chars slide up in white
      .to(titleSplit.chars, {
        yPercent: 0, color: "white",
        stagger: 0.03, duration: 0.6, ease: "power3.out",
      }, "-=0.2")
      // 3. Color swipe: white → yellow → blue → black
      .to(titleSplit.chars, {
        color: "#ffce32", stagger: 0.03, duration: 0.35, ease: "power2.out",
      }, "-=0.2")
      .to(titleSplit.chars, {
        color: "#1d63ff", stagger: 0.03, duration: 0.35, ease: "power2.out",
      }, "-=0.25")
      .to(titleSplit.chars, {
        color: "#000000", stagger: 0.03, duration: 0.35, ease: "power2.out",
      }, "-=0.25")
      // 4. Description words
      .to(descSplit.words, {
        yPercent: 0, opacity: 1,
        stagger: 0.02, duration: 0.6, ease: "power2.out",
      }, "-=0.2");

    // --- Stats bar: slide up from below ---
    gsap.fromTo(
      ".nutrition-stat",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.6, ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 45%",
        },
      }
    );

    return () => {
      labelSplit.revert();
      titleSplit.revert();
      descSplit.revert();
    };
  }, { scope: containerRef });

  return (
    <section id="nutrition" ref={containerRef} className="nutrition-section">
      <div className="container mx-auto px-5 md:px-10 max-w-6xl">

        {/* Top: label + heading + description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16 mb-14 md:mb-20">

          {/* Left: label + big title */}
          <div className="flex-1">
            <div className="overflow-hidden mb-3">
              <p className="nutrition-label font-paragraph text-sm font-bold uppercase tracking-widest text-slate-400">
                Hasil & Performa
              </p>
            </div>
            <div className="overflow-hidden">
              <h2 className="nutrition-title font-sans text-4xl md:text-6xl xl:text-7xl font-light tracking-tight leading-none text-slate-900">
                Angka Berbicara
              </h2>
            </div>
          </div>

          {/* Right: description */}
          <div className="md:max-w-sm overflow-hidden">
            <p className="nutrition-desc font-paragraph text-slate-500 text-sm md:text-base leading-relaxed">
              Setiap website yang kami bangun dirancang untuk performa maksimal — cepat, terindeks, dan mengkonversi pengunjung menjadi pelanggan nyata.
            </p>
          </div>
        </div>

        {/* Stats bar: glassmorphic pill */}
        <div
          className="w-full rounded-2xl md:rounded-full px-6 md:px-8 py-6 md:py-7
            flex flex-col md:flex-row items-stretch md:items-center
            justify-between gap-6 md:gap-0
            border border-black/10
            shadow-xl shadow-slate-200/40"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {displayList.map((nutrient, index) => (
            <div
              key={index}
              className="nutrition-stat relative flex-1 flex flex-col md:items-center items-start gap-1 md:text-center"
            >
              {/* Icon */}
              <div className="text-slate-400 mb-1">{metricIcons[nutrient.label]}</div>

              {/* Big number */}
              <p className="font-sans font-light text-3xl md:text-4xl tracking-tighter text-slate-900">
                {nutrient.amount}
              </p>

              {/* Label */}
              <p className="font-paragraph text-slate-400 text-xs md:text-sm font-normal">
                {nutrient.label}
              </p>

              {/* Vertical divider (desktop only) */}
              {index !== displayList.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-slate-200" />
              )}

              {/* Horizontal divider (mobile only) */}
              {index !== displayList.length - 1 && (
                <div className="md:hidden w-full h-px bg-slate-100 mt-2" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NutritionSection;
