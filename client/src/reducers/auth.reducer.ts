import {
  FETCH_USER_SUCCESS,
  LOGOUT,
  UPDATE_ACCEPTING_ORDER_BEGIN,
  UPDATE_ACCEPTING_ORDER_FAIL,
  UPDATE_ACCEPTING_ORDER_SUCCESS,
  UPDATE_DEFAULT_ORDER_PRICE_BEGIN,
  UPDATE_DEFAULT_ORDER_PRICE_FAIL,
  UPDATE_DEFAULT_ORDER_PRICE_SUCCESS,
  UPDATE_USER_ICON_BEGIN,
  UPDATE_USER_ICON_FAIL,
  UPDATE_USER_ICON_SUCCESS,
} from '../constants/auth.constant'

const auth_reducer = (state: any, action: any) => {
  if (action.type === LOGOUT) {
    return {}
  }
  if (action.type === FETCH_USER_SUCCESS) {
    return { ...state, myuser: action.payload }
  }

  if (action.type === UPDATE_USER_ICON_BEGIN) {
    return { ...state, update_user_loading: true }
  }
  if (action.type === UPDATE_USER_ICON_SUCCESS) {
    return { ...state, myuser: action.payload, update_user_loading: false }
  }
  if (action.type === UPDATE_USER_ICON_FAIL) {
    return { ...state, update_user_loading: false }
  }

  if (action.type === UPDATE_ACCEPTING_ORDER_BEGIN) {
    return { ...state, update_user_loading: true }
  }
  if (action.type === UPDATE_ACCEPTING_ORDER_SUCCESS) {
    return { ...state, myuser: action.payload, update_user_loading: false }
  }
  if (action.type === UPDATE_ACCEPTING_ORDER_FAIL) {
    return { ...state, update_user_loading: false }
  }

  if (action.type === UPDATE_DEFAULT_ORDER_PRICE_BEGIN) {
    return { ...state, update_user_loading: true }
  }
  if (action.type === UPDATE_DEFAULT_ORDER_PRICE_SUCCESS) {
    return { ...state, myuser: action.payload, update_user_loading: false }
  }
  if (action.type === UPDATE_DEFAULT_ORDER_PRICE_FAIL) {
    return { ...state, update_user_loading: false }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default auth_reducer
