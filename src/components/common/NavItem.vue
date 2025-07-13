<template>
  <button class="nav-item" @click="$emit('click')">
    <!-- Icon Container -->
    <div class="icon-container">
      <img
        :src="iconPath"
        :alt="label"
        class="icon"
        :class="{ 'icon-active': active }"
        :style="iconStyle"
      />
    </div>

    <!-- Label -->
    <span class="label" :class="{ 'label-active': active }">
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  label: string
  active: boolean
}>()

defineEmits<{
  click: []
}>()

const iconPath = computed(() => {
  return new URL(`../../assets/icons/${props.icon}.svg`, import.meta.url).href
})

const iconStyle = computed(() => {
  if (props.active && props.icon === 'handshake') {
    return {
      filter: 'brightness(0) saturate(100%) invert(42%) sepia(73%) saturate(1095%) hue-rotate(143deg) brightness(92%) contrast(87%)'
    }
  }
  return {}
})
</script>

<style scoped>
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 90px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.icon-container {
  position: relative;
  width: 28px;
  height: 28px;
}

.icon {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.32;
}

.icon-active {
  opacity: 1;
}

.label {
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: rgba(0, 0, 0, 0.32);
  line-height: 1;
}

.label-active {
  color: #15BAAA;
}
</style> 