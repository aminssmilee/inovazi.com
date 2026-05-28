import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText);

interface HeroSectionProps {
  onLoaded: () => void;
  triggerAnimation: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLoaded, triggerAnimation }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  const handleStartClick = () => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo("#services", true);
    } else {
      document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded();
    }, 100);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  useEffect(() => {
    if (triggerAnimation && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => console.log("Video play failed:", err));
    }
  }, [triggerAnimation]);

  useGSAP(
    () => {
      if (!triggerAnimation) return;

      const titleSplit = SplitText.create(".hero-title", {
        type: "chars",
      });

      // Set initial values
      gsap.set(titleSplit.chars, {
        yPercent: 150,
        color: "white",
        display: "inline-block",
      });

      const tl = gsap.timeline({
        delay: 1,
      });

      tl.to(".hero-content", {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
      })
        .to(
          ".hero-text-scroll",
          {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out",
          },
          "-=0.5"
        )
        .to(
          titleSplit.chars,
          {
            yPercent: 0,
            color: "white",
            stagger: 0.04,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          titleSplit.chars,
          {
            color: "#ffce32",
            stagger: 0.04,
            duration: 0.5,
            ease: "power2.out",
          }
        )
        .to(
          titleSplit.chars,
          {
            color: "#1d63ff",
            stagger: 0.04,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          titleSplit.chars,
          {
            color: "#000000",
            stagger: 0.04,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );

      return () => {
        titleSplit.revert();
      };
    },
    { dependencies: [triggerAnimation] }
  );

  return (
    <section className="bg-transparent relative z-10">
      <div className="hero-container !bg-transparent">
        <div className="hero-content opacity-0">
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              {/* <h1>Inovazi Creative Studio</h1> */}
            </div>
          </div>
          <div className="overflow-hidden mb-4">
            <h1 className="hero-title">Inovazi 2026</h1>
          </div>
          <h2>
            Studio digital kreatif yang ngebangun website interaktif anti-cringe. <br />
            Biar pas ditanya &ldquo;sibuk apa?&rdquo;, ada jawaban keren selain rebahan.
          </h2>
          <button
            onClick={handleStartClick}
            className="hero-button cursor-pointer hover:scale-105 hover:brightness-110 active:scale-95 transition-all focus:outline-none"
          >
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
