import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useSite, update, uid, toast } from "@/lib/store";
import { PageHero } from "@/components/ui-kit";

export const Route = createFileRoute("/_site/contact")({
  validateSearch: (s: Record<string, unknown>) => ({ subject: typeof s.subject === "string" ? s.subject : undefined }),
  head: () => ({
    meta: [
      { title: "Contact Us — Radiant Diamond LLP" },
      { name: "description", content: "Send a business enquiry to Radiant Diamond LLP, Bharat Diamond Bourse, BKC, Mumbai." },
      { property: "og:title", content: "Contact Radiant Diamond LLP" },
      { property: "og:description", content: "Business enquiries for diamond trading and export." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[+\d\s()-]{0,20}$/, "Enter a valid phone number"),
  subject: z.string().trim().min(3, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});
type Form = z.infer<typeof schema>;

function Contact() {
  const { company } = useSite();
  const { subject } = Route.useSearch();
  const empty: Form = { name: "", company: "", email: "", phone: "", subject: subject ?? "", message: "" };
  const [f, setF] = useState<Form>(empty);
  const [err, setErr] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) {
      const m: typeof err = {};
      r.error.issues.forEach((i) => { m[i.path[0] as keyof Form] = i.message; });
      setErr(m);
      return;
    }
    const ok = update((d) => ({ ...d, enquiries: [{ id: uid(), ...r.data, date: new Date().toISOString(), status: "new" as const }, ...d.enquiries] }));
    if (ok) { setSent(true); setF(empty); setErr({}); toast("Thank you — your enquiry has been received."); }
  };

  const field = (k: keyof Form, label: string, type = "text") => (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      {k === "message"
        ? <textarea rows={5} className="field mt-2" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
        : <input type={type} className="field mt-2" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />}
      {err[k] && <span className="mt-1 block text-xs text-destructive">{err[k]}</span>}
    </label>
  );

  return (
    <>
      <PageHero eyebrow="Contact Us" title="Let's begin a conversation." image="img:office" />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:px-10 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-2">
          <div><p className="eyebrow">Registered Office</p><address className="mt-3 not-italic leading-relaxed">{company.office}</address></div>
          <div><p className="eyebrow">Business</p><p className="mt-3">{company.category}</p></div>
          <div><p className="eyebrow">{company.contactRole}</p><p className="mt-3 font-display text-2xl">{company.contactPerson}</p></div>
          {company.phone && <div><p className="eyebrow">Phone</p><a href={`tel:${company.phone}`} className="mt-3 block">{company.phone}</a></div>}
          {company.email && <div><p className="eyebrow">Email</p><a href={`mailto:${company.email}`} className="mt-3 block">{company.email}</a></div>}
          <a href="https://www.google.com/maps/search/?api=1&query=Bharat+Diamond+Bourse+BKC+Mumbai" target="_blank" rel="noreferrer" className="block bg-navy p-8 text-pearl hover:bg-ink">
            <p className="eyebrow">Location</p>
            <p className="mt-3 font-display text-2xl">Bharat Diamond Bourse, BKC</p>
            <p className="mt-2 text-sm text-platinum/70">Open in Maps →</p>
          </a>
        </div>
        <form onSubmit={submit} noValidate className="grid gap-6 border border-border bg-card p-8 md:grid-cols-2 lg:col-span-3">
          {sent && <p className="border-l-2 border-gold bg-muted p-4 text-sm md:col-span-2">Thank you. Your enquiry has been received and our team will get back to you.</p>}
          {field("name", "Full Name")}{field("company", "Company Name")}
          {field("email", "Email Address", "email")}{field("phone", "Phone Number", "tel")}
          <div className="md:col-span-2">{field("subject", "Enquiry Subject")}</div>
          <div className="md:col-span-2">{field("message", "Message")}</div>
          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button type="submit" className="btn btn-dark">Submit Enquiry</button>
            <button type="button" className="btn btn-outline" onClick={() => { setF(empty); setErr({}); setSent(false); }}>Reset Form</button>
          </div>
        </form>
      </section>
    </>
  );
}
