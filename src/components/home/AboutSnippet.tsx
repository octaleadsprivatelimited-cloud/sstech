import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import aboutImg from "@/assets/about-snippet.jpg";
import { useFirestoreList } from "@/hooks/useFirestoreData";
import { getStats, StatItem } from "@/lib/firestore";

const fallbackStats: StatItem[] = [
  { end: 50, suffix: "+", label: "Projects Delivered", order: 0 },
  { end: 30, suffix: "+", label: "Clients Served", order: 1 },
  { end: 5, suffix: "+", label: "Years Experience", order: 2 },
];

const AboutSnippet = () => {
  const { data: stats } = useFirestoreList(getStats, fallbackStats);

  return (
    <section className="py-20 md:py-28 bg-[hsl(var(--surface))] relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <ScrollReveal direction="left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--electric))] mb-3">
                Why Us
              </p>
              <h2
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-5"
                style={{ textWrap: "balance" }}
              >
                Trusted experts with years of experience
              </h2>
              <p
                className="text-sm sm:text-base text-white/45 leading-relaxed mb-6"
                style={{ textWrap: "pretty" }}
              >
                At Sthanu Setu Technologies, our team comprises trusted experts with a proven track record.
                With years of experience navigating complex technology landscapes, we bring unparalleled
                insight to every client engagement.
              </p>
              <p className="text-sm sm:text-base text-white/45 leading-relaxed mb-8" style={{ textWrap: "pretty" }}>
                Our industry expertise isn't just a credential — it represents deep knowledge and commitment
                to the highest professional standards.
              </p>
              <Link to="/about">
                <Button className="bg-gradient-brand text-white font-medium px-6 h-11 active:scale-[0.97] transition-all rounded-full shadow-lg shadow-[hsl(var(--electric))]/20 hover:brightness-110">
                  About Us
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Image + Stats side */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08]">
                <img
                  src={aboutImg}
                  alt="Sthanu Setu Technologies team"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="text-center bg-[hsl(var(--surface-raised))] rounded-xl p-4 border border-white/[0.06]">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} variant="hero" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
