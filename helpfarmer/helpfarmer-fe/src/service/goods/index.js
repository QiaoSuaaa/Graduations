import instance from '../instance'
//获取
export const list = (pageNo, pageSize, addForm) => {
  return instance.get('/goods/list', { params: { pageNo, pageSize, addForm } })
}
export const add = addForm => {
  return instance.post('/goods/add', addForm)
}
export const update = addForm => {
  return instance.put('/goods/update', addForm)
}
export const deletes = id => {
  return instance.get(`/goods/delete/${id}`)
}
