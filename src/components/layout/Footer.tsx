import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Github, Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import footerBg from "@/assets/footer-bg.jpg";
import logo from "@/assets/logo.jpeg";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Services", path: "/services" },
      { label: "Careers", path: "/careers" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "IT Consulting", path: "/services" },
      { label: "Software Development", path: "/services" },
      { label: "Job Placements", path: "/services" },
      { label: "Support & Maintenance", path: "/services" },
    ],
  },
];

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (title: string) =>
    setOpenSection((prev) => (prev === title ? null : title));

  return (
    <footer className="relative text-primary-foreground">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${footerBg})` }} />
      <div className="absolute inset-0 bg-[hsl(220,60%,10%)]/80" />
      <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Sthanu Setu Technologies" className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20" />
              <span className="font-heading font-semibold text-lg">Sthanu Setu</span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              Stable Innovation. Delivering reliable and scalable digital solutions for businesses ready to grow.
            </p>
            <div className="flex gap-3 pt-2">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-electric/20 transition-colors active:scale-95"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Collapsible link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              {/* Desktop: always visible */}
              <h4 className="hidden md:block font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">
                {section.title}
              </h4>
              <ul className="hidden md:block space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile: collapsible */}
              <div className="md:hidden border-b border-primary-foreground/10">
                <button
                  onClick={() => toggle(section.title)}
                  className="w-full flex items-center justify-between py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/80"
                >
                  {section.title}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${openSection === section.title ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSection === section.title ? "max-h-48 pb-3" : "max-h-0"
                  }`}
                >
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.path} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="hidden md:block font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">
              Contact
            </h4>
            {/* Mobile collapsible */}
            <div className="md:hidden border-b border-primary-foreground/10">
              <button
                onClick={() => toggle("Contact")}
                className="w-full flex items-center justify-between py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/80"
              >
                Contact
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${openSection === "Contact" ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSection === "Contact" ? "max-h-48 pb-3" : "max-h-0"
                }`}
              >
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-primary-foreground/60">
                    <Mail className="w-4 h-4 mt-0.5 shrink-0" /> info@sthanusetu.com
                  </li>
                  <li className="flex items-start gap-2 text-sm text-primary-foreground/60">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0" /> +91 98765 43210
                  </li>
                  <li className="flex items-start gap-2 text-sm text-primary-foreground/60">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Hyderabad, India
                  </li>
                </ul>
              </div>
            </div>
            {/* Desktop */}
            <ul className="hidden md:block space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/60">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" /> info@sthanusetu.com
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/60">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" /> +91 98765 43210
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Hyderabad, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Sthanu Setu Technologies. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Powered by Sthanu Setu Technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
