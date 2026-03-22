import { Link } from "react-router-dom";
import { Briefcase, Code2, Users, Wrench, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import serviceConsulting from "@/assets/service-consulting.jpg";
import serviceDevelopment from "@/assets/service-development.jpg";
import servicePlacements from "@/assets/service-placements.jpg";
import serviceSupport from "@/assets/service-support.jpg";

const services = [
  {
    icon: Briefcase,
    title: "IT Consulting",
    shortDesc: "Strategic tech guidance.",
    description: "Strategic guidance for better technology decisions. Professional support and expert solutions for your business and IT needs.",
    image: serviceConsulting,
  },
  {
    icon: Code2,
    title: "Software Development",
    shortDesc: "Custom apps for your business.",
    description: "Custom-built applications tailored to your unique business requirements, from web platforms to enterprise systems.",
    image: serviceDevelopment,
  },
  {
    icon: Users,
    title: "Job Placements",
    shortDesc: "Connecting talent & opportunity.",
    description: "Connecting top talent with direct clients. We help professionals find the right career path and companies find the right people.",
    image: servicePlacements,
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    shortDesc: "Reliable ongoing support.",
    description: "Reliable ongoing technical support to keep your systems running smoothly, securely, and efficiently.",
    image: serviceSupport,
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-16 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-electric mb-2">What We Do</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-navy leading-tight" style={{ textWrap: "balance" }}>
              End-to-end technology solutions
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <div className="bg-surface-raised rounded-lg sm:rounded-xl overflow-hidden h-full flex flex-col card-lift border border-border/50 group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5 sm:p-7 flex flex-col flex-1">
                  <h3 className="font-heading font-semibold text-xs sm:text-lg text-navy mb-1 sm:mb-3">{service.title}</h3>
                  <p className="text-[10px] text-muted-foreground leading-snug flex-1 sm:hidden">{service.shortDesc}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 hidden sm:block">{service.description}</p>
                  <div className="mt-2 sm:mt-5 flex flex-col gap-1 sm:gap-2">
                    <Link to="/services" className="inline-flex items-center gap-1 text-[10px] sm:text-sm font-medium text-electric hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    </Link>
                    <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#1da851] text-white font-medium active:scale-[0.97] w-full text-[10px] sm:text-sm h-6 sm:h-9">
                      <a
                        href={`https://wa.me/917675843214?text=${encodeURIComponent(`Hi, I'm interested in your "${service.title}" service. Can you share more details?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
