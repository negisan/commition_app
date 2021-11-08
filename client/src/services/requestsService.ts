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

// client ===================================
const clientFetchDefaultRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/client?state=state_default',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const clientFetchProgressingRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/client?state=progressing',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const clientFetchSubmittedRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/client?state=submitted',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const clientFetchDoneRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/client?state=done',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const clientFetchCancelRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/client?state=cancel',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

// creator =============================================================
const creatorFetchDefaultRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/creator?state=state_default',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const creatorFetchProgressingRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/creator?state=progressing',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const creatorFetchSubmittedRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/creator?state=submitted',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const creatorFetchDoneRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/creator?state=done',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const creatorFetchCancelRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/creator?state=cancel',
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

export default {
  createRequest,
  clientFetchDefaultRequests,
  clientFetchProgressingRequests,
  clientFetchSubmittedRequests,
  clientFetchDoneRequests,
  clientFetchCancelRequests,
  creatorFetchDefaultRequests,
  creatorFetchProgressingRequests,
  creatorFetchSubmittedRequests,
  creatorFetchDoneRequests,
  creatorFetchCancelRequests,
  acceptRequest,
  cancelRequest,
  submitRequest,
  completeRequest,
}
