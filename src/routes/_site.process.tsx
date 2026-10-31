import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSite } from "@/lib/store";
import { Img, PageHero, SampleNote } from "@/components/ui-kit";

export const Route = createFileRoute("/_site/process")({
  head: () => ({
    meta: [
      { title: "Our Process — Radiant Diamond LLP" },
      { name: "description", content: "A step-by-step view of how Radiant Diamond LLP handles business enquiries, selection, quality review and export coordination." },
      { property: "og:title", content: "Our Process — Radiant Diamond LLP" },
      { property: "og:description", content: "From enquiry to export coordination." },
    ],
  }),
  component: Process,
});

function Process() {
  const { process } = useSite();
  const [active, setActive] = useState(0);
  const step = process[Math.min(active, process.length - 1)];
  return (
    <>
      <PageHero eyebrow="Our Process" title="From enquiry to export, step by step." image="img:export" />
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SampleNote>Proposed process — subject to the company's confirmation</SampleNote>

        {/* Desktop: horizontal timeline */}
        <div className="mt-16 hidden lg:block">
          <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${process.length}, minmax(0,1fr))` }}>
            <span className="absolute left-0 right-0 top-[11px] h-px bg-border" aria-hidden />
            {process.map((s, i) => (
              <li key={s.id}>
                <button onClick={() => setActive(i)} className="group relative flex w-full flex-col items-start pr-4 text-left">
                  <span className={`relative z-10 h-6 w-6 rotate-45 border transition ${i === active ? "border-gold bg-gold" : "border-stone bg-pearl group-hover:border-gold"}`} />
                  <span className="mt-6 font-display text-sm text-gold">Step {i + 1}</span>
                  <span className={`mt-1 font-display text-xl ${i === active ? "text-navy" : "text-muted-foreground"}`}>{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
          {step && (
            <div key={step.id} className="page-in mt-16 grid items-center gap-12 bg-navy lg:grid-cols-2">
              <Img src={step.image} alt={step.title} className="aspect-[4/3] h-full w-full" />
              <div className="p-12 text-pearl">
                <p className="eyebrow">Step {active + 1} of {process.length}</p>
                <h2 className="mt-4 text-5xl">{step.title}</h2>
                <p className="mt-6 leading-relaxed text-platinum/80">{step.body}</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: vertical timeline */}
        <ol className="mt-12 border-l border-border lg:hidden">
          {process.map((s, i) => (
            <li key={s.id} className="relative pb-12 pl-8">
              <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rotate-45 bg-gold" />
              <p className="font-display text-sm text-gold">Step {i + 1}</p>
              <h2 className="mt-1 text-3xl">{s.title}</h2>
              <Img src={s.image} alt={s.title} className="mt-4 aspect-[16/10] w-full" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-ink py-24 text-center">
        <h2 className="text-4xl text-pearl">Begin with an enquiry.</h2>
        <Link to="/contact" className="btn btn-gold mt-8">Send an Enquiry</Link>
      </section>
    </>
  );
}
