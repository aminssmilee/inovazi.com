import { useMediaQuery } from "react-responsive";
import { nutrientList } from "../constants";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import Image from "next/image";

const NutritionSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [lists, setLists] = useState(nutrientList);

  useEffect(() => {
    if (isMobile) {
      setLists(nutrientList.slice(0, 3));
    } else {
      setLists(nutrientList);
    }
  }, [isMobile]);

  useGSAP(() => {
    const titleSplit = SplitText.create(".nutrition-title", {
      type: "chars",
    });
    const paragraphSplit = SplitText.create(".nutrition-section p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top center",
      },
    });
    contentTl
      .from(titleSplit.chars, {
        yPercent: 100,
        stagger: 0.02,
        ease: "power2.out",
      })
      .from(paragraphSplit.words, {
        yPercent: 200,
        rotate: 3,
        ease: "power1.inOut",
        duration: 0.8,
        stagger: 0.01,
      });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top 80%",
      },
    });

    titleTl.to(".nutrition-text-scroll", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      ease: "power1.inOut",
    });
  });

  return (
    <section id="nutrition" className="nutrition-section">
      <Image src="/images/slider-dip.webp" width={2000} height={2000} alt="slider-dip" className="w-full object-cover" />

      <Image src="/images/big-img.webp" width={3000} height={3000} alt="big-img" className="big-img" />

      <div className="relative z-10 flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0">
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title relative flex flex-col justify-center items-center md:gap-20 gap-6">
            <div className="overflow-hidden place-self-start">
              <h1 className="nutrition-title">It still does</h1>
            </div>
            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="nutrition-text-scroll place-self-start"
            >
              <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3">
                <h2 className="text-milk-yellow">Business Good</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-center items-center md:translate-y-5 translate-y-0 md:mt-0 mt-8">
          <div className="md:max-w-md max-w-md">
            <p className="text-lg md:text-right text-balance font-paragraph">
              Website berkualitas tinggi meningkatkan kredibilitas brand Anda, mendatangkan lebih banyak klien potensial, dan mengoptimalkan angka konversi penjualan secara otomatis.
            </p>
          </div>
        </div>

        <div className="nutrition-box">
          <div className="list-wrapper">
            {lists.map((nutrient, index) => (
              <div key={index} className="relative flex-1 col-center w-full">
                <div className="text-center">
                  <p className="md:text-lg font-paragraph">{nutrient.label}</p>
                  <p className="font-paragraph text-sm mt-1">up to</p>
                  <p className="text-2xl md:text-4xl tracking-tighter font-bold">{nutrient.amount}</p>
                </div>

                {index !== lists.length - 1 && (
                  <div className="spacer-border hidden md:block" />
                )}
                {index !== lists.length - 1 && (
                  <div className="w-2/3 h-px bg-[#587B82]/20 my-4 md:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionSection;
