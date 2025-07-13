<template>
  <div class="categories-page">
    <!-- Header -->
    <header class="header">
      <div class="header-background"></div>
      <h1 class="header-title">Выберите товары</h1>
      <button class="close-button" @click="handleClose">
        <img src="@/assets/icons/close_icon.svg" alt="Close" />
      </button>
    </header>

    <!-- Categories List -->
    <div class="categories-list">
      <div v-if="isLoading" class="loading-state">
        <span>Загрузка...</span>
      </div>
      <div
        v-else
        v-for="category in categories"
        :key="category.id"
        class="category-item"
        @click="handleCategoryClick(category)"
      >
        <div class="category-content">
          <div class="category-icon-wrapper">
            <img src="@/assets/icons/chef_hat.svg" alt="Category" class="category-icon" />
          </div>
          <span class="category-name">{{ category.name }}</span>
        </div>
        <img src="@/assets/icons/arrow_forward_ios.svg" alt="Forward" class="arrow-icon" />
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="bottom-section">
      <div class="bottom-content">
        <div class="selection-info">
          <span class="selection-count">
            Выбрано <span class="selected-count-highlight">{{ selectedCount }} товаров </span>
          </span>
          <span class="selection-total">{{ formatPrice(totalPrice) }}</span>
        </div>
        <button class="checkout-button" @click="handleCheckout" :disabled="cartStore.isEmpty">
          <span>К оформлению</span>
          <img src="@/assets/icons/arrow_forward.svg" alt="Forward" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories'
import { useCartStore } from '@/stores/cart'
import type { Category } from '@/types'
import { formatPrice } from '@/utils/format'

const router = useRouter()
const categoriesStore = useCategoriesStore()
const cartStore = useCartStore()

const categories = computed(() => categoriesStore.categories)
const isLoading = computed(() => categoriesStore.isLoading)
const selectedCount = computed(() => cartStore.itemCount)
const totalPrice = computed(() => cartStore.totalAmount)

const handleClose = () => {
  router.push('/')
}

const handleCategoryClick = (category: Category) => {
  router.push({
    name: 'products',
    query: { categoryId: category.id },
  })
}

const handleCheckout = () => {
  router.push('/checkout')
}

onMounted(() => {
  categoriesStore.fetchCategories()
})
</script>

<style scoped>
.categories-page {
  width: 100%;
  max-width: 394px;
  height: 100vh;
  background-color: #FFFFFF;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.header {
  position: relative;
  height: 104px;
  width: 100%;
}

.header-background {
  position: absolute;
  top: 2px;
  left: 0;
  right: 0;
  height: 104px;
  background-color: #FFFFFF;
}

.header-title {
  position: absolute;
  left: 20px;
  top: 71px;
  font-family: 'Mabry Pro', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 26px;
  line-height: 1.1;
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
}

.close-button {
  position: absolute;
  right: 19.68px;
  top: 71.89px;
  width: 26.22px;
  height: 26.22px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.close-button img {
  width: 16.14px;
  height: 16.14px;
  margin: 5.04px;
}

/* Categories List */
.categories-list {
  flex: 1;
  overflow-y: auto;
  padding: 15px 19px 10px;
  margin-bottom: 163px;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: rgba(0, 0, 0, 0.54);
  font-family: 'Mabry Pro', 'Inter', sans-serif;
  font-size: 16px;
}

.category-item {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #DFDFDF;
  cursor: pointer;
}

.category-content {
  display: flex;
  align-items: center;
  gap: 8.78px;
}

.category-icon-wrapper {
  width: 40px;
  height: 40px;
  background-color: #F2F2F2;
  border-radius: 9.85px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-icon {
  width: 20px;
  height: 21.11px;
}

.category-name {
  font-family: 'Mabry Pro', 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.87);
}

.arrow-icon {
  width: 9.32px;
  height: 15.83px;
  opacity: 0.32;
}

/* Bottom Section */
.bottom-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 163px;
  background-color: #FFFFFF;
  box-shadow: 0px -14px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 10;
}

.bottom-content {
  padding: 24px 21px 0 24px;
}

.selection-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.selection-count {
  font-family: 'Mabry Pro', 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.87);
}
.selected-count-highlight {
  font-family: 'Mabry Pro', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #15BAAA;
  border-bottom: 1px solid #15BAAA;
  padding-bottom: 1px;
  margin: 0 2px;
}

.selection-total {
  font-family: 'Mabry Pro', 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.87);
}

.checkout-button {
  width: 100%;
  height: 56px;
  background-color: #15BAAA;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.checkout-button:hover {
  opacity: 0.9;
}

.checkout-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkout-button span {
  font-family: 'Mabry Pro', 'Inter', sans-serif;
  font-weight: 500;
  font-size: 19px;
  line-height: 1;
  color: #FFFFFF;
}

.checkout-button img {
  width: 13.33px;
  height: 13.33px;
}

/* Ensure proper scrolling */
::-webkit-scrollbar {
  width: 0;
}
</style> 