import type { Category } from './category'

export interface Product {
  id: number
  name: string
  price: number
  categories: Category[]
}

export interface ProductCreate {
  name: string
  price: number
  category_ids: number[]
} 