import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./ui-kit";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Our Products" },
  { to: "/expertise", label: "Our Expertise" },
  { to: "/process", label: "Our Process" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "border-b border-gold/20 bg-ink/95 backdrop-blur" : "bg-transparent"}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all md:px-10 ${scrolled ? "py-3" : "py-6"}`}>
        <Link to="/" aria-label="Radiant Diamond LLP home"><Logo /></Link>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="relative py-2 text-[0.72rem] uppercase tracking-[0.18em] text-platinum/80 transition-colors hover:text-gold data-[status=active]:text-gold">
              {({ isActive }) => (<>{n.label}{isActive && <span className="absolute -bottom-0.5 left-0 h-px w-full bg-gold" />}</>)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/contact" className="btn btn-gold hidden sm:inline-flex !py-2.5">Get in Touch</Link>
          <button className="text-pearl xl:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="page-in border-t border-gold/20 px-6 pb-8 pt-4 xl:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="block border-b border-pearl/10 py-4 font-display text-2xl text-pearl data-[status=active]:text-gold">{n.label}</Link>
          ))}
          <Link to="/contact" className="btn btn-gold mt-6 w-full">Get in Touch</Link>
        </nav>
      )}
    </header>
  );
}
