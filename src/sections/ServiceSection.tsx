import ServiceTitle from "@/components/ServiceTitle";
import ServiceSlider from "@/components/ServiceSlider";

const ServiceSection = () => {
  return (
    <section id="services" className="services-section">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <ServiceTitle />
        </div>
        <div className="h-full">
          <ServiceSlider />
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
