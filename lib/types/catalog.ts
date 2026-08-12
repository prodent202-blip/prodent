export type Catalog = {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export type Category = {
  id: string
  catalog_id: string
  name: string
  slug: string
  created_at: string
}

export type Product = {
  id: string
  catalog_id: string
  category_id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  created_at: string
}

export type SiteSetting = {
  key: string
  value: string
}

export type CatalogWithCounts = Catalog & {
  category_count?: number
  product_count?: number
}

export type CategoryWithCatalog = Category & {
  catalog?: Pick<Catalog, 'id' | 'name' | 'slug'>
}

export type ProductWithRelations = Product & {
  category?: Pick<Category, 'id' | 'name' | 'slug'>
  catalog?: Pick<Catalog, 'id' | 'name' | 'slug'>
}

export const DEFAULT_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14958.0!2d57.5806!3d-20.0134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c6f0e0e0e0e0e%3A0x0!2sGrand%20Baie%2C%20Mauritius!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s'
