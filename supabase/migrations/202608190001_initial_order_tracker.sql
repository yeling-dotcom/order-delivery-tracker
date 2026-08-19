create extension if not exists pgcrypto;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  address text,
  user_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  role text not null default 'admin',
  user_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid not null references public.customers(id),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'partial', 'paid')),
  total_amount numeric(12, 2) not null default 0 check (total_amount >= 0),
  assigned_admin_id uuid references public.admin_staff(id),
  notes text,
  priority_score numeric not null default 0,
  priority_source text not null default 'rule_engine',
  priority_confidence numeric not null default 1,
  priority_review_status text not null default 'unreviewed',
  user_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.deliveries (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  scheduled_date date not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'out_for_delivery', 'delivered', 'failed', 'missed')),
  delivered_date timestamptz,
  notes text,
  user_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  action_type text not null,
  actor text not null default 'demo_user',
  target_type text not null,
  target_id uuid not null,
  before_state jsonb,
  after_state jsonb,
  approved_by text,
  timestamp timestamptz not null default now()
);

create index if not exists orders_customer_id_idx on public.orders(customer_id);
create index if not exists orders_assigned_admin_id_idx on public.orders(assigned_admin_id);
create index if not exists deliveries_scheduled_date_idx on public.deliveries(scheduled_date);

alter table public.customers enable row level security;
alter table public.admin_staff enable row level security;
alter table public.orders enable row level security;
alter table public.deliveries enable row level security;
alter table public.audit_log enable row level security;

do $$
declare table_name text;
begin
  foreach table_name in array array['customers', 'admin_staff', 'orders', 'deliveries', 'audit_log']
  loop
    execute format('drop policy if exists "Demo access" on public.%I', table_name);
    execute format('create policy "Demo access" on public.%I for all to anon, authenticated using (true) with check (true)', table_name);
  end loop;
end $$;

insert into public.admin_staff (id, name, email, phone)
values
  ('10000000-0000-0000-0000-000000000001', 'Aisha Rahman', 'aisha@example.com', '+60 12-345 6789'),
  ('10000000-0000-0000-0000-000000000002', 'Daniel Tan', 'daniel@example.com', '+60 17-222 4455')
on conflict (id) do nothing;

insert into public.customers (id, name, phone, email, address)
values
  ('20000000-0000-0000-0000-000000000001', 'Nora Lee', '+60 19-555 0182', 'nora@example.com', '18 Jalan Damai, Kuala Lumpur'),
  ('20000000-0000-0000-0000-000000000002', 'Hafiz Omar', '+60 16-880 1337', 'hafiz@example.com', '42 Persiaran Mutiara, Shah Alam'),
  ('20000000-0000-0000-0000-000000000003', 'Mei Wong', '+60 12-901 7742', 'mei@example.com', '7 Jalan Setia, Petaling Jaya')
on conflict (id) do nothing;

insert into public.orders (id, order_number, customer_id, status, payment_status, total_amount, assigned_admin_id, notes)
values
  ('30000000-0000-0000-0000-000000000001', 'ORD-1042', '20000000-0000-0000-0000-000000000001', 'confirmed', 'partial', 680, '10000000-0000-0000-0000-000000000001', '12 custom gift boxes; call before arrival.'),
  ('30000000-0000-0000-0000-000000000002', 'ORD-1043', '20000000-0000-0000-0000-000000000002', 'in_progress', 'unpaid', 420, '10000000-0000-0000-0000-000000000002', 'Office stationery bundle.'),
  ('30000000-0000-0000-0000-000000000003', 'ORD-1044', '20000000-0000-0000-0000-000000000003', 'completed', 'unpaid', 950, '10000000-0000-0000-0000-000000000001', 'Event display materials.')
on conflict (id) do nothing;

insert into public.deliveries (id, order_id, scheduled_date, status, notes)
values
  ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', current_date - 3, 'scheduled', 'Reception desk, level 2.'),
  ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', current_date - 1, 'out_for_delivery', 'Driver has customer contact.'),
  ('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000003', current_date - 5, 'delivered', 'Delivered to customer.')
on conflict (id) do nothing;
