import type { Product } from './product'

export interface SaleItemBase {
  product_id: number
  quantity: number
}

export interface SaleItem extends SaleItemBase {
  id: number
  price: number
  product: Product
}

export interface Sale {
  id: number
  created_at: string
  total_amount: number
  payment_method: 'cash' | 'card' | 'mobile'
  items: SaleItem[]
}

export interface SaleCreate {
  items: SaleItemBase[]
  payment_method: 'cash' | 'card' | 'mobile'
} 