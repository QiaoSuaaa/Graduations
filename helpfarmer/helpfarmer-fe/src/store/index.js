import { result } from '@/helpers/utils'
import { character, users } from '@/service'
import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: [],
    characterInfo: [],
  },
  getters: {
    userName(state) {
      return state.userInfo.name
    },
    userCharacter(state) {
      return state.userInfo.character
    },
  },
  mutations: {
    SETUSERINFO(state, data) {
      state.userInfo = data
    },
    SETCHARACTERINFO(state, data) {
      state.characterInfo = data
    },
    CLEARUSERINFO(state) {
      state.userInfo = []
      state.characterInfo = [] // 清除角色信息
    },
  },
  actions: {
    async getUserinfo(store) {
      try {
        const res = await users.list()
        result(res).success(({ data }) => {
          store.commit('SETUSERINFO', data)
        })
      } catch (error) {
        console.error('没有找到用户信息:', error)
      }
    },
    async getCharacterInfo(store) {
      try {
        const res = await character.list()
        result(res).success(({ data }) => {
          store.commit('SETCHARACTERINFO', data)
        })
      } catch (error) {
        console.error('没有找到用户信息:', error)
      }
    },
    // 退出功能
    logout(store) {
      store.commit('CLEARUSERINFO')

      localStorage.removeItem('_helpfarmer')
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('userCharacter')
    },
  },
  modules: {},
})
