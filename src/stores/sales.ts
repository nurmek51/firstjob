import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Sale, SaleCreate } from '@/types'
import { salesService } from '@/services/salesService'

export const useSalesStore = defineStore('sales', () => {
  const sales = ref<Sale[]>([])
  const currentSale = ref<Sale | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const limit = ref(6)
  const hasMoreSales = ref(true)

  const canLoadMore = computed(() => hasMoreSales.value && !isLoading.value)

  const fetchSales = async (reset: boolean = false) => {
    isLoading.value = true
    error.value = null

    if (reset) {
      sales.value = []
      currentPage.value = 1
      hasMoreSales.value = true
    }

    try {
      const newSales = await salesService.getSales(
        limit.value,
        (currentPage.value - 1) * limit.value
      )
      if (newSales.length < limit.value) {
        hasMoreSales.value = false
      }
      sales.value.push(...newSales)
      currentPage.value++
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const fetchSale = async (id: number) => {
    isLoading.value = true
    error.value = null
    try {
      currentSale.value = await salesService.getSale(id)
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const createSale = async (sale: SaleCreate) => {
    isLoading.value = true
    error.value = null
    try {
      const newSale = await salesService.createSale(sale)
      currentSale.value = newSale
      sales.value.unshift(newSale)
      return newSale
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return {
    sales,
    currentSale,
    isLoading,
    error,
    canLoadMore,
    fetchSales,
    fetchSale,
    createSale,
  }
}) 