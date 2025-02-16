import instance from '../instance'
//获取import instance from '../instance';

// 获取商品列表
export const list = (pageNo, pageSize, addForm) => {
  return instance.get('/goods/list', { params: { pageNo, pageSize, addForm } })
}

// 添加商品
export const add = addForm => {
  const formData = new FormData()
  for (const key in addForm) {
    if (key === 'images' && Array.isArray(addForm[key])) {
      addForm[key].forEach(file => formData.append('images', file))
    } else {
      formData.append(key, addForm[key])
    }
  }
  return instance.post('/goods/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 更新商品
export const update = addForm => {
  const formData = new FormData()
  for (const key in addForm) {
    if (key === 'images' && Array.isArray(addForm[key])) {
      addForm[key].forEach(file => formData.append('images', file))
    } else {
      formData.append(key, addForm[key])
    }
  }
  return instance.put('/goods/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 删除商品
export const deletes = id => {
  return instance.get(`/goods/delete/${id}`)
}
