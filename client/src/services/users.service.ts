import axios from 'axios'
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

const searchUser = async (userName: string) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + `/public/search/user?name=${userName}`,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

// eslint-disable-next-line
export default {
  searchUser,
  fetchUsers,
  fetchUser,
  fetchUserArtworks,
}
