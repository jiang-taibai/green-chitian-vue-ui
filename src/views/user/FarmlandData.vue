<script setup>
import {computed, ref} from "vue";
import UserTabBar from "@/components/user/UserTabBar.vue";
import GeoLocationFiled from "@/components/public/GeoLocationFiled.vue";
import TMap from "@/components/public/TMap.vue";

const location = ref({
  text: "未知位置",
  latitude: 39.924232,
  longitude: 116.403406,
})

const coordinate = computed(() => {
  return {
    latitude: location.value.latitude,
    longitude: location.value.longitude,
  }
})
</script>

<template>
  <div>
    <van-nav-bar title="土壤养分" fixed placeholder/>
    <div class="container">
      <div class="location">
        <geo-location-filed v-model:location="location"/>
        <t-map :coordinate="coordinate"/>
      </div>
    </div>
    <user-tab-bar active="farmland-data"/>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
}

.location {
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
}
</style>