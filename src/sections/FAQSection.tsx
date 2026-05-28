"use client";
import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "Inovazi itu apa sih?",
      answer: "Kita adalah creative digital studio yang fokus bikin website super kece, interaktif, dan pastinya anti-cringe untuk startup, brand, atau personal project kamu.",
    },
    {
      question: "Kenapa websitenya harus custom, nggak pakai template aja?",
      answer: "Biar brand kamu punya rizz dan beda dari yang lain! Template itu ngebosenin dan kaku. Dengan custom website + animasi GSAP, visitor bakal terpukau sejak detik pertama.",
    },
    {
      question: "Berapa lama pengerjaan satu website?",
      answer: "Sat-set kok! Biasanya berkisar antara 2 sampai 4 minggu tergantung tingkat kerumitan desain dan fitur interaktif yang kamu pengen.",
    },
    {
      question: "Apakah websitenya udah SEO-friendly dan mobile-ready?",
      answer: "No cap, 100%! Semua website yang kita racik dijamin fully responsive (kece di HP maupun laptop) dan dioptimasi biar dapet skor SEO tinggi di Google.",
    },
    {
      question: "Besta dapet revisi nggak kalau ada yang kurang cocok?",
      answer: "Tenang aja, we got you! Kita ada sesi khusus buat review dan revisi desain biar hasilnya bener-bener sesuai sama ekspektasi kamu.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(() => {
    const titleSplit = SplitText.create(".faq-title", {
      type: "chars",
    });

    gsap.from(titleSplit.chars, {
      yPercent: 100,
      stagger: 0.02,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 80%",
      },
    });

    gsap.from(".faq-item-animate", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".faq-list-container",
        start: "top 80%",
      },
    });
  });

  return (
    <section id="faq" className="faq-section bg-transparent py-24 md:py-32 relative z-20">
      <div className="container mx-auto px-5 md:px-10 max-w-5xl">
        {/* Title */}
        <div className="overflow-hidden mb-16 text-center">
          <h1 className="faq-title general-title text-dark-brown">
            KEPOIN KITA
          </h1>
          <p className="font-paragraph text-theme-blue mt-4 text-lg md:text-xl font-bold uppercase tracking-wider">
            Frequently Asked Questions
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-list-container flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="faq-item-animate bg-white/70 border border-white/60 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-xl md:text-2xl font-bold text-slate-800">
                    {item.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-theme-blue/10 flex justify-center items-center text-theme-blue transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-theme-blue text-white" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </button>

                {/* Smooth Expand/Collapse Container */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[500px] border-t border-slate-100" : "max-h-0"
                  }`}
                >
                  <div className="p-6 md:p-8 font-paragraph text-lg text-slate-600 leading-relaxed">
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
