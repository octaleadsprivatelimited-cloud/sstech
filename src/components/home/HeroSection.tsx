import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-[hsl(220,60%,4%)]/85" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full px-5 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white/60 tracking-wide uppercase">
                {data.badge}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-[-0.02em]"
            style={{ textWrap: "balance" }}
          >
            {data.title}
            <br />
            <span className="text-gradient">{data.highlight}</span> World
          </motion.h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="w-20 h-[3px] bg-gradient-to-r from-electric to-electric-light mx-auto mt-7 mb-7 rounded-full origin-center"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed max-w-xl mx-auto"
            style={{ textWrap: "pretty" }}
          >
            {data.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link to="/services">
              <Button
                size="lg"
                className="bg-electric hover:bg-electric/90 text-white font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all shadow-lg shadow-electric/25 rounded-lg"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 text-white bg-white/[0.04] hover:bg-white/[0.08] font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all rounded-lg"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(220,60%,4%)] to-transparent" />
    </section>
  );
};

export default HeroSection;
