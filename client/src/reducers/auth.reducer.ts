import { FETCH_USER_SUCCESS, LOGOUT } from '../constants/auth.constant'

const auth_reducer = (state: any, action: any) => {
  if (action.type === LOGOUT) {
    return {}
  }
  if (action.type === FETCH_USER_SUCCESS) {
    return { ...state, user: action.payload }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default auth_reducer
