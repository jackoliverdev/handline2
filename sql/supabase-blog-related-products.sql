-- Add related product references to blog_posts
-- Run this in Supabase SQL editor

alter table if exists blog_posts
  add column if not exists related_product_id_1 uuid null references products(id) on delete set null,
  add column if not exists related_product_id_2 uuid null references products(id) on delete set null,
  add column if not exists related_product_id_3 uuid null references products(id) on delete set null,
  add column if not exists related_product_id_4 uuid null references products(id) on delete set null;

-- Helpful index for joins/lookups
create index if not exists blog_posts_related_product_id_1_idx on blog_posts(related_product_id_1);
create index if not exists blog_posts_related_product_id_2_idx on blog_posts(related_product_id_2);
create index if not exists blog_posts_related_product_id_3_idx on blog_posts(related_product_id_3);
create index if not exists blog_posts_related_product_id_4_idx on blog_posts(related_product_id_4);
