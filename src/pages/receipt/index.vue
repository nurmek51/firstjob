<template>
  <div class="receipt-page">
    <!-- Back arrow -->
    <div class="back-button" @click="goBack">
      <img src="@/assets/icons/arrow_back.svg" class="back-icon" />
    </div>
    
    <!-- Title -->
    <div class="page-title">Квитанция</div>
    
    <!-- Receipt content -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>
    
    <div v-if="!isLoading && currentSale" class="receipt-content">
      <div class="receipt-header">ИП «DEMO»</div>
      <div class="receipt-bin">БИН (ИИН): 999999999999</div>
      <div class="receipt-address">ул. DEMO, 1</div>
      
      <div class="receipt-type">ПРЕДВАРИТЕЛЬНЫЙ ЧЕК</div>
      
      <!-- Separator line -->
      <div class="receipt-separator"></div>
      
      <!-- Items -->
      <div v-for="(item, index) in currentSale.items" :key="index" class="receipt-item">
        <div class="item-name">{{ index + 1 }}. {{ item.product.name }}</div>
        <div class="item-details">
          <div class="item-quantity">{{ item.quantity }}.0 шт. × {{ formatPrice(item.price) }}</div>
          <div class="item-total">{{ formatPrice(item.price * item.quantity) }}</div>
        </div>
      </div>
      
      <div class="cost-row">
        <div class="cost-label">Стоимость</div>
        <div class="cost-amount">{{ formatPrice(currentSale.total_amount) }}</div>
      </div>
      
      <!-- Separator line -->
      <div class="receipt-separator"></div>
      
      <div class="total-row">
        <div class="total-label">ИТОГО</div>
        <div class="total-amount">{{ formatPrice(currentSale.total_amount) }}</div>
      </div>
      
      <div class="payment-row">
        <div class="payment-method">{{ paymentMethodName }}</div>
        <div class="payment-amount">{{ formatPrice(currentSale.total_amount) }}</div>
      </div>
    </div>
    
    <!-- Button -->
    <div class="finish-button" @click="finish">
      <div class="finish-button-text">Завершить</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSalesStore } from '@/stores/sales'
import { formatPrice } from '@/utils/format'

const router = useRouter()
const route = useRoute()
const salesStore = useSalesStore()

const currentSale = computed(() => salesStore.currentSale)
const isLoading = computed(() => salesStore.isLoading)

const paymentMethodName = computed(() => {
  switch (currentSale.value?.payment_method) {
    case 'cash': return 'Наличные'
    case 'card': return 'Карта'
    case 'mobile': return 'Мобильный'
    default: return ''
  }
})

const goBack = () => {
  router.back()
}

const finish = () => {
  router.push('/')
}

onMounted(() => {
  const saleId = Number(route.query.saleId)
  if (saleId) {
    // Fetch the sale only if it isn't already cached to prevent unnecessary loading/spinner
    if (!salesStore.currentSale || salesStore.currentSale.id !== saleId) {
      salesStore.fetchSale(saleId)
    }
  }
})
</script>

<style scoped>
.receipt-page {
  /* make the whole page scrollable */
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 120px; /* button height 56px + 43px gap */
  position: relative;
  width: 394px;
  background-color: #FFFFFF;
  border-radius: 16px 16px 0 0;
  font-family: 'Inter', sans-serif;
}

.back-button {
  position: absolute;
  left: 16px;
  top: 74px;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.back-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.page-title {
  position: absolute;
  left: 46px;
  top: 73px;
  width: 301px;
  font-size: 26px;
  font-weight: 700;
  color: #000000;
  line-height: 1.1;
  text-align: center;
}

.loading-container {
  position: absolute;
  left: 0;
  top: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
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

.receipt-content {
  position: relative;
  margin: 150px 13px 0 13px; /* keep same top offset but allow natural height */
  width: calc(100% - 26px);
  background-color: #FFFFFF;
  color: #000000;
  font-family: 'Inter', sans-serif;
  padding: 0 24px;
  font-size: 14px;
  line-height: 1.2;
}

.receipt-header {
  text-align: center;
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 2px;
}

.receipt-bin {
  text-align: center;
  font-size: 14px;
  margin-bottom: 2px;
}

.receipt-address {
  text-align: center;
  font-size: 14px;
  margin-bottom: 12px;
}

.receipt-type {
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 12px;
}

.receipt-separator {
  width: 100%;
  height: 1px;
  background-color: #D1D5DB;
  margin: 16px 0;
}

.receipt-item {
  margin-bottom: 16px;
}

.item-name {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 4px;
}

.item-details {
  display: flex;
  justify-content: space-between;
  color: #6B7280;
  font-size: 14px;
  line-height: 1.2;
}

.item-total {
  color: #000000;
}

.cost-row {
  display: flex;
  justify-content: space-between;
  color: #6B7280;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: -2px;
}

.cost-amount {
  color: #000000;
}

.total-row {
  display: flex;
  justify-content: space-between;
  color: #000000;
  font-size: 28px;
  margin-bottom: 8px;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  color: #000000;
  font-size: 14px;
}

.finish-button {
  position: fixed;
  bottom: 43px; /* required gap from bottom */
  left: 50%;
  transform: translateX(-50%);
  width: 354px;
  max-width: calc(100% - 40px); /* keep side margins */
  height: 56px;
  background-color: #15BAAA;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.finish-button-text {
  font-size: 19px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1;
}
</style> 