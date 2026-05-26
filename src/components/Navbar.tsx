"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBgDark, setIsBgDark] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
            className.includes("testimonials-section");
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
    <div className={`fixed z-50 flex flex-col items-center transition-all duration-700 ease-in-out ${isScrolled
      ? "top-0 left-0 translate-x-0 w-[155px] max-w-[155px] md:w-[215px] md:max-w-[215px] p-3 md:p-9"
      : "top-4 left-1/2 -translate-x-1/2 w-[92%] md:w-[85%] max-w-5xl"
      }`}>
      <nav className={`text-milk flex justify-between items-center transition-all duration-500 ease-in-out overflow-hidden w-full mr-auto bg-transparent border-transparent shadow-none ${isScrolled
        ? "pl-0 pr-0 py-0 rounded-none"
        : "pl-4 pr-2 py-2 rounded-full md:rounded-none md:px-10 md:py-4"
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
              filter: showDarkNavbarContent
                ? "brightness(0) saturate(100%) invert(13%) sepia(13%) saturate(1055%) hue-rotate(152deg) brightness(96%) contrast(93%)"
                : "brightness(0) invert(97%) sepia(5%) saturate(160%) hue-rotate(130deg) brightness(101%) contrast(97%)"
            }}
            priority
          />
          <span className={`text-xl md:text-2xl font-sans transition-colors duration-500 ${showDarkNavbarContent ? "text-[#20292C]" : "text-milk"}`}>Inovazi</span>
        </div>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center gap-8 text-milk/80 font-medium font-paragraph transition-all duration-500 ease-in-out flex-shrink-0 whitespace-nowrap ${isScrolled
          ? "max-w-0 opacity-0 translate-x-12 pointer-events-none overflow-hidden"
          : "max-w-[600px] opacity-100 translate-x-0"
          }`}>
          <a href="#services" className="hover:text-milk transition-colors">Services</a>
          <a href="#nutrition" className="hover:text-milk transition-colors">Nutrition</a>
          <a href="#benefits" className="hover:text-milk transition-colors">Benefits</a>
          <a href="#testimonials" className="hover:text-milk transition-colors">Testimonials</a>
        </div>

        {/* Action Button (Desktop) */}
        <div className={`hidden md:block transition-all duration-500 ease-in-out flex-shrink-0 whitespace-nowrap ${isScrolled
          ? "max-w-0 opacity-0 translate-x-12 pointer-events-none overflow-hidden"
          : "max-w-[200px] opacity-100 translate-x-0"
          }`}>
          <a href="#footer" className="bg-[#587B82] hover:bg-[#8BB2B9] text-[#F4F7F7] px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-sm transition-colors">
            Contact Us
          </a>
        </div>

        {/* Hamburger Icon Button (Mobile) */}
        <div className={`md:hidden transition-all duration-500 ease-in-out flex-shrink-0 ${isScrolled
          ? "max-w-0 opacity-0 translate-x-12 pointer-events-none overflow-hidden"
          : "max-w-[100px] opacity-100"
          }`}>
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-milk text-[#20292C] shadow-md z-50 transition-all active:scale-95 cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1 items-center justify-center w-5 h-5">
              <span className={`w-4 h-0.5 bg-[#20292C] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`w-4 h-0.5 bg-[#20292C] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-4 h-0.5 bg-[#20292C] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu (Floating Card) */}
      <div className={`w-[98%] bg-[#20292C] border border-[#587B82]/20 rounded-3xl p-6 mt-2 flex flex-col gap-4 shadow-xl z-40 md:hidden transition-all duration-300 origin-top ${isOpen && !isScrolled ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none absolute"}`}>
        <div className="flex flex-col gap-4 text-milk text-lg font-medium font-paragraph">
          <a href="#services" onClick={toggleMenu} className="hover:text-milk transition-colors border-b border-[#587B82]/10 pb-3">Services</a>
          <a href="#nutrition" onClick={toggleMenu} className="hover:text-milk transition-colors border-b border-[#587B82]/10 pb-3">Nutrition</a>
          <a href="#benefits" onClick={toggleMenu} className="hover:text-milk transition-colors border-b border-[#587B82]/10 pb-3">Benefits</a>
          <a href="#testimonials" onClick={toggleMenu} className="hover:text-milk transition-colors border-b border-[#587B82]/10 pb-3">Testimonials</a>
          <a href="#footer" onClick={toggleMenu} className="bg-[#587B82] text-center text-[#F4F7F7] px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm mt-2 hover:bg-[#8BB2B9] transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
