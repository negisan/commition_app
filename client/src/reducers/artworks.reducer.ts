import {
  FETCH_ARTWORK_SUCCESS,
  FETCH_ARTWORKS_SUCCESS,
  FETCH_ARTWORK_BEGIN,
  FETCH_ARTWORK_FAIL,
  FETCH_ARTWORK_CLEANUP,
} from '../constants/artworks.constant'

const artwork_reducer = (state: any, action: any) => {
  if (action.type === FETCH_ARTWORK_BEGIN) {
    return { ...state, artwork_loading: true }
  }
  if (action.type === FETCH_ARTWORK_SUCCESS) {
    return {
      ...state,
      artwork: {
        thanks_comment: action.payload.thanks_comment,
        order_comment: action.payload.order_comment,
        artwork_image: action.payload.Artwork.content,
      },
      artwork_creator: action.payload.creator,
      artwork_loading: false,
    }
  }
  if (action.type === FETCH_ARTWORK_FAIL) {
    return { ...state, artwork_loading: false }
  }
  if (action.type === FETCH_ARTWORK_CLEANUP) {
    return { ...state, artwork: {}, artwork_creator: {} }
  }
  if (action.type === FETCH_ARTWORKS_SUCCESS) {
    return { ...state, artworks: action.payload }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default artwork_reducer
