import api from './api'
import type { Category, CategoryCreate, CategoryWithProducts } from '@/types'

class CategoryService {
  async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>('/categories/')
    return response.data
  }

  async getCategory(categoryId: number): Promise<CategoryWithProducts> {
    const response = await api.get<CategoryWithProducts>(`/categories/${categoryId}`)
    return response.data
  }

  async createCategory(category: CategoryCreate): Promise<Category> {
    const response = await api.post<Category>('/categories/', category)
    return response.data
  }

  async addProductToCategory(categoryId: number, productId: number): Promise<void> {
    await api.post(`/categories/${categoryId}/products/${productId}`)
  }
}

export const categoryService = new CategoryService() 