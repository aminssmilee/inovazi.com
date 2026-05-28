"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import VideoPin from "@/components/VideoPin";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const benefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Kece di Semua Layar",
    desc: "Website fully responsive — tampil estetik dan rapi di HP, tablet, maupun layar desktop.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Animasi GSAP Licin",
    desc: "Transisi halaman super fluid dan interaktif yang memanjakan mata visitor sejak detik pertama.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Gampang Masuk Google",
    desc: "Struktur kode SEO-friendly memudahkan website dilacak mesin pencari dan menjangkau lebih banyak klien.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Load Instan, Zero Nunggu",
    desc: "Kode bersih, kompresi gambar optimal, dan server andal membuat web loading dalam hitungan milidetik.",
  },
];

const BenefitSection = () => {
  // ✅ Skill: containerRef as scope — all GSAP selectors scoped here
  const containerRef = useRef<HTMLElement>(null);

  // ✅ Skill: useGSAP with scope: containerRef for proper scoping & auto-cleanup
  useGSAP(() => {
    // --- Headline animations ---
    const labelSplit = SplitText.create(".benefit-label", { type: "words" });
    const titleSplit = SplitText.create(".benefit-title", { type: "chars" });
    const descSplit  = SplitText.create(".benefit-desc",  { type: "words" });

    gsap.set(labelSplit.words, { yPercent: 100, opacity: 0 });
    gsap.set(descSplit.words,  { yPercent: 60,  opacity: 0 });
    gsap.set(titleSplit.chars, { yPercent: 120, display: "inline-block", color: "white" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,  // ✅ direct ref
        start: "top 60%",
      },
    });

    tl
      .to(labelSplit.words, {
        yPercent: 0, opacity: 1,
        stagger: 0.04, duration: 0.5, ease: "power2.out",
      })
      // Slide up in white
      .to(titleSplit.chars, {
        yPercent: 0, color: "white",
        stagger: 0.03, duration: 0.6, ease: "power3.out",
      }, "-=0.2")
      // Color swipe: white → yellow → blue → black
      .to(titleSplit.chars, {
        color: "#ffce32", stagger: 0.03, duration: 0.3, ease: "power2.out",
      }, "-=0.2")
      .to(titleSplit.chars, {
        color: "#1d63ff", stagger: 0.03, duration: 0.3, ease: "power2.out",
      }, "-=0.2")
      .to(titleSplit.chars, {
        color: "#000000", stagger: 0.03, duration: 0.3, ease: "power2.out",
      }, "-=0.2")
      // Description
      .to(descSplit.words, {
        yPercent: 0, opacity: 1,
        stagger: 0.02, duration: 0.6, ease: "power2.out",
      }, "-=0.15");

    // --- Benefit cards entrance (per card for mobile vertical stack) ---
    const cards = gsap.utils.toArray<HTMLElement>(".benefit-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7, ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      labelSplit.revert();
      titleSplit.revert();
      descSplit.revert();
    };
  }, { scope: containerRef });

  return (
    <section id="benefits" ref={containerRef} className="benefit-section">
      <div className="container mx-auto px-5 md:px-10 max-w-5xl pt-20 pb-10">

        {/* Header: label + title + description (2-column on desktop) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-16 mb-12 md:mb-16">

          {/* Left */}
          <div className="flex-1">
            <div className="overflow-hidden mb-3">
              <p className="benefit-label font-paragraph text-sm font-medium uppercase tracking-widest text-slate-400">
                Kenapa Inovazi
              </p>
            </div>
            <div className="overflow-hidden">
              <h2 className="benefit-title font-sans text-4xl md:text-5xl xl:text-6xl font-light tracking-tight leading-none text-slate-900">
                Yang Bikin Beda
              </h2>
            </div>
          </div>

          {/* Right: description */}
          <div className="md:max-w-xs overflow-hidden">
            <p className="benefit-desc font-paragraph text-slate-500 text-sm md:text-base leading-relaxed">
              Bukan sekadar website — setiap detail dirancang untuk performa, estetika, dan konversi yang nyata.
            </p>
          </div>
        </div>

        {/* Benefit cards — 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="benefit-card flex items-start gap-4 p-6 md:p-7 rounded-2xl
                border border-black/10
                hover:border-black/20 hover:shadow-lg
                transition-all duration-400"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              {/* Icon badge */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(0,0,0,0.06)", color: "#000000" }}
              >
                {item.icon}
              </div>

              <div>
                <h3 className="font-sans font-medium text-base md:text-lg text-slate-900 tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="font-paragraph text-slate-500 text-sm mt-1.5 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="font-paragraph text-slate-400 text-sm italic">
            Dan masih banyak keunggulan lainnya yang siap kamu rasakan.
          </p>
        </div>

      </div>

      {/* Video pin stays below */}
      <div className="relative overlay-box">
        <VideoPin />
      </div>
    </section>
  );
};

export default BenefitSection;
