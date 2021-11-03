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

const clientFetchAllRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/client',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

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

const creatorFetchAllRequests = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/requests/creator',
    headers: authHeader(),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

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
    headers: authHeader()
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
    headers: authHeader()
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

// ===================================

export default {
  createRequest,
  clientFetchAllRequests,
  clientFetchDefaultRequests,
  clientFetchProgressingRequests,
  clientFetchSubmittedRequests,
  clientFetchDoneRequests,
  clientFetchCancelRequests,
  creatorFetchAllRequests,
  creatorFetchDefaultRequests,
  creatorFetchProgressingRequests,
  creatorFetchSubmittedRequests,
  creatorFetchDoneRequests,
  creatorFetchCancelRequests,
}
