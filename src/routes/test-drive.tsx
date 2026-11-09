import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { cars, whatsappLink } from "@/data/cars";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/test-drive")({
  validateSearch: (s: Record<string, unknown>): { carro?: string | undefined } => ({ carro: typeof s["carro"] === "string" ? s["carro"] : undefined }),
  head: () => ({
    meta: [
      { title: "Agendar Test Drive | EVR CAR" },
      { name: "description", content: "Agende seu test drive na EVR CAR Multimarcas." },
      { property: "og:title", content: "Agende seu Test Drive | EVR CAR" },
      { property: "og:description", content: "Escolha o carro, a data e o horário do seu test drive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestDrive,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  telefone: z.string().trim().min(8, "Informe um telefone válido").max(20),
  carro: z.string().min(1, "Escolha um carro"),
  data: z.string().min(1, "Escolha uma data"),
  horario: z.string().min(1, "Escolha um horário"),
});

function TestDrive() {
  const { carro } = Route.useSearch();
  const [err, setErr] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) return setErr(r.error.issues[0]?.message ?? "Verifique os dados");
    setErr("");
    const car = cars.find((c) => c.id === r.data.carro);
    const carName = `${car?.name ?? r.data.carro} ${car?.year ?? ""}`.trim();
    const [y, m, d] = r.data.data.split("-");
    const msg = `Olá, EVR CAR! Quero agendar um test drive.\nNome: ${r.data.nome}\nTelefone: ${r.data.telefone}\nCarro: ${carName}\nData: ${d}/${m}/${y}\nHorário: ${r.data.horario}`;
    window.open(whatsappLink(msg), "_blank");
    void supabase.from("test_drive_requests").insert({
      nome: r.data.nome, telefone: r.data.telefone, carro: carName, data: r.data.data, horario: r.data.horario,
    }).then(({ error }) => { if (error) console.error(error); });
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="stripes text-4xl font-bold">Test drive</h1>
      <p className="mt-2 text-muted-foreground">Preencha e envie: seu pedido chega ao nosso atendente pelo WhatsApp para confirmação.</p>
      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-md border border-border bg-card p-6">
        <label className="grid gap-1 text-sm">Nome<input name="nome" className="field" maxLength={100} /></label>
        <label className="grid gap-1 text-sm">Telefone<input name="telefone" type="tel" className="field" maxLength={20} /></label>
        <label className="grid gap-1 text-sm">Carro
          <select name="carro" defaultValue={carro ?? ""} className="field">
            <option value="">Selecione...</option>
            {cars.map((c) => <option key={c.id} value={c.id}>{c.name} {c.year}</option>)}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="grid gap-1 text-sm">Data<input name="data" type="date" min={today} className="field" /></label>
          <label className="grid gap-1 text-sm">Horário
            <select name="horario" className="field" defaultValue="">
              <option value="">--</option>
              {["09:00","10:00","11:00","14:00","15:00","16:00","17:00"].map((h) => <option key={h}>{h}</option>)}
            </select>
          </label>
        </div>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <button className="mt-2 bg-primary py-3 font-display font-bold uppercase text-primary-foreground">Enviar pelo WhatsApp</button>
      </form>
    </main>
  );
}
