import { createFileRoute, Link } from "@tanstack/react-router";
import { useSite } from "@/lib/store";
import { Img, PageHero } from "@/components/ui-kit";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About Us — Radiant Diamond LLP" },
      { name: "description", content: "Learn about Radiant Diamond LLP, a diamond trading and export company at Bharat Diamond Bourse, Mumbai." },
      { property: "og:title", content: "About Radiant Diamond LLP" },
      { property: "og:description", content: "Our philosophy, commitment to quality and approach to business relationships." },
    ],
  }),
  component: About,
});

function About() {
  const { about, company } = useSite();
  return (
    <>
      <PageHero eyebrow="About Us" title="Built on trust, guided by precision." text={company.description} image="img:arrangement" />
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        {about.map((s, i) => (
          <section key={s.id} className={`grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="aspect-[5/4] overflow-hidden"><Img src={s.image} alt={s.title} className="h-full w-full" /></div>
            <div>
              <span className="font-display text-lg text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-4xl md:text-5xl">{s.title}</h2>
              <span className="gold-rule mt-6" />
              <p className="mt-6 leading-relaxed text-muted-foreground whitespace-pre-line">{s.body}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="bg-navy py-24 text-pearl">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-3">
          <div><p className="eyebrow">Registered Office</p><h2 className="mt-4 text-4xl">Bharat Diamond Bourse, Mumbai</h2></div>
          <address className="not-italic leading-relaxed text-platinum/80">{company.office}</address>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone">{company.contactRole}</p>
            <p className="mt-2 font-display text-3xl">{company.contactPerson}</p>
            <Link to="/company-details" className="btn btn-ghost-light mt-8">Company Details</Link>
          </div>
        </div>
      </section>
    </>
  );
}
