import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Github, Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Services", path: "/services" },
      { label: "Careers", path: "/careers" },
      { label: "Contact", path: "/contact" },
      { label: "Sitemap", path: "/sitemap.xml", external: true },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "IT Consulting", path: "/services/it-consulting-consultancy-services" },
      { label: "Software Development", path: "/services/software-development" },
      { label: "Job Placements", path: "/services/job-placements" },
      { label: "Support & Maintenance", path: "/services/support-maintenance" },
    ],
  },
];

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggle = (title: string) => setOpenSection((prev) => (prev === title ? null : title));

  return (
    <footer className="bg-[hsl(var(--navy))] text-white relative overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.12]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--electric)) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.08]" style={{
        background: `radial-gradient(circle, hsl(var(--electric)), transparent 70%)`
      }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.08]" style={{
        background: `radial-gradient(circle, hsl(var(--gold)), transparent 70%)`
      }} />
      <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Sthanu Setu Technologies" className="w-9 h-9 rounded-full object-cover" />
              <span className="font-heading font-semibold text-lg">Sthanu Setu</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Stable Innovation. Delivering reliable and scalable digital solutions for businesses ready to grow.
            </p>
            <div className="flex gap-3 pt-2">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] transition-all active:scale-95">
                  <Icon className="w-4 h-4 text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="hidden md:block font-heading font-semibold text-xs uppercase tracking-[0.15em] mb-5 text-white/50">{section.title}</h4>
              <ul className="hidden md:block space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</a>
                    ) : (
                      <Link to={link.path} className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="md:hidden border-b border-white/[0.08]">
                <button onClick={() => toggle(section.title)} className="w-full flex items-center justify-between py-3 text-sm font-semibold uppercase tracking-wider text-white/50">
                  {section.title}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSection === section.title ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openSection === section.title ? "max-h-48 pb-3" : "max-h-0"}`}>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {'external' in link && link.external ? (
                          <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</a>
                        ) : (
                          <Link to={link.path} className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="hidden md:block font-heading font-semibold text-xs uppercase tracking-[0.15em] mb-5 text-white/50">Contact</h4>
            <ul className="hidden md:block space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/50"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> info@sthanusetu.com</li>
              <li className="flex items-start gap-2 text-sm text-white/50"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> +91 76758 43214</li>
              <li className="flex items-start gap-2 text-sm text-white/50"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Hyderabad, India</li>
            </ul>
            <div className="md:hidden border-b border-white/[0.08]">
              <button onClick={() => toggle("Contact")} className="w-full flex items-center justify-between py-3 text-sm font-semibold uppercase tracking-wider text-white/50">
                Contact
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSection === "Contact" ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openSection === "Contact" ? "max-h-48 pb-3" : "max-h-0"}`}>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-white/50"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> info@sthanusetu.com</li>
                  <li className="flex items-start gap-2 text-sm text-white/50"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> +91 76758 43214</li>
                  <li className="flex items-start gap-2 text-sm text-white/50"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Hyderabad, India</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} Sthanu Setu Technologies. All rights reserved.</p>
          <p className="text-xs text-white/30">
            Developed by{" "}
            <a href="https://octaleads.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline transition-colors">
              Octaleads Pvt. Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
