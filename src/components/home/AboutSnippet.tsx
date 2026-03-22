import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import aboutImg from "@/assets/about-snippet.jpg";

const points = [
  "Reliable and scalable digital solutions",
  "Expert consulting and strategic guidance",
  "Dedicated team with 5+ years of experience",
  "Commitment to security and innovation",
];

const AboutSnippet = () => {
  return (
    <section className="py-24 md:py-32 bg-surface-raised">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">About Us</p>
              <h2
                className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight mb-6"
                style={{ textWrap: "balance" }}
              >
                Building the future with stable innovation
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8" style={{ textWrap: "pretty" }}>
                Sthanu Setu Technologies is an IT consulting and software solutions company focused on delivering
                reliable and scalable digital solutions. We help businesses grow through secure, efficient, and
                future-ready technology.
              </p>
              <ul className="space-y-3 mb-8">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-electric shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <Button className="bg-navy hover:bg-navy-light text-primary-foreground font-medium px-6 active:scale-[0.97] transition-all">
                  More About Us <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl border border-border/50">
                <img
                  src={aboutImg}
                  alt="Sthanu Setu Technologies team collaborating in modern office"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
