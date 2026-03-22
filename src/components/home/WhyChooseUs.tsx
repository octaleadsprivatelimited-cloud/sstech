import { Shield, TrendingUp, Lock, Award } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const reasons = [
  {
    icon: Shield,
    title: "Certified Experts",
    description: "Our team comprises certified professionals with deep expertise across all technology domains.",
  },
  {
    icon: TrendingUp,
    title: "Enterprise-Grade Solutions",
    description: "We deliver scalable, enterprise-ready implementations that grow with your business needs.",
  },
  {
    icon: Lock,
    title: "Client-Centric Approach",
    description: "Every solution is tailored to your unique business requirements with dedicated project teams.",
  },
  {
    icon: Award,
    title: "Rapid Deployment",
    description: "Accelerated implementation methodologies ensure faster time-to-value for your investments.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-[hsl(220,60%,6%)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: "48px 48px",
      }} />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric mb-4">
              Why Choose Us
            </p>
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight"
              style={{ textWrap: "balance" }}
            >
              Your Trusted Partner for Technology Excellence
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 0.08}>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-6 sm:p-7 text-center hover:border-electric/30 hover:bg-white/[0.05] transition-all duration-300 group h-full">
                <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-electric/20 transition-colors">
                  <reason.icon className="w-6 h-6 text-electric" />
                </div>
                <h3 className="font-heading font-semibold text-base text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
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
