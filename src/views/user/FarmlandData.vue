<script setup>
import {ref} from "vue";
import UserTabBar from "@/components/user/UserTabBar.vue";
import {getLocationText} from "@/assets/js/api/tianditu-api.js";
import GeoLocationFiled from "@/components/public/GeoLocationFiled.vue";

const location = ref({
  text: "未知位置",
  latitude: 18.352992,
  longitude: 109.155312,
})

</script>

<template>
  <div>
    <van-nav-bar title="土壤养分" fixed placeholder/>
    <div class="container">
      <geo-location-filed v-model:location="location"/>
    </div>
    <user-tab-bar active="farmland-data"/>
  </div>
</template>

<style scoped>
.container {


}
</style>