import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Briefcase, Clock } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-home.jpg";
import { useFirestoreData, useFirestoreList } from "@/hooks/useFirestoreData";
import { getHero, HeroData, getStats, StatItem } from "@/lib/firestore";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const fallback: HeroData = {
  badge: "Stable Innovation",
  title: "Stable Innovation for a",
  highlight: "Digital-First",
  subtitle:
    "We help businesses grow through secure, efficient, and future-ready technology. From consulting to custom software — we deliver results.",
  bgImage: "",
};

const fallbackStats: StatItem[] = [
  { end: 50, suffix: "+", label: "Projects Delivered", order: 0 },
  { end: 30, suffix: "+", label: "Clients Served", order: 1 },
  { end: 5, suffix: "+", label: "Years Experience", order: 2 },
  { end: 4, suffix: "", label: "Core Services", order: 3 },
];

const statIcons = [Users, Award, Clock, Briefcase];

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const { data } = useFirestoreData(getHero, fallback);
  const { data: stats } = useFirestoreList(getStats, fallbackStats);
  const bgImage = data.bgImage || heroBg;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-[hsl(220,30%,8%)]/80" />

      <div className="container mx-auto px-5 md:px-8 relative z-10 text-center pt-20 pb-32">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-[-0.02em]"
            style={{ textWrap: "balance" }}
          >
            {data.title}{" "}
            <span className="text-gradient">{data.highlight}</span> World
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto mt-6"
            style={{ textWrap: "pretty" }}
          >
            {data.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link to="/services">
              <Button
                size="lg"
                className="bg-gradient-brand text-white font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all shadow-lg shadow-[hsl(var(--gradient-start))]/25 rounded-full hover:opacity-90"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white bg-white/[0.06] hover:bg-white/[0.12] font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all rounded-full"
              >
                Explore Services
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats cards overlapping hero bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <div
                key={stat.label}
                className="glass-dark rounded-xl p-4 md:p-6 text-center border border-white/[0.08]"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} variant="hero" />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
