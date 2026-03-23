import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
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
  { title: "IT Consulting & Consultancy Services", shortDesc: "", description: "Strategic guidance for better technology decisions. We help businesses navigate complex technology landscapes with confidence, providing expert advice on infrastructure, digital transformation, and technology investments.", benefits: ["Technology roadmap planning", "Digital transformation strategy", "Vendor evaluation & selection", "IT infrastructure assessment", "Cloud migration consulting", "Security & compliance advisory"], image: "", order: 0 },
  { title: "Software Development", shortDesc: "", description: "Custom-built applications tailored to your unique business requirements. Our development team creates scalable, maintainable software solutions using modern technologies and best practices.", benefits: ["Full-stack web development", "Enterprise application development", "API design & integration", "Cloud-native solutions", "Mobile-responsive applications", "DevOps & CI/CD implementation"], image: "", order: 1 },
  { title: "Job Placements", shortDesc: "", description: "Connecting top talent with direct clients. Our recruitment specialists understand both technical requirements and cultural fit, ensuring successful placements that benefit both employers and candidates.", benefits: ["Direct client placements", "Contract & full-time staffing", "Technical screening & vetting", "Career guidance & support", "Industry-specific recruitment", "Onboarding assistance"], image: "", order: 2 },
  { title: "Support & Maintenance", shortDesc: "", description: "Reliable ongoing technical support to keep your systems running smoothly. We provide proactive monitoring, rapid incident response, and continuous optimization to ensure maximum uptime.", benefits: ["24/7 monitoring & support", "Performance optimization", "Security patching & updates", "Incident management", "Backup & disaster recovery", "SLA-based support tiers"], image: "", order: 3 },
];

const defaultContact: ContactInfo = { email: "", phone: "", address: "", whatsapp: "917675843214", linkedin: "", twitter: "", github: "" };

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: services } = useFirestoreList(getServices, fallbackServices);
  const { data: contact } = useFirestoreData(getContactInfo, defaultContact);

  const serviceIndex = services.findIndex((s) => slugify(s.title) === slug);
  const service = services[serviceIndex];

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/services">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const otherServices = services.filter((_, i) => i !== serviceIndex);
  const image = service.image || fallbackImages[serviceIndex] || fallbackImages[0];

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-[hsl(var(--navy))]/70" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> All Services
            </Link>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl" style={{ textWrap: "balance" }}>
              {service.title}
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">{service.description}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ScrollReveal direction="left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--electric))] mb-3">What We Offer</p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Key Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3 p-4 rounded-xl bg-secondary border border-border">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--electric))] shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
                <img src={image} alt={service.title} className="w-full aspect-[4/3] object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="bg-[hsl(var(--navy))] rounded-3xl p-10 sm:p-14 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "28px 28px" }} />
              <div className="absolute top-[-30%] right-[-10%] w-64 h-64 rounded-full bg-[hsl(var(--electric))]/10 blur-[80px]" />
              <div className="relative z-10 max-w-lg mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4" style={{ textWrap: "balance" }}>
                  Interested in {service.title}?
                </h2>
                <p className="text-sm text-white/60 mb-8">Get in touch with us to discuss how we can help your business.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={`https://wa.me/${contact.whatsapp || "917675843214"}?text=${encodeURIComponent(`Hi, I'm interested in your "${service.title}" service. Can you share more details?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-8 h-12 rounded-full active:scale-[0.97] transition-all">
                      <MessageCircle className="w-4 h-4" /> WhatsApp Us
                    </Button>
                  </a>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="border-white/20 text-white bg-white/[0.06] hover:bg-white/[0.12] font-semibold px-8 h-12 rounded-full active:scale-[0.97] transition-all">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {otherServices.length > 0 && (
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10">Other Services</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((s, i) => {
                const idx = services.indexOf(s);
                return (
                  <ScrollReveal key={s.title} delay={i * 0.08}>
                    <Link to={`/services/${slugify(s.title)}`} className="group block h-full">
                      <div className="bg-card rounded-xl overflow-hidden h-full flex flex-col border border-border hover:border-[hsl(var(--electric))]/30 hover:shadow-lg transition-all duration-300">
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={s.image || fallbackImages[idx] || fallbackImages[0]} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-heading font-semibold text-base text-foreground mb-2">{s.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">{s.description}</p>
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--electric))] mt-3 group-hover:gap-2.5 transition-all">
                            Learn More <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceDetail;
