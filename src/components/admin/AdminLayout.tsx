import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Image, BarChart3, Briefcase, MessageSquare, Users, Mail, Info, FileText, LogOut, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.jpeg";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Hero Section", path: "/admin/hero", icon: Image },
  { label: "Services", path: "/admin/services", icon: Briefcase },
  { label: "Stats", path: "/admin/stats", icon: BarChart3 },
  { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
  { label: "Careers & Jobs", path: "/admin/careers", icon: FileText },
  { label: "Team", path: "/admin/team", icon: Users },
  { label: "Contact Info", path: "/admin/contact", icon: Mail },
  { label: "About Page", path: "/admin/about", icon: Info },
  { label: "Page Banners", path: "/admin/banners", icon: Globe },
];

const AdminLayout = () => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-surface"><div className="animate-spin w-8 h-8 border-4 border-electric border-t-transparent rounded-full" /></div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy text-primary-foreground transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-heading font-semibold text-sm">SST Admin</span>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-electric text-white"
                  : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <Button variant="ghost" onClick={logout} className="w-full justify-start text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 h-14 bg-surface-raised border-b border-border flex items-center px-4 gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-secondary rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-semibold text-sm text-navy">Content Management</h1>
          <div className="ml-auto">
            <Link to="/" target="_blank" className="text-xs text-electric hover:underline">View Site →</Link>
          </div>
        </header>
        <main className="p-4 md:p-6 max-w-5xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
