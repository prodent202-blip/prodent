-- Prodent catalog schema

create table if not exists catalogs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  catalog_id uuid not null references catalogs(id) on delete cascade,
  name text not null,
  slug text not null,
  created_at timestamptz not null default now(),
  unique (catalog_id, slug)
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  catalog_id uuid not null references catalogs(id) on delete cascade,
  category_id uuid not null references categories(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  image_url text,
  created_at timestamptz not null default now(),
  unique (category_id, slug)
);

create table if not exists site_settings (
  key text primary key,
  value text not null
);

-- Default map embed for Grand Baie, Mauritius
insert into site_settings (key, value)
values (
  'map_embed_url',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14958.0!2d57.5806!3d-20.0134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c6f0e0e0e0e0e%3A0x0!2sGrand%20Baie%2C%20Mauritius!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s'
)
on conflict (key) do nothing;

-- Row Level Security: public read-only
alter table catalogs enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table site_settings enable row level security;

create policy "Public read catalogs" on catalogs for select using (true);
create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (true);
create policy "Public read site_settings" on site_settings for select using (true);

-- Storage bucket (run in Supabase dashboard or via API):
-- Create bucket "product-images" with public access for reads.
