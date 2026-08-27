alter table public.audit_log add column if not exists user_id uuid;

drop policy if exists "Demo access" on public.customers;
drop policy if exists "Demo access" on public.admin_staff;
drop policy if exists "Demo access" on public.orders;
drop policy if exists "Demo access" on public.deliveries;
drop policy if exists "Demo access" on public.audit_log;

create policy "Users manage own customers" on public.customers
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own staff" on public.admin_staff
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own orders" on public.orders
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own deliveries" on public.deliveries
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users read own audit log" on public.audit_log
  for select to authenticated using (auth.uid() = user_id);
create policy "Users create own audit log" on public.audit_log
  for insert to authenticated with check (auth.uid() = user_id);

alter table public.orders drop constraint if exists orders_order_number_key;
create unique index if not exists orders_user_order_number_idx
  on public.orders(user_id, order_number) where user_id is not null;

create index if not exists customers_user_id_idx on public.customers(user_id);
create index if not exists admin_staff_user_id_idx on public.admin_staff(user_id);
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists deliveries_user_id_idx on public.deliveries(user_id);
create index if not exists audit_log_user_id_idx on public.audit_log(user_id);
