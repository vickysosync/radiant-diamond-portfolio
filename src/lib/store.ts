import { useSyncExternalStore } from "react";

export type Product = {
  id: string; name: string; shape: string; description: string;
  image: string; image2: string; image3: string;
  cut: string; colour: string; clarity: string; carat: string; published: boolean;
};
export type Block = { id: string; title: string; summary?: string; body: string; image: string };
export type GalleryItem = { id: string; caption: string; category: string; image: string };
export type Enquiry = {
  id: string; name: string; company: string; email: string; phone: string;
  subject: string; message: string; date: string; status: "new" | "read" | "responded" | "closed";
};

const SAMPLE = { cut: "Excellent (sample)", colour: "D–F (sample)", clarity: "VVS1–VS2 (sample)", carat: "0.50 – 3.00 ct (sample)" };
const prod = (id: string, name: string, shape: string, description: string): Product => ({
  id, name, shape, description, image: `img:${id}`, image2: "img:macro", image3: "img:sorting", ...SAMPLE, published: true,
});

export const DEFAULTS = {
  company: {
    name: "Radiant Diamond LLP",
    category: "Diamond Trading & Export",
    office: "Office No. 2070, 2nd Floor, F Tower, East Core, Bharat Diamond Bourse, BKC, Bandra (East), Mumbai, Maharashtra 400051, India",
    contactPerson: "Nirav Bipin",
    contactRole: "Key Contact Person / Partner",
    phone: "",
    email: "",
    description: "A diamond trading and export company operating from the Bharat Diamond Bourse, Mumbai.",
    overview: "Radiant Diamond LLP is a diamond trading and export company operating from the prestigious Bharat Diamond Bourse in Mumbai. We focus on professionalism, quality-conscious trading and building lasting business relationships in the diamond industry.",
  },
  home: {
    heroEyebrow: "PRECISION • PURITY • EXCELLENCE",
    heroTitle1: "The Brilliance of Trust.",
    heroTitle2: "The Excellence of Diamonds.",
    heroDesc: "Radiant Diamond LLP represents excellence in diamond trading and exports, bringing together precision, quality and professionalism from the heart of India's diamond industry.",
    heroImage: "img:hero",
    cta1: "Explore Our Collection",
    cta2: "Connect With Us",
    introHeading: "A Legacy of Brilliance, Built on Trust.",
    visualHeading: "Where Every Detail Matters.",
    visualText: "Precision, presentation and attention to detail define the world of fine diamonds.",
    visualCta: "Discover Our Expertise",
    visualImage: "img:macro",
    contactHeading: "Let's Build a Brilliant Business Relationship.",
    contactCta: "Contact Our Team",
    showHighlights: true,
    showExpertise: true,
    showVisual: true,
    showContact: true,
  },
  about: [
    { id: "a1", title: "Company Overview", body: "Radiant Diamond LLP is a limited liability partnership engaged in diamond trading and export, operating from the Bharat Diamond Bourse in Bandra Kurla Complex, Mumbai — one of the most significant diamond trading centres in the world.", image: "img:bourse" },
    { id: "a2", title: "Who We Are", body: "We are a diamond trading business led by our partner, Nirav Bipin. Our work centres on understanding the requirements of our trade partners and handling every stone and every conversation with care.", image: "img:office" },
    { id: "a3", title: "Our Business Philosophy", body: "We believe that the diamond trade is built on trust. Clear communication, honest dealings and consistency are the principles that guide how we conduct business.", image: "img:arrangement" },
    { id: "a4", title: "Our Commitment to Quality", body: "Every diamond deserves careful attention. We approach selection and review with a quality-conscious mindset, respecting the precision the industry demands.", image: "img:inspection" },
    { id: "a5", title: "Our Approach to Business Relationships", body: "We value long-term relationships over single transactions. Our aim is to be a dependable, responsive and professional partner to the businesses we work with.", image: "img:export" },
  ] as Block[],
  products: [
    prod("round", "Round Brilliant Diamonds", "Round", "The classic brilliant cut, designed to maximise light return and sparkle."),
    prod("princess", "Princess Cut Diamonds", "Princess", "A square brilliant cut with crisp corners and a contemporary character."),
    prod("oval", "Oval Cut Diamonds", "Oval", "An elongated brilliant shape offering elegance and a generous face-up appearance."),
    prod("emerald", "Emerald Cut Diamonds", "Emerald", "A step cut with long, clean facets that emphasise clarity and refinement."),
    prod("pear", "Pear Cut Diamonds", "Pear", "A graceful teardrop combining the round and marquise silhouettes."),
    prod("cushion", "Cushion Cut Diamonds", "Cushion", "Softly rounded corners and broad facets with a timeless, romantic glow."),
    prod("marquise", "Marquise Cut Diamonds", "Marquise", "An elongated shape with pointed ends, known for its striking presence."),
    prod("radiant", "Radiant Cut Diamonds", "Radiant", "Trimmed corners with brilliant faceting — the structure of a step cut with vivid sparkle."),
  ],
  expertise: [
    { id: "e1", title: "Diamond Trading", summary: "Professional trading of polished diamonds.", body: "Proposed description: trading polished diamonds with a focus on transparent dealings and clear communication with trade partners.", image: "img:office" },
    { id: "e2", title: "Diamond Sourcing", summary: "Sourcing according to client requirements.", body: "Proposed description: identifying diamonds that match the shape, size and quality requirements shared by business clients.", image: "img:sorting" },
    { id: "e3", title: "Diamond Selection", summary: "Careful selection of stones.", body: "Proposed description: selecting stones with attention to cut, colour, clarity and overall appearance.", image: "img:arrangement" },
    { id: "e4", title: "Quality Assessment", summary: "A quality-conscious review process.", body: "Proposed description: reviewing diamonds closely before they move forward in the business process.", image: "img:inspection" },
    { id: "e5", title: "Export Coordination", summary: "Coordinating export requirements.", body: "Proposed description: coordinating documentation and logistics steps involved in diamond exports.", image: "img:export" },
    { id: "e6", title: "International Business Relations", summary: "Building lasting trade relationships.", body: "Proposed description: maintaining professional, long-term relationships with business partners.", image: "img:bourse" },
  ] as Block[],
  process: [
    { id: "s1", title: "Business Enquiry", body: "A business reaches out with an enquiry about its diamond requirements.", image: "img:office" },
    { id: "s2", title: "Requirement Understanding", body: "We discuss shapes, sizes, quality parameters and timelines in detail.", image: "img:export" },
    { id: "s3", title: "Diamond Selection", body: "Suitable diamonds are identified against the agreed requirements.", image: "img:sorting" },
    { id: "s4", title: "Quality Review", body: "Selected stones are reviewed carefully before proceeding.", image: "img:inspection" },
    { id: "s5", title: "Business Coordination", body: "Terms, documentation and communication are coordinated with the client.", image: "img:arrangement" },
    { id: "s6", title: "Order & Export Coordination", body: "The order is finalised and export steps are coordinated.", image: "img:bourse" },
  ] as Block[],
  galleryCategories: ["Loose Diamonds", "Macro", "Inspection", "Arrangements", "Business"],
  gallery: [
    { id: "g1", caption: "Brilliant-cut diamond on black", category: "Loose Diamonds", image: "img:hero" },
    { id: "g2", caption: "Facets in macro detail", category: "Macro", image: "img:macro" },
    { id: "g3", caption: "Inspection with loupe and tweezers", category: "Inspection", image: "img:inspection" },
    { id: "g4", caption: "Sorting loose diamonds", category: "Inspection", image: "img:sorting" },
    { id: "g5", caption: "Fancy shapes on velvet", category: "Arrangements", image: "img:arrangement" },
    { id: "g6", caption: "A diamond trading desk", category: "Business", image: "img:office" },
    { id: "g7", caption: "Bandra Kurla Complex business district", category: "Business", image: "img:bourse" },
    { id: "g8", caption: "Parcel papers and documentation", category: "Business", image: "img:export" },
    { id: "g9", caption: "Round brilliant", category: "Loose Diamonds", image: "img:round" },
    { id: "g10", caption: "Pear shape", category: "Loose Diamonds", image: "img:pear" },
    { id: "g11", caption: "Emerald step cut", category: "Macro", image: "img:emerald" },
    { id: "g12", caption: "Marquise shape", category: "Loose Diamonds", image: "img:marquise" },
  ] as GalleryItem[],
  enquiries: [] as Enquiry[],
  settings: {
    logo: "",
    favicon: "",
    seoTitle: "Radiant Diamond LLP — Diamond Trading & Export, Mumbai",
    seoDesc: "Radiant Diamond LLP is a diamond trading and export company at Bharat Diamond Bourse, BKC, Mumbai.",
    footerText: "A diamond trading and export company operating from Bharat Diamond Bourse, Mumbai.",
    linkedin: "", instagram: "", facebook: "", twitter: "",
  },
};

