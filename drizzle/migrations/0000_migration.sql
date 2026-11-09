create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- First account created becomes the store admin
create or replace function public.assign_first_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users
for each row execute function public.assign_first_admin();

create table public.test_drive_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null check (char_length(nome) between 2 and 100),
  telefone text not null check (char_length(telefone) between 8 and 20),
  carro text not null check (char_length(carro) <= 150),
  data date not null,
  horario text not null check (char_length(horario) <= 10)
);
grant insert on public.test_drive_requests to anon, authenticated;
grant select, delete on public.test_drive_requests to authenticated;
grant all on public.test_drive_requests to service_role;
alter table public.test_drive_requests enable row level security;
create policy "Anyone can submit" on public.test_drive_requests for insert to anon, authenticated with check (true);
create policy "Admins read" on public.test_drive_requests for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete" on public.test_drive_requests for delete to authenticated using (public.has_role(auth.uid(), 'admin'));