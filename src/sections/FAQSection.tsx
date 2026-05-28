"use client";
import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "Apa itu Inovazi?",
      answer: "Inovazi adalah creative digital studio yang berfokus pada pengembangan website interaktif, modern, dan dioptimasi penuh untuk performa bisnis serta SEO global.",
    },
    {
      question: "Kenapa websitenya harus custom, nggak pakai template aja?",
      answer: "Template cenderung kaku dan sulit dioptimasi secara maksimal. Dengan website custom dan animasi GSAP, brand kamu akan memiliki identitas visual yang unik, pengalaman pengguna yang lebih baik, dan performa loading yang instan.",
    },
    {
      question: "Berapa lama pengerjaan satu project website?",
      answer: "Waktu pengerjaan biasanya berkisar antara 2 hingga 4 minggu tergantung tingkat kerumitan fitur, desain, dan kebutuhan animasi interaktif yang kamu inginkan.",
    },
    {
      question: "Apakah websitenya udah SEO-friendly dan mobile-ready?",
      answer: "Pasti. Semua website yang kami kembangkan dijamin 100% responsive di berbagai ukuran layar dan dibangun dengan standar struktur kode SEO terbaik (Core Web Vitals) agar mudah terindeks oleh Google.",
    },
    {
      question: "Apakah ada garansi atau revisi desain?",
      answer: "Tentu saja. Kami menyediakan sesi khusus untuk review dan revisi desain (S&K berlaku) guna memastikan hasil akhirnya benar-benar sesuai dengan ekspektasi dan target market brand kamu.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✅ Skill: containerRef scoping for GSAP
  useGSAP(() => {
    // Title reveal with color swipe
    const titleSplit = SplitText.create(".faq-title", { type: "chars" });
    gsap.set(titleSplit.chars, { yPercent: 120, display: "inline-block", color: "white" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    tl
      // Slide up in white
      .to(titleSplit.chars, {
        yPercent: 0, color: "white",
        stagger: 0.03, duration: 0.6, ease: "power3.out",
      })
      // Color swipe: white → yellow → blue → black
      .to(titleSplit.chars, {
        color: "#ffce32", stagger: 0.03, duration: 0.3, ease: "power2.out",
      }, "-=0.3")
      .to(titleSplit.chars, {
        color: "#1d63ff", stagger: 0.03, duration: 0.3, ease: "power2.out",
      }, "-=0.25")
      .to(titleSplit.chars, {
        color: "#000000", stagger: 0.03, duration: 0.3, ease: "power2.out",
      }, "-=0.25");

    // FAQ items entrance (per item for mobile scroll safety)
    const faqItems = gsap.utils.toArray<HTMLElement>(".faq-item-animate");
    faqItems.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
        }
      );
    });

    return () => {
      titleSplit.revert();
    };
  }, { scope: containerRef });

  return (
    <section id="faq" ref={containerRef} className="faq-section bg-transparent py-24 md:py-32 relative z-20">
      <div className="container mx-auto px-5 md:px-10 max-w-4xl">
        {/* Title */}
        <div className="overflow-hidden mb-14 md:mb-20 text-center">
          <h2 className="faq-title font-sans text-3xl md:text-5xl font-medium text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="faq-list-container border-t border-black/10">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="faq-item-animate border-b border-black/10 transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left py-6 md:py-8 flex justify-between items-center gap-6 cursor-pointer focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-lg md:text-xl duration-300">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 text-slate-900 transition-transform duration-300">
                    {isOpen ? (
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Smooth Expand/Collapse Container */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] pb-6 md:pb-8" : "max-h-0"
                    }`}
                >
                  <div className="font-paragraph text-sm md:text-base text-slate-500 leading-relaxed max-w-3xl pr-8">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
