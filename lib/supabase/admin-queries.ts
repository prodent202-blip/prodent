import { createAdminClient } from '@/lib/supabase/admin'
import type { Catalog, Category, Product } from '@/lib/types/catalog'

export async function getAllCategories(): Promise<(Category & { catalog: Catalog })[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*, catalog:catalogs(*)')
    .order('name')

  if (error) throw error
  return (data ?? []) as (Category & { catalog: Catalog })[]
}

export async function getAllProducts(): Promise<
  (Product & { category: Category; catalog: Catalog })[]
> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), catalog:catalogs(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as (Product & { category: Category; catalog: Catalog })[]
}

export async function getAllCatalogsAdmin(): Promise<Catalog[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('catalogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getAllSiteSettings(): Promise<{ key: string; value: string }[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase.from('site_settings').select('*')

  if (error) throw error
  return data ?? []
}
