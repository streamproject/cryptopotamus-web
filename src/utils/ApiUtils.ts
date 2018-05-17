import axios from 'axios'
// import { BASE_URL } from '../config'
// TO DO CONFIG BASE URL
// TO DO ADD TYPES

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  timeout: 10000,
})

const token = window.localStorage.getItem('token')

export const users = {
  me() {
    return instance.post('user/me', null, { headers: { authorization: token } })
  },
  meById(channelId: string) {
    return instance.post('user/meById', { channelId }, { headers: { authorization: token } })
  },
  updateUser(
    data: { ethAddress?: string, streamlabsId?: string },
  ) {
    return instance.post('user/update', data, { headers: { authorization: token } })
  },
  deleteUser() {
    return instance.post('user/delete', null, { headers: { authorization: token } })
  },
  async findUser() {
    try {
      const thing = await instance.post('user/findUser', null, { headers: { authorization: token } })
      return thing
    } catch (err) {
      return
    }
  },
  findUserById(channelId) {
    return instance.post('user/findUserById', { channelId }, { headers: { authorization: token } })
  },
  testAlert(name, message, value) {
    return instance.post('user/sendTestNotification', { name, message, value }, { headers: { authorization: token } })
  },
  sendTx(txHash, message, name, value) {
    return instance.post('user/sendTx', { txHash, message, name, value }, { headers: { authorization: token } })
  },
}
