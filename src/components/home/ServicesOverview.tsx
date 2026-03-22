import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Code2, Monitor, Users, Wrench } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { useFirestoreList, useFirestoreData } from "@/hooks/useFirestoreData";
import { getServices, getContactInfo, ServiceItem, ContactInfo } from "@/lib/firestore";

const fallbackServices: ServiceItem[] = [
  { title: "IT Consulting", shortDesc: "Strategic tech guidance.", description: "Strategic guidance for better technology decisions.", benefits: [], image: "", order: 0 },
  { title: "Software Development", shortDesc: "Custom apps for your business.", description: "Custom-built applications tailored to your unique business requirements.", benefits: [], image: "", order: 1 },
  { title: "Job Placements", shortDesc: "Connecting talent & opportunity.", description: "Connecting top talent with direct clients.", benefits: [], image: "", order: 2 },
  { title: "Support & Maintenance", shortDesc: "Reliable ongoing support.", description: "Reliable ongoing technical support to keep your systems running smoothly.", benefits: [], image: "", order: 3 },
];

const defaultContact: ContactInfo = { email: "", phone: "", address: "", whatsapp: "917675843214", linkedin: "", twitter: "", github: "" };

const serviceIcons = [Monitor, Code2, Users, Wrench];

const ServicesOverview = () => {
  const { data: services } = useFirestoreList(getServices, fallbackServices);
  const { data: contact } = useFirestoreData(getContactInfo, defaultContact);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--electric))] mb-3">
              Services
            </p>
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
              style={{ textWrap: "balance" }}
            >
              To meet your needs
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-lg" style={{ textWrap: "pretty" }}>
              Comprehensive technology solutions tailored to your business
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {services.map((service, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <div className="group bg-card rounded-2xl p-6 sm:p-8 border border-border hover:border-[hsl(var(--electric))]/30 hover:shadow-lg hover:shadow-[hsl(var(--electric))]/5 transition-all duration-300">
                  <div className="w-11 h-11 rounded-lg bg-[hsl(var(--electric))]/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[hsl(var(--electric))]" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--electric))] hover:gap-2.5 transition-all"
                    >
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={`https://wa.me/${contact.whatsapp || "917675843214"}?text=${encodeURIComponent(`Hi, I'm interested in your "${service.title}" service.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(145,70%,35%)] hover:text-[hsl(145,70%,30%)] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
