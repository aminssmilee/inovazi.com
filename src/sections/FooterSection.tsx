import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const FooterSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animate the huge title
    const titleSplit = SplitText.create(".footer-title", { type: "chars" });
    gsap.from(titleSplit.chars, {
      yPercent: 120,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    // Animate social buttons & links
    gsap.from(".footer-fade-up", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      },
    });

    return () => {
      titleSplit.revert();
    };
  }, { scope: containerRef });

  return (
    <footer id="footer" ref={containerRef} className="footer-section bg-transparent !border-t-0 text-slate-600">
      <div className="2xl:h-[110dvh] relative md:pt-[10vh] pt-[5vh]">
        <div className="overflow-hidden z-10">
          <h1 className="footer-title general-title text-center text-slate-900 py-5 font-light">#INOVASITANPABATAS</h1>
        </div>

        <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
          <div className="footer-fade-up social-btn !border-black/20 hover:!bg-black/5">
            <Image src="./images/yt.svg" alt="" width={50} height={50} className="brightness-0" />
          </div>
          <div className="footer-fade-up social-btn !border-black/20 hover:!bg-black/5">
            <Image src="./images/insta.svg" alt="" width={50} height={50} className="brightness-0" />
          </div>
          <div className="footer-fade-up social-btn !border-black/20 hover:!bg-black/5">
            <Image src="./images/tiktok.svg" alt="" width={50} height={50} className="brightness-0" />
          </div>
        </div>

        <div className="footer-fade-up relative z-10 mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-slate-600 font-paragraph md:text-lg font-light">
          <div className="flex flex-wrap md:flex-nowrap md:items-start items-start md:gap-16 gap-8">
            <div>
              <p className="hover:text-theme-blue transition-colors cursor-pointer">Inovazi Services</p>
            </div>
            <div>
              <p className="hover:text-theme-blue transition-colors cursor-pointer mb-2">Our Projects</p>
              <p className="hover:text-theme-blue transition-colors cursor-pointer mb-2">UI/UX Design</p>
              <p className="hover:text-theme-blue transition-colors cursor-pointer">GSAP Animation</p>
            </div>
            <div>
              <p className="hover:text-theme-blue transition-colors cursor-pointer mb-2">Company</p>
              <p className="hover:text-theme-blue transition-colors cursor-pointer mb-2">Contacts</p>
              <p className="hover:text-theme-blue transition-colors cursor-pointer">Blog</p>
            </div>
          </div>

          <div className="md:max-w-lg">
            <p className="font-light">Dapatkan penawaran harga menarik dan konsultasi gratis mengenai kebutuhan pembuatan website Anda!</p>
            <div className="flex justify-between items-center border-b border-black/20 py-5 md:mt-10 focus-within:border-theme-blue transition-colors">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-slate-900 placeholder:font-sans placeholder:text-slate-400 font-light"
              />
              <button className="flex-shrink-0 cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                <Image src="/images/arrow.svg" alt="arrow" width={70} height={70} className="brightness-0 w-8 h-8 md:w-[70px] md:h-[70px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="copyright-box !text-slate-500 font-light">
          <p>
            Copyright © 2026 Inovazi - All Rights Reserved
          </p>
          <div className="flex items-center gap-7">
            <p className="hover:text-slate-800 transition-colors cursor-pointer">Privacy Policy</p>
            <p className="hover:text-slate-800 transition-colors cursor-pointer">Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
