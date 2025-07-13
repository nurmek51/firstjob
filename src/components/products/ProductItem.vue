<template>
  <div class="product-item" :class="{ 'expanded': isSelected }" :data-product-id="product.id" @click="handleItemClick">
    <!-- Top Row: Image + Info -->
    <div class="top-row">
      <div class="product-image-container">
        <img src="@/assets/images/products/tomato.png" :alt="product.name" class="product-image" />
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price" :class="{ 'price-active': quantity > 0 }">{{ formatPrice(product.price) }}</p>
      </div>
    </div>

    <!-- Divider Line (only in expanded state) -->
    <div v-if="isSelected" class="divider-line"></div>

    <!-- Controls - shown when product is selected -->
    <div v-if="isSelected" class="controls-active">
      <ProductControls
        :product-id="product.id"
        :quantity="quantity"
        @update:quantity="updateQuantity"
        @delete="handleDelete"
        @sell="handleSell"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types'
import ProductControls from './ProductControls.vue'

const props = defineProps<{
  product: Product
  isSelected: boolean
  quantity: number
}>()

const emit = defineEmits<{
  'update:quantity': [quantity: number]
  delete: [productId: number]
  select: [productId: number]
  sell: [product: Product]
}>()

const formatPrice = (price: number) => {
  return price.toLocaleString('ru-RU') + ' T'
}

const updateQuantity = (newQuantity: number) => {
  emit('update:quantity', newQuantity);
};

const handleDelete = (productId: number) => {
  emit('delete', productId)
}

const handleSell = () => {
  emit('sell', props.product)
}

const handleItemClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.closest('button') || target.closest('.controls-active')) {
    return
  }

  emit('select', props.product.id)

  if (props.quantity === 0) {
    emit('update:quantity', 1)
  }
}
</script>

<style scoped>
.product-item {
  position: relative;
  background: #FFFFFF;
  border: 1px solid #DFDFDF;
  border-radius: 16px;
  margin-bottom: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 354px;
  margin-left: auto;
  margin-right: auto;
  flex: none;
  order: 0;
  flex-grow: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.product-item:not(.expanded) {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 94px;
  padding: 0 16px;
  cursor: pointer;
}

.product-item:not(.expanded):hover {
  background: #FAFAFA;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.top-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.product-item.expanded .top-row {
  padding: 16px 16px 0 16px;
  /* Animate top section sliding down when card expands */
  animation: slideDown 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-item:not(.expanded) .top-row {
  padding: 0;
}

/* Slightly postpone divider appearance so it shows after top-row */
.divider-line {
  width: calc(100% - 32px);
  height: 1px;
  background: #DFDFDF;
  margin: 12px 16px 0 16px;
  opacity: 0;
  animation: fadeInSlide 0.3s ease-out 0.28s forwards;
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

.product-image-container {
  width: 60px;
  height: 60px;
  background: #F2F2F2;
  border-radius: 14.77px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.product-image {
  width: 41.68px;
  height: 41.68px;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  padding-top: 0;
  justify-content: center;
  flex: 1;
  min-width: 0;
}

.product-name {
  font-family: 'Mabry Pro', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
  margin: 0 0 6px 0;
  max-width: 232px;
  overflow: hidden;
  /* Make title adaptive: up to 2 lines then truncate */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.product-price {
  font-family: 'Mabry Pro', sans-serif;
  font-weight: 700;
  font-size: 13px;
  line-height: 15.6px;
  /* Default (not selected / quantity 0) colour */
  color: #7CA0FF;
  margin: 0;
  /* Remove underline in default state */
  text-decoration: none;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Accent colour when the product is active (quantity > 0) */
.product-price.price-active {
  color: #15BAAA;
  font-weight: 700;
}

.product-item.expanded {
  width: 354px;
  height: 153px;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  flex: none;
  order: 0;
  flex-grow: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-color: #15BAAA;
}

.controls-active {
  width: 100%;
  background: transparent;
  opacity: 0;
  /* Delay controls so they appear after divider */
  animation: fadeInUp 0.35s ease-out 0.45s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 