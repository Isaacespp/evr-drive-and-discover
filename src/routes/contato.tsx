import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import { whatsappLink, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/cars";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | EVR CAR Multimarcas" },
      { name: "description", content: "Fale com um atendente da EVR CAR pelo WhatsApp e siga a loja no Instagram." },
      { property: "og:title", content: "Contato EVR CAR" },
      { property: "og:description", content: "Atendimento pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contato,
});

const topics = [
  "Quero saber sobre um carro do estoque",
  "Quero avaliar meu carro na troca",
  "Quero informações sobre financiamento",
  "Outro assunto",
];

function Contato() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="stripes text-4xl font-bold">Fale conosco</h1>
      <p className="mt-2 text-muted-foreground">Escolha o assunto e converse com um atendente no WhatsApp.</p>
      <div className="mt-8 grid gap-3">
        {topics.map((t) => (
          <a key={t} href={whatsappLink(`Olá, EVR CAR! ${t}.`)} target="_blank" rel="noreferrer"
            className="flex items-center justify-between rounded-md border border-border bg-card p-4 font-semibold hover:border-primary">
            {t}
            <MessageCircle className="h-5 w-5 text-whatsapp" />
          </a>
        ))}
      </div>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => window.__lovableEvents?.track?.("project.instagram_click", { placement: "contact" })}
        className="mt-3 flex items-center justify-between rounded-md border border-border bg-card p-4 font-semibold hover:border-primary"
      >
        <span className="flex items-center gap-3">
          <Instagram className="h-5 w-5 text-primary" />
          Seguir a EVR CAR no Instagram
        </span>
        <span className="text-sm text-muted-foreground">@{INSTAGRAM_HANDLE}</span>
      </a>
    </main>
  );
}
