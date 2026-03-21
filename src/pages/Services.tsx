import { Briefcase, Code2, Users, Wrench, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const services = [
  {
    icon: Briefcase,
    title: "IT Consulting & Consultancy Services",
    description: "Strategic guidance for better technology decisions. We provide professional support and expert solutions for business and IT needs, helping you navigate complex technology landscapes with confidence.",
    benefits: ["Technology roadmap planning", "Digital transformation strategy", "Vendor evaluation & selection", "IT infrastructure assessment"],
  },
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom-built applications tailored to your unique business requirements. From web platforms to enterprise systems, we deliver robust software solutions that drive business growth.",
    benefits: ["Full-stack web development", "Enterprise application development", "API design & integration", "Cloud-native solutions"],
  },
  {
    icon: Users,
    title: "Job Placements",
    description: "Connecting top talent with direct clients. We help professionals find the right career path and provide companies with skilled resources that fit their culture and technical needs.",
    benefits: ["Direct client placements", "Contract & full-time staffing", "Technical screening & vetting", "Career guidance & support"],
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    description: "Reliable ongoing technical support to keep your systems running smoothly, securely, and efficiently. We monitor, maintain, and optimize your technology infrastructure.",
    benefits: ["24/7 monitoring & support", "Performance optimization", "Security patching & updates", "Incident management"],
  },
];

const Services = () => {
  return (
    <>
      <section className="hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 md:px-8">
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
        <div className="container mx-auto px-4 md:px-8 space-y-20">
          {services.map((service, i) => (
            <ScrollReveal key={service.title}>
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-electric" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6" style={{ textWrap: "pretty" }}>
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-sm text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-electric shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-[4/3] rounded-2xl bg-navy/5 border border-border/50 flex items-center justify-center">
                    <service.icon className="w-16 h-16 text-electric/30" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
