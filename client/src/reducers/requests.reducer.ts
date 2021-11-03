import {
  CLIENT_FETCH_ALL_REQUESTS,
  CLIENT_FETCH_CANCEL_REQUESTS,
  CLIENT_FETCH_DEFAULT_REQUESTS,
  CLIENT_FETCH_DONE_REQUESTS,
  CLIENT_FETCH_PROGRESSING_REQUESTS,
  CLIENT_FETCH_SUBMITTED_REQUESTS,
  CREATOR_FETCH_ALL_REQUESTS,
  CREATOR_FETCH_CANCEL_REQUESTS,
  CREATOR_FETCH_DEFAULT_REQUESTS,
  CREATOR_FETCH_DONE_REQUESTS,
  CREATOR_FETCH_PROGRESSING_REQUESTS,
  CREATOR_FETCH_SUBMITTED_REQUESTS,
} from '../constants/requests.constat'

const requests_reducer = (state: any, action: any) => {
  if (action.type === CLIENT_FETCH_ALL_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  if (action.type === CLIENT_FETCH_DEFAULT_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  if (action.type === CLIENT_FETCH_PROGRESSING_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  if (action.type === CLIENT_FETCH_SUBMITTED_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  if (action.type === CLIENT_FETCH_DONE_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  if (action.type === CLIENT_FETCH_CANCEL_REQUESTS) {
    return { ...state, requests: action.payload }
  }

  if (action.type === CREATOR_FETCH_ALL_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  if (action.type === CREATOR_FETCH_DEFAULT_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  if (action.type === CREATOR_FETCH_PROGRESSING_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  if (action.type === CREATOR_FETCH_SUBMITTED_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  if (action.type === CREATOR_FETCH_DONE_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  if (action.type === CREATOR_FETCH_CANCEL_REQUESTS) {
    return { ...state, requests: action.payload }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default requests_reducer
