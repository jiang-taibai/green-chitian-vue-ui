<template>
  <div class="scroll-container-wrapper">
    <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
      <div v-if="images.length > 0">
        <div class="scroll-wrapper">
          <van-image width="30vw" height="30vw" v-for="(image, index) in images" :key="index" class="scroll-image"
                     :src="image" fit="cover" error-icon="image-error" icon-prefix="iconfont"
                     @click="previewImage(index)"/>
        </div>
      </div>
      <div v-else>
        <div class="no-images">
          <van-icon name="image-error" prefix="iconfont"/>
          <p>无图片</p>
        </div>
      </div>
    </div>

    <!-- 左侧阴影 -->
    <div v-if="showLeftShadow" class="shadow left-shadow"></div>
    <!-- 右侧阴影 -->
    <div v-if="showRightShadow" class="shadow right-shadow"></div>
  </div>
</template>

<script setup>
import {ref, onMounted, defineProps} from 'vue';
import {showImagePreview} from 'vant';

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
});

// 阴影显示状态
const showLeftShadow = ref(false);
const showRightShadow = ref(false);

// 获取 scroll container 的引用
const scrollContainer = ref(null);

onMounted(() => {
  // 初始检测
  checkShadows();
});

// 处理滚动事件
function handleScroll() {
  checkShadows();
}

// 检查并更新阴影显示状态
function checkShadows() {
  const container = scrollContainer.value;
  if (!container) return;
  const {scrollLeft, scrollWidth, clientWidth} = container;
  // 判断是否可以向左滚动
  showLeftShadow.value = scrollLeft > 0;
  // 判断是否可以向右滚动
  showRightShadow.value = scrollLeft + clientWidth < scrollWidth - 1; // 减1避免浮点数误差
}

// 点击图片预览大图
function previewImage(index) {
  showImagePreview({
    images: props.images,
    startPosition: index
  });
}
</script>

<style scoped>
.scroll-container-wrapper {
  position: relative;
}

.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px 0;
  -webkit-overflow-scrolling: touch;

  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
}

.scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.scroll-wrapper {
  display: flex;
  gap: 10px;
}

.scroll-image {
  flex: 0 0 auto;
  width: 30vw;
  height: 30vw;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
}

.scroll-image:hover {
  transform: scale(1.05);
}

/* “无图片”提示样式 */
.no-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vw;
  color: #ccc;
  font-size: 1.2em;
}

.no-images p {
  margin-top: 10px;
}

/* 阴影样式 */
.shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 30px; /* 阴影宽度，可根据需求调整 */
  pointer-events: none; /* 允许点击穿透 */
  transition: opacity 0.3s;
}

.left-shadow {
  left: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent);
}

.right-shadow {
  right: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.3), transparent);
}
</style>
