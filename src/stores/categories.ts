import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category, CategoryCreate, CategoryWithProducts } from '@/types'
import { categoryService } from '@/services/categoryService'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const currentCategory = ref<CategoryWithProducts | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    isLoading.value = true
    error.value = null
    try {
      categories.value = await categoryService.getCategories()
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const fetchCategory = async (id: number) => {
    isLoading.value = true
    error.value = null
    try {
      currentCategory.value = await categoryService.getCategory(id)
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const createCategory = async (category: CategoryCreate) => {
    isLoading.value = true
    error.value = null
    try {
      const newCategory = await categoryService.createCategory(category)
      categories.value.push(newCategory)
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const addProductToCategory = async (categoryId: number, productId: number) => {
    isLoading.value = true
    error.value = null
    try {
      await categoryService.addProductToCategory(categoryId, productId)
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    categories,
    currentCategory,
    isLoading,
    error,
    fetchCategories,
    fetchCategory,
    createCategory,
    addProductToCategory,
  }
}) 