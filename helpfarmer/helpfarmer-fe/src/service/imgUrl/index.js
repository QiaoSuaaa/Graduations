import instance from '../instance'
//获取import instance from '../instance';

// 获取商品列表
export const list = (pageNo, pageSize, addForm) => {
  return instance.get('/uploads/goods', { params: { pageNo, pageSize, addForm } })
}

