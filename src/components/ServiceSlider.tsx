import { useGSAP } from "@gsap/react";
import { flavorList } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

const ServiceSlider = () => {
  const sliderRef = useRef<null | HTMLDivElement>(null);

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if (!isTablet && scrollAmount > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-section",
          start: "2% top",
          end: `+=${scrollAmount + 1000}px`,
          scrub: true,
          pin: true,
          snap: 1 / (flavorList.length - 1),
        },
      });

      tl.to(".services-section", {
        x: `-${scrollAmount + 1000}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );
  }, [isTablet]);

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorList.map((flavor) => (
          <div key={flavor.name} className={`relative z-30 lg:w-[50vw] w-[90vw] md:w-[90vw] lg:h-[70vh] md:h-[50vh] h-80 flex-none rounded-[2rem] overflow-hidden ${flavor.rotation}`}>
            <Image src={`/images/${flavor.color}-bg.svg`} alt="flavor" fill className="absolute inset-0 object-cover rounded-[2rem]" />

            {flavor.image && (
              <Image 
                src={flavor.image} 
                alt={flavor.name} 
                width={400} 
                height={400} 
                className="drinks w-52 md:w-[350px] object-contain rounded-2xl p-2 select-none pointer-events-none z-10" 
              />
            )}

            <h1 className="absolute md:bottom-10 md:left-10 md:right-10 bottom-5 left-5 right-5 text-milk md:text-5xl lg:text-6xl text-2xl sm:text-3xl font-semibold uppercase tracking-tighter max-w-[90%] leading-tight z-10">{flavor.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSlider;
