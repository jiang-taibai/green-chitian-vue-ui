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
const back = () => history.back();
</script>

<template>
  <van-nav-bar v-if="back" :title="title" left-text="返回" left-arrow @click-left="back" fixed placeholder/>
  <van-nav-bar v-else :title="title" fixed placeholder/>
</template>

<style scoped lang="less">

</style>