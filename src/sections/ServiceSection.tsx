"use client";

import { useRef, useState, useEffect } from "react";
import ServiceTitle from "@/components/ServiceTitle";
import ServiceSlider from "@/components/ServiceSlider";

const ServiceSection = () => {
  // ✅ Skill: direct ref on the section element — passed to ServiceSlider
  // so the horizontal pin ScrollTrigger can target the exact DOM node
  // without relying on a global selector string.
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null);

  // Sync ref → state so ServiceSlider receives the element after mount
  useEffect(() => {
    setSectionEl(sectionRef.current);
  }, []);

  return (
    <section id="services" ref={sectionRef} className="services-section">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <ServiceTitle />
        </div>
        <div className="h-full">
          <ServiceSlider sectionEl={sectionEl} />
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
