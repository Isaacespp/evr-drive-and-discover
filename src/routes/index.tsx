import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, CalendarCheck, MessageCircle } from "lucide-react";
import hero from "@/assets/hero-car.jpg";
import { cars, whatsappLink, INSTAGRAM_HANDLE } from "@/data/cars";
import { CarCard, InstagramFollow } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EVR CAR Multimarcas | Seminovos selecionados" },
      { name: "description", content: "Conheça o estoque da EVR CAR, agende seu test drive e fale com um atendente pelo WhatsApp." },
      { property: "og:title", content: "EVR CAR Multimarcas" },
      { property: "og:description", content: "Seminovos selecionados, test drive agendado e atendimento pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Sedan preto iluminado em âmbar" width={1600} height={912}
          className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-36">
          <p className="stripes text-sm font-semibold uppercase tracking-[0.3em] text-primary">Multimarcas</p>
          <h1 className="mt-4 max-w-xl text-5xl font-bold leading-none sm:text-7xl">
            Seu próximo carro está na <span className="text-primary">EVR CAR</span>
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Seminovos revisados e com procedência. Escolha, agende um test drive e fale direto com a gente.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/estoque" className="bg-primary px-6 py-3 font-display font-bold uppercase text-primary-foreground skew-cut pr-9">
              Ver estoque
            </Link>
            <Link to="/test-drive" search={{ carro: undefined }} className="border border-primary px-6 py-3 font-display font-bold uppercase text-primary hover:bg-primary hover:text-primary-foreground">
              Agendar test drive
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-amber-band text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Procedência garantida", d: "Carros revisados e com laudo." },
            { icon: CalendarCheck, t: "Test drive fácil", d: "Agende em poucos cliques." },
            { icon: MessageCircle, t: "Atendimento rápido", d: "Fale conosco pelo WhatsApp." },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className="flex items-center gap-3">
              <I className="h-8 w-8 shrink-0" />
              <div>
                <p className="font-display font-bold uppercase">{t}</p>
                <p className="text-sm">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="stripes text-3xl font-bold">Destaques</h2>
          <Link to="/estoque" className="text-sm font-semibold uppercase text-primary">Ver todos →</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((c) => <CarCard key={c.id} car={c} />)}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="flex flex-col items-start gap-4 rounded-md border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Acompanhe a EVR CAR no Instagram</h2>
            <p className="text-muted-foreground">
              Carros chegando, novidades e bastidores da loja em @{INSTAGRAM_HANDLE}.
            </p>
          </div>
          <InstagramFollow />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="flex flex-col items-start gap-4 rounded-md border border-primary bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Dúvidas? Fale com um atendente</h2>
            <p className="text-muted-foreground">Respondemos pelo WhatsApp.</p>
          </div>
          <a href={whatsappLink("Olá, EVR CAR! Gostaria de mais informações.")} target="_blank" rel="noreferrer"
            className="rounded-md bg-whatsapp px-6 py-3 font-display font-bold uppercase text-primary-foreground">
            Chamar no WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
