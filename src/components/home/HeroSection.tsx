import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-home.jpg";
import { useFirestoreData } from "@/hooks/useFirestoreData";
import { getHero, HeroData } from "@/lib/firestore";

const fallback: HeroData = { badge: "Stable Innovation", title: "Stable Innovation for a", highlight: "Digital-First", subtitle: "We help businesses grow through secure, efficient, and future-ready technology. From consulting to custom software — we deliver results.", bgImage: "" };

const HeroSection = () => {
  const { data } = useFirestoreData(getHero, fallback);
  const bgImage = data.bgImage || heroBg;

  return (
    <section className="relative min-h-[70vh] sm:min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,60%,10%)]/80 via-[hsl(220,60%,10%)]/50 to-transparent" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground/80">{data.badge}</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-[1.1] tracking-tight" style={{ textWrap: "balance" }}>
            {data.title}{" "}<span className="text-gradient">{data.highlight}</span> World
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-primary-foreground/70 leading-relaxed max-w-xl" style={{ textWrap: "pretty" }}>
            {data.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="mt-8 sm:mt-10 flex flex-wrap gap-4 pb-12 sm:pb-0">
            <Link to="/services"><Button size="lg" className="bg-electric hover:bg-electric/90 text-white font-semibold px-7 h-12 text-base active:scale-[0.97] transition-all shadow-lg shadow-electric/20">Our Services <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            <Link to="/contact"><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 font-semibold px-7 h-12 text-base active:scale-[0.97] transition-all">Contact Us <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
