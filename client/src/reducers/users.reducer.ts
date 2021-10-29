import { FETCH_USER_SUCCESS } from '../constants/users.constant'

const users_reducer = (state: any, action: any) => {
  if (action.type === FETCH_USER_SUCCESS) {
    return { ...state, user: action.payload }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default users_reducer
