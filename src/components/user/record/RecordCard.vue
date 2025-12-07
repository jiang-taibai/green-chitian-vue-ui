<script setup>
import {defineProps, computed} from "vue";
import {useRouter} from "vue-router";
import validator from "@/assets/js/public/validator.js";

const router = useRouter();

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  cover: {
    type: String,
    default: void 0
  },
  date: {
    type: String,
    default: "2021-01-01 00:00:00"
  },
  farmland: {
    type: String,
    default: "未知农田"
  },
  fertilizerCards: {
    type: Array,
  },
  note: {
    type: String,
    default: "无备注信息"
  }
});

const agroChemicalsDosage = computed(() => {
  const res = [];
  props.fertilizerCards.forEach(item => {
    const agroChemicals = validator.isEmptyString(item.fertilizerName, true) ? "未知化肥/农药" : item.fertilizerName;
    res.push(`${agroChemicals} ${item.applicationUsed.toFixed(2)}(${item.unit})`);
  })
  return res.join("; ");
});

const openDetail = () => {
  router.push({name: 'RecordDetail', params: {id: props.id}});
};

</script>

<template>
  <div>
    <div class="container card" @click="openDetail">
      <div class="img">
        <van-image width="30vw" height="30vw" fit="cover" :src="cover">
          <template v-slot:error>暂无图片</template>
          <template v-slot:loading>暂无图片</template>
        </van-image>
      </div>
      <div class="info">
        <van-text-ellipsis class="farmland" :content="farmland ? farmland : '未知田地'"/>
        <div class="date">{{ date }}</div>
        <van-text-ellipsis class="agro" :content="agroChemicalsDosage"/>
        <van-text-ellipsis class="note" :content="note"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  overflow: hidden;

}

.card {
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
}

.img {
  width: 30vw;
  height: 30vw;
  overflow: hidden;
}

.info {
  padding: 10px 14px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .farmland {
    font-size: large;
    font-weight: bold;
    color: #333;
  }

  .date {
    font-size: small;
    color: #666;
  }

  .agro, .note {
    font-size: small;
    color: #666;
  }
}
</style>