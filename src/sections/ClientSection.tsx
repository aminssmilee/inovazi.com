"use client";
import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import { clientList } from "@/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

interface Client {
  name: string;
  logo: string;
}

const ClientSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 💡 Hapus atau ganti isi clientList di file constants/index.ts nanti. 
  // Jika array dikosongkan ([]), maka akan otomatis muncul tampilan "Jadilah Klien Pertama Kami".
  const clients = clientList;

  useGSAP(() => {
    // Title animation
    const titleSplit = SplitText.create(".client-title", { type: "words, chars" });
    gsap.from(titleSplit.chars, {
      yPercent: 120,
      opacity: 0,
      stagger: 0.03,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // Content fade up
    gsap.from(".client-content", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    return () => {
      titleSplit.revert();
    };
  }, { scope: containerRef });

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.clientWidth / 2; // approximation for active dot
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex < clients.length && newIndex >= 0) {
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollLeftBtn = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRightBtn = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="clients" ref={containerRef} className="bg-transparent py-24 md:py-32 relative z-20 overflow-hidden">
      <div className="container mx-auto px-5 md:px-10 max-w-5xl text-center">

        {/* State 1: Ada Klien */}
        {clients.length > 0 ? (
          <>
            <div className="overflow-hidden mb-4">
              <h2 className="client-title font-sans text-3xl md:text-5xl font-light text-slate-900 tracking-tight">
                Client Kami
              </h2>
            </div>

            <p className="client-content font-paragraph text-slate-500 text-sm md:text-base font-light max-w-2xl mx-auto mb-16">
              Kami baru memulai perjalanan ini dan telah dipercaya membantu bisnis dalam membangun website yang modern dan profesional.
            </p>

            {/* Logo Slider Area with Arrows */}
            <div className="client-content relative w-full flex items-center justify-center mb-6">

              {/* Left Arrow */}
              <button
                onClick={scrollLeftBtn}
                className="hidden md:flex absolute left-0 z-10 w-10 h-10 items-center justify-center text-theme-blue hover:text-slate-900 transition-colors"
                aria-label="Previous"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Slider Container */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className={`flex w-full md:w-[85%] overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth items-center gap-10 md:gap-16 px-4 py-8 ${clients.length <= 4 ? "justify-center" : "justify-start"
                  }`}
              >
                {clients.map((client, idx) => (
                  <div key={idx} className="w-32 md:w-48 flex-shrink-0 snap-center hover:scale-110 transition-transform duration-300">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={200}
                      height={100}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={scrollRightBtn}
                className="hidden md:flex absolute right-0 z-10 w-10 h-10 items-center justify-center text-theme-blue hover:text-slate-900 transition-colors"
                aria-label="Next"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

            </div>

            {/* Dots Pagination */}
            <div className="client-content flex justify-center gap-2 mb-12">
              {clients.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-slate-900 scale-125" : "bg-slate-300"
                    }`}
                />
              ))}
            </div>

            <div className="client-content flex flex-col items-center gap-6 mt-8">
              <h3 className="font-sans text-2xl md:text-3xl font-light text-slate-900 tracking-tight">
                Jadilah Klien Kami Berikutnya!
              </h3>
              <a href="#footer" className="inline-block bg-slate-900 text-white hover:bg-black font-sans font-light rounded-full px-8 py-3.5 shadow-lg active:scale-95 transition-all duration-300 border-none cursor-pointer">
                Mulai Project Lo
              </a>
            </div>
          </>
        ) : (
          /* State 2: Belum Ada Klien (Array Kosong) */
          <>
            <div className="overflow-hidden mb-4">
              <p className="client-content font-paragraph text-sm font-medium uppercase tracking-widest text-slate-400">
                Kemitraan
              </p>
            </div>
            <div className="overflow-hidden mb-12">
              <h2 className="client-title font-sans text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-tight">
                Our Clients
              </h2>
            </div>
            <div className="client-content mt-10">
              <div className="flex flex-col items-center gap-6">
                <div className="w-full max-w-3xl p-8 md:p-12 rounded-[2rem] border border-black/10 bg-white/50 backdrop-blur-md shadow-sm">
                  <h3 className="font-sans text-2xl md:text-3xl font-light text-slate-900 mb-4 tracking-tight">
                    Jadilah Klien Pertama Kami!
                  </h3>
                  <p className="font-paragraph text-slate-500 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-8">
                    Saat ini kami siap membantu mewujudkan ide-ide luar biasa lo. Ambil kesempatan ini untuk mendominasi pasar dengan website interaktif eksklusif dari Inovazi.
                  </p>
                  <a href="#footer" className="inline-block bg-slate-900 text-white hover:bg-black font-sans font-light rounded-full px-8 py-3.5 shadow-lg active:scale-95 transition-all duration-300 border-none cursor-pointer">
                    Mulai Project Lo
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ClientSection;
