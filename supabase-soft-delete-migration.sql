-- Run this once in the Supabase SQL Editor before publishing the website update.
-- A timestamp archives an invoice without permanently removing it.
alter table public.sales_orders
add column if not exists deleted_at timestamptz;
