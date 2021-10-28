import axios from 'axios'
import authHeader from './auth-header'

const BASE_API_URL = 'http://localhost:4000/'

interface RegisterCredenntials {
  name: string
  email: string
  password: string
}

const register = async (credentials: RegisterCredenntials) => {
  return await axios
    .post(BASE_API_URL + 'users', JSON.stringify(credentials))
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data))
      return res.data
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export default {
  register,
}
