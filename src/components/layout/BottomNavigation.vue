<template>
  <nav class="bottom-navigation">
    <div class="navigation-background"></div>
    <div class="navigation-content">
      <!-- Товары/услуги -->
      <button class="nav-button" @click="$emit('navigate', 'products')">
        <div class="nav-icon">
          <img src="@/assets/icons/workspaces.svg" alt="Товары" class="nav-icon-image" />
        </div>
        <span class="nav-label">Товары/услуги</span>
      </button>
      
      <!-- Операции -->
      <button class="nav-button" @click="$emit('navigate', '')">
        <div class="nav-icon">
          <img src="@/assets/icons/box_add.svg" alt="Операции" class="nav-icon-image" />
        </div>
        <span class="nav-label">Операции</span>
      </button>
      
      <!-- Продажа (active) -->
      <button class="nav-button" @click="$emit('navigate', 'sales')">
        <div class="nav-icon">
          <img src="@/assets/icons/handshake.svg" alt="Продажа" class="nav-icon-image nav-icon-active" />
        </div>
        <span class="nav-label nav-label-active">Продажа</span>
      </button>
      
      <!-- Отчеты -->
      <button class="nav-button" @click="$emit('navigate', '')">
        <div class="nav-icon">
          <img src="@/assets/icons/settings.svg" alt="Отчеты" class="nav-icon-image" />
        </div>
        <span class="nav-label">Отчеты</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'navigate', page: string): void }>()
</script>

<style scoped>
.bottom-navigation {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 394px;
  height: 86px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
}

.navigation-background {
  position: absolute;
  left: 0;
  top: 0.21px;
  width: 394px;
  height: 86px;
  background-color: #FFFFFF;
}

.navigation-content {
  position: absolute;
  left: 20px;
  top: 12px;
  width: 354px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-button {
  width: 90px;
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.nav-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon-image {
  width: 22px;
  height: 20px;
  opacity: 0.32;
}

.nav-icon-active {
  width: 24px;
  height: 22px;
  opacity: 1;
  color: #15BAAA;
}

.nav-label {
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.32);
  line-height: 1;
}

.nav-label-active {
  color: #15BAAA;
}
</style> 