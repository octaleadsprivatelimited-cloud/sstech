import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    company: "NovaTech Solutions",
    quote: "Sthanu Setu transformed our legacy systems into a modern, scalable platform. Their team's dedication and expertise exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Rajesh Menon",
    company: "CloudBridge Inc.",
    quote: "The consulting team helped us make critical technology decisions that saved us months of development time and significant costs.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    company: "FinEdge Capital",
    quote: "Their support and maintenance services have been exceptional. Our systems have had near-zero downtime since we partnered with SST.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-electric mb-3">Testimonials</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight">
              What our clients say
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="bg-surface-raised rounded-2xl p-8 md:p-12 text-center border border-border/50 shadow-sm"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-medium" style={{ textWrap: "pretty" }}>
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center font-heading font-semibold text-sm text-electric">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-navy">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-electric w-6" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
