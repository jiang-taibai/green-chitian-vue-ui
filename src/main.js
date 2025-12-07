import {createApp} from 'vue'
import App from './App.vue'
import '@/assets/iconfont/iconfont.css'
import './assets/css/style.css'

import router from './assets/js/router'
import TMap from '@map-component/vue-tmap';
import {createPinia} from 'pinia'
import { loadConfig } from '@/assets/js/public/config-center.js'

(async () => {
  await loadConfig();

  const app = createApp(App)

  // 引入路由
  app.use(router)

  // 引入地图组件
  app.use(TMap)

  // 引入 Pinia
  app.use(createPinia())

  app.mount('#app')
})();
