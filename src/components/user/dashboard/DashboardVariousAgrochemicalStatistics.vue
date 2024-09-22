<script setup>
import {ref} from "vue";

const activatedTab = ref('monthly')
</script>

<template>
  <div>
    <div class="container">
      <div class="chart-container">
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
}

.chart-container {
  padding: 10px;
}
</style>