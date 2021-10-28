import axios from 'axios'
import authHeader from './auth-header'

const BASE_API_URL = 'http://localhost:4000'

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

export default {
  register,
  fetchUser,
}
