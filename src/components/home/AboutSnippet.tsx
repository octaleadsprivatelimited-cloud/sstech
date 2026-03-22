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
    <section className="py-20 md:py-32 bg-surface-raised">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-electric mb-3">
                About Us
              </p>
              <h2
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-navy leading-tight mb-5"
                style={{ textWrap: "balance" }}
              >
                Building the future with stable innovation
              </h2>
              <p
                className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-7"
                style={{ textWrap: "pretty" }}
              >
                Sthanu Setu Technologies is an IT consulting and software
                solutions company focused on delivering reliable and scalable
                digital solutions. We help businesses grow through secure,
                efficient, and future-ready technology.
              </p>
              <ul className="space-y-3 mb-8">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-electric shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <Button className="bg-navy hover:bg-navy-light text-primary-foreground font-medium px-6 h-11 active:scale-[0.97] transition-all">
                  More About Us
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="aspect-[4/3] lg:aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-navy/10">
                <img
                  src={aboutImg}
                  alt="Sthanu Setu Technologies team collaborating in modern office"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative accent */}
              <div className="hidden lg:block absolute -bottom-4 -left-4 w-24 h-24 rounded-xl bg-electric/10 -z-10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
