import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { cars, formatKm, formatPrice, whatsappLink } from "@/data/cars";

export const Route = createFileRoute("/estoque/$id")({
  loader: ({ params }) => {
    const car = cars.find((c) => c.id === params.id);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.car.name} ${loaderData.car.year} | EVR CAR` },
          { name: "description", content: loaderData.car.description },
          { property: "og:title", content: `${loaderData.car.name} | EVR CAR` },
          { property: "og:description", content: loaderData.car.description },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Carro indisponível | EVR CAR" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <main className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Carro não encontrado</h1>
      <Link to="/estoque" className="mt-4 inline-block text-primary">Voltar ao estoque</Link>
    </main>
  ),
  component: CarPage,
});

function CarPage() {
  const { car } = Route.useLoaderData();
  const specs = [
    ["Ano", car.year], ["Quilometragem", formatKm(car.km)], ["Câmbio", car.transmission],
    ["Combustível", car.fuel], ["Cor", car.color], ["Categoria", car.category],
  ];
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/estoque" className="text-sm text-muted-foreground hover:text-primary">← Voltar ao estoque</Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <img src={car.image} alt={car.name} width={1024} height={768} className="w-full rounded-md border border-border object-cover" />
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">{car.category}</p>
          <h1 className="mt-1 text-4xl font-bold">{car.name}</h1>
          <div className="mt-4 inline-block bg-primary px-5 py-2 font-display text-3xl font-bold text-primary-foreground skew-cut pr-8">
            {formatPrice(car.price)}
          </div>
          <p className="mt-5 text-muted-foreground">{car.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {specs.map(([k, v]) => (
              <div key={k} className="rounded-md border border-border bg-card p-3">
                <dt className="text-xs uppercase text-muted-foreground">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-6 text-lg font-bold">Itens</h2>
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            {car.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{f}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/test-drive" search={{ carro: car.id }} className="bg-primary px-6 py-3 font-display font-bold uppercase text-primary-foreground skew-cut pr-9">
              Agendar test drive
            </Link>
            <a href={whatsappLink(`Olá, EVR CAR! Tenho interesse no ${car.name} ${car.year} (${formatPrice(car.price)}).`)}
              target="_blank" rel="noreferrer"
              className="rounded-md bg-whatsapp px-6 py-3 font-display font-bold uppercase text-primary-foreground">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
