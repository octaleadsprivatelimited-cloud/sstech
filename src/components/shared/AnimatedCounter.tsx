import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
  variant?: "hero" | "default";
}

const AnimatedCounter = ({ end, suffix = "", label, duration = 2, variant = "default" }: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  const isHero = variant === "hero";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div className={`font-heading font-bold tabular-nums tracking-tight ${isHero ? "text-xl md:text-2xl text-white" : "text-2xl md:text-4xl text-foreground"}`}>
        {count}
        {suffix}
      </div>
      <div className={`mt-1 font-medium ${isHero ? "text-[10px] md:text-xs text-white/50" : "text-xs md:text-sm text-muted-foreground"}`}>
        {label}
      </div>
    </motion.div>
  );
};

export default AnimatedCounter;
