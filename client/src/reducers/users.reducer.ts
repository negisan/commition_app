import {
  FETCH_USER_SUCCESS,
  UPDATE_USER_ICON_SUCCESS,
} from '../constants/users.constant'

const users_reducer = (state: any, action: any) => {
  if (action.type === FETCH_USER_SUCCESS) {
    return { ...state, user: action.payload }
  }
  if (action.type === UPDATE_USER_ICON_SUCCESS) {
    return { ...state, user: action.payload }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default users_reducer
