import {FETCH_ARTWORK_SUCCESS, FETCH_ARTWORKS_SUCCESS} from '../constants/artworks.constant'

const artwork_reducer = (state: any, action: any) => {
  if (action.type === FETCH_ARTWORK_SUCCESS) {
    return {...state, artwork: action.payload}
  }
  if (action.type === FETCH_ARTWORKS_SUCCESS) {
    return {...state, artworks: action.payload}
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default artwork_reducer