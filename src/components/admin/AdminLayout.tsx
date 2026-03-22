import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Image, BarChart3, Briefcase, MessageSquare, Users, Mail, Info, FileText, LogOut, Menu, X, Globe, ChevronLeft } from "lucide-react";
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
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 lg:w-60 bg-navy text-primary-foreground transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}>
        <div className="flex items-center gap-3 px-3 h-14 border-b border-white/10 shrink-0">
          <img src={logo} alt="Logo" className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20" />
          <div className="min-w-0">
            <span className="font-heading font-semibold text-xs block">SST Admin</span>
            <span className="text-[10px] text-primary-foreground/40">Content Manager</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto p-1 hover:bg-white/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-1.5 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-electric text-white shadow-sm shadow-electric/20"
                    : "text-primary-foreground/50 hover:text-primary-foreground hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-1.5 border-t border-white/10 shrink-0">
          <Button variant="ghost" onClick={logout} size="sm" className="w-full justify-start text-primary-foreground/40 hover:text-primary-foreground hover:bg-white/5 text-xs h-9">
            <LogOut className="w-3.5 h-3.5 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-60 min-w-0">
        <header className="sticky top-0 z-30 h-12 bg-surface-raised/80 backdrop-blur-sm border-b border-border/50 flex items-center px-3 gap-2">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 hover:bg-secondary rounded-lg shrink-0">
            <Menu className="w-5 h-5 text-navy" />
          </button>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground min-w-0 truncate">
            <Link to="/admin" className="hover:text-navy transition-colors shrink-0">Dashboard</Link>
            {location.pathname !== "/admin" && (
              <>
                <ChevronLeft className="w-3 h-3 rotate-180 shrink-0" />
                <span className="text-navy font-medium truncate">{navItems.find(n => n.path === location.pathname)?.label || "Page"}</span>
              </>
            )}
          </div>
          <div className="ml-auto shrink-0">
            <Link to="/" target="_blank" className="text-xs text-electric hover:underline font-medium whitespace-nowrap">View Site →</Link>
          </div>
        </header>
        <main className="p-3 sm:p-4 md:p-6 max-w-5xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
