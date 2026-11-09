import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Pedidos de test drive | EVR CAR" },
      { name: "description", content: "Consulta dos pedidos de test drive enviados pelo site." },
      { property: "og:title", content: "Pedidos de test drive | EVR CAR" },
      { property: "og:description", content: "Painel administrativo da EVR CAR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type Req = Tables<"test_drive_requests">;

function Admin() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Req[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  async function load() {
    const { data: u } = await supabase.auth.getUser();
    const { data: ok } = await supabase.rpc("has_role", { _user_id: u.user!.id, _role: "admin" });
    setIsAdmin(!!ok);
    if (!ok) return;
    const { data } = await supabase.from("test_drive_requests").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }
  useEffect(() => { void load(); }, []);

  async function remove(id: string) {
    if (!confirm("Excluir este pedido?")) return;
    await supabase.from("test_drive_requests").delete().eq("id", id);
    void load();
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const fmt = (d: string) => d.split("-").reverse().join("/");

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="stripes text-3xl font-bold">Pedidos de test drive</h1>
        <button onClick={signOut} className="text-sm text-muted-foreground hover:text-primary">Sair</button>
      </div>
      {isAdmin === false && <p className="mt-8 text-muted-foreground">Sua conta não tem acesso à área administrativa.</p>}
      {isAdmin && rows === null && <p className="mt-8 text-muted-foreground">Carregando...</p>}
      {rows?.length === 0 && <p className="mt-8 text-muted-foreground">Nenhum pedido ainda.</p>}
      <div className="mt-8 grid gap-3">
        {rows?.map((r) => (
          <div key={r.id} className="grid gap-1 rounded-md border border-border bg-card p-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="font-bold">{r.nome} · <a href={`tel:${r.telefone}`} className="text-primary">{r.telefone}</a></p>
              <p className="text-sm text-muted-foreground">{r.carro} — {fmt(r.data)} às {r.horario}</p>
              <p className="text-xs text-muted-foreground">Enviado em {new Date(r.created_at).toLocaleString("pt-BR")}</p>
            </div>
            <button onClick={() => remove(r.id)} className="justify-self-start text-sm text-destructive hover:underline sm:justify-self-end">Excluir</button>
          </div>
        ))}
      </div>
    </main>
  );
}
