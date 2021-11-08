import {
  FETCH_CLIENTS_BEGIN,
  FETCH_CLIENTS_FAIL,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CREATORS_BEGIN,
  FETCH_CREATORS_FAIL,
  FETCH_CREATORS_SUCCESS,
  FETCH_USER_ARTWORKS_BEGIN,
  FETCH_USER_ARTWORKS_CLEANUP,
  FETCH_USER_ARTWORKS_FAIL,
  FETCH_USER_ARTWORKS_SUCCESS,
  FETCH_USER_BEGIN,
  FETCH_USER_CLEANUP,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
} from '../constants/users.constant'

const users_reducer = (state: any, action: any) => {
  if (action.type === FETCH_CREATORS_BEGIN) {
    return { ...state, creators_loading: true }
  }
  if (action.type === FETCH_CREATORS_SUCCESS) {
    return { ...state, creators: action.payload, creators_loading: false }
  }
  if (action.type === FETCH_CREATORS_FAIL) {
    return { ...state, creators_loading: false }
  }

  if (action.type === FETCH_CLIENTS_BEGIN) {
    return { ...state, clients_loading: true }
  }
  if (action.type === FETCH_CLIENTS_SUCCESS) {
    return { ...state, clients: action.payload, clients_loading: false }
  }
  if (action.type === FETCH_CLIENTS_FAIL) {
    return { ...state, clients_loading: false }
  }

  if (action.type === FETCH_USER_BEGIN) {
    return { ...state, user_loading: true }
  }
  if (action.type === FETCH_USER_SUCCESS) {
    return { ...state, user: action.payload, user_loading: false }
  }
  if (action.type === FETCH_USER_FAIL) {
    return { ...state, user_loading: false }
  }
  if (action.type === FETCH_USER_CLEANUP) {
    return { ...state, user: {}, user_loading: true }
  }

  if (action.type === FETCH_USER_ARTWORKS_BEGIN) {
    return { ...state, userArtworks_loading: true }
  }
  if (action.type === FETCH_USER_ARTWORKS_SUCCESS) {
    return {
      ...state,
      userArtworks: action.payload,
      userArtworks_loading: false,
    }
  }
  if (action.type === FETCH_USER_ARTWORKS_FAIL) {
    return { ...state, userArtworks_loading: false }
  }
  if (action.type === FETCH_USER_ARTWORKS_CLEANUP) {
    return { ...state, userArtworks: [] }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default users_reducer
