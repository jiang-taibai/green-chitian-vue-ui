<script setup>
import {ref, defineProps, watch, computed, onMounted} from "vue";
import pointImage from "@/assets/img/icon/point.png";
import {TENCENT_MAP_DEVELOPER_KEY} from "@/assets/js/secret";

const props = defineProps({
  coordinate: {
    type: Object,
    default: () => ({latitude: 0.0, longitude: 0.0})
  },
});

const localCoordinate = ref(props.coordinate);

watch(() => props.coordinate, (val) => {
  localCoordinate.value = {
    latitude: val.latitude,
    longitude: val.longitude,
  };
}, {deep: true});

const center = computed(() => {
  return {lat: localCoordinate.value.latitude, lng: localCoordinate.value.longitude};
})
const zoom = 14;
const doubleClickZoom = true;
const control = {
  scale: {},
}
const baseMap = {
  type: "satellite",
  features: ["base", "road"],
}
const markerGeometries = computed(() => {
  return [{
    id: 'point',
    styleId: 'point',
    position: {lat: localCoordinate.value.latitude, lng: localCoordinate.value.longitude},
  }]
})
const markerStyles = {
  point: {
    width: 25,
    height: 25,
    anchor: {x: 16, y: 32},
    src: pointImage,
  },
}

onMounted(() => {
})
</script>

<template>
  <div>
    <div class="container">
      <tmap-map class="t-map"
                :mapKey="TENCENT_MAP_DEVELOPER_KEY" :baseMap="baseMap"
                :center="center" :zoom="zoom" :doubleClickZoom="doubleClickZoom" :control="control">
        <tmap-multi-marker :styles="markerStyles" :geometries="markerGeometries"/>
      </tmap-map>
    </div>
  </div>
</template>

<style scoped>
.container {
  border-radius: 8px;
  overflow: hidden;
}

.t-map {
  background: rgba(43, 43, 43, 0.8);
}
</style>