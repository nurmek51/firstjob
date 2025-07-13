<template>
  <div class="separator-container">
    <div class="separator-line" />
  </div>
</template>

<script setup lang="ts">
// Separator component - displays a horizontal line divider
</script>

<style scoped>
.separator-container {
  position: relative;
  height: 16px;
  width: 100%;
}

.separator-line {
  position: absolute;
  top: 8px;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: #DFDFDF;
}
</style> 