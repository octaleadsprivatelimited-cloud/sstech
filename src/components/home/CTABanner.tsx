import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const CTABanner = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-brand opacity-90" />
      {/* Decorative elements */}
      <div className="absolute top-[-20%] right-[-10%] w-72 h-72 rounded-full bg-white/[0.08] blur-[80px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-56 h-56 rounded-full bg-white/[0.05] blur-[60px]" />
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
              style={{ textWrap: "balance" }}
            >
              Ready to Transform Your Business?
            </h2>
            <p
              className="text-sm sm:text-base text-white/75 max-w-md mx-auto mb-10"
              style={{ textWrap: "pretty" }}
            >
              Connect with Sthanu Setu Technologies to discover how our services
              can help you achieve your goals and drive digital transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-[hsl(330,85%,40%)] hover:bg-white/90 font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all shadow-xl shadow-black/15 rounded-full"
                >
                  Contact Us Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/[0.1] hover:bg-white/[0.2] font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all rounded-full"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTABanner;
