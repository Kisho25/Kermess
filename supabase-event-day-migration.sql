-- Run once in the Supabase SQL Editor before publishing website version 23.
begin;

alter table public.sales_orders
  add column if not exists event_day date;

-- All invoices created before this feature are from Saturday's event.
update public.sales_orders
set event_day = date '2026-09-12'
where event_day is null;

alter table public.sales_orders
  alter column event_day set default ((now() at time zone 'Asia/Beirut')::date),
  alter column event_day set not null;

create index if not exists sales_orders_event_day_idx
  on public.sales_orders (event_day);

commit;
