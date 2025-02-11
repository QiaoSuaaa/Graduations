import { getToken } from '@/helpers/token'
import leftNav from '@/layOut/leftNav/leftNav.vue'
import store from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'index',
    component: leftNav,
    children: [
      {
        path: 'users',
        name: 'users',
        component: () =>
          import(
            /* webpackChunkName: "users" */ '../views/userTab/userList.vue'
          ),
        meta: { breadcrumb: '用户管理页' },
      },
      {
        path: 'goods',
        name: 'goods',
        component: () =>
          import(
            /* webpackChunkName: "goods" */ '../views/farmersGood/goodsList.vue'
          ),
        meta: { breadcrumb: '商品管理页' },
      },
      {
        path: 'document',
        name: 'document',
        component: () =>
          import(
            /* webpackChunkName: "doucument" */ '../views/useDocument/useDocument.vue'
          ),
        meta: { breadcrumb: '说明文档' },
      },
      {
        path: 'home',
        name: 'home',
        component: () =>
          import(
            /* webpackChunkName: "home" */ '../views/farmerIndex/farmerIndex.vue'
          ),
        meta: { breadcrumb: '首页' },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(
        /* webpackChunkName: "userLogin" */ '../views/userLogin/userLogin.vue'
      ),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  if (!store.state.characterInfo.length) {
    store.dispatch('getCharacterInfo')
  }
  if (!getToken() && to.path != '/login') {
    next({
      path: '/login',
    })
  } else {
    next()
  }
})
export default router
