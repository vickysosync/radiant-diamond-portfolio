import { Link } from "@tanstack/react-router";
import { useSite } from "@/lib/store";
import { Logo } from "./ui-kit";

export function SiteFooter() {
  const { company, settings } = useSite();
  const socials = [
    ["LinkedIn", settings.linkedin], ["Instagram", settings.instagram], ["Facebook", settings.facebook], ["X", settings.twitter],
  ].filter(([, u]) => u);
  const links = [
    ["/", "Home"], ["/about", "About Us"], ["/products", "Our Products"], ["/expertise", "Our Expertise"], ["/gallery", "Gallery"], ["/company-details", "Company Details"], ["/contact", "Contact Us"],
  ] as const;
  return (
    <footer className="bg-ink text-platinum/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-6 text-sm leading-relaxed">{settings.footerText}</p>
          {socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {socials.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest hover:text-gold">{n}</a>)}
            </div>
          )}
        </div>
        <div>
          <h3 className="eyebrow mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {links.map(([to, l]) => <li key={to}><Link to={to} className="hover:text-gold">{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-6">Business Information</h3>
          <ul className="space-y-3 text-sm">
            <li>{company.category}</li>
            <li>{company.contactPerson}</li>
            <li>Mumbai, Maharashtra</li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-6">Contact</h3>
          <address className="text-sm not-italic leading-relaxed">{company.office}</address>
          {company.phone && <p className="mt-3 text-sm"><a href={`tel:${company.phone}`} className="hover:text-gold">{company.phone}</a></p>}
          {company.email && <p className="mt-1 text-sm"><a href={`mailto:${company.email}`} className="hover:text-gold">{company.email}</a></p>}
        </div>
      </div>
      <div className="border-t border-pearl/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs md:flex-row md:px-10">
          <p>© 2026 Radiant Diamond LLP. All Rights Reserved.</p>
          <p>Designed and development by SOSynch Ai Tech</p>
          <Link to="/admin/login" className="text-stone/50 hover:text-gold">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
