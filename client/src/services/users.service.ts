import axios from 'axios'
import authHeader from './auth-header'
import { BASE_API_URL } from '../helper/constants'

const fetchUser = async (user_name: string) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/public/user/' + user_name,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const updateUserIcon = async (new_user_icon: any) => {
  const data = new FormData()
  data.append('file', new_user_icon)
  // @ts-ignore
  return await axios({
    headers: authHeader(),
    method: 'put',
    url: BASE_API_URL + '/users/icon',
    data: data,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export default {
  fetchUser,
  updateUserIcon,
}
