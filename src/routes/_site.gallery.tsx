import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useSite } from "@/lib/store";
import { Img, PageHero } from "@/components/ui-kit";

export const Route = createFileRoute("/_site/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Radiant Diamond LLP" },
      { name: "description", content: "A visual gallery of loose diamonds, macro photography, inspection and diamond trading environments." },
      { property: "og:title", content: "Gallery — Radiant Diamond LLP" },
      { property: "og:description", content: "Diamond photography from the world of fine diamonds." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const { gallery, galleryCategories } = useSite();
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState<number | null>(null);
  const shown = gallery.filter((g) => cat === "All" || g.category === cat);
  const prev = useCallback(() => setIdx((i) => (i === null ? i : (i - 1 + shown.length) % shown.length)), [shown.length]);
  const next = useCallback(() => setIdx((i) => (i === null ? i : (i + 1) % shown.length)), [shown.length]);

  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setIdx(null); if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [idx, prev, next]);

  const cur = idx !== null ? shown[idx] : null;
  return (
    <>
      <PageHero eyebrow="Gallery" title="Light, captured." image="img:macro" />
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="flex flex-wrap gap-2">
          {["All", ...galleryCategories].map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`border px-4 py-2 text-xs uppercase tracking-[0.15em] transition ${cat === c ? "border-navy bg-navy text-pearl" : "border-border text-muted-foreground hover:border-gold"}`}>{c}</button>
          ))}
        </div>
        {shown.length === 0 ? <p className="py-24 text-center text-muted-foreground">No images in this category yet.</p> : (
          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {shown.map((g, i) => (
              <figure key={g.id} className="group mb-5 break-inside-avoid">
                <button onClick={() => setIdx(i)} className="relative block w-full overflow-hidden bg-ink" aria-label={`Open ${g.caption}`}>
                  <Img src={g.image} alt={g.caption} className="w-full transition duration-700 group-hover:scale-105 group-hover:opacity-80" />
                </button>
                <figcaption className="mt-3 flex justify-between gap-4 text-sm"><span>{g.caption}</span><span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">{g.category}</span></figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
      {cur && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => setIdx(null)}>
          <button className="absolute right-6 top-6 text-3xl text-pearl hover:text-gold" aria-label="Close">×</button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-2 p-4 text-4xl text-pearl hover:text-gold md:left-8" aria-label="Previous image">‹</button>
          <figure className="page-in max-w-5xl" key={cur.id} onClick={(e) => e.stopPropagation()}>
            <Img src={cur.image} alt={cur.caption} className="max-h-[80vh] w-auto object-contain" />
            <figcaption className="mt-4 text-center text-sm text-platinum">{cur.caption} <span className="ml-3 text-stone">{(idx ?? 0) + 1} / {shown.length}</span></figcaption>
          </figure>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-2 p-4 text-4xl text-pearl hover:text-gold md:right-8" aria-label="Next image">›</button>
        </div>
      )}
    </>
  );
}
