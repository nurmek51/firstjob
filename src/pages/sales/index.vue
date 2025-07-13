<template>
  <div class="sales-page">
    <!-- Fixed Header -->
    <div class="header">
      <h1 class="header-title">Продажа</h1>
      <button class="close-button" @click="handleClose" aria-label="Закрыть">
        <div class="close-button-bg"></div>
        <div class="close-button-inner"></div>
        <img src="@/assets/icons/cancel.svg" alt="close" class="close-icon" />
      </button>
    </div>

    <!-- Scrollable Content Area -->
    <div class="content-area">
      <div class="content-wrapper">
        <!-- Call to Action Section -->
        <div class="cta-section">
          <div class="cta-card">
            <p class="cta-text">Продавай четко через учетку</p>
            <button class="new-sale-button" @click="handleNewSale">
              Новая продажа
            </button>
          </div>
        </div>

        <!-- Separator -->
        <div class="separator"></div>

        <!-- History Section -->
        <h2 class="history-title">История</h2>

        <!-- Sale List -->
        <div class="sales-list">
          <div class="sales-items">
            <SaleItem
              v-for="sale in sales"
              :key="sale.id"
              :sale="sale"
              @click="viewSale(sale)"
            />
          </div>

          <!-- Load More / Loader / Error blocks (outside flex list to avoid extra gap) -->
          <button
            v-if="canLoadMore && !isLoading"
            class="load-more-button"
            @click="loadMore"
          >
            Загрузить еще...
          </button>

          <div v-if="isLoading" class="loading-indicator">
            <div class="spinner"></div>
          </div>

          <div v-if="error" class="error-message">
            <p class="error-text">{{ error }}</p>
          </div>

          <!-- When all items are loaded, keep some padding above the bottom navigation -->
          <div v-if="!canLoadMore && !isLoading" class="bottom-padding-normal"></div>
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Navigation -->
    <div class="bottom-navigation">
      <BottomNavigation @navigate="handleNavigation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSalesStore } from '@/stores/sales'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import SaleItem from '@/components/common/SaleItem.vue'
import type { Sale } from '@/types'

const router = useRouter()
const salesStore = useSalesStore()

const sales = computed(() => salesStore.sales)
const isLoading = computed(() => salesStore.isLoading)
const error = computed(() => salesStore.error)
const canLoadMore = computed(() => salesStore.canLoadMore)

onMounted(() => {
  salesStore.fetchSales(true)
})

const handleClose = () => {
  router.push('/')
}

const handleNewSale = () => {
  salesStore.currentSale = null
  router.push('/categories')
}

const loadMore = () => {
  salesStore.fetchSales()
}

const viewSale = (sale: Sale) => {
  router.push({ name: 'receipt', query: { saleId: sale.id } })
}

const handleNavigation = (destination: string) => {
  router.push(`/${destination}`)
}

// (calculateLoadMorePosition function removed – button now flows naturally at the end of the list)
</script>

<style scoped>
.sales-page {
  position: relative;
  width: 394px;
  height: 100vh;
  background-color: #FFFFFF;
  font-family: 'Mabry Pro', sans-serif;
  overflow: hidden;
}

/* Header */
.header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 120px;
  background-color: #FFFFFF;
  z-index: 10;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 20px 20px;
}

.header-title {
  font-size: 30px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.1;
  margin: 0;
  font-weight: 800;
}

.close-button {
  position: relative;
  width: 26.22px;
  height: 26.22px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.close-button-bg {
  position: absolute;
  width: 26.22px;
  height: 26.22px;
  background-color: #D9D9D9;
  border-radius: 50%;
}

.close-button-inner {
  position: absolute;
  left: 4.03px;
  top: 4.03px;
  width: 18.15px;
  height: 18.15px;
  background-color: #FFFFFF;
  border-radius: 50%;
}

.close-icon {
  position: absolute;
  left: 0.34px;
  top: 0.34px;
  width: 25.55px;
  height: 25.55px;
}

/* Content Area */
.content-area {
  position: absolute;
  left: 0;
  top: 104px;
  bottom: 86px;
  width: 100%;
  overflow-y: auto;
}

.content-wrapper {
  position: relative;
  width: 100%;
}

/* Call to Action Section */
.cta-section {
  position: absolute;
  left: 20px;
  top: 34px;
  width: 354px;
  height: 163px;
}

.cta-card {
  position: relative;
  border-radius: 12px;
  border: 1px solid #DFDFDF;
  background-color: #FFFFFF;
  height: 163px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cta-text {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  text-align: center;
  margin: 0 0 20px 0;
}

.new-sale-button {
  width: 300px;
  height: 55px;
  background-color: #15BAAA;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
  font-weight: 520;
}

/* Separator */
.separator {
  position: absolute;
  left: 0;
  top: 224px;
  width: 100%;
  height: 8px;
  background-color: #EEEEEE;
}

/* History Section */
.history-title {
  position: absolute;
  left: 20px;
  top: 260px;
  font-size: 22px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.1;
  width: 270px;
  height: 24px;
  margin: 0;
}

/* Sales List */
.sales-list {
  position: absolute;
  left: 20px;
  top: 310px;
  width: 355px;
}

.sales-items {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bottom-padding-loading {
  height: 89px;
}

.bottom-padding-normal {
  height: 34px;
}

/* Load More Button */
.load-more-button {
  width: 100%;
  height: 55px;
  border-radius: 12px;
  background-color: #F2F2F2;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
  opacity: 0.8;
  cursor: pointer;
  transition: opacity 0.2s;
  margin: 28px 0 34px;
}

.load-more-button:hover {
  opacity: 1;
}

/* Loading Indicator */
.loading-indicator {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  margin: 28px 0 34px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
  border-bottom: 2px solid #15BAAA;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error Message */
.error-message {
  width: 100%;
  padding: 16px;
  background-color: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 8px;
  margin: 28px 0 34px;
}

.error-text {
  color: #DC2626;
  font-size: 14px;
  margin: 0;
}

/* Bottom Navigation */
.bottom-navigation {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
}
</style> 