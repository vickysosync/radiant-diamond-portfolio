import { createFileRoute, Link } from "@tanstack/react-router";
import { useSite } from "@/lib/store";
import { Img, SectionTitle } from "@/components/ui-kit";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Radiant Diamond LLP — Diamond Trading & Export, Mumbai" },
      { name: "description", content: "Radiant Diamond LLP is a diamond trading and export company at Bharat Diamond Bourse, BKC, Mumbai." },
      { property: "og:title", content: "Radiant Diamond LLP — The Brilliance of Trust" },
      { property: "og:description", content: "Diamond trading and export from the heart of India's diamond industry." },
    ],
  }),
  component: Home,
});

const HIGHLIGHTS = [
  { t: "Diamond Trading", d: "Professional trading of polished diamonds.", i: "img:round" },
  { t: "Export Operations", d: "Coordinated from Mumbai's diamond hub.", i: "img:export" },
  { t: "Quality-Focused Approach", d: "Attention to every stone we handle.", i: "img:inspection" },
  { t: "Professional Business Relationships", d: "Built on trust and consistency.", i: "img:office" },
];

function Home() {
  const { home, company, expertise } = useSite();
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-ink">
        <Img src={home.heroImage} alt="Close-up of a brilliant-cut diamond on a dark reflective surface" loading="eager" fetchPriority="high" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 hero-shade" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 md:px-10">
          <p className="eyebrow mb-8">{home.heroEyebrow}</p>
          <h1 className="max-w-3xl text-5xl leading-[1.04] text-pearl sm:text-6xl lg:text-[5.5rem]">
            {home.heroTitle1}<br /><em className="text-platinum/90">{home.heroTitle2}</em>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-platinum/75">{home.heroDesc}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/products" className="btn btn-gold">{home.cta1}</Link>
            <Link to="/contact" className="btn btn-ghost-light">{home.cta2}</Link>
          </div>
        </div>
        <a href="#intro" className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-platinum/60" aria-label="Scroll down">
          Scroll<span className="scroll-cue block h-8 w-px bg-gold" />
        </a>
      </section>

      <section id="intro" className="mx-auto grid max-w-7xl gap-16 px-6 py-28 md:px-10 lg:grid-cols-2">
        <SectionTitle eyebrow="Introduction" title={home.introHeading}>
          <p>{company.overview}</p>
          <Link to="/about" className="btn btn-outline mt-10">About the Company</Link>
        </SectionTitle>
        <dl className="grid content-start divide-y divide-border border-y border-border">
          {[["Company Name", company.name], ["Business Category", company.category], ["Registered Office", company.office], [company.contactRole, company.contactPerson]].map(([k, v]) => (
            <div key={k} className="grid gap-2 py-6 sm:grid-cols-[180px_1fr]">
              <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
              <dd className="font-display text-xl text-navy">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {home.showHighlights && (
        <section className="bg-navy py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <SectionTitle light eyebrow="Key Highlights" title="What defines our business." />
            <div className="mt-16 grid gap-px bg-pearl/10 sm:grid-cols-2 lg:grid-cols-4">
              {HIGHLIGHTS.map((h, i) => (
                <article key={h.t} className="group relative aspect-[3/4] overflow-hidden bg-ink">
                  <Img src={h.i} alt={h.t} className="h-full w-full opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-80" />
                  <div className="absolute inset-0 bottom-shade" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span className="font-display text-sm text-gold">0{i + 1}</span>
                    <h3 className="mt-2 text-2xl text-pearl">{h.t}</h3>
                    <p className="mt-2 text-sm text-platinum/70">{h.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {home.showExpertise && (
        <section className="mx-auto max-w-7xl px-6 py-28 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionTitle eyebrow="Featured Expertise" title="Areas of focus." />
            <Link to="/expertise" className="btn btn-outline">View All Expertise</Link>
          </div>
          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {expertise.slice(0, 5).map((e) => (
              <article key={e.id} className="group">
                <div className="aspect-[4/3] overflow-hidden"><Img src={e.image} alt={e.title} className="h-full w-full transition duration-700 group-hover:scale-105" /></div>
                <h3 className="mt-6 text-2xl">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.summary}</p>
              </article>
            ))}
          </div>
          <p className="mt-12 text-xs text-muted-foreground">Service descriptions are proposed and editable by the company.</p>
        </section>
      )}

      {home.showVisual && (
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink text-center">
          <Img src={home.visualImage} alt="Macro photograph of diamond facets" className="absolute inset-0 h-full w-full opacity-50" />
          <div className="relative px-6">
            <p className="eyebrow mb-6">Precision</p>
            <h2 className="text-5xl text-pearl md:text-7xl">{home.visualHeading}</h2>
            <p className="mx-auto mt-6 max-w-lg text-platinum/80">{home.visualText}</p>
            <Link to="/expertise" className="btn btn-gold mt-10">{home.visualCta}</Link>
          </div>
        </section>
      )}

      {home.showContact && (
        <section className="mx-auto max-w-5xl px-6 py-28 text-center md:px-10">
          <h2 className="text-4xl md:text-6xl">{home.contactHeading}</h2>
          <span className="gold-rule mx-auto mt-8" />
          <Link to="/contact" className="btn btn-dark mt-10">{home.contactCta}</Link>
        </section>
      )}
    </>
  );
}
