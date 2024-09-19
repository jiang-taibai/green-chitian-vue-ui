import {createApp} from 'vue'
import './assets/css/style.css'
import App from './App.vue'

const app = createApp(App)

import router from './assets/js/router'

app.use(router)

app.mount('#app')
