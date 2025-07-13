import api from './api'
import type { Product, ProductCreate } from '@/types'

class ProductService {
  async getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/')
    return response.data
  }

  async createProduct(product: ProductCreate): Promise<Product> {
    const response = await api.post<Product>('/products/', product)
    return response.data
  }
}

export const productService = new ProductService() 