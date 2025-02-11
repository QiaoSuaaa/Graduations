import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//antdesign
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
//表格
import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .use(VxeTable)
  .use(VxeUI)
  .mount('#app')
