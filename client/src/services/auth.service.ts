import axios from 'axios'
import authHeader from './auth-header'
import { BASE_API_URL } from '../helper/constants'

interface RegisterCredenntials {
  name: string
  email: string
  password: string
}

const register = async (credentials: RegisterCredenntials) => {
  return await axios({
    method: 'post',
    url: BASE_API_URL + '/users',
    data: credentials,
  })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data))
      return res.data
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const fetchUser = async () => {
  // @ts-ignore
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/users',
    headers: authHeader(),
  })
    .then((res) => {
      if (res.data) {
        return res.data
      }
    })
    .catch((err) => {
      return err
    })
}

interface LoginCredentials {
  email: string
  password: string
}

const login = async (credentials: LoginCredentials) => {
  return await axios({
    method: 'post',
    url: BASE_API_URL + '/signin',
    data: credentials,
  })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data))
      return Promise.resolve()
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const updateUserIcon = async (user_id: number, new_user_icon: any) => {
  const data = new FormData()
  data.append('file', new_user_icon)
  return await axios({
    headers: authHeader(),
    method: 'put',
    url: BASE_API_URL + `/users/${user_id}/icon`,
    data: data,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const setAcceptingOrderToFalse = async (user_id: number) => {
  const data = {
    accepting_order: false,
  }
  return await axios({
    url: BASE_API_URL + `/users/${user_id}?update_type=accepting_order`,
    method: 'put',
    headers: authHeader(),
    data: data,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const setAcceptingOrderToTrue = async (user_id: number) => {
  const data = {
    accepting_order: true,
  }
  return await axios({
    url: BASE_API_URL + `/users/${user_id}?update_type=accepting_order`,
    method: 'put',
    headers: authHeader(),
    data: data,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const updateDefaultOrderPrice = async (user_id: number, price: number) => {
  const data = {
    default_order_price: price,
  }
  return axios({
    method: 'put',
    url: BASE_API_URL + `/users/${user_id}?update_type=default_order_price`,
    headers: authHeader(),
    data: data,
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
  register,
  fetchUser,
  login,
  updateUserIcon,
  setAcceptingOrderToFalse,
  setAcceptingOrderToTrue,
  updateDefaultOrderPrice,
}
