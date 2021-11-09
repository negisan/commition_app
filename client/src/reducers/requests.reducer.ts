import {
  FETCH_REQUESTS_BEGIN,
  FETCH_REQUESTS_FAIL,
  FETCH_REQUESTS_SUCCESS,
  FETCH_REQUESTS_CLEANUP,
} from '../constants/requests.constat'

const requests_reducer = (state: any, action: any) => {
  if (action.type === FETCH_REQUESTS_BEGIN) {
    return { ...state, requests_loading: true }
  }
  if (action.type === FETCH_REQUESTS_SUCCESS) {
    return { ...state, requests: action.payload, requests_loading: false }
  }
  if (action.type === FETCH_REQUESTS_FAIL) {
    return { ...state, requests_loading: false }
  }
  if (action.type === FETCH_REQUESTS_CLEANUP) {
    return { ...state, requests: [], requests_loading: true }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default requests_reducer
