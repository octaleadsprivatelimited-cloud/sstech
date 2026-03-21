import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const CTABanner = () => {
  return (
    <section className="py-24 md:py-32 bg-surface-raised">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="hero-gradient rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-electric/10 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-gold/10 blur-[60px]" />

            <div className="relative z-10">
              <h2
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-6"
                style={{ textWrap: "balance" }}
              >
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-primary-foreground/60 max-w-xl mx-auto mb-10" style={{ textWrap: "pretty" }}>
                Let's discuss how Sthanu Setu Technologies can help you achieve your technology goals.
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-navy font-semibold px-8 h-13 text-base active:scale-[0.97] transition-all shadow-lg shadow-gold/20"
                >
                  Get Started Today
                  <ArrowRight className="w-4 h-4 ml-2" />
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
