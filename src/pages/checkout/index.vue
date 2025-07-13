<template>
  <div class="checkout-page">
    <!-- Header -->
    <div class="header">
      <div class="back-button" @click="goBack">
        <img src="@/assets/icons/arrow_back.svg" class="back-icon" />
      </div>
      <div class="header-title">Подтвердите выбор</div>
    </div>
    
    <!-- Scrollable content area -->
    <div class="content-area">
      <div class="content-wrapper">
        <!-- Items count title -->
        <div class="items-count-title">
          {{ selectedItemsCount }} товаров к продаже
        </div>
        
        <!-- Items list -->
        <div class="items-list">
          <div
            v-for="item in items"
            :key="item.product.id"
            class="item-card"
          >
            <!-- Image -->
            <div class="item-image">
              <img src="@/assets/images/products/tomato.png" class="product-image" />
            </div>
            
            <!-- Name -->
            <div class="item-name">
              {{ item.product.name }}
            </div>
            
            <!-- Price -->
            <div class="item-price">
              {{ formatPrice(item.product.price) }}
            </div>
            
            <!-- Line -->
            <div class="item-divider"></div>
            
            <!-- Delete -->
            <div class="delete-button" @click="deleteItem(item.product.id)">
              <img src="@/assets/icons/delete_forever.svg" class="delete-icon" />
            </div>
            
            <!-- Quantity Controls -->
            <div class="quantity-controls">
              <div class="quantity-decrease" @click="decreaseQuantity(item.product.id)">
                <img src="@/assets/icons/do_not_disturb_on.svg" class="quantity-icon" />
              </div>
              <div class="quantity-display">
                {{ item.quantity }}
              </div>
              <div class="quantity-increase" @click="increaseQuantity(item.product.id)">
                <img src="@/assets/icons/add_circle.svg" class="quantity-icon" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Total section -->
        <div class="total-section">
          <div class="total-divider-top"></div>
          <div class="total-row">
            <div class="total-label">Итого:</div>
            <div class="total-amount">{{ formatPrice(totalAmount) }}</div>
          </div>
          <div class="total-divider-bottom"></div>
        </div>
      </div>
    </div>
    
    <!-- Fixed Payment Bar at Bottom -->
    <div class="payment-bar">
      <div class="payment-content">
        <div class="payment-title">Способ оплаты</div>
        <div class="payment-methods">
          <div class="payment-methods-row">
            <!-- Cash -->
            <div 
              class="payment-method"
              :class="{ 'payment-method-selected': cartStore.selectedPaymentMethod === 'cash' }"
              @click="selectPaymentMethod('cash')"
            >
              <div v-if="cartStore.selectedPaymentMethod === 'cash'" class="payment-checkmark">
                <div class="checkmark-circle">
                  <img src="@/assets/icons/checkmark.svg" class="checkmark-icon" />
                </div>
              </div>
              <div class="payment-method-label">Наличные</div>
              <div class="payment-method-icon">
                <div class="payment-icon-circle" :class="{ 'payment-icon-selected': cartStore.selectedPaymentMethod === 'cash' }">
                  <div class="payment-icon-wrapper">
                    <img 
                      src="@/assets/icons/payments.svg" 
                      class="payment-icon"
                      :class="{ 'payment-icon-inverted': cartStore.selectedPaymentMethod === 'cash' }"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Card -->
            <div 
              class="payment-method"
              :class="{ 'payment-method-selected': cartStore.selectedPaymentMethod === 'card' }"
              @click="selectPaymentMethod('card')"
            >
              <div v-if="cartStore.selectedPaymentMethod === 'card'" class="payment-checkmark">
                <div class="checkmark-circle">
                  <img src="@/assets/icons/checkmark.svg" class="checkmark-icon" />
                </div>
              </div>
              <div class="payment-method-label">Карта</div>
              <div class="payment-method-icon">
                <div class="payment-icon-circle" :class="{ 'payment-icon-selected': cartStore.selectedPaymentMethod === 'card' }">
                  <div class="payment-icon-wrapper">
                    <img 
                      src="@/assets/icons/credit_card.svg" 
                      class="payment-icon"
                      :class="{ 'payment-icon-inverted': cartStore.selectedPaymentMethod === 'card' }"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Mobile -->
            <div 
              class="payment-method"
              :class="{ 'payment-method-selected': cartStore.selectedPaymentMethod === 'mobile' }"
              @click="selectPaymentMethod('mobile')"
            >
              <div v-if="cartStore.selectedPaymentMethod === 'mobile'" class="payment-checkmark">
                <div class="checkmark-circle">
                  <img src="@/assets/icons/checkmark.svg" class="checkmark-icon" />
                </div>
              </div>
              <div class="payment-method-label">Мобильный</div>
              <div class="payment-method-icon">
                <div class="payment-icon-circle" :class="{ 'payment-icon-selected': cartStore.selectedPaymentMethod === 'mobile' }">
                  <div class="payment-icon-wrapper">
                    <img 
                      src="@/assets/icons/security_update_good.svg" 
                      class="payment-icon"
                      :class="{ 'payment-icon-inverted': cartStore.selectedPaymentMethod === 'mobile' }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Checkout Button -->
        <div 
          class="checkout-button"
          :class="{ 'checkout-button-disabled': !canCheckout || isProcessing }"
          @click="processCheckout"
        >
          <template v-if="isProcessing">
            <div class="checkout-spinner"></div>
          </template>
          <template v-else>
            <div class="checkout-button-text">
              Продажа {{ formatPrice(totalAmount) }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore, type PaymentMethod } from '@/stores/cart'
