import AnimatedCounter from "@/components/shared/AnimatedCounter";

const stats = [
  { end: 50, suffix: "+", label: "Projects Delivered" },
  { end: 30, suffix: "+", label: "Clients Served" },
  { end: 5, suffix: "+", label: "Years Experience" },
  { end: 4, suffix: "", label: "Core Services" },
];

const StatsBar = () => {
  return (
    <section className="relative -mt-16 z-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="bg-electric rounded-2xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-xl shadow-electric/10">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
