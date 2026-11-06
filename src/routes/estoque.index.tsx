import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cars } from "@/data/cars";
import { CarCard } from "@/components/site";

export const Route = createFileRoute("/estoque/")({
  head: () => ({
    meta: [
      { title: "Estoque | EVR CAR Multimarcas" },
      { name: "description", content: "Veja todos os carros disponíveis na loja EVR CAR." },
      { property: "og:title", content: "Estoque EVR CAR" },
      { property: "og:description", content: "Todos os seminovos disponíveis na EVR CAR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Estoque,
});

function Estoque() {
  const cats = ["Todos", ...Array.from(new Set(cars.map((c) => c.category)))];
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");
  const list = cars.filter(
    (c) => (cat === "Todos" || c.category === cat) && c.name.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="stripes text-4xl font-bold">Nosso estoque</h1>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input className="field sm:max-w-xs" placeholder="Buscar modelo..." value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-md border px-4 py-2 text-sm font-semibold uppercase ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => <CarCard key={c.id} car={c} />)}
      </div>
      {list.length === 0 && <p className="mt-8 text-muted-foreground">Nenhum carro encontrado.</p>}
    </main>
  );
}
