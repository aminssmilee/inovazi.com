"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ScrollSmoother } from "gsap/all";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBgDark, setIsBgDark] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // If mobile menu is open, close it first and delay scroll to prevent layout shift glitches
    const wasOpen = isOpen;
    setIsOpen(false);

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      setTimeout(() => {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(targetId, true);
        } else {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, wasOpen ? 150 : 0);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we are close to the bottom (within 50px)
      const isAtBottom = windowHeight + scrollY >= documentHeight - 50;

      if (scrollY > 50 && !isAtBottom) {
        setIsScrolled(true);
        setIsOpen(false); // Close mobile menu when scrolled
      } else {
        setIsScrolled(false);
      }

      // Check background color under the logo (Y = 40px)
      const elements = document.querySelectorAll("section, footer");
      let activeSectionIsLight = false;
      const logoY = 40;

      for (let i = 0; i < elements.length; i++) {
        const rect = elements[i].getBoundingClientRect();
        if (rect.top <= logoY && rect.bottom >= logoY) {
          const className = elements[i].className || "";
          const isLight = className.includes("services-section") ||
            className.includes("nutrition-section") ||
            className.includes("testimonials-section") ||
            className.includes("faq-section");
          if (isLight) {
            activeSectionIsLight = true;
          }
          break;
        }
      }
      setIsBgDark(!activeSectionIsLight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showDarkNavbarContent = isScrolled && !isBgDark;

  return (
    <div className={`fixed z-50 flex flex-col items-start transition-all duration-550 ease-in-out ${isScrolled
      ? "top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl md:top-0 md:left-0 md:translate-x-0 md:w-[215px] md:max-w-[215px] md:p-9"
      : "top-4 left-1/2 -translate-x-1/2 w-[92%] md:w-[85%] max-w-5xl"
      }`}>
      <nav className={`text-slate-800 flex justify-between items-center transition-all duration-500 ease-in-out overflow-hidden mr-auto ${isScrolled
        ? "w-full bg-white/80 border-slate-200/50 shadow-lg backdrop-blur-md px-4 py-2.5 rounded-full md:bg-transparent md:border-transparent md:shadow-none md:pl-0 md:pr-0 md:py-0 md:rounded-none"
        : "w-full bg-transparent border-transparent shadow-none border pl-4 pr-2 py-2 rounded-full md:px-10 md:py-4"
        }`}>
        {/* Brand logo + name */}
        <div className="flex items-center gap-0 flex-shrink-0 whitespace-nowrap">
          <Image
            width={80}
            height={80}
            src="/images/logoinovazi.png"
            alt="nav-logo"
            className="w-10 md:w-14 h-auto object-contain -mr-2 md:-mr-3 transition-all duration-500"
            style={{
              filter: "brightness(0)"
            }}
            priority
          />
          <span className="text-xl md:text-2xl font-pogonia text-slate-900 tracking-tight">Inovazi</span>
        </div>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center gap-8 text-black font-medium font-paragraph transition-all duration-500 ease-in-out flex-shrink-0 whitespace-nowrap ${isScrolled
          ? "max-w-0 opacity-0 translate-x-12 pointer-events-none overflow-hidden"
          : "max-w-[600px] opacity-100 translate-x-0"
          }`}>
          <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="hover:text-black transition-colors">About</a>
          <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-black transition-colors">Services</a>
          <a href="#nutrition" onClick={(e) => handleScrollTo(e, "#nutrition")} className="hover:text-black transition-colors">Vitals</a>
          <a href="#benefits" onClick={(e) => handleScrollTo(e, "#benefits")} className="hover:text-black transition-colors">Benefits</a>
          <a href="#testimonials" onClick={(e) => handleScrollTo(e, "#testimonials")} className="hover:text-black transition-colors">Testimonials</a>
          <a href="#faq" onClick={(e) => handleScrollTo(e, "#faq")} className="hover:text-black transition-colors">FAQ</a>
        </div>

        {/* Action Button (Desktop) */}
        <div className={`hidden md:block transition-all duration-500 ease-in-out flex-shrink-0 whitespace-nowrap ${isScrolled
          ? "max-w-0 opacity-0 translate-x-12 pointer-events-none overflow-hidden"
          : "max-w-[200px] opacity-100 translate-x-0"
          }`}>
          <a href="#footer" onClick={(e) => handleScrollTo(e, "#footer")} className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-sm">
            Contact Us
          </a>
        </div>

        {/* Hamburger Icon Button (Mobile) */}
        <div className="md:hidden transition-all duration-500 ease-in-out flex-shrink-0">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 text-black z-50 transition-all active:scale-95 cursor-pointer bg-transparent border-transparent shadow-none"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 items-center justify-center w-5 h-5">
              <span className={`w-5 h-0.5 bg-black transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-black transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-black transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu (Floating Card) */}
      <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[92%] bg-white/95 border border-slate-200/50 backdrop-blur-md rounded-3xl p-6 mt-2 flex flex-col gap-4 shadow-xl z-40 md:hidden transition-all duration-300 origin-top ${isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"}`}>
        <div className="flex flex-col gap-4 text-black text-lg font-medium font-paragraph">
          <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="hover:text-black transition-colors border-b border-slate-100 pb-3">About</a>
          <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-black transition-colors border-b border-slate-100 pb-3">Services</a>
          <a href="#nutrition" onClick={(e) => handleScrollTo(e, "#nutrition")} className="hover:text-black transition-colors border-b border-slate-100 pb-3">Vitals</a>
          <a href="#benefits" onClick={(e) => handleScrollTo(e, "#benefits")} className="hover:text-black transition-colors border-b border-slate-100 pb-3">Benefits</a>
          <a href="#testimonials" onClick={(e) => handleScrollTo(e, "#testimonials")} className="hover:text-black transition-colors border-b border-slate-100 pb-3">Testimonials</a>
          <a href="#faq" onClick={(e) => handleScrollTo(e, "#faq")} className="hover:text-black transition-colors border-b border-slate-100 pb-3">FAQ</a>
          <a href="#footer" onClick={(e) => handleScrollTo(e, "#footer")} className="bg-slate-900 text-center text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm mt-2 hover:bg-black transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
