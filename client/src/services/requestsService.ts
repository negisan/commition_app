import axios from 'axios'
import authHeader from './auth-header'
import { BASE_API_URL } from '../helper/constants'

interface OrderData {
  order_price: number
  order_content: string
  creator_id: number
  client_id: number
}

const createRequest = async (order_data: OrderData) => {
  return await axios({
    method: 'post',
    url: BASE_API_URL + '/requests',
    headers: authHeader(),
    data: {
      order: order_data
    }
  }).then(() => {
    return Promise.resolve()
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export default {
  createRequest,
}
