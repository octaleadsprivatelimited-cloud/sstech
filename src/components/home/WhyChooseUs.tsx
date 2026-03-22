import { Shield, TrendingUp, Lock, Award } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const reasons = [
  {
    icon: Shield,
    title: "Certified Experts",
    description: "Our team comprises certified professionals with deep expertise across all technology domains.",
    color: "from-[hsl(330,85%,55%)] to-[hsl(350,80%,45%)]",
  },
  {
    icon: TrendingUp,
    title: "Enterprise-Grade Solutions",
    description: "We deliver scalable, enterprise-ready implementations that grow with your business needs.",
    color: "from-[hsl(35,90%,55%)] to-[hsl(20,85%,50%)]",
  },
  {
    icon: Lock,
    title: "Client-Centric Approach",
    description: "Every solution is tailored to your unique business requirements with dedicated project teams.",
    color: "from-[hsl(330,70%,50%)] to-[hsl(35,85%,55%)]",
  },
  {
    icon: Award,
    title: "Rapid Deployment",
    description: "Accelerated implementation methodologies ensure faster time-to-value for your investments.",
    color: "from-[hsl(15,85%,55%)] to-[hsl(330,80%,50%)]",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--electric))]/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(var(--electric))]">
                Our Strengths
              </span>
            </div>
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gradient leading-tight"
              style={{ textWrap: "balance" }}
            >
              Your Trusted Partner for Technology Excellence
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 0.08}>
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-7 text-center hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group h-full">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mx-auto mb-5`}>
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-base text-foreground mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
