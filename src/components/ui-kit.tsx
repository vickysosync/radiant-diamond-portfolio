import { useState, type ReactNode, type ImgHTMLAttributes } from "react";
import { img as resolve, FALLBACK_IMAGE } from "@/lib/images";
import { useSite, useToasts } from "@/lib/store";

export function Img({ src, alt, className = "", ...rest }: Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? FALLBACK_IMAGE : resolve(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      {...rest}
    />
  );
}

export function DiamondMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <path d="M8 14 L14 6 H26 L32 14 L20 34 Z" stroke="currentColor" strokeWidth="1.2" className="text-gold" />
      <path d="M8 14 H32 M14 6 L17 14 L20 34 L23 14 L26 6 M17 14 L20 6 L23 14" stroke="currentColor" strokeWidth="0.8" className="text-gold" opacity="0.8" />
    </svg>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  const { settings, company } = useSite();
  const parts = company.name.split(" ");
  const main = parts.slice(0, -1).join(" ") || company.name;
  const tail = parts.length > 1 ? parts[parts.length - 1] : "";
  return (
    <span className="flex items-center gap-3">
      {settings.logo ? <Img src={settings.logo} alt={`${company.name} logo`} className="h-9 w-9 object-contain" /> : <DiamondMark className="h-9 w-9" />}
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl tracking-wide ${light ? "text-pearl" : "text-navy"}`}>{main}</span>
        {tail && <span className="mt-1 text-[0.6rem] tracking-[0.45em] text-gold">{tail}</span>}
      </span>
    </span>
  );
}

export function SectionTitle({ eyebrow, title, children, light = false, center = false }: { eyebrow?: string; title: string; children?: ReactNode; light?: boolean; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className={`text-4xl md:text-5xl leading-tight ${light ? "text-pearl" : "text-navy"}`}>{title}</h2>
      <span className={`gold-rule mt-6 ${center ? "mx-auto" : ""}`} />
      {children && <div className={`mt-6 text-base leading-relaxed ${light ? "text-platinum/80" : "text-muted-foreground"}`}>{children}</div>}
    </div>
  );
}

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text?: string; image: string }) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink">
      <Img src={image} alt="" loading="eager" className="absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute inset-0 hero-shade" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40 md:px-10">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="max-w-3xl text-5xl leading-[1.05] text-pearl md:text-7xl">{title}</h1>
        {text && <p className="mt-6 max-w-xl text-platinum/80">{text}</p>}
      </div>
    </section>
  );
}

export function SampleNote({ children }: { children: ReactNode }) {
  return <p className="inline-flex items-center gap-2 border border-gold/40 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-gold">{children}</p>;
}

export function Toaster() {
  const toasts = useToasts();
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`page-in pointer-events-auto border-l-2 bg-ink px-5 py-3 text-sm text-pearl shadow-xl ${t.kind === "error" ? "border-destructive" : "border-gold"}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
