import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { useFirestoreList } from "@/hooks/useFirestoreData";
import { getStats, StatItem } from "@/lib/firestore";

const fallbackStats: StatItem[] = [
  { end: 50, suffix: "+", label: "Projects Delivered", order: 0 },
  { end: 30, suffix: "+", label: "Clients Served", order: 1 },
  { end: 5, suffix: "+", label: "Years Experience", order: 2 },
  { end: 4, suffix: "", label: "Core Services", order: 3 },
];

const StatsBar = () => {
  const { data: stats } = useFirestoreList(getStats, fallbackStats);

  return (
    <section className="relative -mt-8 sm:-mt-16 z-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="bg-electric rounded-2xl p-4 sm:p-8 md:p-10 grid grid-cols-4 gap-2 sm:gap-8 shadow-xl shadow-electric/10">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} end={stat.end} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
