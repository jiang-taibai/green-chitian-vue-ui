<script setup>
import {ref, defineProps} from 'vue';

const tabName2Route = {
  'dashboard': {name: 'UserDashboard'},
  'encyclopedia': {name: 'UserEncyclopedia'},
  'record': {name: 'UserRecord'},
  'farmland-data': {name: 'UserFarmlandData'},
  'profile': {name: 'UserProfile'},
};

const props = defineProps({
  active: {
    type: String,
    required: true,
    validator: (value) => {
      return ['dashboard', 'encyclopedia', 'record', 'farmland-data', 'profile'].includes(value);
    },
  },
  placeholder: {
    type: Boolean,
    default: true,
  },
});
const localActive = ref(props.active);
</script>

<template>
  <van-tabbar v-model="localActive" :placeholder="placeholder">
    <van-tabbar-item icon="home" icon-prefix="iconfont" name="dashboard"
                     replace :to="tabName2Route['dashboard']">主页
    </van-tabbar-item>
    <van-tabbar-item icon="encyclopedia" icon-prefix="iconfont" name="encyclopedia"
                     replace :to="tabName2Route['encyclopedia']">百科
    </van-tabbar-item>
    <van-tabbar-item icon="record" icon-prefix="iconfont" name="record"
                     replace :to="tabName2Route['record']">记录
    </van-tabbar-item>
    <van-tabbar-item icon="location" icon-prefix="iconfont" name="farmland-data"
                     replace :to="tabName2Route['farmland-data']">土壤养分
    </van-tabbar-item>
    <van-tabbar-item icon="profile" icon-prefix="iconfont" name="profile"
                     replace :to="tabName2Route['profile']">我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>