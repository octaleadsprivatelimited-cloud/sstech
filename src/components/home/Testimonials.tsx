import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useFirestoreList } from "@/hooks/useFirestoreData";
import { getTestimonials, TestimonialItem } from "@/lib/firestore";

const fallback: TestimonialItem[] = [
  { name: "Priya Sharma", company: "NovaTech Solutions", quote: "Sthanu Setu transformed our legacy systems into a modern, scalable platform. Their team's dedication and expertise exceeded our expectations.", rating: 5 },
  { name: "Rajesh Menon", company: "CloudBridge Inc.", quote: "The consulting team helped us make critical technology decisions that saved us months of development time and significant costs.", rating: 5 },
  { name: "Anita Desai", company: "FinEdge Capital", quote: "Their support and maintenance services have been exceptional. Our systems have had near-zero downtime since we partnered with SST.", rating: 5 },
];

const Testimonials = () => {
  const { data: testimonials } = useFirestoreList(getTestimonials, fallback);
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];
  if (!t) return null;

  return (
    <section className="py-20 md:py-28 bg-[hsl(220,60%,6%)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-electric/[0.03] rounded-full blur-[100px]" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric mb-4">
              Testimonials
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              What our clients say
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-7 sm:p-10 md:p-12 text-center border border-white/[0.06] relative"
              >
                <Quote className="w-8 h-8 text-electric/20 mx-auto mb-4" />
                <div className="flex justify-center gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote
                  className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-7 font-medium"
                  style={{ textWrap: "pretty" }}
                >
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-electric/20 flex items-center justify-center font-heading font-semibold text-sm text-electric">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/[0.06] transition-colors active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-white/50" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-electric w-6"
                        : "bg-white/15 w-1.5 hover:bg-white/30"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/[0.06] transition-colors active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-white/50" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
