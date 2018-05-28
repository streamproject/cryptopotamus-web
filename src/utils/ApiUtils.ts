import axios from 'axios'
import { API_URL } from '../config'

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

const localStorage = window.localStorage

export const users = {
  async me() {
    try {
      const response = await instance.post(
        'user/me',
        null,
        { headers: { authorization: localStorage.getItem('token') } },
      )

      return response
    } catch (err) {
      return
    }
  },

  meById(channelId: string) {
    return instance.post('user/meById', { channelId }, { headers: { authorization: localStorage.getItem('token') } })
  },

  updateUser(
    data: { ethAddress?: string, streamlabsId?: string },
  ) {
    return instance.post('user/update', data, { headers: { authorization: localStorage.getItem('token') } })
  },

  deleteUser() {
    return instance.post('user/delete', null, { headers: { authorization: localStorage.getItem('token') } })
  },

  async findUser() {
    try {
      const thing = await instance.post(
        'user/findUser',
        null,
        { headers: { authorization: localStorage.getItem('token') } },
      )

      return thing
    } catch (err) {
      return
    }
  },

  findUserById(channelId) {
    return instance.post(
      'user/findUserById',
      { channelId }, { headers: { authorization: localStorage.getItem('token') } },
    )
  },

  testAlert() {
    return instance.post(
      'user/sendTestNotification',
      {}, { headers: { authorization: localStorage.getItem('token') } },
    )
  },

  sendTx(txHash, message, name, value, valueUSD) {
    return instance.post('user/sendTx',
      { txHash, message, name, value, valueUSD },
    )
  },
}

export const auth = {
  twitch() {
    return instance.get('auth/twitch')
  },

  twitchLogin: `${API_URL}/auth/twitch`,

  streamlabsConnect: `${API_URL}/auth/streamlabs`,
}
