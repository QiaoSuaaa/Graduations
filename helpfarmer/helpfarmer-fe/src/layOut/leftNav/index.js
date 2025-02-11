import { computed, ref, watchEffect } from 'vue'
import { defineComponent } from 'vue'
import {
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
  DownOutlined,
  AntDesignOutlined,
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import store from '@/store'
//进度条
export default defineComponent({
  components: {
    UserOutlined,
    PieChartOutlined,
    DesktopOutlined,
    TeamOutlined,
    FileOutlined,
    DownOutlined,
    AntDesignOutlined,
  },
  name: 'leftNav',
  setup() {
    const collapsed = ref(false)
    const selectedKeys = ref(['1'])
    const routes = useRoute()
    const router = useRouter()
    const breadcrumb = ref(['首页']) // 默认的面包屑项
    // 使用计算属性动态生成面包屑
    const userName = sessionStorage.getItem('userName')
    const userCharacters = sessionStorage.getItem('userCharacter')
    const updateBreadcrumb = () => {
      const matchedRoutes = routes.matched // 获取当前路由的所有匹配路由
      breadcrumb.value = matchedRoutes
        .map(route => route.meta.breadcrumb) // 提取每个路由的 breadcrumb 信息
        .filter(Boolean) // 过滤掉 undefined 或 null 的项
    }

    // 监听路由变化，动态更新面包屑
    watchEffect(() => {
      updateBreadcrumb()
    })
    const logout = () => {
      store.dispatch('logout')
      router.push('/login')
    }
    return {
      collapsed,
      selectedKeys,
      breadcrumb,
      logout,
      userName,
      userCharacters,
    }
  },
})
