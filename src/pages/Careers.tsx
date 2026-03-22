import { Search, FileText, CheckCircle, Briefcase, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { useState, useRef } from "react";
import heroCareers from "@/assets/hero-careers.jpg";
import { toast } from "sonner";

const steps = [
  { icon: Search, title: "Explore", desc: "Browse open positions that match your skills and interests." },
  { icon: FileText, title: "Apply", desc: "Submit your application with resume and relevant details." },
  { icon: CheckCircle, title: "Get Placed", desc: "After screening and interviews, join our network of professionals." },
];

const jobs = [
  { title: "Senior React Developer", type: "Full-time", location: "Hyderabad / Remote" },
  { title: "Java Backend Engineer", type: "Contract", location: "Bangalore" },
  { title: "DevOps Engineer", type: "Full-time", location: "Remote" },
  { title: "QA Automation Specialist", type: "Full-time", location: "Hyderabad" },
];

const Careers = () => {
  const [formData, setFormData] = useState({ name: "", email: "", role: "", message: "" });
  const formRef = useRef<HTMLDivElement>(null);

  const handleApply = (jobTitle: string) => {
    setFormData((prev) => ({ ...prev, role: jobTitle }));
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted! We'll be in touch soon.");
    setFormData({ name: "", email: "", role: "", message: "" });
  };

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroCareers})` }} />
        <div className="absolute inset-0 bg-[hsl(220,60%,10%)]/60" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">Careers</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground leading-tight max-w-2xl" style={{ textWrap: "balance" }}>
              Find your next opportunity
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/60 max-w-xl leading-relaxed">
              Join our network of skilled professionals and get placed with top-tier direct clients.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">How It Works</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">Three simple steps</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <div className="text-center p-8 bg-surface-raised rounded-xl border border-border/50 card-lift">
                  <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-7 h-7 text-electric" />
                  </div>
                  <div className="text-xs font-semibold text-electric mb-2">Step {i + 1}</div>
                  <h3 className="font-heading font-semibold text-lg text-navy mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-surface-raised">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">Open Positions</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">Current openings</h2>
            </div>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-4">
            {jobs.map((job, i) => (
              <ScrollReveal key={job.title} delay={i * 0.06}>
                <div className="bg-surface rounded-xl p-6 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-electric" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 active:scale-[0.97]">Apply Now</Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">Apply Now</p>
                <h2 className="font-heading text-3xl font-bold text-navy">Send us your application</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <Input placeholder="Desired Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
                <Textarea placeholder="Cover letter or additional information..." rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                <Button type="submit" className="w-full bg-electric hover:bg-electric/90 text-accent-foreground font-medium active:scale-[0.97]">
                  Submit Application
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Careers;
