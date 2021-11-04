import {FETCH_ARTWORK_SUCCESS} from '../constants/artworks.constant'

const artwork_reducer = (state: any, action: any) => {
  if (action.type === FETCH_ARTWORK_SUCCESS) {
    return {...state, artwork: action.payload}
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default artwork_reducer