import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  // On hero (home, not scrolled): white text. Otherwise: dark text on white bg.
  const showDark = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showDark
          ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Sthanu Setu Technologies" className="w-9 h-9 rounded-full object-cover" />
          <span className={`font-heading font-semibold text-base md:text-lg hidden sm:block ${showDark ? "text-foreground" : "text-white"}`}>
            Sthanu Setu
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? "text-[hsl(var(--electric))]"
                  : showDark
                    ? "text-foreground/60 hover:text-foreground"
                    : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+917675843214" className={`hidden lg:flex items-center gap-2 text-sm transition-colors ${showDark ? "text-foreground/60 hover:text-foreground" : "text-white/70 hover:text-white"}`}>
            <Phone className="w-4 h-4" />
            +91 76758 43214
          </a>
          <Link to="/contact" className="hidden md:block">
            <Button className="bg-gradient-brand text-white font-medium px-5 h-9 text-sm rounded-full active:scale-[0.97] transition-all shadow-lg shadow-[hsl(var(--electric))]/20 hover:brightness-110">
              Contact Us
            </Button>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${showDark ? "text-foreground/70 hover:text-foreground hover:bg-secondary" : "text-white/70 hover:text-white hover:bg-white/10"}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-[hsl(var(--electric))] bg-[hsl(var(--electric))]/10"
                      : "text-foreground/60 hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" className="mt-2">
                <Button className="w-full bg-gradient-brand text-white font-medium rounded-full">
                  Contact Us
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
