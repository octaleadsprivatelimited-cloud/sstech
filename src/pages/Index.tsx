import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import AboutSnippet from "@/components/home/AboutSnippet";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import useSEO from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "IT Consulting, Software Development & Staffing",
    description: "Sthanu Setu Technologies offers expert IT consulting, custom software development, job placements, and support & maintenance services in Hyderabad, India.",
    keywords: "IT consulting, software development, job placements, staffing, Hyderabad, Sthanu Setu Technologies, digital solutions, IT services India",
    canonical: "/",
  });

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
