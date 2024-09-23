<script setup>
import {useRouter} from 'vue-router'
import agriculture from '@/assets/img/icon/agriculture.png'
import upload from '@/assets/img/icon/upload.png'

const quickList = [
  {iconName: agriculture, text: '百科指南', routerName: 'UserEncyclopedia', jumpMode: 'replace'},
  {iconName: upload, text: '快速上传', routerName: 'RecordUpload', jumpMode: 'push'},
]

const router = useRouter()
const onClick = (item) => {
  router[item.jumpMode]({name: item.routerName})
}
</script>

<template>
  <div>
    <div class="card">
      <div class="quick-items">
        <div class="quick-item" v-for="(item,index) in quickList" :key="index" @click="onClick(item)">
          <div class="icon">
            <van-icon :name="item.iconName" size="3em"/>
          </div>
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;

  .quick-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
  }
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  .icon {
    margin-bottom: 8px;
  }

  .text {
    color: #666666;
    font-size: small;
  }
}
</style>