import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { useState } from "react";
import { toast } from "sonner";
import heroContact from "@/assets/hero-contact.jpg";
import { useFirestoreData } from "@/hooks/useFirestoreData";
import { getContactInfo, getPageBanner, submitContactForm, ContactInfo, PageBanner } from "@/lib/firestore";
import useSEO from "@/hooks/useSEO";

const defaultContact: ContactInfo = { email: "info@sthanusetu.com", phone: "+91 76758 43214", address: "Hyderabad, Telangana, India", whatsapp: "917675843214", linkedin: "", twitter: "", github: "" };
const defaultBanner: PageBanner = { title: "Let's start a conversation", subtitle: "Have a project in mind? We'd love to hear from you. Reach out and let's discuss how we can help.", bgImage: "" };

const Contact = () => {
  const { data: contact } = useFirestoreData(getContactInfo, defaultContact);
  const { data: banner } = useFirestoreData(() => getPageBanner("contact"), defaultBanner);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useSEO({
    title: "Contact Us — Get In Touch",
    description: "Contact Sthanu Setu Technologies for IT consulting, software development, and staffing solutions. Reach us via phone, email, or our contact form.",
    keywords: "contact Sthanu Setu, IT consulting contact, Hyderabad IT company contact, get in touch, IT services inquiry",
    canonical: "/contact",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm(formData);
      toast.success("Message sent! We'll get back to you shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch { toast.error("Failed to send. Please try again."); }
    setSubmitting(false);
  };

  const socials = [
    { icon: Linkedin, url: contact.linkedin },
    { icon: Twitter, url: contact.twitter },
    { icon: Github, url: contact.github },
  ].filter(s => s.url);

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${banner.bgImage || heroContact})` }} />
        <div className="absolute inset-0 bg-[hsl(220,60%,10%)]/60" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">Contact Us</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground leading-tight max-w-2xl" style={{ textWrap: "balance" }}>{banner.title}</h1>
            <p className="mt-6 text-lg text-primary-foreground/60 max-w-xl leading-relaxed">{banner.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            <ScrollReveal className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-surface-raised rounded-2xl p-8 md:p-10 border border-border/50 space-y-5">
                <h2 className="font-heading text-xl font-semibold text-navy mb-2">Send us a message</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <Textarea placeholder="Your message..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                <Button type="submit" disabled={submitting} className="w-full bg-electric hover:bg-electric/90 text-accent-foreground font-medium active:scale-[0.97]">
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-2" delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-navy mb-4">Get in touch</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-electric" /></div>
                      <div><p className="text-sm font-medium text-navy">Email</p><p className="text-sm text-muted-foreground">{contact.email}</p></div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-electric" /></div>
                      <div><p className="text-sm font-medium text-navy">Phone</p><p className="text-sm text-muted-foreground">{contact.phone}</p></div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-electric" /></div>
                      <div><p className="text-sm font-medium text-navy">Address</p><p className="text-sm text-muted-foreground">{contact.address}</p></div>
                    </li>
                  </ul>
                </div>
                {socials.length > 0 && (
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-navy mb-4">Follow us</h3>
                    <div className="flex gap-3">
                      {socials.map((s, i) => (
                        <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors active:scale-95">
                          <s.icon className="w-4 h-4 text-muted-foreground" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className="aspect-[4/3] rounded-xl bg-navy/5 border border-border/50 flex items-center justify-center">
                  <div className="text-center"><MapPin className="w-8 h-8 text-electric/30 mx-auto mb-2" /><p className="text-xs text-muted-foreground">Map placeholder</p></div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
