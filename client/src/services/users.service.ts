import axios from 'axios'
import authHeader from './auth-header'
import { BASE_API_URL } from '../helper/constants'

type UserType = 'creator' | 'client'

const fetchUsers = async (user_type: UserType, page: number) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + `/public/users/?user_type=${user_type}&page=${page}`,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const fetchUser = async (user_name: string) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/public/users/' + user_name,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const fetchUserArtworks = async (user_id: number, page: number) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + `/public/user/artworks?user=${user_id}&page=${page}`,
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
  fetchUsers,
  fetchUser,
  fetchUserArtworks,
  updateUserIcon,
}
