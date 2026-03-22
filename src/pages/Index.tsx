import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import AboutSnippet from "@/components/home/AboutSnippet";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

const Index = () => {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <AboutSnippet />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </>
  );
};

export default Index;
