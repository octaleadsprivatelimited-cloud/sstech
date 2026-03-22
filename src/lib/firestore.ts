import { db } from "./firebase";
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc,
  query, orderBy, Timestamp
} from "firebase/firestore";
import {
  defaultHero, defaultServices, defaultStats, defaultTestimonials,
  defaultJobs, defaultTeam, defaultContact, defaultAbout, defaultBanners
} from "./firestore-defaults";

// ─── Types ───────────────────────────────────────
export interface HeroData {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  bgImage: string;
}

export interface ServiceItem {
  id?: string;
  title: string;
  shortDesc: string;
  description: string;
  benefits: string[];
  image: string;
  order: number;
}

export interface StatItem {
  id?: string;
  end: number;
  suffix: string;
  label: string;
  order: number;
}

export interface TestimonialItem {
  id?: string;
  name: string;
  company: string;
  quote: string;
  rating: number;
}

export interface JobItem {
  id?: string;
  title: string;
  type: string;
  location: string;
  active: boolean;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image?: string;
  order: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
  linkedin: string;
  twitter: string;
  github: string;
}

export interface AboutData {
  heroTitle: string;
  heroSubtitle: string;
  heroBgImage: string;
  vision: string;
  mission: string;
}

export interface PageBanner {
  title: string;
  subtitle: string;
  bgImage: string;
}

// ─── Image Compression & Upload (base64 in Firestore) ──
const compressImage = (file: File, maxWidth = 1200, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = (h * maxWidth) / w;
          w = maxWidth;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/webp", quality));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const uploadImage = async (file: File, _path: string): Promise<string> => {
  // Compress images to webp, max 1200px wide, 70% quality
  return compressImage(file);
};

export const deleteImage = async (_url: string) => {
  // No-op: base64 images are stored inline in Firestore documents
};

// ─── Generic CRUD ────────────────────────────────
const getCollection = async <T>(name: string, orderField?: string): Promise<T[]> => {
  const q = orderField
    ? query(collection(db, name), orderBy(orderField))
    : collection(db, name);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
};

const getSingleDoc = async <T>(collName: string, docId: string): Promise<T | null> => {
  const snap = await getDoc(doc(db, collName, docId));
  return snap.exists() ? (snap.data() as T) : null;
};

const setSingleDoc = async <T extends Record<string, any>>(collName: string, docId: string, data: T) => {
  await setDoc(doc(db, collName, docId), { ...data, updatedAt: Timestamp.now() });
};

const addItem = async <T extends Record<string, any>>(collName: string, data: T) => {
  const docRef = await addDoc(collection(db, collName), { ...data, createdAt: Timestamp.now() });
  return docRef.id;
};

const updateItem = async <T extends Record<string, any>>(collName: string, id: string, data: T) => {
  await updateDoc(doc(db, collName, id), { ...data, updatedAt: Timestamp.now() });
};

const deleteItem = async (collName: string, id: string) => {
  await deleteDoc(doc(db, collName, id));
};

// ─── Auto-Seed: Save defaults to Firestore, merging with existing ──
const getOrSeedCollection = async <T extends Record<string, any>>(
  collName: string,
  orderField: string | undefined,
  defaults: T[],
  matchField: string = "title"
): Promise<(T & { id: string })[]> => {
  const existing = await getCollection<T & { id: string }>(collName, orderField);
  
  // Find defaults not yet in Firestore (match by title/label field)
  const existingValues = new Set(existing.map((e) => (e as any)[matchField]));
  const missing = defaults.filter((d) => !existingValues.has((d as any)[matchField]));
  
  if (missing.length === 0) return existing;
  
  // Seed only the missing defaults
  const seeded: (T & { id: string })[] = [...existing];
  for (const item of missing) {
    const id = await addItem(collName, item);
    seeded.push({ ...item, id } as T & { id: string });
  }
  
  // Re-sort if needed
  if (orderField) {
    seeded.sort((a, b) => ((a as any)[orderField] || 0) - ((b as any)[orderField] || 0));
  }
  return seeded;
};

