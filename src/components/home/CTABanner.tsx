import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const CTABanner = () => {
  return (
    <section className="py-20 md:py-28 bg-[hsl(220,60%,4%)] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-20%] right-[-10%] w-72 h-72 rounded-full bg-electric/[0.06] blur-[100px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-56 h-56 rounded-full bg-gold/[0.04] blur-[80px]" />

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
              className="text-sm sm:text-base text-white/40 max-w-md mx-auto mb-10"
              style={{ textWrap: "pretty" }}
            >
              Connect with Sthanu Setu Technologies to discover how our services
              can help you achieve your goals and drive digital transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-electric hover:bg-electric/90 text-white font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all shadow-lg shadow-electric/25 rounded-lg"
                >
                  Contact Us Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 text-white bg-white/[0.04] hover:bg-white/[0.08] font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all rounded-lg"
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
