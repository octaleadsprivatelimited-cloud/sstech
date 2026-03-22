import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const CTABanner = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative">
      <div className="container mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="bg-[hsl(var(--navy))] rounded-3xl p-10 sm:p-14 md:p-20 text-center relative overflow-hidden">
            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "28px 28px",
              }}
            />
            {/* Accent glow */}
            <div className="absolute top-[-30%] right-[-10%] w-64 h-64 rounded-full bg-[hsl(var(--electric))]/10 blur-[80px]" />

            <div className="relative z-10 max-w-xl mx-auto">
              <h2
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-5"
                style={{ textWrap: "balance" }}
              >
                Ready to Transform Your Business?
              </h2>
              <p
                className="text-sm sm:text-base text-white/60 mb-8"
                style={{ textWrap: "pretty" }}
              >
                Connect with Sthanu Setu Technologies to discover how our services
                can help you achieve your goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-brand text-white hover:brightness-110 font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all shadow-xl shadow-[hsl(var(--electric))]/20 rounded-full"
                  >
                    Contact Us Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white bg-white/[0.06] hover:bg-white/[0.12] font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all rounded-full"
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
