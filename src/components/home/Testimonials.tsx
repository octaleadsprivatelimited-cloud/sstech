import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useFirestoreList } from "@/hooks/useFirestoreData";
import { getTestimonials, TestimonialItem } from "@/lib/firestore";

const fallback: TestimonialItem[] = [
  { name: "Priya Sharma", company: "NovaTech Solutions", quote: "Sthanu Setu transformed our legacy systems into a modern, scalable platform. Their dedication exceeded our expectations.", rating: 5 },
  { name: "Rajesh Menon", company: "CloudBridge Inc.", quote: "The consulting team helped us make critical technology decisions that saved months of development time.", rating: 5 },
  { name: "Anita Desai", company: "FinEdge Capital", quote: "Their support services have been exceptional. Near-zero downtime since we partnered with SST.", rating: 5 },
];

const Testimonials = () => {
  const { data: testimonials } = useFirestoreList(getTestimonials, fallback);
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];
  if (!t) return null;

  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--electric))] mb-3">
              Testimonials
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Those who trust us
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
                className="bg-card rounded-2xl p-7 sm:p-10 md:p-12 border border-border shadow-sm"
              >
                <Quote className="w-8 h-8 text-[hsl(var(--electric))]/20 mb-4" />
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                  ))}
                </div>
                <blockquote className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-7" style={{ textWrap: "pretty" }}>
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center font-heading font-semibold text-sm text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-8">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors active:scale-95" aria-label="Previous">
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "bg-gradient-brand w-6" : "bg-border w-1.5 hover:bg-muted-foreground"
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors active:scale-95" aria-label="Next">
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
