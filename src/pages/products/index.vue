<template>
  <div class="products-page">
    <!-- Header -->
    <div class="header">
      <div class="header-content top-[10px]">
        <button class="back-button" @click="handleBackClick" aria-label="Назад">
          <img src="@/assets/icons/arrow_back.svg" alt="" class="back-icon" />
        </button>
        <h1 class="header-title">{{ headerTitle }}</h1>
      </div>
    </div>
    <div class="header-divider"></div>

    <!-- Search Input -->
    <div class="search-container">
      <div class="search-input">
        <img src="@/assets/icons/search.svg" alt="Search" class="search-icon" />
        <input type="text" placeholder="Поиск" class="search-field" v-model="searchQuery" />
      </div>
    </div>

    <!-- Selected Items Summary -->
    <div class="summary-section">
      <div class="summary-content">
        <span class="summary-text">
          Выбрано
          <span class="selected-count-highlight">{{ selectedCount }} товаров</span>
        </span>
        <span class="summary-total">{{ formatPrice(totalPrice) }}</span>
      </div>
      <div class="summary-divider"></div>
    </div>

    <!-- Products List -->
    <div class="products-list">
      <div v-if="isLoading" class="loading-spinner"></div>
      <TransitionGroup v-else name="products-list" tag="div">
        <ProductItem
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :is-selected="isProductSelected(product.id)"
          :quantity="getProductQuantity(product.id)"
          @update:quantity="updateQuantity(product, $event)"
          @delete="deleteProduct(product)"
          @select="selectProduct(product)"
          @sell="proceedToSingleCheckout(product)"
        />
      </TransitionGroup>

      <!-- No Results Message -->
      <div v-if="!isLoading && filteredProducts.length === 0 && searchQuery" class="no-results">
        <p class="no-results-text">Товары не найдены</p>
        <p class="no-results-hint">Попробуйте изменить поисковый запрос</p>
      </div>
    </div>

    <!-- Checkout Button -->
    <button 
      class="checkout-button" 
      :class="{ 'disabled': cartStore.isEmpty }"
      :disabled="cartStore.isEmpty"
      @click="proceedToCheckout"
    >
      <span>К оформлению</span>
      <img src="@/assets/icons/arrow_forward.svg" alt="" class="arrow-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ProductItem from '@/components/products/ProductItem.vue'
import { useProductStore } from '@/stores/products'
import { useCategoriesStore } from '@/stores/categories'
import { useCartStore } from '@/stores/cart'
import { debounce } from '@/utils/debounce'
import { formatPrice } from '@/utils/format'
import type { Product } from '@/types'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const categoriesStore = useCategoriesStore()
const cartStore = useCartStore()

const searchQuery = ref('')
const selectedProductId = ref<number | null>(null)

// Determine current categoryId from route (if any)
const categoryId = computed(() => {
  const id = Number(route.query.categoryId)
  return Number.isNaN(id) ? null : id
})

// Fetch data depending on presence of categoryId
const isLoading = computed(() => {
  return categoryId.value ? categoriesStore.isLoading : productStore.isLoading
})

const headerTitle = computed(() => {
  if (categoryId.value) {
    return categoriesStore.currentCategory?.name ?? '...'
  }
  return 'Овощи и фрукты'
})

const products = computed(() => {
  if (categoryId.value) {
    return categoriesStore.currentCategory?.products ?? []
  }
  return productStore.products
})

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return products.value
  }
  const query = searchQuery.value.toLowerCase().trim()
  return products.value.filter(product =>
    product.name.toLowerCase().includes(query)
  )
})

const isProductSelected = (productId: number) => {
  return selectedProductId.value === productId
}

const getProductQuantity = (productId: number) => {
  const item = cartStore.items.find(item => item.product.id === productId)
  return item ? item.quantity : 0
}

const selectedCount = computed(() => cartStore.itemCount)
const totalPrice = computed(() => cartStore.totalAmount)

const debouncedSearch = debounce(() => {
  // The filtering is already handled by the computed property
}, 300)

watch(searchQuery, debouncedSearch)

const handleBackClick = () => {
  router.push('/categories')
}

const updateQuantity = (product: Product, quantity: number) => {
  if (quantity <= 0) {
    cartStore.removeItem(product.id)
    if (selectedProductId.value === product.id) {
      selectedProductId.value = null
    }
    return
  }

  const currentQty = getProductQuantity(product.id)
  if (currentQty === 0) {
    // Item is not in cart, add first then set correct quantity
    cartStore.addItem(product)
  }
  cartStore.updateQuantity(product.id, quantity)
}

const deleteProduct = (product: Product) => {
  cartStore.removeItem(product.id)
  if (selectedProductId.value === product.id) {
    selectedProductId.value = null
  }
}

const selectProduct = (product: Product) => {
  selectedProductId.value = product.id
  if (getProductQuantity(product.id) === 0) {
    cartStore.addItem(product)
  }
}

const proceedToCheckout = () => {
  if (cartStore.isEmpty) return
  router.push({ name: 'checkout' })
}

const proceedToSingleCheckout = (product: Product) => {
  if (getProductQuantity(product.id) === 0) {
    cartStore.addItem(product)
  }
  router.push('/checkout')
}

onMounted(() => {
  if (categoryId.value) {
    categoriesStore.fetchCategory(categoryId.value)
  } else {
    productStore.fetchProducts()
  }
})

