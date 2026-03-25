import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { useFirestoreList, useFirestoreData } from "@/hooks/useFirestoreData";
import { getServices, getPageBanner, ServiceItem, PageBanner } from "@/lib/firestore";
import heroServices from "@/assets/hero-services.jpg";
import useSEO from "@/hooks/useSEO";
import serviceConsulting from "@/assets/service-consulting.jpg";
import serviceDevelopment from "@/assets/service-development.jpg";
import servicePlacements from "@/assets/service-placements.jpg";
import serviceSupport from "@/assets/service-support.jpg";

const fallbackImages = [serviceConsulting, serviceDevelopment, servicePlacements, serviceSupport];

const fallbackServices: ServiceItem[] = [
  { title: "IT Consulting & Consultancy Services", shortDesc: "", description: "Strategic guidance for better technology decisions.", benefits: ["Technology roadmap planning", "Digital transformation strategy", "Vendor evaluation & selection", "IT infrastructure assessment"], image: "", order: 0 },
  { title: "Software Development", shortDesc: "", description: "Custom-built applications tailored to your unique business requirements.", benefits: ["Full-stack web development", "Enterprise application development", "API design & integration", "Cloud-native solutions"], image: "", order: 1 },
  { title: "Job Placements", shortDesc: "", description: "Connecting top talent with direct clients.", benefits: ["Direct client placements", "Contract & full-time staffing", "Technical screening & vetting", "Career guidance & support"], image: "", order: 2 },
  { title: "Support & Maintenance", shortDesc: "", description: "Reliable ongoing technical support to keep your systems running smoothly.", benefits: ["24/7 monitoring & support", "Performance optimization", "Security patching & updates", "Incident management"], image: "", order: 3 },
];

const defaultBanner: PageBanner = { title: "Comprehensive technology solutions", subtitle: "From strategy to execution, we provide end-to-end services that help businesses thrive in the digital age.", bgImage: "" };

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Services = () => {
  const { data: services } = useFirestoreList(getServices, fallbackServices);
  const { data: banner } = useFirestoreData(() => getPageBanner("services"), defaultBanner);

  useSEO({
    title: "Our Services — IT Consulting, Development & Staffing",
    description: "Explore Sthanu Setu Technologies' services: IT consulting, custom software development, job placements, and ongoing support & maintenance.",
    keywords: "IT services, software development services, IT consulting services, job placements, staffing solutions, Hyderabad IT company",
    canonical: "/services",
  });

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${banner.bgImage || heroServices})` }} />
        <div className="absolute inset-0 bg-[hsl(var(--navy))]/70" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--electric))] mb-3">Our Services</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl" style={{ textWrap: "balance" }}>{banner.title}</h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">{banner.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <Link to={`/services/${slugify(service.title)}`} className="group block h-full">
                  <div className="bg-card rounded-xl overflow-hidden h-full flex flex-col card-lift border border-border/50">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={service.image || fallbackImages[i] || fallbackImages[0]} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col flex-1">
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1" style={{ textWrap: "pretty" }}>{service.description}</p>
                      <ul className="space-y-2 mb-5">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-center gap-2 text-xs text-foreground"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--electric))] shrink-0" />{b}</li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--electric))] group-hover:gap-3 transition-all mt-auto">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
