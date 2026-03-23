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
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--navy))]/80 via-[hsl(var(--navy))]/60 to-[hsl(var(--navy))]/40" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(var(--navy))] to-transparent" />

      {/* Subtle accent glow */}
      <div className="absolute top-1/4 right-[10%] w-[300px] h-[300px] rounded-full bg-[hsl(var(--electric))]/[0.06] blur-[100px]" />
      <div className="absolute bottom-1/4 left-[5%] w-[200px] h-[200px] rounded-full bg-[hsl(var(--gold))]/[0.04] blur-[80px]" />

      <div className="container mx-auto px-5 md:px-8 relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--electric))] animate-pulse" />
            <span className="text-xs font-medium text-white/80 tracking-wide uppercase">{data.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-[-0.02em]"
            style={{ textWrap: "balance" }}
          >
            {data.title}{" "}
            <span className="text-gradient">{data.highlight}</span> World
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-base sm:text-lg text-white/70 leading-relaxed mt-6 max-w-lg"
            style={{ textWrap: "pretty" }}
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gradient-brand text-white font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all rounded-full shadow-xl shadow-[hsl(var(--electric))]/25 hover:brightness-110"
              >
                Schedule a Free Consultation
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white bg-white/[0.06] hover:bg-white/[0.12] font-semibold px-8 h-12 text-sm sm:text-base active:scale-[0.97] transition-all rounded-full backdrop-blur-sm"
              >
                Our Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
