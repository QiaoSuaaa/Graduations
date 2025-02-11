import instance from '../instance'

export const list = () => {
  return instance.get('/character/list')
}
