import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const CTABanner = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative">
      <div className="container mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="bg-gradient-brand rounded-3xl p-10 sm:p-14 md:p-20 text-center relative overflow-hidden">
            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative z-10 max-w-xl mx-auto">
              <h2
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-5"
                style={{ textWrap: "balance" }}
              >
                Ready to Transform Your Business?
              </h2>
              <p
                className="text-sm sm:text-base text-white/75 mb-8"
                style={{ textWrap: "pretty" }}
              >
                Connect with Sthanu Setu Technologies to discover how our services
                can help you achieve your goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-[hsl(var(--navy))] hover:bg-white/90 font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all shadow-xl shadow-black/15 rounded-full"
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
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTABanner;
