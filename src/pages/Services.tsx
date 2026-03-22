import { Briefcase, Code2, Users, Wrench, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import heroServices from "@/assets/hero-services.jpg";
import serviceConsulting from "@/assets/service-consulting.jpg";
import serviceDevelopment from "@/assets/service-development.jpg";
import servicePlacements from "@/assets/service-placements.jpg";
import serviceSupport from "@/assets/service-support.jpg";

const services = [
  {
    icon: Briefcase,
    title: "IT Consulting & Consultancy Services",
    description: "Strategic guidance for better technology decisions. We provide professional support and expert solutions for business and IT needs, helping you navigate complex technology landscapes with confidence.",
    benefits: ["Technology roadmap planning", "Digital transformation strategy", "Vendor evaluation & selection", "IT infrastructure assessment"],
    image: serviceConsulting,
  },
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom-built applications tailored to your unique business requirements. From web platforms to enterprise systems, we deliver robust software solutions that drive business growth.",
    benefits: ["Full-stack web development", "Enterprise application development", "API design & integration", "Cloud-native solutions"],
    image: serviceDevelopment,
  },
  {
    icon: Users,
    title: "Job Placements",
    description: "Connecting top talent with direct clients. We help professionals find the right career path and provide companies with skilled resources that fit their culture and technical needs.",
    benefits: ["Direct client placements", "Contract & full-time staffing", "Technical screening & vetting", "Career guidance & support"],
    image: servicePlacements,
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    description: "Reliable ongoing technical support to keep your systems running smoothly, securely, and efficiently. We monitor, maintain, and optimize your technology infrastructure.",
    benefits: ["24/7 monitoring & support", "Performance optimization", "Security patching & updates", "Incident management"],
    image: serviceSupport,
  },
];

const Services = () => {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroServices})` }} />
        <div className="absolute inset-0 bg-[hsl(220,60%,10%)]/60" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">Our Services</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground leading-tight max-w-2xl" style={{ textWrap: "balance" }}>
              Comprehensive technology solutions
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/60 max-w-xl leading-relaxed">
              From strategy to execution, we provide end-to-end services that help businesses thrive in the digital age.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <div className="bg-surface-raised rounded-xl overflow-hidden h-full flex flex-col card-lift border border-border/50 group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                      <service.icon className="w-5 h-5 text-electric" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-navy mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1" style={{ textWrap: "pretty" }}>
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-xs text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-electric shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
