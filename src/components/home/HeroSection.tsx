import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-home.jpg";
import { useFirestoreData } from "@/hooks/useFirestoreData";
import { getHero, HeroData } from "@/lib/firestore";

const fallback: HeroData = {
  badge: "Stable Innovation",
  title: "Stable Innovation for a",
  highlight: "Digital-First",
  subtitle:
    "We help businesses grow through secure, efficient, and future-ready technology. From consulting to custom software — we deliver results.",
  bgImage: "",
};

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const { data } = useFirestoreData(getHero, fallback);
  const bgImage = data.bgImage || heroBg;

  return (
    <section className="relative min-h-[75vh] sm:min-h-[92vh] flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,60%,6%)]/90 via-[hsl(220,60%,8%)]/70 to-[hsl(220,60%,10%)]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,60%,6%)]/40 to-transparent" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full px-4 py-1.5 mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white/70 tracking-wide">
                {data.badge}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-heading text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15] tracking-[-0.02em]"
            style={{ textWrap: "balance" }}
          >
            {data.title}{" "}
            <span className="text-gradient">{data.highlight}</span> World
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/55 leading-relaxed max-w-lg"
            style={{ textWrap: "pretty" }}
          >
            {data.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 pb-12 sm:pb-0"
          >
            <Link to="/services">
              <Button
                size="lg"
                className="bg-electric hover:bg-electric/90 text-white font-semibold px-6 sm:px-7 h-11 sm:h-12 text-sm sm:text-base active:scale-[0.97] transition-all shadow-lg shadow-electric/25"
              >
                Our Services
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white bg-white/[0.06] hover:bg-white/[0.12] font-semibold px-6 sm:px-7 h-11 sm:h-12 text-sm sm:text-base active:scale-[0.97] transition-all backdrop-blur-sm"
              >
                Contact Us
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade for seamless transition to stats */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[hsl(var(--surface))] to-transparent" />
    </section>
  );
};

export default HeroSection;
