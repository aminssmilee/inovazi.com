import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <footer id="footer" className="footer-section">
      <div className="2xl:h-[110dvh] relative md:pt-[10vh] pt-[5vh]">
        <div className="overflow-hidden z-10">
          <h1 className="general-title text-center text-milk py-5">#INOVASITANPABATAS</h1>
        </div>

        {isMobile ? (
          <Image src="/images/footer-drink.webp" alt="" width={3000} height={3000} className="absolute top-0 size-full object-contain pointer-events-none" />
        ) : (
          <video src="/videos/splash1.mp4" autoPlay playsInline muted className="absolute top-0 size-full object-contain mix-blend-lighten pointer-events-none" />
        )}

        <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
          <div className="social-btn">
            <Image src="./images/yt.svg" alt="" width={50} height={50} />
          </div>
          <div className="social-btn">
            <Image src="./images/insta.svg" alt="" width={50} height={50} />
          </div>
          <div className="social-btn">
            <Image src="./images/tiktok.svg" alt="" width={50} height={50} />
          </div>
        </div>

        <div className="relative z-10 mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium">
          <div className="flex flex-wrap md:flex-nowrap md:items-start items-start md:gap-16 gap-8">
            <div>
              <p>Inovazi Services</p>
            </div>
            <div>
              <p>Our Projects</p>
              <p>UI/UX Design</p>
              <p>GSAP Animation</p>
            </div>
            <div>
              <p>Company</p>
              <p>Contacts</p>
              <p>Blog</p>
            </div>
          </div>

          <div className="md:max-w-lg">
            <p>Dapatkan penawaran harga menarik dan konsultasi gratis mengenai kebutuhan pembuatan website Anda!</p>
            <div className="flex justify-between items-center border-b border-[#D9D9D9] py-5 md:mt-10">
              <input type="email" placeholder="Enter your email" className="w-full placeholder:font-sans placeholder:text-[#999999]" />
              <Image src="/images/arrow.svg" alt="arrow" width={70} height={70} />
            </div>
          </div>
        </div>

        <div className="copyright-box">
          <p>
            Copyright © 2026 Inovazi - All Rights Reserved
          </p>
          <div className="flex items-center gap-7">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
