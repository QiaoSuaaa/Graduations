import instance from '../instance'
//获取
export const list = (pageNo, pageSize, addForm) => {
  return instance.get('/auth/list', { params: { pageNo, pageSize, addForm } })
}
export const add = addForm => {
  return instance.post('/auth/add', addForm)
}
export const update = addForm => {
  return instance.put('/auth/update', addForm)
}
export const deletes = id => {
  return instance.get(`/auth/delete/${id}`)
}
