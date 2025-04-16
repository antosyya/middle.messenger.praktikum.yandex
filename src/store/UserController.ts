import userApi from '../api/user/UserApi'
import { IProfile, User, UserPassword } from '../types/User'
import store from './store'
class UserController {
  async changeProfile(data: IProfile) {
    try {
      const responce = await userApi.changeProfile(data)
      if (responce.status === 200) {
        store.set('user', JSON.parse(responce.response))
        return responce.response
      }
    } catch (e) {
      console.log(e)
    }
  }
  async changeAvatar(file: File) {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const responce = await userApi.changeAvatar(formData)
      const user = JSON.parse(responce.response)
      if (responce.status === 200) {
        return user
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText)
      }
    } catch (e) {
      console.log(e)
    }
  }
  async changePassword(data: UserPassword) {
    try {
      const responce = await userApi.changePassword(data)
      if (responce.status === 200) {
        return responce.response as User[]
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText)
      }
    } catch (e) {
      console.log(e)
    }
  }
  async searchUser(data: string) {
    try {
      const responce = await userApi.searchUser(data)
      if (responce.status === 200) {
        return JSON.parse(responce.response) as User[]
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
export default new UserController()
