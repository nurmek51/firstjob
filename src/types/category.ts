import type { Product } from './product'

export interface Category {
  id: number
  name: string
}

export interface CategoryCreate {
  name: string
}

export interface CategoryWithProducts extends Category {
  products: Product[]
}

export interface SelectedItems {
  count: number
  totalPrice: number
}

export interface CategoryItem {
  id: number
  categoryId: number
  name: string
  price: number
  unit: string
  quantity: number
} 