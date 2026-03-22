import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
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
  { title: "IT Consulting", shortDesc: "Strategic tech guidance.", description: "Strategic guidance for better technology decisions.", benefits: [], image: "", order: 0 },
  { title: "Software Development", shortDesc: "Custom apps for your business.", description: "Custom-built applications tailored to your unique business requirements.", benefits: [], image: "", order: 1 },
  { title: "Job Placements", shortDesc: "Connecting talent & opportunity.", description: "Connecting top talent with direct clients.", benefits: [], image: "", order: 2 },
  { title: "Support & Maintenance", shortDesc: "Reliable ongoing support.", description: "Reliable ongoing technical support to keep your systems running smoothly.", benefits: [], image: "", order: 3 },
];

const defaultContact: ContactInfo = { email: "", phone: "", address: "", whatsapp: "917675843214", linkedin: "", twitter: "", github: "" };

const ServicesOverview = () => {
  const { data: services } = useFirestoreList(getServices, fallbackServices);
  const { data: contact } = useFirestoreData(getContactInfo, defaultContact);

  return (
    <section className="py-20 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-electric mb-3">
              What We Do
            </p>
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-navy leading-tight"
              style={{ textWrap: "balance" }}
            >
              End-to-end technology solutions
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal scroll cards | Desktop: 4-col grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <ServiceCard service={service} index={i} whatsapp={contact.whatsapp} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile single-column */}
        <div className="sm:hidden flex flex-col gap-4">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.06}>
              <MobileServiceCard service={service} index={i} whatsapp={contact.whatsapp} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, whatsapp }: { service: ServiceItem; index: number; whatsapp: string }) => (
  <div className="bg-surface-raised rounded-xl overflow-hidden h-full flex flex-col group shadow-sm hover:shadow-xl transition-shadow duration-400 border border-border/40">
    <div className="aspect-[16/10] overflow-hidden">
      <img
        src={service.image || fallbackImages[index] || fallbackImages[0]}
        alt={service.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="p-5 lg:p-6 flex flex-col flex-1">
      <h3 className="font-heading font-semibold text-base lg:text-lg text-navy mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {service.description}
      </p>
      <div className="mt-5 flex flex-col gap-2">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-electric hover:gap-2.5 transition-all"
        >
          Learn More <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Button
          asChild
          size="sm"
          className="bg-[#25D366] hover:bg-[#1da851] text-white font-medium active:scale-[0.97] w-full text-sm h-9"
        >
          <a
            href={`https://wa.me/${whatsapp || "917675843214"}?text=${encodeURIComponent(`Hi, I'm interested in your "${service.title}" service. Can you share more details?`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </Button>
      </div>
    </div>
  </div>
);

const MobileServiceCard = ({ service, index, whatsapp }: { service: ServiceItem; index: number; whatsapp: string }) => (
  <div className="bg-surface-raised rounded-xl overflow-hidden flex flex-row shadow-sm border border-border/40 group">
    <div className="w-28 shrink-0">
      <img
        src={service.image || fallbackImages[index] || fallbackImages[0]}
        alt={service.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="p-3.5 flex flex-col flex-1 min-w-0">
      <h3 className="font-heading font-semibold text-sm text-navy mb-1">{service.title}</h3>
      <p className="text-xs text-muted-foreground leading-snug flex-1">{service.shortDesc}</p>
      <div className="mt-2.5 flex items-center gap-2">
        <Link
          to="/services"
          className="text-xs font-medium text-electric flex items-center gap-1"
        >
          More <ArrowRight className="w-3 h-3" />
        </Link>
        <a
          href={`https://wa.me/${whatsapp || "917675843214"}?text=${encodeURIComponent(`Hi, I'm interested in your "${service.title}" service.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 text-xs font-medium text-[#25D366]"
        >
          <MessageCircle className="w-3.5 h-3.5" /> Chat
        </a>
      </div>
    </div>
  </div>
);

export default ServicesOverview;
