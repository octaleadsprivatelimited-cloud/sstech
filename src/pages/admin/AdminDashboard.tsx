import { Link } from "react-router-dom";
import { Image, Briefcase, BarChart3, MessageSquare, FileText, Users, Mail, Info, Globe, ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { getServices, getStats, getTestimonials, getJobs, getTeam, getContactSubmissions, getCareerApplications } from "@/lib/firestore";

const sections = [
  { label: "Hero Section", path: "/admin/hero", icon: Image, desc: "Homepage hero content & background", color: "bg-blue-500/10 text-blue-600" },
  { label: "Services", path: "/admin/services", icon: Briefcase, desc: "Service cards with images & details", color: "bg-emerald-500/10 text-emerald-600" },
  { label: "Stats", path: "/admin/stats", icon: BarChart3, desc: "Statistics counter bar", color: "bg-amber-500/10 text-amber-600" },
  { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquare, desc: "Client reviews & ratings", color: "bg-rose-500/10 text-rose-600" },
  { label: "Careers & Jobs", path: "/admin/careers", icon: FileText, desc: "Job listings & applications", color: "bg-violet-500/10 text-violet-600" },
  { label: "Team", path: "/admin/team", icon: Users, desc: "Team members on about page", color: "bg-teal-500/10 text-teal-600" },
  { label: "Contact Info", path: "/admin/contact", icon: Mail, desc: "Phone, email, address, socials", color: "bg-orange-500/10 text-orange-600" },
  { label: "About Page", path: "/admin/about", icon: Info, desc: "Vision, mission & about content", color: "bg-sky-500/10 text-sky-600" },
  { label: "Page Banners", path: "/admin/banners", icon: Globe, desc: "Banner images for all pages", color: "bg-pink-500/10 text-pink-600" },
];

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ services: 0, stats: 0, testimonials: 0, jobs: 0, team: 0, contacts: 0, applications: 0 });

  useEffect(() => {
    Promise.allSettled([
      getServices(), getStats(), getTestimonials(), getJobs(), getTeam(), getContactSubmissions(), getCareerApplications()
    ]).then(([s, st, t, j, tm, c, a]) => {
      setCounts({
        services: s.status === "fulfilled" ? s.value.length : 0,
        stats: st.status === "fulfilled" ? st.value.length : 0,
        testimonials: t.status === "fulfilled" ? t.value.length : 0,
        jobs: j.status === "fulfilled" ? j.value.length : 0,
        team: tm.status === "fulfilled" ? tm.value.length : 0,
        contacts: c.status === "fulfilled" ? c.value.length : 0,
        applications: a.status === "fulfilled" ? a.value.length : 0,
      });
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-navy">Dashboard</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Manage your website content</p>
        </div>
        <Link to="/" target="_blank" className="inline-flex items-center gap-2 text-xs text-electric hover:underline font-medium">
          View Live Site <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Services", count: counts.services, color: "text-emerald-600" },
          { label: "Testimonials", count: counts.testimonials, color: "text-rose-600" },
          { label: "Contact Msgs", count: counts.contacts, color: "text-orange-600" },
          { label: "Applications", count: counts.applications, color: "text-violet-600" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-raised rounded-xl p-4 border border-border/50">
            <p className={`text-2xl font-bold font-heading ${s.color}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link key={s.path} to={s.path} className="bg-surface-raised rounded-xl p-5 border border-border/50 hover:shadow-md hover:border-electric/20 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-electric group-hover:translate-x-0.5 transition-all" />
            </div>
            <h3 className="font-heading font-semibold text-navy text-sm">{s.label}</h3>
            <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
