import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types'
import { useSalesStore } from './sales'

export interface CartItem {
  product: Product
  quantity: number
}

export type PaymentMethod = 'cash' | 'card' | 'mobile'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const selectedPaymentMethod = ref<PaymentMethod>('cash')

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalAmount = computed(() => {
    return items.value.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  })

  const isEmpty = computed(() => items.value.length === 0)

  const isItemInCart = (productId: number) => {
    return computed(() => items.value.some((item) => item.product.id === productId))
  }

  const addItem = (product: Product) => {
    const existingItem = items.value.find(
      (item) => item.product.id === product.id
    )
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  const removeItem = (productId: number) => {
    items.value = items.value.filter((item) => item.product.id !== productId)
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find((item) => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const setPaymentMethod = (method: PaymentMethod) => {
    selectedPaymentMethod.value = method
  }

  const checkout = async () => {
    if (isEmpty.value) return

    const salesStore = useSalesStore()

    const saleCreate = {
      items: items.value.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
      payment_method: selectedPaymentMethod.value,
    }

    try {
      const newSale = await salesStore.createSale(saleCreate)
      clearCart()
      return newSale
    } catch (error) {
      console.error('Failed to create sale:', error)
      // Optionally, you can show an error message to the user
      throw error
    }
  }

  return {
    items,
    selectedPaymentMethod,
    itemCount,
    totalAmount,
    isEmpty,
    isItemInCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setPaymentMethod,
    checkout,
  }
}) 