import { formatPrice } from '@/utils/format'

const router = useRouter()
const cartStore = useCartStore()

// Local loading state for a snappier UX during checkout
const isProcessing = ref(false)

const items = computed(() => cartStore.items)
const selectedItemsCount = computed(() => cartStore.itemCount)
const totalAmount = computed(() => cartStore.totalAmount)
const canCheckout = computed(() => !cartStore.isEmpty && cartStore.selectedPaymentMethod)

const goBack = () => {
  router.back()
}

const increaseQuantity = (productId: number) => {
  const item = cartStore.items.find(i => i.product.id === productId)
  if (item) {
    cartStore.updateQuantity(productId, item.quantity + 1)
  }
}

const decreaseQuantity = (productId: number) => {
  const item = cartStore.items.find(i => i.product.id === productId)
  if (item) {
    cartStore.updateQuantity(productId, item.quantity - 1)
  }
}

const deleteItem = (productId: number) => {
  cartStore.removeItem(productId)
}

const selectPaymentMethod = (method: PaymentMethod) => {
  cartStore.setPaymentMethod(method)
}

const processCheckout = async () => {
  if (!canCheckout.value || isProcessing.value) return

  isProcessing.value = true

  try {
    const newSale = await cartStore.checkout()
    if (newSale) {
      router.push({ name: 'receipt', query: { saleId: newSale.id } })
    }
  } catch (error) {
    console.error('Checkout failed:', error)
    // You can show an error message to the user here
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
.checkout-page {
  position: relative;
  width: 394px;
  height: 100vh;
  background-color: #FFFFFF;
  border-radius: 16px 16px 0 0;
  font-family: 'Mabry Pro', sans-serif;
  overflow: hidden;
}

/* Header */
.header {
  position: relative;
  height: 120px;
  z-index: 10;
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

.header-title {
  position: absolute;
  left: 70px;
  top: 73px;
  font-size: 26px;
  font-weight: 700;
  color: #000000;
  line-height: 1.1;
}

/* Content Area */
.content-area {
  position: absolute;
  left: 0;
  top: 120px;
  bottom: 290px;
  width: 100%;
  overflow-y: auto;
}

.content-wrapper {
  padding: 0 20px 20px;
}

.items-count-title {
  padding: 22px 0 32px;
  font-size: 17px;
  font-weight: 500;
  color: #000000;
  line-height: 1.1;
}

/* Items List */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.item-card {
  position: relative;
  width: 100%;
  height: 153px;
  background-color: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #DFDFDF;
}

.item-image {
  position: absolute;
  left: 16px;
  top: 16px;
  width: 60px;
  height: 60px;
  background-color: #F2F2F2;
  border-radius: 14.77px;
}

.product-image {
  position: absolute;
  left: 9px;
  top: 8px;
  width: 42px;
  height: 42px;
  object-fit: cover;
}

.item-name {
  position: absolute;
  left: 91px;
  top: 46px;
  transform: translateY(-50%);
  width: 232px;
  font-size: 15px;
  color: #000000;
  line-height: 1.2;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item-price {
  position: absolute;
  left: 91px;
  top: 60px;
  width: fit-content;
  white-space: nowrap;
  font-size: 12px;
  color: #15BAAA;
  line-height: 1.2;
  text-align: right;
}

.item-divider {
  position: absolute;
  left: 16px;
  top: 93px;
  width: 322px;
  height: 1px;
  background-color: #DFDFDF;
}

.delete-button {
  position: absolute;
  left: 321px;
  top: 114px;
  width: 15px;
  height: 17px;
  cursor: pointer;
}

.delete-icon {
  width: 100%;
  height: 100%;
}

.quantity-controls {
  position: absolute;
  left: 18px;
  top: 110px;
  width: 88px;
  height: 26px;
  display: flex;
  align-items: center;
}

.quantity-decrease {
  width: 26px;
  height: 26px;
  margin-right: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-display {
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  line-height: 1.3;
  text-align: center;
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 7px;
}

.quantity-increase {
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-icon {
  width: 22px;
  height: 22px;
}

.quantity-decrease .quantity-icon {
  opacity: 1; /* full opacity */
  color: #D9D9D9; /* set requested grey tone, works for SVGs that respect currentColor */
}

.quantity-increase .quantity-icon {
  color: #15BAAA;
}

/* Total Section */
.total-section {
  display: flex;
  flex-direction: column;
}

.total-divider-top {
  width: 100%;
  height: 1px;
  background-color: #DFDFDF;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

.total-label {
  font-size: 17px;
  color: #000000;
  line-height: 1.3;
  font-weight: 700;
}

.total-amount {
  font-size: 17px;
  color: #000000;
  line-height: 1.3;
  font-weight: 700;
}

.total-divider-bottom {
  width: 100%;
  height: 1px;
  background-color: #DFDFDF;
}

/* Payment Bar */
.payment-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  border-top: 1px solid #DFDFDF;
  box-shadow: 0 -2px 16px 0 rgba(0, 0, 0, 0.04);
  z-index: 20;
}

.payment-content {
  padding: 27px 20px 24px;
  padding-bottom: calc(24px + env(safe-area-inset-bottom));
}

.payment-title {
  font-size: 22px;
  font-weight: 700;
  color: #000000;
  line-height: 1.1;
  margin-bottom: 15px;
}

.payment-methods {
  width: 100%;
  height: 122px;
  margin-bottom: 16px;
}

.payment-methods-row {
  display: flex;
  gap: 12px;
}

.payment-method {
  flex: 1;
  height: 114px;
  background-color: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #DFDFDF;
  cursor: pointer;
  position: relative;
}

.payment-method-selected {
  border-color: #15BAAA;
}

.payment-checkmark {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 27px;
  height: 27px;
  z-index: 10;
}

.checkmark-circle {
  width: 100%;
  height: 100%;
  background-color: #15BAAA;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark-icon {
  width: 12px;
  height: 8px;
}

.payment-method-label {
  position: absolute;
  bottom: 17px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  color: #000000;
  line-height: 1.2;
}

.payment-method-icon {
  position: absolute;
  left: 28px;
  top: 14px;
  width: 54px;
  height: 54px;
}

.payment-icon-circle {
  width: 100%;
  height: 100%;
  background-color: #F2F2F2;
  border-radius: 50%;
  position: relative;
}

.payment-icon-selected {
  background-color: #15BAAA;
}

.payment-icon-wrapper {
  /* Center the icon within the circular background */
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 54px;
  height: 54px;
}

.payment-icon {
  position: static; /* let flexbox centering work */
  width: 24px;
  height: 24px;
}

.payment-icon-inverted {
  filter: brightness(0) invert(1);
}

.payment-icon[src*="payments.svg"],
.payment-icon[src*="credit_card.svg"],
.payment-icon[src*="security_update_good.svg"] {
  left: auto;
  top: auto;
  width: 24px;
  height: 24px;
}

.payment-icon:not(.payment-icon-inverted) {
  filter: none;
}

/* Checkout Button */
.checkout-button {
  width: 100%;
  height: 56px;
  background-color: #23B56C;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.checkout-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkout-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-bottom: 2px solid #FFFFFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.checkout-button-text {
  font-size: 19px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1;
}
</style> 