const getOrSeedSingleDoc = async <T extends Record<string, any>>(
  collName: string,
  docId: string,
  defaultData: T
): Promise<T> => {
  const existing = await getSingleDoc<T>(collName, docId);
  if (existing) return existing;
  await setSingleDoc(collName, docId, defaultData);
  return defaultData;
};

// ─── Hero ────────────────────────────────────────
export const getHero = () => getOrSeedSingleDoc<HeroData>("siteContent", "hero", defaultHero);
export const saveHero = (data: HeroData) => setSingleDoc("siteContent", "hero", data);

// ─── Services ────────────────────────────────────
export const getServices = () => getOrSeedCollection<ServiceItem>("services", "order", defaultServices as any);
export const addService = (data: Omit<ServiceItem, "id">) => addItem("services", data);
export const updateService = (id: string, data: Partial<ServiceItem>) => updateItem("services", id, data);
export const deleteService = (id: string) => deleteItem("services", id);

// ─── Stats ───────────────────────────────────────
export const getStats = () => getOrSeedCollection<StatItem>("stats", "order", defaultStats as any, "label");
export const addStat = (data: Omit<StatItem, "id">) => addItem("stats", data);
export const updateStat = (id: string, data: Partial<StatItem>) => updateItem("stats", id, data);
export const deleteStat = (id: string) => deleteItem("stats", id);

// ─── Testimonials ────────────────────────────────
export const getTestimonials = () => getOrSeedCollection<TestimonialItem>("testimonials", undefined, defaultTestimonials as any, "name");
export const addTestimonial = (data: Omit<TestimonialItem, "id">) => addItem("testimonials", data);
export const updateTestimonial = (id: string, data: Partial<TestimonialItem>) => updateItem("testimonials", id, data);
export const deleteTestimonial = (id: string) => deleteItem("testimonials", id);

// ─── Jobs ────────────────────────────────────────
export const getJobs = () => getOrSeedCollection<JobItem>("jobs", undefined, defaultJobs as any);
export const addJob = (data: Omit<JobItem, "id">) => addItem("jobs", data);
export const updateJob = (id: string, data: Partial<JobItem>) => updateItem("jobs", id, data);
export const deleteJob = (id: string) => deleteItem("jobs", id);

// ─── Team ────────────────────────────────────────
export const getTeam = () => getOrSeedCollection<TeamMember>("team", "order", defaultTeam as any);
export const addTeamMember = (data: Omit<TeamMember, "id">) => addItem("team", data);
export const updateTeamMember = (id: string, data: Partial<TeamMember>) => updateItem("team", id, data);
export const deleteTeamMember = (id: string) => deleteItem("team", id);

// ─── Contact Info ────────────────────────────────
export const getContactInfo = () => getOrSeedSingleDoc<ContactInfo>("siteContent", "contact", defaultContact);
export const saveContactInfo = (data: ContactInfo) => setSingleDoc("siteContent", "contact", data);

// ─── About ───────────────────────────────────────
export const getAbout = () => getOrSeedSingleDoc<AboutData>("siteContent", "about", defaultAbout);
export const saveAbout = (data: AboutData) => setSingleDoc("siteContent", "about", data);

// ─── Page Banners ────────────────────────────────
export const getPageBanner = (page: string) => getOrSeedSingleDoc<PageBanner>("pageBanners", page, defaultBanners[page] || { title: "", subtitle: "", bgImage: "" });
export const savePageBanner = (page: string, data: PageBanner) => setSingleDoc("pageBanners", page, data);

// ─── Contact Form Submissions ────────────────────
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: any;
}

export const submitContactForm = (data: Omit<ContactSubmission, "id">) => addItem("contactSubmissions", data);
export const getContactSubmissions = () => getCollection<ContactSubmission>("contactSubmissions");

// ─── Career Applications ─────────────────────────
export interface CareerApplication {
  id?: string;
  name: string;
  email: string;
  role: string;
  message: string;
  createdAt?: any;
}

export const submitCareerApplication = (data: Omit<CareerApplication, "id">) => addItem("careerApplications", data);
export const getCareerApplications = () => getCollection<CareerApplication>("careerApplications");
