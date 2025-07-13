<template>
  <div class="sale-item" :class="{ 'sale-item-long': isLongDescription }" @click="handleClick">
    <!-- Date -->
    <p class="sale-date">
      {{ formatDate(sale.created_at) }}
    </p>

    <!-- Description -->
    <p class="sale-description" :class="{ 'sale-description-long': isLongDescription }">
      {{ saleDescription }}
    </p>

    <!-- Amount -->
    <p class="sale-amount" :class="{ 'sale-amount-long': isLongDescription }">
      {{ formatPrice(sale.total_amount) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Sale } from '@/types'
import { formatPrice, formatDate, formatItemCount } from '@/utils/format'

const props = defineProps<{
  sale: Sale
}>()

const emit = defineEmits<{
  click: [sale: Sale]
}>()

const saleDescription = computed(() => {
  const count = props.sale.items.length
  return formatItemCount(count)
})

const isLongDescription = computed(() => {
  return saleDescription.value.length > 30
})

const handleClick = () => {
  emit('click', props.sale)
}
</script>

<style scoped>
.sale-item {
  position: relative;
  width: 355px;
  height: 41px;
  cursor: pointer;
}

.sale-item-long {
  height: 85px;
}

.sale-date {
  position: absolute;
  left: 1px;
  top: 0;
  width: 101px;
  height: 16px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.54);
  line-height: 1.2;
  margin: 0;
}

.sale-description {
  position: absolute;
  left: 0;
  top: 20px;
  max-width: 249px; 
  height: 21px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.3;
  margin: 0;
  white-space: nowrap;
}

.sale-description-long {
  width: 249px;
  height: 63px;
  white-space: normal;
}

.sale-amount {
  position: absolute;
  right: 0;
  top: 20px;
  width: 69px;
  height: 21px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  text-align: right;
  line-height: 1.3;
  margin: 0;
}

.sale-amount-long {
  top: 22px;
}
</style> 