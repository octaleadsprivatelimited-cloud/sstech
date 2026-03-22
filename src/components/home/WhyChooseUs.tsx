import { Shield, TrendingUp, Lock } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import whyChooseBg from "@/assets/why-choose-us-bg.jpg";

const reasons = [
  {
    icon: Shield,
    title: "Reliable",
    description: "Dependable solutions backed by proven methodologies and a commitment to delivering on time, every time.",
  },
  {
    icon: TrendingUp,
    title: "Scalable",
    description: "Architecture and systems designed to grow with your business, from startup to enterprise level.",
  },
  {
    icon: Lock,
    title: "Secure",
    description: "Security-first approach to protect your data, users, and business operations from day one.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${whyChooseBg})` }} />
      <div className="absolute inset-0 bg-[hsl(220,60%,10%)]/70" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">Why Choose Us</p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground leading-tight"
              style={{ textWrap: "balance" }}
            >
              Technology you can trust
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 0.1}>
              <div className="text-center p-8 rounded-xl border border-primary-foreground/10 hover:border-electric/30 transition-colors group">
                <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-electric/20 transition-colors">
                  <reason.icon className="w-7 h-7 text-electric" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary-foreground mb-3">{reason.title}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed" style={{ textWrap: "pretty" }}>
                  {reason.description}
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
