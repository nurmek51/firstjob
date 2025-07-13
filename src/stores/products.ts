import { defineStore } from 'pinia'
import { ref} from 'vue'
import { productService } from '@/services/productService'
import type { Product } from '@/types'
import type { ProductCreate } from '@/types'

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    isLoading.value = true
    error.value = null
    try {
      products.value = await productService.getProducts()
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const createProduct = async (product: ProductCreate) => {
    isLoading.value = true
    error.value = null
    try {
      const newProduct = await productService.createProduct(product)
      products.value.push(newProduct)
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    createProduct,
  }
}) 