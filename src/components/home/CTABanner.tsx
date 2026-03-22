import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const CTABanner = () => {
  return (
    <section className="py-20 md:py-32 bg-surface-raised">
      <div className="container mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="bg-navy rounded-2xl sm:rounded-3xl p-10 sm:p-14 md:p-20 text-center relative overflow-hidden">
            {/* Subtle ambient glow */}
            <div className="absolute top-[-20%] right-[-10%] w-72 h-72 rounded-full bg-electric/8 blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-56 h-56 rounded-full bg-gold/6 blur-[80px]" />

            <div className="relative z-10">
              <h2
                className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6"
                style={{ textWrap: "balance" }}
              >
                Ready to Transform Your Business?
              </h2>
              <p
                className="text-sm sm:text-base text-white/50 max-w-md mx-auto mb-8 sm:mb-10"
                style={{ textWrap: "pretty" }}
              >
                Let's discuss how Sthanu Setu Technologies can help you achieve
                your technology goals.
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-navy font-semibold px-7 sm:px-8 h-11 sm:h-12 text-sm sm:text-base active:scale-[0.97] transition-all shadow-lg shadow-gold/20"
                >
                  Get Started Today
                  <ArrowRight className="w-4 h-4 ml-1.5" />
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
