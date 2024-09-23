<script setup>
import {ref, defineProps, defineEmits, watch} from "vue";
import GeoLocationGetterApi from "@/components/public/GeoLocationGetterApi.vue";
import {tencentMapDeveloperKey} from "@/assets/js/secret/index.js";

const props = defineProps({
  location: {
    type: Object,
    default: () => {
      return {
        text: "未知位置",
        latitude: 0,
        longitude: 0,
      }
    }
  }
})

const emits = defineEmits(["update:location"]);
const localLocation = ref(props.location);
watch(localLocation, (val) => {
  emits("update:location", {...val});
}, {deep: true});

const geoLocationGetter = ref(null);
const getLocation = () => {
  localLocation.value.text = "正在获取位置...";
  geoLocationGetter.value.requestGeolocation();
}
const onLocationFound = (data) => {
  localLocation.value = {
    text: data.address,
    latitude: data.lat,
    longitude: data.lng,
  }
}
const onLocationFailed = (data) => {
}
</script>

<template>
  <div>
    <div class="location">
      <div class="label">位置：</div>
      <van-text-ellipsis rows="1" class="location-text" :content="localLocation.text" position="start"/>
      <van-button type="primary" size="small" icon="location" @click="getLocation">定位</van-button>
    </div>
    <geo-location-getter-api ref="geoLocationGetter" referer="绿色赤田" :api-key="tencentMapDeveloperKey"
                             @location-found="onLocationFound" @location-failed="onLocationFailed"/>
  </div>
</template>

<style scoped lang="less">
.location {
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 8px;

  .label {
    width: 3em;
  }

  .location-text {
    flex: 1;
    text-align: right;
    color: #666666;
  }
}
</style>