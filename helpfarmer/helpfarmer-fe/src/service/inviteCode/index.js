import instance from '../instance'

export const invitecode = () => {
  return instance.get('/invite/add')
}
