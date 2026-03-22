import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const CTABanner = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-brand relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-20%] right-[-10%] w-72 h-72 rounded-full bg-white/[0.06] blur-[80px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-56 h-56 rounded-full bg-white/[0.04] blur-[60px]" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
              style={{ textWrap: "balance" }}
            >
              Ready to transform your business?
            </h2>
            <p
              className="text-sm sm:text-base text-white/70 max-w-md mx-auto mb-10"
              style={{ textWrap: "pretty" }}
            >
              Connect with Sthanu Setu Technologies to discover how our services
              can help you achieve your goals and drive digital transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-[hsl(var(--electric))] hover:bg-white/90 font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all shadow-lg rounded-full"
                >
                  Contact Us Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/[0.08] hover:bg-white/[0.15] font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all rounded-full"
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
