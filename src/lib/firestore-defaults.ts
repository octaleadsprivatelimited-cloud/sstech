import { HeroData, ServiceItem, StatItem, TestimonialItem, JobItem, TeamMember, ContactInfo, AboutData, PageBanner } from "./firestore";

export const defaultHero: HeroData = {
  badge: "Stable Innovation",
  title: "Stable Innovation for a",
  highlight: "Digital-First",
  subtitle: "We help businesses grow through secure, efficient, and future-ready technology. From consulting to custom software — we deliver results.",
  bgImage: "",
};

export const defaultServices: ServiceItem[] = [
  { title: "IT Consulting & Consultancy Services", shortDesc: "Strategic tech guidance.", description: "Strategic guidance for better technology decisions.", benefits: ["Technology roadmap planning", "Digital transformation strategy", "Vendor evaluation & selection", "IT infrastructure assessment"], image: "", order: 0 },
  { title: "Software Development", shortDesc: "Custom apps for your business.", description: "Custom-built applications tailored to your unique business requirements.", benefits: ["Full-stack web development", "Enterprise application development", "API design & integration", "Cloud-native solutions"], image: "", order: 1 },
  { title: "Job Placements", shortDesc: "Connecting talent & opportunity.", description: "Connecting top talent with direct clients.", benefits: ["Direct client placements", "Contract & full-time staffing", "Technical screening & vetting", "Career guidance & support"], image: "", order: 2 },
  { title: "Support & Maintenance", shortDesc: "Reliable ongoing support.", description: "Reliable ongoing technical support to keep your systems running smoothly.", benefits: ["24/7 monitoring & support", "Performance optimization", "Security patching & updates", "Incident management"], image: "", order: 3 },
];

export const defaultStats: StatItem[] = [
  { end: 50, suffix: "+", label: "Projects Delivered", order: 0 },
  { end: 30, suffix: "+", label: "Clients Served", order: 1 },
  { end: 5, suffix: "+", label: "Years Experience", order: 2 },
  { end: 4, suffix: "", label: "Core Services", order: 3 },
];

export const defaultTestimonials: TestimonialItem[] = [
  { name: "Priya Sharma", company: "NovaTech Solutions", quote: "Sthanu Setu transformed our legacy systems into a modern, scalable platform. Their team's dedication and expertise exceeded our expectations.", rating: 5 },
  { name: "Rajesh Menon", company: "CloudBridge Inc.", quote: "The consulting team helped us make critical technology decisions that saved us months of development time and significant costs.", rating: 5 },
  { name: "Anita Desai", company: "FinEdge Capital", quote: "Their support and maintenance services have been exceptional. Our systems have had near-zero downtime since we partnered with SST.", rating: 5 },
];

export const defaultJobs: JobItem[] = [
  { title: "Senior React Developer", type: "Full-time", location: "Hyderabad / Remote", active: true },
  { title: "Java Backend Engineer", type: "Contract", location: "Bangalore", active: true },
  { title: "DevOps Engineer", type: "Full-time", location: "Remote", active: true },
  { title: "QA Automation Specialist", type: "Full-time", location: "Hyderabad", active: true },
];

export const defaultTeam: TeamMember[] = [
  { name: "Arjun Reddy", role: "Founder & CEO", order: 0 },
  { name: "Kavitha Nair", role: "CTO", order: 1 },
  { name: "Suresh Kumar", role: "Head of Consulting", order: 2 },
  { name: "Divya Patel", role: "Lead Developer", order: 3 },
];

export const defaultContact: ContactInfo = {
  email: "info@sthanusetu.com",
  phone: "+91 76758 43214",
  address: "Hyderabad, Telangana, India",
  whatsapp: "917675843214",
  linkedin: "",
  twitter: "",
  github: "",
};

export const defaultAbout: AboutData = {
  heroTitle: "Our story of stable innovation",
  heroSubtitle: "Founded with the vision of bridging the gap between businesses and technology, Sthanu Setu Technologies has grown into a trusted IT partner for companies across India and beyond.",
  heroBgImage: "",
  vision: "To be the most trusted technology partner for businesses seeking stable, scalable, and innovative digital solutions globally.",
  mission: "To empower businesses with reliable technology solutions that drive growth, efficiency, and competitive advantage in an ever-evolving digital landscape.",
};

export const defaultBanners: Record<string, PageBanner> = {
  services: { title: "Comprehensive technology solutions", subtitle: "From strategy to execution, we provide end-to-end services that help businesses thrive in the digital age.", bgImage: "" },
  careers: { title: "Find your next opportunity", subtitle: "Join our network of skilled professionals and get placed with top-tier direct clients.", bgImage: "" },
  contact: { title: "Let's start a conversation", subtitle: "Have a project in mind? We'd love to hear from you. Reach out and let's discuss how we can help.", bgImage: "" },
  about: { title: "About Sthanu Setu Technologies", subtitle: "Learn about our vision, mission, and the team behind SST.", bgImage: "" },
};
