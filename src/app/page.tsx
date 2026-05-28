"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";
import MessageSection from "@/sections/MessageSection";
import NutritionSection from "@/sections/NutritionSection";
import ServiceSection from "@/sections/ServiceSection";
import BenefitSection from "@/sections/BenefitSection";
// import TestimonialSection from "@/sections/TestimonialSection";
import ClientSection from "@/sections/ClientSection";
import PricingSection from "@/sections/PricingSection";
import FAQSection from "@/sections/FAQSection";
import FooterSection from "@/sections/FooterSection";
import { useEffect } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
      smoothTouch: false, // Fully use native scrolling on mobile touch
    });
  });

  return (
    <main className="relative min-h-screen bg-milk font-sans">
      {/* Global Background Image */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/images/baground/bgnew.webp"
          alt="Global Background"
          fill
          priority
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <HeroSection
              onLoaded={() => { }}
              triggerAnimation={true}
            />
            <MessageSection />
            <ServiceSection />
            <NutritionSection />
            <div>
              <BenefitSection />
              {/* <TestimonialSection /> */}
              <ClientSection />
              <PricingSection />
              <FAQSection />
            </div>
            <FooterSection />
          </div>
        </div>
      </div>
    </main>
  );
}

