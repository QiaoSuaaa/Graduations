import store from '@/store'
export const getCharactersInfo = id => {
  const { characterInfo } = store.state
  const one = characterInfo.find(item => {
    return item._id == id
  })
  return one || { title: '未知角色' }
}
