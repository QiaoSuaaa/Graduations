import { defineComponent, reactive, ref } from 'vue'
import { auth, users } from '@/service'
import { message } from 'ant-design-vue'
import { result } from '@/helpers/utils'
import { setToken } from '@/helpers/token'
import store from '@/store'
import { getUsersinfos } from '@/helpers/user'
import { useRouter } from 'vue-router'
import { getCharactersInfo } from '@/helpers/character'
export default defineComponent({
  setup() {
    const router = useRouter()
    const randomTime = new Date().getTime()
    const formData = reactive({
      account: '',
      password: '',
      password2: '',
      invitecode: '',
      name: '',
    })
    const loginForm = reactive({
      account: '',
      password: '',
    })
    const setNamerandom = () => {
      const timestamp = new Date().getTime() // 获取当前时间的时间戳
      formData.name = `random_${timestamp}` // 将时间戳添加到随机值中
    }
    const register = async () => {
      if (formData.password != formData.password2) {
        message.info('你输入的密码不同')
        return
      } else {
        setNamerandom()
        if (formData.account == '') {
          message.info('账号不能为空！')
          return
        }
        if (formData.password == '') {
          message.info('密码不能为空！')
          return
        }
        const res = await auth.register(
          formData.account,
          formData.password,
          formData.name,
          formData.invitecode
        )
        result(res).success(data => {
          message.success(data.msg)
        })
      }
    }
    const login = async () => {
      if (loginForm.account == '') {
        message.info('账号不能为空！')
        return
      }
      if (loginForm.password == '') {
        message.info('密码不能为空！')
        return
      }
      const res = await auth.login(loginForm.account, loginForm.password)
      result(res).success(({ msg, data: { user, token } }) => {
        message.success(msg)
        store.commit('SETUSERINFO', user)
        store.commit('SETCHARACTERINFO', getCharactersInfo(user.character))
        setToken(token)
        sessionStorage.setItem('userName', user.name)
        sessionStorage.setItem('userCharacter', user.character)

        router.replace('/home')
      })
    }
    return {
      formData,
      loginForm,
      register,
      login,
    }
  },
})
