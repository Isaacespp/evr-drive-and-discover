import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import logo from "@/assets/evr-logo.png.asset.json";
import { whatsappLink, type Car, formatPrice, formatKm } from "@/data/cars";

export function Header() {
  const links = [
    { to: "/", label: "Início" },
    { to: "/estoque", label: "Estoque" },
    { to: "/test-drive", label: "Test Drive" },
    { to: "/contato", label: "Contato" },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo.url} alt="EVR CAR Multimarcas" className="h-11 w-11" />
          <span className="hidden font-display text-lg font-bold tracking-wider sm:inline">
            EVR <span className="text-primary">CAR</span>
          </span>
        </Link>
        <nav className="flex gap-3 overflow-x-auto text-xs font-semibold uppercase tracking-wide sm:gap-6 sm:text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="whitespace-nowrap text-muted-foreground hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="h-1.5 bg-amber-band" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center text-sm text-muted-foreground">
        <img src={logo.url} alt="" className="h-16 w-16" />
        <p className="font-display uppercase tracking-widest text-foreground">EVR CAR Multimarcas</p>
        <p>© {new Date().getFullYear()} EVR CAR. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Olá, EVR CAR! Gostaria de falar com um atendente.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-lg transition hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/estoque/$id"
      params={{ id: car.id }}
      className="group block overflow-hidden rounded-md border border-border bg-card transition hover:border-primary"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img src={car.image} alt={car.name} loading="lazy" width={1024} height={768}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-primary">{car.category} · {car.year}</p>
        <h3 className="mt-1 text-lg font-bold">{car.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{formatKm(car.km)} · {car.transmission} · {car.fuel}</p>
        <div className="mt-4 inline-block bg-primary px-4 py-1.5 font-display text-lg font-bold text-primary-foreground skew-cut pr-6">
          {formatPrice(car.price)}
        </div>
      </div>
    </Link>
  );
}
