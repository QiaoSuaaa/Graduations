import { message } from 'ant-design-vue'
// 1、导出的方式不同
// 2、参数的默认属性值showErrorMsg = true
// 3、返回一个对象，对象中有多个方法
// 4、回调函数
export const result = (response, showErrorMsg = true) => {
  const { data } = response
  if (data.code != 0 && showErrorMsg) {
    message.error(data.msg)
  }
  return {
    success(callback) {
      if (data.code === 0) {
        callback(data, response)
      }
      return this
    },
    faile(callback) {
      if (data.code !== 0) {
        callback(data, response)
      }
      return this
    },
    finally(callback) {
      callback(data, response)
      return this
    },
  }
}
export const clone = obj => {
  return JSON.parse(JSON.stringify(obj))
}
export const formateTimeSta = ts => {
  const date = new Date(Number(ts))
  const YYYY = date.getFullYear()
  const MM = date.getMonth() + 1
  const DD = date.getDate()
  return `${YYYY}-${MM}-${DD}`
}
