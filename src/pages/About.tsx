import { Eye, Target, Heart, Lightbulb, Users, Zap } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import heroAbout from "@/assets/hero-about.jpg";
import { useFirestoreData, useFirestoreList } from "@/hooks/useFirestoreData";
import { getAbout, getTeam, getPageBanner, AboutData, TeamMember, PageBanner } from "@/lib/firestore";
import useSEO from "@/hooks/useSEO";

const values = [
  { icon: Heart, title: "Integrity", desc: "Transparent and honest partnerships with every client." },
  { icon: Lightbulb, title: "Innovation", desc: "Pushing boundaries with creative, future-ready solutions." },
  { icon: Users, title: "Collaboration", desc: "Working closely with clients as true technology partners." },
  { icon: Zap, title: "Excellence", desc: "Delivering quality that exceeds expectations, always." },
];

const defaultAbout: AboutData = {
  heroTitle: "Our story of stable innovation",
  heroSubtitle: "Founded with the vision of bridging the gap between businesses and technology, Sthanu Setu Technologies has grown into a trusted IT partner for companies across India and beyond.",
  heroBgImage: "",
  vision: "To be the most trusted technology partner for businesses seeking stable, scalable, and innovative digital solutions globally.",
  mission: "To empower businesses with reliable technology solutions that drive growth, efficiency, and competitive advantage in an ever-evolving digital landscape.",
};

const fallbackTeam: TeamMember[] = [
  { name: "Arjun Reddy", role: "Founder & CEO", order: 0 },
  { name: "Kavitha Nair", role: "CTO", order: 1 },
  { name: "Suresh Kumar", role: "Head of Consulting", order: 2 },
  { name: "Divya Patel", role: "Lead Developer", order: 3 },
];

const defaultBanner: PageBanner = { title: "", subtitle: "", bgImage: "" };

const About = () => {
  const { data: about } = useFirestoreData(getAbout, defaultAbout);
  const { data: team } = useFirestoreList(getTeam, fallbackTeam);
  const { data: banner } = useFirestoreData(() => getPageBanner("about"), defaultBanner);

  const bgImage = banner.bgImage || about.heroBgImage || heroAbout;

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="absolute inset-0 bg-[hsl(220,60%,10%)]/60" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">About Us</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground leading-tight max-w-2xl" style={{ textWrap: "balance" }}>{about.heroTitle}</h1>
            <p className="mt-6 text-lg text-primary-foreground/60 max-w-xl leading-relaxed" style={{ textWrap: "pretty" }}>{about.heroSubtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12">
          <ScrollReveal>
            <div className="bg-surface-raised rounded-xl p-8 border border-border/50 h-full">
              <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mb-5"><Eye className="w-6 h-6 text-electric" /></div>
              <h3 className="font-heading font-semibold text-xl text-navy mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">{about.vision}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-surface-raised rounded-xl p-8 border border-border/50 h-full">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5"><Target className="w-6 h-6 text-gold" /></div>
              <h3 className="font-heading font-semibold text-xl text-navy mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">{about.mission}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-surface-raised">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal><div className="text-center mb-16"><p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">Core Values</p><h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">What drives us</h2></div></ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <div className="bg-surface rounded-xl p-7 text-center card-lift border border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mx-auto mb-5"><v.icon className="w-6 h-6 text-electric" /></div>
                  <h3 className="font-heading font-semibold text-lg text-navy mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal><div className="text-center mb-16"><p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">Our Team</p><h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">Meet the people behind SST</h2></div></ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.08}>
                <div className="bg-surface-raised rounded-xl p-7 text-center card-lift border border-border/50">
                  <div className="w-20 h-20 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-4 font-heading font-bold text-xl text-electric overflow-hidden">
                    {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> : member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-heading font-semibold text-navy">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
