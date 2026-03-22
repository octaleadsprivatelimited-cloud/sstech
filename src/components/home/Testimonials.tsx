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
    <section className="py-20 md:py-32 bg-surface">
      <div className="container mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-electric mb-3">
              Testimonials
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-navy leading-tight">
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
                className="bg-surface-raised rounded-2xl p-7 sm:p-10 md:p-12 text-center border border-border/40 shadow-lg shadow-navy/[0.03] relative"
              >
                <Quote className="w-8 h-8 text-electric/15 mx-auto mb-4" />
                <div className="flex justify-center gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote
                  className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed mb-7 font-medium"
                  style={{ textWrap: "pretty" }}
                >
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center font-heading font-semibold text-sm text-white">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-navy">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:bg-secondary transition-colors active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-electric w-6"
                        : "bg-border w-1.5 hover:bg-muted-foreground/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:bg-secondary transition-colors active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
