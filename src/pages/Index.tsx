import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import ServicesOverview from "@/components/home/ServicesOverview";
import AboutSnippet from "@/components/home/AboutSnippet";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

const Index = () => {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesOverview />
      <AboutSnippet />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </>
  );
};

export default Index;
