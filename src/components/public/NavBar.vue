<script setup>
import {defineProps} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  back: {
    type: Boolean,
    default: false
  },
});
const onLeftClick = () => history.back();
</script>

<template>
  <div>
    <van-nav-bar class="nav-bar" v-if="back" :title="title" left-text="返回" left-arrow @click-left="onLeftClick" fixed placeholder/>
    <van-nav-bar class="nav-bar" v-else :title="title" fixed placeholder/>
  </div>
</template>

<style scoped lang="less">
.nav-bar {
  z-index: 9999999;
  position: relative;
}
</style>