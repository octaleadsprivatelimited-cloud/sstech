import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
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
    <section className="py-20 md:py-28 bg-[hsl(220,60%,4%)] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-electric/[0.04] rounded-full blur-[120px]" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric mb-4">
              What We Do
            </p>
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight"
              style={{ textWrap: "balance" }}
            >
              Delivering Excellence Across the Enterprise.
            </h2>
          </div>
        </ScrollReveal>

        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <ServiceCard service={service} index={i} whatsapp={contact.whatsapp} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile stack */}
        <div className="sm:hidden flex flex-col gap-4">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.06}>
              <ServiceCard service={service} index={i} whatsapp={contact.whatsapp} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, whatsapp }: { service: ServiceItem; index: number; whatsapp: string }) => (
  <div className="bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/[0.06] p-6 sm:p-8 hover:border-electric/30 hover:bg-white/[0.05] transition-all duration-400 group">
    <h3 className="font-heading font-semibold text-lg sm:text-xl text-white mb-3 group-hover:text-electric transition-colors">
      {service.title}
    </h3>
    <p className="text-sm text-white/45 leading-relaxed mb-5">
      {service.description}
    </p>
    <div className="flex items-center gap-4">
      <Link
        to="/services"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-electric hover:gap-2.5 transition-all"
      >
        Explore <ArrowRight className="w-3.5 h-3.5" />
      </Link>
      <a
        href={`https://wa.me/${whatsapp || "917675843214"}?text=${encodeURIComponent(`Hi, I'm interested in your "${service.title}" service.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#25D366] hover:text-[#25D366]/80 transition-colors"
      >
        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
      </a>
    </div>
  </div>
);

export default ServicesOverview;
