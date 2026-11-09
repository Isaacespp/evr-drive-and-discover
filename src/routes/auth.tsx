import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso administrativo | EVR CAR" },
      { name: "description", content: "Área restrita da equipe EVR CAR." },
      { property: "og:title", content: "Acesso administrativo | EVR CAR" },
      { property: "og:description", content: "Área restrita da equipe EVR CAR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email"));
    const password = String(f.get("password"));
    setBusy(true);
    setMsg("");
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMsg("E-mail ou senha incorretos.");
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email, password, options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) return setMsg(error.message);
      setMsg("Conta criada! Confirme pelo link enviado ao seu e-mail e depois entre.");
      setMode("login");
    }
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <h1 className="stripes text-3xl font-bold">{mode === "login" ? "Entrar" : "Criar conta"}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Área administrativa da EVR CAR.</p>
      <form onSubmit={submit} className="mt-6 grid gap-4 rounded-md border border-border bg-card p-6">
        <label className="grid gap-1 text-sm">E-mail<input name="email" type="email" required className="field" /></label>
        <label className="grid gap-1 text-sm">Senha<input name="password" type="password" minLength={6} required className="field" /></label>
        {msg && <p className="text-sm text-primary">{msg}</p>}
        <button disabled={busy} className="bg-primary py-3 font-display font-bold uppercase text-primary-foreground disabled:opacity-60">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </button>
      </form>
      <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")}
        className="mt-4 text-sm text-muted-foreground hover:text-primary">
        {mode === "login" ? "Primeiro acesso? Criar conta" : "Já tenho conta"}
      </button>
    </main>
  );
}
