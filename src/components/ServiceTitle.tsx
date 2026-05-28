import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ServiceTitle = () => {
  useGSAP(() => {
    const labelSplit = SplitText.create(".service-label", { type: "words" });
    const titleSplit = SplitText.create(".service-title-text", { type: "chars" });
    const descSplit = SplitText.create(".service-desc", { type: "words" });

    // Set initial values
    gsap.set(labelSplit.words, { yPercent: 100, opacity: 0 });
    gsap.set(descSplit.words, { yPercent: 50, opacity: 0 });
    gsap.set(titleSplit.chars, {
      yPercent: 150,
      color: "white",
      display: "inline-block",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 30%",
      },
    });

    // 1. Animate label
    tl.to(labelSplit.words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    })
      // 2. Slide up title characters in white
      .to(titleSplit.chars, {
        yPercent: 0,
        color: "white",
        stagger: 0.04,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.3")
      // 3. Color swipe: white -> yellow -> blue -> black
      .to(titleSplit.chars, {
        color: "#ffce32",
        stagger: 0.04,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.2")
      .to(titleSplit.chars, {
        color: "#1d63ff",
        stagger: 0.04,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3")
      .to(titleSplit.chars, {
        color: "#000000",
        stagger: 0.04,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3")
      // 4. Animate description
      .to(descSplit.words, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.2");

    return () => {
      labelSplit.revert();
      titleSplit.revert();
      descSplit.revert();
    };
  });

  return (
    <div className="flex flex-col justify-center items-center md:items-start w-full h-full gap-2 text-center md:text-left pl-6 md:pl-[10vw] pr-6 md:pr-0 max-w-lg">
      {/* <div className="overflow-hidden py-1">
        <p className="service-label text-theme-blue font-sans text-sm md:text-base font-bold uppercase tracking-wider">
          What We Do
        </p>
      </div> */}
      <div className="overflow-hidden py-1">
        <h1 className="service-title-text text-3xl md:text-6xl font-sans font-light text-black tracking-tight leading-none">
          Our <br />Services
        </h1>
      </div>
      <div className="overflow-hidden py-1 mt-2">
        <p className="service-desc font-paragraph text-slate-500 text-sm md:text-base leading-relaxed">
          Kami siap bantu meracik website interaktif dengan performa optimal untuk menaikkan level bisnis kamu.
        </p>
      </div>
    </div>
  );
};

export default ServiceTitle;
