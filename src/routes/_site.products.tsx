import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useSite, type Product } from "@/lib/store";
import { Img, PageHero, SampleNote } from "@/components/ui-kit";

export const Route = createFileRoute("/_site/products")({
  head: () => ({
    meta: [
      { title: "Our Products — Diamond Shapes | Radiant Diamond LLP" },
      { name: "description", content: "Explore diamond shape categories: round brilliant, princess, oval, emerald, pear, cushion, marquise and radiant cuts." },
      { property: "og:title", content: "Diamond Collection — Radiant Diamond LLP" },
      { property: "og:description", content: "A showcase of diamond shape categories traded by Radiant Diamond LLP." },
    ],
  }),
  component: Products,
});

function Products() {
  const { products } = useSite();
  const list = products.filter((p) => p.published);
  const shapes = ["All", ...Array.from(new Set(list.map((p) => p.shape)))];
  const [shape, setShape] = useState("All");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Product | null>(null);
  const shown = useMemo(() => list.filter((p) =>
    (shape === "All" || p.shape === shape) &&
    (p.name + " " + p.description + " " + p.shape).toLowerCase().includes(q.toLowerCase())), [list, shape, q]);

  return (
    <>
      <PageHero eyebrow="Our Products" title="A study in shape and light." text="Explore the diamond shape categories we work with." image="img:sorting" />
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by shape">
            {shapes.map((s) => (
              <button key={s} onClick={() => setShape(s)} aria-pressed={shape === s}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.15em] transition ${shape === s ? "border-navy bg-navy text-pearl" : "border-border text-muted-foreground hover:border-gold hover:text-navy"}`}>{s}</button>
            ))}
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search diamonds…" aria-label="Search products" className="field lg:max-w-xs" />
        </div>
        <div className="mt-6"><SampleNote>Showcase only — specifications are sample information, not available stock</SampleNote></div>
        {shown.length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">No diamonds match your search.</p>
        ) : (
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((p) => (
              <article key={p.id} className="group">
                <button onClick={() => setActive(p)} className="block aspect-[4/5] w-full overflow-hidden bg-ink" aria-label={`View ${p.name}`}>
                  <Img src={p.image} alt={p.name} className="h-full w-full transition duration-700 group-hover:scale-105" />
                </button>
                <p className="mt-5 text-[0.65rem] uppercase tracking-[0.25em] text-gold">{p.shape}</p>
                <h2 className="mt-1 text-2xl">{p.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <button onClick={() => setActive(p)} className="mt-4 text-xs uppercase tracking-[0.2em] text-navy underline decoration-gold underline-offset-8 hover:text-gold">View Details</button>
              </article>
            ))}
          </div>
        )}
      </section>
      {active && <ProductModal p={active} onClose={() => setActive(null)} />}
    </>
  );
}

function ProductModal({ p, onClose }: { p: Product; onClose: () => void }) {
  const imgs = [p.image, p.image2, p.image3].filter(Boolean);
  const [i, setI] = useState(0);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.name}>
      <div className="page-in grid max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-pearl md:grid-cols-2" onClick={(e) => e.stopPropagation()}>
        <div className="bg-ink">
          <Img src={imgs[i]} alt={`${p.name} image ${i + 1}`} className="aspect-square w-full" />
          <div className="flex gap-2 p-3">
            {imgs.map((s, idx) => (
              <button key={idx} onClick={() => setI(idx)} className={`h-16 w-16 overflow-hidden border ${idx === i ? "border-gold" : "border-transparent opacity-60"}`} aria-label={`Show image ${idx + 1}`}>
                <Img src={s} alt="" className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>
        <div className="relative p-8 md:p-10">
          <button onClick={onClose} className="absolute right-5 top-5 text-2xl text-muted-foreground hover:text-navy" aria-label="Close">×</button>
          <p className="eyebrow">{p.shape}</p>
          <h2 className="mt-3 text-4xl">{p.name}</h2>
          <p className="mt-4 text-sm text-muted-foreground">{p.description}</p>
          <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
            {[["Shape", p.shape], ["Cut", p.cut], ["Colour", p.colour], ["Clarity", p.clarity], ["Carat Weight", p.carat]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-6"><SampleNote>Sample information — not actual stock</SampleNote></div>
          <Link to="/contact" search={{ subject: `Enquiry: ${p.name}` }} className="btn btn-dark mt-8 w-full">Send Enquiry</Link>
        </div>
      </div>
    </div>
  );
}
