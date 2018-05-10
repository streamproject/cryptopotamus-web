import axios from 'axios'
// import { BASE_URL } from '../config'
// TO DO CONFIG BASE URL
// TO DO ADD TYPES

const instance = axios.create({
  baseURL: 'https://localhost:8000/api/v1/',
  timeout: 10000,
})

export const auth = {
  loginTwitch() {
    return instance.post('auth/twitch')
  },

  loginStreamlabs() {
    return instance.post('auth/streamlabs')
  },

}

export const user = {
    updateUser(
        data: {ethAddress, streamlabsId},
    ) {
        return instance.post('user/updateUser', data)
    },
    deleteUser() {
        return instance.post('user/deleteUser')
    },
}
