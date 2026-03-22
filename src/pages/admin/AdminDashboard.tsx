import { Link } from "react-router-dom";
import { Image, Briefcase, BarChart3, MessageSquare, FileText, Users, Mail, Info, Globe } from "lucide-react";

const sections = [
  { label: "Hero Section", path: "/admin/hero", icon: Image, desc: "Homepage hero content & background" },
  { label: "Services", path: "/admin/services", icon: Briefcase, desc: "Service cards with images & details" },
  { label: "Stats", path: "/admin/stats", icon: BarChart3, desc: "Statistics counter bar" },
  { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquare, desc: "Client reviews & ratings" },
  { label: "Careers & Jobs", path: "/admin/careers", icon: FileText, desc: "Job listings & applications" },
  { label: "Team", path: "/admin/team", icon: Users, desc: "Team members on about page" },
  { label: "Contact Info", path: "/admin/contact", icon: Mail, desc: "Phone, email, address, socials" },
  { label: "About Page", path: "/admin/about", icon: Info, desc: "Vision, mission & about content" },
  { label: "Page Banners", path: "/admin/banners", icon: Globe, desc: "Banner images for all pages" },
];

const AdminDashboard = () => (
  <div>
    <h2 className="font-heading text-2xl font-bold text-navy mb-6">Dashboard</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sections.map((s) => (
        <Link key={s.path} to={s.path} className="bg-surface-raised rounded-xl p-5 border border-border/50 hover:border-electric/30 transition-colors group">
          <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center mb-3 group-hover:bg-electric/20 transition-colors">
            <s.icon className="w-5 h-5 text-electric" />
          </div>
          <h3 className="font-heading font-semibold text-navy text-sm">{s.label}</h3>
          <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default AdminDashboard;
