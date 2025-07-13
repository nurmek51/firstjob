<template>
  <div class="controls-row">
    <div class="counter-group">
      <button class="quantity-btn minus" @click.stop="decreaseQuantity">
        <span class="circle"><img src="@/assets/icons/do_not_disturb_on.svg" alt="Decrease" /></span>
      </button>
      <span class="quantity-value">{{ quantity }}</span>
      <button class="quantity-btn plus" @click.stop="increaseQuantity">
        <span class="circle"><img src="@/assets/icons/add_circle.svg" alt="Increase" /></span>
      </button>
    </div>
    <div class="actions-group">
      <button class="delete-button" @click.stop="handleDelete">
        <img src="@/assets/icons/delete_forever.svg" alt="Delete" />
      </button>
      <button class="sell-button" @click.stop="handleSell">Продать</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  productId: number
  quantity: number
}>()

const emit = defineEmits<{
  'update:quantity': [quantity: number]
  delete: [productId: number]
  sell: []
}>()

const increaseQuantity = () => {
  emit('update:quantity', props.quantity + 1)
}

const decreaseQuantity = () => {
  emit('update:quantity', props.quantity - 1)
}

const handleDelete = () => {
  emit('delete', props.productId)
}

const handleSell = () => {
  emit('sell')
}
</script>

<style scoped>
.controls-row {
  margin: 16px 16px 0 16px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}

.counter-group {
  display: flex;
  align-items: center;
  gap: 0;
  flex: none;
  min-width: 0;
  height: 26px;
}

.actions-group {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
}

.quantity-btn {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.quantity-btn:hover {
  background: rgba(21, 186, 170, 0.1);
  transform: scale(1.1);
}

.quantity-btn:active {
  transform: scale(0.95);
}

.quantity-btn img {
  width: 21.67px;
  height: 21.67px;
}

.quantity-value {
  font-family: 'Mabry Pro', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.87);
  text-align: center;
  min-width: 7px;
  width: 7px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
}

.delete-button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  width: 23px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.delete-button:hover {
  background: rgba(244, 67, 54, 0.1);
  transform: scale(1.1);
}

.delete-button:active {
  transform: scale(0.95);
}

.delete-button img {
  width: 15px;
  height: 16.88px;
}

.sell-button {
  background: #15BAAA;
  border-radius: 8px;
  border: none;
  padding: 7px 11px;
  font-family: 'Mabry Pro', sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  color: #FFFFFF;
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.sell-button:hover {
  background: #12A395;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(21, 186, 170, 0.3);
}

.sell-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(21, 186, 170, 0.3);
}
</style> 