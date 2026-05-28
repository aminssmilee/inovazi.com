import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const MessageSection = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create(".message-title", {
      type: "words",
    });

    const paragraphSplit = SplitText.create(".message-content p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    // Set initial values
    gsap.set(titleSplit.words, {
      yPercent: 100,
      color: "white",
      display: "inline-block",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content",
        start: "top 75%",
      },
    });

    // 1. Slide up in white
    tl.to(titleSplit.words, {
      yPercent: 0,
      stagger: 0.03,
      duration: 0.6,
      ease: "power2.out",
    })
    // 2. Color swipe: animate normal words to black, and highlighted words to blue/yellow
    .to(titleSplit.words, {
      color: (index, target) => {
        if (target.closest(".highlight-blue")) {
          return "#1d63ff"; // Blue
        }
        if (target.closest(".highlight-yellow")) {
          return "#ffce32"; // Yellow
        }
        return "#000000"; // Black
      },
      stagger: 0.03,
      duration: 0.5,
      ease: "power1.out",
    }, "-=0.3");

    // Paragraph entrance
    gsap.from(paragraphSplit.words, {
      yPercent: 200,
      rotate: 1,
      ease: "power2.out",
      duration: 0.8,
      stagger: 0.005,
      scrollTrigger: {
        trigger: ".message-content p",
        start: "top 85%",
      },
    });

    return () => {
      titleSplit.revert();
      paragraphSplit.revert();
    };
  });

  return (
    <section id="about" className="message-content bg-transparent min-h-[85vh] flex items-center justify-center py-24 relative z-20">
      <div className="container mx-auto px-5 md:px-10 max-w-5xl">
        <div className="overflow-hidden text-center py-4">
          <h1 className="message-title font-sans text-3xl md:text-6xl font-light tracking-tight leading-tight text-black max-w-4xl mx-auto">
            Kami bikin website yang bukan cuma <span className="highlight-blue font-medium">Estetik</span>, tapi juga bikin bisnis kamu keliatan <span className="highlight-yellow font-medium">Next Level</span>.
          </h1>
        </div>

        <div className="flex-center md:mt-16 mt-8">
          <div className="max-w-xl px-10 flex-center overflow-hidden">
            <p className="font-paragraph text-slate-650 text-base md:text-lg leading-relaxed text-center">
              Dari landing page modern sampai website interaktif,
              Inovazi hadir untuk membantu brand tampil lebih standout
              di era digital tanpa desain yang terasa kaku dan membosankan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;