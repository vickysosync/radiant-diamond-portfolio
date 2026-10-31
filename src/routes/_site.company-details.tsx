import { createFileRoute } from "@tanstack/react-router";
import { useSite } from "@/lib/store";
import { PageHero } from "@/components/ui-kit";

export const Route = createFileRoute("/_site/company-details")({
  head: () => ({
    meta: [
      { title: "Company Details — Radiant Diamond LLP" },
      { name: "description", content: "Registered details of Radiant Diamond LLP, Bharat Diamond Bourse, BKC, Mumbai." },
      { property: "og:title", content: "Company Details — Radiant Diamond LLP" },
      { property: "og:description", content: "Registered office and contact details." },
    ],
  }),
  component: Details,
});

function Details() {
  const { company } = useSite();
  const cards = [
    ["Company", [company.name, company.category]],
    ["Registered Office", [company.office]],
    ["Contact", [`${company.contactRole}: ${company.contactPerson}`, company.phone || "Phone: to be added", company.email || "Email: to be added"]],
  ] as const;
  return (
    <>
      <PageHero eyebrow="Company Details" title="Registered information." image="img:bourse" />
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-24 md:grid-cols-3 md:px-10">
        {cards.map(([t, lines]) => (
          <article key={t} className="border-t-2 border-gold bg-card p-8">
            <h2 className="text-3xl">{t}</h2>
            {lines.map((l) => <p key={l} className="mt-3 text-sm leading-relaxed text-muted-foreground">{l}</p>)}
          </article>
        ))}
        <a href="https://www.google.com/maps/search/?api=1&query=Bharat+Diamond+Bourse+BKC+Mumbai" target="_blank" rel="noreferrer" className="bg-navy p-10 text-pearl md:col-span-3">
          <p className="eyebrow">Location</p>
          <p className="mt-3 font-display text-3xl">Bharat Diamond Bourse, Bandra Kurla Complex, Mumbai 400051</p>
          <p className="mt-3 text-sm text-platinum/70">Open in Maps →</p>
        </a>
      </section>
    </>
  );
}
