import axios from 'axios'
import authHeader from './auth-header'
import { BASE_API_URL } from '../helper/constants'

interface OrderData {
  order_price: number
  order_content: string
  creatorId: number
  clientId: number
}

const createRequest = async (order_data: OrderData) => {
  return await axios({
    method: 'post',
    url: BASE_API_URL + '/requests',
    headers: authHeader(),
    data: {
      order: order_data,
    },
  })
    .then(() => {
      return Promise.resolve()
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}
// ================================================================================================
type RequestState = | 'state_default' | 'progressing' | 'submitted' | 'done' | 'cancel'

const clientFetchRequests = async (state :RequestState) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + `/requests/client?state=${state}`,
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const creatorFetchRequests = async (state: RequestState) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + `/requests/creator?state=${state}`,
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

// ======================================================================
const acceptRequest = async (request: any) => {
  return axios({
    headers: authHeader(),
    method: 'post',
    url: BASE_API_URL + '/requests/accept?request=' + request.id,
  })
    .then(() => {
      return Promise.resolve()
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const cancelRequest = async (request: any) => {
  return axios({
    headers: authHeader(),
    method: 'post',
    url: BASE_API_URL + '/requests/cancel?request=' + request.id,
  })
    .then(() => {
      return Promise.resolve()
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const submitRequest = async (request: any, artwork: any) => {
  const data = new FormData()
  data.append('file', artwork)
  return await axios({
    headers: authHeader(),
    method: 'post',
    url: BASE_API_URL + '/artworks?request=' + request.id,
    data: data,
  })
    .then(() => {
      return Promise.resolve()
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const completeRequest = async (request: any, comment: string) => {
  return await axios({
    headers: authHeader(),
    method: 'post',
    url: BASE_API_URL + '/requests/complete?request=' + request.id,
    data: { comment: comment },
  })
    .then(() => {
      return Promise.resolve()
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

 // eslint-disable-next-line
export default {
  createRequest,
  clientFetchRequests,
  creatorFetchRequests,
  acceptRequest,
  cancelRequest,
  submitRequest,
  completeRequest,
}
