<script setup>
import {ref, defineProps} from 'vue';

const props = defineProps({
  active: String
});
const localActive = ref(props.active);
</script>

<template>
  <van-tabbar v-model="localActive">
    <van-tabbar-item icon="home" icon-prefix="iconfont" name="dashboard"
                     replace to="/user/dashboard">主页
    </van-tabbar-item>
    <van-tabbar-item icon="record" icon-prefix="iconfont" name="record"
                     replace to="/user/record">记录
    </van-tabbar-item>
    <van-tabbar-item icon="data" icon-prefix="iconfont" name="data"
                     replace to="/user/data">数据
    </van-tabbar-item>
    <van-tabbar-item icon="profile" icon-prefix="iconfont" name="profile"
                     replace to="/user/profile">我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>