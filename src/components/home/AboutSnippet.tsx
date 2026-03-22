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
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[hsl(35,90%,55%)]/[0.03] rounded-full blur-[100px]" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--electric))] mb-4">
                About Us
              </p>
              <h2
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-5"
                style={{ textWrap: "balance" }}
              >
                Building the Future with{" "}
                <span className="text-gradient">Stable Innovation</span>
              </h2>
              <p
                className="text-sm sm:text-base text-white/45 leading-relaxed mb-7"
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
                    className="flex items-start gap-2.5 text-sm text-white/65"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--gold))] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <Button className="bg-gradient-brand text-white font-medium px-6 h-11 active:scale-[0.97] transition-all rounded-full shadow-lg shadow-[hsl(330,85%,55%)]/20 hover:brightness-110">
                  More About Us
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="aspect-[4/3] lg:aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/30">
                <img
                  src={aboutImg}
                  alt="Sthanu Setu Technologies team collaborating in modern office"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative gradient corner */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-gradient-brand opacity-30 -z-10 blur-sm" />
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-2xl bg-[hsl(var(--gold))]/20 -z-10 blur-sm" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