export type SiteData = typeof DEFAULTS;
const KEY = "rd_site_v1";
let cache: SiteData | null = null;
const listeners = new Set<() => void>();

function load(): SiteData {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      cache = {
        ...DEFAULTS, ...p,
        company: { ...DEFAULTS.company, ...p.company },
        home: { ...DEFAULTS.home, ...p.home },
        settings: { ...DEFAULTS.settings, ...p.settings },
      };
      return cache!;
    }
  } catch { /* ignore */ }
  cache = DEFAULTS;
  return cache;
}

export function getData() { return typeof window === "undefined" ? DEFAULTS : load(); }

export function update(fn: (d: SiteData) => SiteData): boolean {
  const next = fn(load());
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    toast("Storage is full — try a smaller image.", "error");
    return false;
  }
  cache = next;
  listeners.forEach((l) => l());
  return true;
}

export function resetAll() {
  localStorage.removeItem(KEY);
  cache = null;
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => { listeners.add(l); return () => listeners.delete(l); };
export function useSite(): SiteData {
  return useSyncExternalStore(subscribe, load, () => DEFAULTS);
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- toasts ---------- */
export type Toast = { id: string; msg: string; kind: "success" | "error" };
let toasts: Toast[] = [];
const tl = new Set<() => void>();
export function toast(msg: string, kind: Toast["kind"] = "success") {
  const t = { id: uid(), msg, kind };
  toasts = [...toasts, t];
  tl.forEach((l) => l());
  setTimeout(() => { toasts = toasts.filter((x) => x.id !== t.id); tl.forEach((l) => l()); }, 3200);
}
const EMPTY: Toast[] = [];
export function useToasts() {
  return useSyncExternalStore((l) => { tl.add(l); return () => tl.delete(l); }, () => toasts, () => EMPTY);
}

/* ---------- demo auth (NOT secure — frontend only) ---------- */
export const DEMO_EMAIL = "admin@radiantdiamond.com";
export const DEMO_PASSWORD = "Admin@123";
const AUTH = "rd_admin_session";
export const isAuthed = () => typeof window !== "undefined" && localStorage.getItem(AUTH) === "1";
export function login(email: string, pw: string) {
  if (email.trim().toLowerCase() === DEMO_EMAIL && pw === DEMO_PASSWORD) { localStorage.setItem(AUTH, "1"); return true; }
  return false;
}
export const logout = () => localStorage.removeItem(AUTH);

/* ---------- image helper: compress uploads ---------- */
export function fileToDataUrl(file: File, max = 1400): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const im = new Image();
      im.onload = () => {
        const s = Math.min(1, max / Math.max(im.width, im.height));
        const c = document.createElement("canvas");
        c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
        c.getContext("2d")!.drawImage(im, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.82));
      };
      im.onerror = reject;
      im.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
