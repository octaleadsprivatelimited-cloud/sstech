import { Shield, TrendingUp, Lock, Award, Handshake, Eye } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const values = [
  { icon: Shield, title: "Integrity", description: "We uphold high ethical standards and act with honesty, transparency, and professionalism." },
  { icon: Lock, title: "Trust & Confidentiality", description: "We understand the importance of trust and confidentiality in every client relationship." },
  { icon: Eye, title: "Objectivity", description: "We provide unbiased advice based on thorough analysis and understanding of your needs." },
  { icon: Award, title: "Expertise", description: "We stay up-to-date with industry trends and best practices to offer informed solutions." },
  { icon: Handshake, title: "Long-Term Relationships", description: "We build lasting partnerships based on trust, communication, and mutual respect." },
  { icon: TrendingUp, title: "Accountability", description: "We monitor progress, review strategies, and make adjustments to help clients succeed." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
              style={{ textWrap: "balance" }}
            >
              Guided by integrity, trust, and client-centricity
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-4">
              Our values drive everything we do
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {values.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.07}>
              <div className="bg-card rounded-2xl p-6 sm:p-7 border border-border hover:border-[hsl(var(--electric))]/30 hover:shadow-lg hover:shadow-[hsl(var(--electric))]/5 transition-all duration-300 h-full">
                <div className="w-11 h-11 rounded-lg bg-[hsl(var(--electric))]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[hsl(var(--electric))]" />
                </div>
                <h3 className="font-heading font-semibold text-base text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
