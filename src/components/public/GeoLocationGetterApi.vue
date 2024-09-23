<!-- GeolocationComponent.vue -->
<template>
  <div class="geolocation-container">
    <!-- 地理定位组件 iframe -->
    <iframe ref="geoPage" v-show="false" width="100%" height="100%" frameborder="0" scrolling="no" allow="geolocation"
            :src="geoPageSrc">
    </iframe>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, watch, defineProps, defineEmits} from 'vue';

// 定义组件接收的 props
const props = defineProps({
  apiKey: {
    type: String,
    required: true,
    description: '腾讯地图 API 密钥'
  },
  referer: {
    type: String,
    required: true,
    description: '应用名称或网址，用于请求头 Referer'
  },
  effect: {
    type: String,
    default: 'zoom',
    description: '视觉特效，如 zoom'
  },
  timeout: {
    type: Number,
    default: 6000,
    description: '定位超时时间，单位毫秒'
  }
});

// 定义组件触发的事件
const emit = defineEmits(['location-found', 'location-failed']);

// 定义 refs
const geoPage = ref(null);

// 定义位置信息
const loc = ref(null);

// 构建 geoPage iframe 的 src
const geoPageSrc = `https://apis.map.qq.com/tools/geolocation?key=${encodeURIComponent(props.apiKey)}&referer=${encodeURIComponent(props.referer)}&effect=${encodeURIComponent(props.effect)}`;

// 消息事件处理函数
const handleMessage = (event) => {
  // 安全性考虑：验证消息来源
  // 示例中未验证来源，请根据实际情况添加
  // if (event.origin !== 'https://apis.map.qq.com') return;
  const data = event.data;
  if (data && data.module === 'geolocation') {
    loc.value = data;
    const {lat, lng, addr, city} = data;
    const address = addr || city || '未知地址';
    emit('location-found', {lat, lng, address});
  } else {
    emit('location-failed', data);
  }
};

// 发送消息请求位置信息
const requestLocation = () => {
  if (geoPage.value && geoPage.value.contentWindow) {
    geoPage.value.contentWindow.postMessage('getLocation', '*');
  }
};

// 发送消息请求粗略位置信息
const requestRobustLocation = () => {
  if (geoPage.value && geoPage.value.contentWindow) {
    geoPage.value.contentWindow.postMessage('getLocation.robust', '*');
  }
};

// 定义公开的方法
const requestGeolocation = () => {
  requestLocation();

  // 设置超时，6秒后如果未获取到位置信息，发送粗略位置信息请求
  const timeoutId = setTimeout(() => {
    if (!loc.value) {
      requestRobustLocation();
    }
  }, props.timeout);

  // 监视 loc，若有更新则清除超时定时器
  watch(loc, (newVal) => {
    if (newVal) {
      clearTimeout(timeoutId);
    }
  }, {immediate: false});
};

// 在组件挂载时添加消息监听，但不自动请求定位
onMounted(() => {
  window.addEventListener('message', handleMessage, false);
});

// 在组件卸载时移除消息监听
onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage, false);
});

// 通过 defineExpose 暴露 requestGeolocation 方法给父组件
defineExpose({
  requestGeolocation
});
</script>

<style scoped>
.geolocation-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
