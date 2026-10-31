import { createFileRoute, Link } from "@tanstack/react-router";
import { useSite } from "@/lib/store";
import { Img, PageHero } from "@/components/ui-kit";

export const Route = createFileRoute("/_site/expertise")({
  head: () => ({
    meta: [
      { title: "Our Expertise — Radiant Diamond LLP" },
      { name: "description", content: "Diamond trading, sourcing, selection, quality assessment, export coordination and international business relations." },
      { property: "og:title", content: "Our Expertise — Radiant Diamond LLP" },
      { property: "og:description", content: "Areas of focus in diamond trading and export." },
    ],
  }),
  component: Expertise,
});

function Expertise() {
  const { expertise } = useSite();
  return (
    <>
      <PageHero eyebrow="Our Expertise" title="Knowledge applied to every stone." text="An overview of the areas we focus on. Descriptions are proposed and editable." image="img:inspection" />
      <nav className="sticky top-[60px] z-30 hidden border-b border-border bg-pearl/95 backdrop-blur md:block" aria-label="Expertise sections">
        <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-10 py-4">
          {expertise.map((e) => <a key={e.id} href={`#${e.id}`} className="whitespace-nowrap text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-gold">{e.title}</a>)}
        </div>
      </nav>
      {expertise.map((e, i) => (
        <section key={e.id} id={e.id} className={`scroll-mt-32 ${i % 2 ? "bg-navy text-pearl" : ""}`}>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:px-10 lg:grid-cols-12">
            <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="aspect-[16/10] overflow-hidden"><Img src={e.image} alt={e.title} className="h-full w-full" /></div>
            </div>
            <div className="lg:col-span-5">
              <span className="font-display text-6xl text-gold/60">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 text-4xl md:text-5xl">{e.title}</h2>
              <p className={`mt-4 font-display text-xl italic ${i % 2 ? "text-platinum" : "text-navy/80"}`}>{e.summary}</p>
              <span className="gold-rule mt-6" />
              <p className={`mt-6 leading-relaxed whitespace-pre-line ${i % 2 ? "text-platinum/75" : "text-muted-foreground"}`}>{e.body}</p>
            </div>
          </div>
        </section>
      ))}
      <section className="py-24 text-center">
        <h2 className="text-4xl">Discuss your requirements.</h2>
        <Link to="/contact" className="btn btn-dark mt-8">Contact Our Team</Link>
      </section>
    </>
  );
}
