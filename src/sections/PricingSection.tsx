"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { pricingPlans } from "@/constants";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const PricingSection = () => {
  // ✅ Skill: containerRef as scope — all GSAP selectors scoped here
  const containerRef = useRef<HTMLElement>(null);

  // ✅ Skill: useGSAP with scope: containerRef for proper scoping & auto-cleanup
  useGSAP(() => {
    // --- Headline animations ---
    const labelSplit = SplitText.create(".pricing-label", { type: "words" });
    const titleSplit = SplitText.create(".pricing-title", { type: "chars" });
    const descSplit  = SplitText.create(".pricing-desc",  { type: "words" });

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

    // --- Pricing cards entrance (per card for mobile vertical stack) ---
    const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");
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

  const handleOrder = (planName: string) => {
    const message = `Halo Inovazi, saya tertarik untuk order paket *Website Informasi (${planName})*. Mohon info lebih lanjut.`;
    window.open(`https://wa.me/6282253303646?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="pricing" ref={containerRef} className="relative min-h-dvh flex flex-col justify-center py-20 z-20 overflow-hidden">
      <div className="container mx-auto px-5 md:px-10 max-w-6xl">
        
        {/* Header: label + title + description (2-column on desktop) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-16 mb-12 md:mb-16">
          {/* Left */}
          <div className="flex-1">
            <div className="overflow-hidden mb-3">
              <p className="pricing-label font-paragraph text-sm font-medium uppercase tracking-widest text-slate-400">
                Transparan & Fleksibel
              </p>
            </div>
            <div className="overflow-hidden">
              <h2 className="pricing-title font-sans text-4xl md:text-5xl xl:text-6xl font-light tracking-tight leading-none text-slate-900">
                Pilihan Investasi
              </h2>
            </div>
          </div>

          {/* Right: description */}
          <div className="md:max-w-xs overflow-hidden">
            <p className="pricing-desc font-paragraph text-slate-500 text-sm md:text-base leading-relaxed">
              Tanpa biaya tersembunyi. Pilih paket yang paling pas untuk skala bisnis lo dan mulai jangkau klien yang lebih luas.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch">
          {pricingPlans.map((plan, index) => {
            const isYellow = plan.color === "yellow";
            return (
              <div
                key={plan.name}
                className={`pricing-card relative flex flex-col justify-between p-8 md:p-10 rounded-[2rem]
                  border border-black/10 transition-all duration-500 hover:shadow-2xl hover:border-black/20
                  ${isYellow ? "glass-card-yellow" : "glass-card-blue"}`}
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                {/* Popular Badge for PRO */}
                {isYellow && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-slate-900 text-white font-paragraph text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                    Paling Populer
                  </div>
                )}

                <div>
                  <h3 className="font-sans font-bold text-slate-900 text-2xl md:text-3xl tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="font-paragraph text-slate-500 text-sm mt-2 leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="mt-6 mb-8 flex items-baseline gap-2">
                    <span className="font-sans font-light text-slate-900 text-4xl md:text-5xl tracking-tighter">
                      {plan.price}
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-black/10 rounded-full mb-8" />

                  {/* Included Features */}
                  <ul className="flex flex-col gap-3.5 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-none mt-0.5" fill="none" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-paragraph text-slate-700 text-sm leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Crossed/Excluded Features */}
                  {plan.crossedFeatures && plan.crossedFeatures.length > 0 && (
                    <ul className="flex flex-col gap-3.5">
                      {plan.crossedFeatures.map((feature, i) => (
                        <li key={`crossed-${i}`} className="flex items-start gap-3 opacity-40">
                          <svg className="w-5 h-5 flex-none mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="font-paragraph text-slate-700 text-sm leading-snug line-through">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-10">
                  <button
                    onClick={() => handleOrder(plan.name)}
                    className={`w-full py-4 rounded-full font-paragraph font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-xl active:scale-[0.98]
                      ${isYellow ? "bg-theme-yellow text-slate-900 hover:bg-yellow-400" : "bg-black text-white hover:bg-neutral-800"}
                    `}
                  >
                    Order {plan.name} Sekarang
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;
