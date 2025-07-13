<template>
  <header class="app-header">
    <div class="header-background"></div>
    <h1 class="header-title">{{ title }}</h1>
    <button class="close-button" @click="$emit('close')" aria-label="Закрыть">
      <!-- Bounding box -->
      <div class="button-box"></div>
      <!-- White circle background -->
      <div class="button-circle"></div>
      <!-- Cancel icon -->
      <img src="@/assets/icons/cancel.svg" alt="close" class="cancel-icon" />
    </button>
  </header>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
defineEmits<{ (e: 'close'): void }>()
</script>

<style scoped>
.app-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 394px;
  height: 104px;
  background-color: #FFFFFF;
}

.header-background {
  position: absolute;
  left: 0;
  top: 2px;
  width: 394px;
  height: 104px;
  background-color: #FFFFFF;
}

.header-title {
  position: absolute;
  left: 20px;
  top: 71px;
  width: 301px;
  height: 33px;
  font-size: 30px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.1;
  margin: 0;
}

.close-button {
  position: absolute;
  right: 20px;
  top: 72px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.button-box {
  position: absolute;
  width: 26px;
  height: 26px;
  background-color: transparent;
}

.button-circle {
  position: absolute;
  width: 18px;
  height: 18px;
  background-color: #FFFFFF;
  border-radius: 50%;
  left: 4px;
  top: 4px;
}

.cancel-icon {
  position: absolute;
  width: 25px;
  height: 25px;
  left: 0.5px;
  top: 0.5px;
}
</style> 