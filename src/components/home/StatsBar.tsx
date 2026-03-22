import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { useFirestoreList } from "@/hooks/useFirestoreData";
import { getStats, StatItem } from "@/lib/firestore";
import ScrollReveal from "@/components/shared/ScrollReveal";

const fallbackStats: StatItem[] = [
  { end: 50, suffix: "+", label: "Projects Delivered", order: 0 },
  { end: 30, suffix: "+", label: "Clients Served", order: 1 },
  { end: 5, suffix: "+", label: "Years Experience", order: 2 },
  { end: 4, suffix: "", label: "Core Services", order: 3 },
];

const StatsBar = () => {
  const { data: stats } = useFirestoreList(getStats, fallbackStats);

  return (
    <section className="py-16 md:py-20 bg-[hsl(220,60%,4%)]">
      <div className="container mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${i < stats.length - 1 ? "md:border-r md:border-white/[0.06]" : ""}`}
              >
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StatsBar;
