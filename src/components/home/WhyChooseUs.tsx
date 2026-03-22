import { Shield, TrendingUp, Lock } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import whyChooseBg from "@/assets/why-choose-us-bg.jpg";

const reasons = [
  {
    icon: Shield,
    title: "Reliable",
    description:
      "Dependable solutions backed by proven methodologies and a commitment to delivering on time, every time.",
  },
  {
    icon: TrendingUp,
    title: "Scalable",
    description:
      "Architecture and systems designed to grow with your business, from startup to enterprise level.",
  },
  {
    icon: Lock,
    title: "Secure",
    description:
      "Security-first approach to protect your data, users, and business operations from day one.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${whyChooseBg})` }}
      />
      <div className="absolute inset-0 bg-[hsl(220,60%,6%)]/80" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-electric mb-3">
              Why Choose Us
            </p>
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ textWrap: "balance" }}
            >
              Technology you can trust
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 0.1}>
              <div className="text-center p-6 sm:p-8 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] hover:border-electric/30 hover:bg-white/[0.06] transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-electric/10 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-electric/20 transition-colors">
                  <reason.icon className="w-5 h-5 sm:w-6 sm:h-6 text-electric" />
                </div>
                <h3 className="font-heading font-semibold text-base sm:text-lg text-white mb-2 sm:mb-3">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
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