// If route param changes dynamically, refetch
watch(categoryId, (newVal) => {
  if (newVal) {
    categoriesStore.fetchCategory(newVal)
  } else {
    productStore.fetchProducts()
  }
})
</script>

<style scoped>
.products-page {
  width: 394px;
  max-width: 394px;
  margin: 0 auto;
  background: #FFFFFF;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
}

/* Header */
.header {
  position: absolute;
  width: 394px;
  height: 47.62px;
  left: 0px;
  top: 60px; /* increased for safe-area / pixel-perfect spacing */
  background: #FFFFFF;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 17px;
  position: relative;
}

/* Back Button (larger interaction zone) */
.back-button {
  position: absolute;
  left: 8px; /* a bit of padding from the edge */
  top: 50%;
  transform: translateY(-50%);
  width: 48px; /* Increased for better touch target */
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2; /* Ensure it is above title overlay */
}

.back-button:focus-visible {
  outline: 2px solid #15BAAA;
  outline-offset: 2px;
}

/* Larger clickable area, icon itself remains smaller */
.back-icon {
  width: 26px;
  height: 26px;
  pointer-events: none; /* ensures the click is registered on the button, not the image */
}

/* Disable pointer events on the title so it doesn't block clicks */
.header-title {
  font-family: 'Mabry Pro', sans-serif;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #000000;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  margin: 0;
  pointer-events: none;
}

.header-divider {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: #DFDFDF;
  z-index: 99;
  top: 128.62px; /* 60px (header top) + 47.62px + 21px */
}

/* Summary Section */
.summary-section {
  position: absolute;
  width: 394px;
  height: 35px;
  left: 0px;
  top: 144.62px; /* 128.62px (divider) + 1px + 15px */
  background: #FFFFFF;
  z-index: 98;
}

.summary-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 17px;
  height: 20px;
}

.summary-text,
.summary-total {
  font-family: 'Mabry Pro', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
}

.summary-text {
  color: rgba(0, 0, 0, 0.54);
}

.selected-count-highlight {
  color: #15BAAA;
  border-bottom: 1px solid #15BAAA;
  padding-bottom: 1px;
}

.summary-total {
  color: rgba(0, 0, 0, 0.87);
}

.summary-divider {
  width: 100%;
  height: 1px;
  background: #DFDFDF;
  position: absolute;
  left: 0;
  bottom: 0;
}

/* Search Input */
.search-container {
  position: absolute;
  width: 354px;
  height: 52px;
  left: 19px;
  top: 204.62px; /* 144.62px + 35px + 25px */
  background: #FFFFFF;
  z-index: 99;
}

.search-input {
  height: 52px;
  background: #F2F2F2;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 16px 0 45px; /* icon width (25px) + 6px gap + 4px fudge */
  position: relative;
}

.search-icon {
  width: 25px;
  height: 25px;
  position: absolute;
  left: 9.56px;
  top: 50%;
  transform: translateY(-52%); /* slightly above center for 1.5px offset */
  opacity: 0.54;
}

.search-field {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: 'Mabry Pro', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.87);
  padding-left: 0; /* already handled by .search-input */
}

.search-field::placeholder {
  color: rgba(0, 0, 0, 0.32);
}

/* Products List */
.products-list {
  position: absolute;
  top: 281.62px; /* 204.62px + 52px + 25px */
  left: 0;
  right: 0;
  padding: 0 18px 186px; /* increased bottom padding: 55px (button) + 47px (bottom offset) + 16px buffer */
  overflow-y: auto;
  max-width: 394px;
  margin: 0 auto;
  height: calc(100vh - 208px);
}

/* Checkout Button */
.checkout-button {
  position: fixed;
  bottom: 47px;
  left: 50%;
  transform: translateX(-50%);
  width: 354px;
  height: 55px;
  background: #15BAAA;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4.36px;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 101;
  transition: all 0.3s ease;
}

.checkout-button.disabled,
.checkout-button:disabled {
  background: #F2F2F2;
  cursor: not-allowed;
  box-shadow: none;
}

.checkout-button span {
  font-family: 'Mabry Pro', sans-serif;
  font-weight: 500;
  font-size: 19px;
  line-height: 19px;
  color: #FFFFFF;
  transition: color 0.3s ease;
}

.checkout-button.disabled span,
.checkout-button:disabled span {
  color: rgba(0, 0, 0, 0.38);
}

.arrow-icon {
  width: 20px;
  height: 20px;
  transition: opacity 0.3s ease;
}

.checkout-button.disabled .arrow-icon,
.checkout-button:disabled .arrow-icon {
  opacity: 0.38;
}

/* Transition animations for products list */
.products-list-enter-active,
.products-list-leave-active {
  transition: all 0.3s ease;
}

.products-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.products-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.products-list-move {
  transition: transform 0.3s ease;
}

/* No results message */
.no-results {
  text-align: center;
  padding: 40px 20px;
  color: rgba(0, 0, 0, 0.54);
}

.no-results-text {
  font-family: 'Mabry Pro', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.87);
  margin: 0 0 8px 0;
}

.no-results-hint {
  font-family: 'Mabry Pro', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.54);
  margin: 0;
}

/* Directional animations for product expansion */
.animate-down {
  animation: expandDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-up {
  animation: expandUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes expandDown {
  from {
    transform: translateY(-10px);
    opacity: 0.8;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes expandUp {
  from {
    transform: translateY(10px);
    opacity: 0.8;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style> 