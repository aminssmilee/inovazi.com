import { useGSAP } from "@gsap/react";
import ClipPathTitle from "@/components/ClipPathTitle";
import gsap from "gsap";
import VideoPin from "@/components/VideoPin";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
  });

  return (
    <section id="benefits" className="benefit-section">
      <div className="container mx-auto pt-20">
        <div className="col-center">
          <p>
            Unlock the Advantages: <br />
            Explore the Key Benefits of Choosing Inovazi
          </p>

          <div className="mt-20 col-center">
            <ClipPathTitle title={"Fully Responsive"} color={"#F4F7F7"} bg={"#587B82"} className={"first-title"} borderColor={"#20292C"} />
            <ClipPathTitle title={"Clean Code & GSAP"} color={"#20292C"} bg={"#F4F7F7"} className={"second-title"} borderColor={"#20292C"} />
            <ClipPathTitle title={"SEO Optimization"} color={"#F4F7F7"} bg={"#384E53"} className={"third-title"} borderColor={"#20292C"} />
            <ClipPathTitle title={"Ultra Fast Loading"} color={"#20292C"} bg={"#8BB2B9"} className={"fourth-title"} borderColor={"#20292C"} />
          </div>

          <div className="md:mt-0 mt-10">
            <p>And much more ...</p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VideoPin />
      </div>
    </section>
  );
};

export default BenefitSection;
