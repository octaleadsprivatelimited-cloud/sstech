import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { useFirestoreList, useFirestoreData } from "@/hooks/useFirestoreData";
import { getServices, getContactInfo, ServiceItem, ContactInfo } from "@/lib/firestore";
import serviceConsulting from "@/assets/service-consulting.jpg";
import serviceDevelopment from "@/assets/service-development.jpg";
import servicePlacements from "@/assets/service-placements.jpg";
import serviceSupport from "@/assets/service-support.jpg";

const fallbackImages = [serviceConsulting, serviceDevelopment, servicePlacements, serviceSupport];

const fallbackServices: ServiceItem[] = [
  { title: "IT Consulting", shortDesc: "Strategic tech guidance.", description: "Strategic guidance for better technology decisions.", benefits: ["Technology roadmap planning", "Digital transformation strategy"], image: "", order: 0 },
  { title: "Software Development", shortDesc: "Custom apps for your business.", description: "Custom-built applications tailored to your unique business requirements.", benefits: ["Full-stack web development", "API design & integration"], image: "", order: 1 },
  { title: "Job Placements", shortDesc: "Connecting talent & opportunity.", description: "Connecting top talent with direct clients.", benefits: ["Direct client placements", "Technical screening & vetting"], image: "", order: 2 },
  { title: "Support & Maintenance", shortDesc: "Reliable ongoing support.", description: "Reliable ongoing technical support to keep your systems running smoothly.", benefits: ["24/7 monitoring & support", "Performance optimization"], image: "", order: 3 },
];

const defaultContact: ContactInfo = { email: "", phone: "", address: "", whatsapp: "917675843214", linkedin: "", twitter: "", github: "" };

const ServicesOverview = () => {
  const { data: services } = useFirestoreList(getServices, fallbackServices);
  const { data: contact } = useFirestoreData(getContactInfo, defaultContact);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--electric))] mb-3">
              Services
            </p>
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
              style={{ textWrap: "balance" }}
            >
              To meet your needs
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-lg mx-auto" style={{ textWrap: "pretty" }}>
              Comprehensive technology solutions tailored to your business
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <div className="bg-card rounded-xl overflow-hidden h-full flex flex-col card-lift border border-border/50 group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image || fallbackImages[i] || fallbackImages[0]}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[hsl(var(--electric))]/10 flex items-center justify-center mb-3 group-hover:bg-[hsl(var(--electric))]/20 transition-colors">
                    <span className="text-[hsl(var(--electric))] font-bold text-xs sm:text-sm">{i + 1}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-sm sm:text-base md:text-lg text-foreground mb-1.5 sm:mb-2 line-clamp-2">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 flex-1 line-clamp-3" style={{ textWrap: "pretty" }}>{service.description}</p>
                  {service.benefits && service.benefits.length > 0 && (
                    <ul className="space-y-1.5 mb-4 hidden sm:block">
                      {service.benefits.slice(0, 2).map((b) => (
                        <li key={b} className="flex items-center gap-1.5 text-xs text-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--electric))] shrink-0" />{b}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#1da851] text-white font-medium active:scale-[0.97] w-full text-xs sm:text-sm">
                    <a
                      href={`https://wa.me/${contact.whatsapp || "917675843214"}?text=${encodeURIComponent(`Hi, I'm interested in your "${service.title}" service.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--electric))] hover:gap-3 transition-all"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
