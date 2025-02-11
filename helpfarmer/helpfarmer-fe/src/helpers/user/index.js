import store from '@/store'

export const getUsersinfos = id => {
  const { userInfo } = store.state
  if (userInfo._id == id) {
    const one1 = userInfo.id
    return one1 || { title: '未知角色' }
  }
}
