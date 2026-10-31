import hero from "@/assets/hero.jpg";
import macro from "@/assets/macro.jpg";
import inspection from "@/assets/inspection.jpg";
import sorting from "@/assets/sorting.jpg";
import office from "@/assets/office.jpg";
import bourse from "@/assets/bourse.jpg";
import exportImg from "@/assets/export.jpg";
import arrangement from "@/assets/arrangement.jpg";
import round from "@/assets/p-round.jpg";
import princess from "@/assets/p-princess.jpg";
import oval from "@/assets/p-oval.jpg";
import emerald from "@/assets/p-emerald.jpg";
import pear from "@/assets/p-pear.jpg";
import cushion from "@/assets/p-cushion.jpg";
import marquise from "@/assets/p-marquise.jpg";
import radiant from "@/assets/p-radiant.jpg";

// Built-in images are stored as "img:<key>" so saved data survives rebuilds.
export const IMAGES: Record<string, string> = {
  hero, macro, inspection, sorting, office, bourse, export: exportImg, arrangement,
  round, princess, oval, emerald, pear, cushion, marquise, radiant,
};

export const FALLBACK_IMAGE = macro;

export function img(src?: string) {
  if (!src) return FALLBACK_IMAGE;
  if (src.startsWith("img:")) return IMAGES[src.slice(4)] ?? FALLBACK_IMAGE;
  return src;
}
