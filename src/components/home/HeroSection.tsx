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
const statColors = [
  "from-[hsl(330,85%,55%)] to-[hsl(350,80%,45%)]",
  "from-[hsl(35,90%,55%)] to-[hsl(20,85%,50%)]",
  "from-[hsl(280,70%,55%)] to-[hsl(310,80%,50%)]",
  "from-[hsl(200,80%,50%)] to-[hsl(220,85%,55%)]",
];

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const { data } = useFirestoreData(getHero, fallback);
  const { data: stats } = useFirestoreList(getStats, fallbackStats);
  const bgImage = data.bgImage || heroBg;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,7%)]/70 via-[hsl(220,20%,7%)]/60 to-[hsl(220,20%,7%)]/90" />
      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[hsl(330,85%,55%)]/[0.06] rounded-full blur-[120px]" />

      <div className="container mx-auto px-5 md:px-8 relative z-10 text-center pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-md border border-white/[0.1] rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-gradient-brand animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white/70 tracking-wide">
                {data.badge}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-[-0.02em]"
            style={{ textWrap: "balance" }}
          >
            {data.title}{" "}
            <span className="text-gradient">{data.highlight}</span> World
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="w-20 h-[3px] bg-gradient-brand mx-auto mt-6 mb-6 rounded-full origin-center"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="text-sm sm:text-base md:text-lg text-white/55 leading-relaxed max-w-xl mx-auto"
            style={{ textWrap: "pretty" }}
          >
            {data.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            <Link to="/services">
              <Button
                size="lg"
                className="bg-gradient-brand text-white font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all shadow-xl shadow-[hsl(330,85%,55%)]/25 rounded-full hover:brightness-110"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 text-white bg-white/[0.05] hover:bg-white/[0.1] font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all rounded-full backdrop-blur-sm"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-4 md:p-6 text-center hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${statColors[i % statColors.length]} flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
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
