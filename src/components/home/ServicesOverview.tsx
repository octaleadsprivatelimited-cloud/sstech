import { Link } from "react-router-dom";
import { Briefcase, Code2, Users, Wrench, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const services = [
  {
    icon: Briefcase,
    title: "IT Consulting",
    description:
      "Strategic guidance for better technology decisions. Professional support and expert solutions for your business and IT needs.",
  },
  {
    icon: Code2,
    title: "Software Development",
    description:
      "Custom-built applications tailored to your unique business requirements, from web platforms to enterprise systems.",
  },
  {
    icon: Users,
    title: "Job Placements",
    description:
      "Connecting top talent with direct clients. We help professionals find the right career path and companies find the right people.",
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    description:
      "Reliable ongoing technical support to keep your systems running smoothly, securely, and efficiently.",
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">What We Do</p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight"
              style={{ textWrap: "balance" }}
            >
              End-to-end technology solutions built for scale
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <div className="bg-surface-raised rounded-xl p-7 h-full flex flex-col card-lift border border-border/50 group">
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mb-5 group-hover:bg-electric/20 transition-colors">
                  <service.icon className="w-6 h-6 text-electric" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-navy mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1" style={{ textWrap: "pretty" }}>
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-electric hover:gap-2 transition-all"
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
