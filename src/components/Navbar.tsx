"use client";
import Image from "next/image";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[85%] max-w-5xl flex flex-col items-center">
      <nav className="w-full bg-[#20292C] text-milk rounded-full pl-4 pr-2 py-2 md:py-3 flex justify-between items-center shadow-lg border border-[#587B82]/15">
        {/* Brand logo + name */}
        <div className="flex items-center gap-0">
          <Image
            width={80}
            height={80}
            src="/images/logoinovazi.png"
            alt="nav-logo"
            className="w-10 md:w-14 h-auto object-contain -mr-2 md:-mr-3"
            style={{ filter: "brightness(0) invert(97%) sepia(5%) saturate(160%) hue-rotate(130deg) brightness(101%) contrast(97%)" }}
            priority
          />
          <span className="text-milk text-xl md:text-2xl font-sans">Inovazi</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-milk/80 font-medium font-paragraph">
          <a href="#services" className="hover:text-milk transition-colors">Services</a>
          <a href="#nutrition" className="hover:text-milk transition-colors">Nutrition</a>
          <a href="#benefits" className="hover:text-milk transition-colors">Benefits</a>
          <a href="#testimonials" className="hover:text-milk transition-colors">Testimonials</a>
        </div>

        {/* Action Button (Desktop) */}
        <div className="hidden md:block">
          <a href="#footer" className="bg-[#587B82] hover:bg-[#8BB2B9] text-[#F4F7F7] px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-sm transition-colors">
            Contact Us
          </a>
        </div>

        {/* Hamburger Icon Button (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-milk text-[#20292C] shadow-md z-50 transition-all active:scale-95 cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1 items-center justify-center w-5 h-5">
            <span className={`w-4 h-0.5 bg-[#20292C] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`w-4 h-0.5 bg-[#20292C] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`w-4 h-0.5 bg-[#20292C] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Dropdown Menu (Floating Card) */}
      <div className={`w-[98%] bg-[#20292C] border border-[#587B82]/20 rounded-3xl p-6 mt-2 flex flex-col gap-4 shadow-xl z-40 md:hidden transition-all duration-300 origin-top ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none absolute"}`}>
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
