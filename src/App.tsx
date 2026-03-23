import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/admin/AdminLayout";
import ScrollToTop from "@/components/shared/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHero from "./pages/admin/AdminHero";
import AdminServices from "./pages/admin/AdminServices";
import AdminStats from "./pages/admin/AdminStats";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminContact from "./pages/admin/AdminContact";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminBanners from "./pages/admin/AdminBanners";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="hero" element={<AdminHero />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="stats" element={<AdminStats />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="careers" element={<AdminCareers />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="banners" element={<AdminBanners />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
