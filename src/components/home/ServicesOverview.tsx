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
const iconColors = [
  "from-[hsl(330,85%,55%)] to-[hsl(350,80%,45%)]",
  "from-[hsl(35,90%,55%)] to-[hsl(20,85%,50%)]",
  "from-[hsl(330,70%,50%)] to-[hsl(35,85%,55%)]",
  "from-[hsl(15,85%,55%)] to-[hsl(330,80%,50%)]",
];

const ServicesOverview = () => {
  const { data: services } = useFirestoreList(getServices, fallbackServices);
  const { data: contact } = useFirestoreData(getContactInfo, defaultContact);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--electric))]/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(var(--electric))]">
                Our Services
              </span>
            </div>
            <h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gradient leading-tight"
              style={{ textWrap: "balance" }}
            >
              Delivering Excellence Across the Enterprise
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-lg mx-auto" style={{ textWrap: "pretty" }}>
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {services.map((service, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconColors[i % iconColors.length]} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3 group-hover:text-[hsl(var(--electric))] transition-colors">
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
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(145,70%,40%)] hover:text-[hsl(145,70%,35%)] transition-colors"
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
