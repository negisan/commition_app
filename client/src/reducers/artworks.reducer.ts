import {
  FETCH_ARTWORK_BEGIN,
  FETCH_ARTWORK_SUCCESS,
  FETCH_ARTWORK_FAIL,
  FETCH_ARTWORK_CLEANUP,
  FETCH_ARTWORKS_BEGIN,
  FETCH_ARTWORKS_SUCCESS,
  FETCH_ARTWORKS_FAIL,
  FETCH_MORE_ARTWORKS_SUCCESS,
  FETCH_MORE_ARTWORKS_FAIL,
  FETCH_ARTWORKS_CLEANUP,
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

  if (action.type === FETCH_ARTWORKS_BEGIN) {
    return { ...state, artworks_loading: true }
  }
  if (action.type === FETCH_ARTWORKS_SUCCESS) {
    return { ...state, artworks: action.payload, artworks_loading: false }
  }
  if (action.type === FETCH_ARTWORKS_FAIL) {
    return { ...state, artworks_loading: false }
  }
  if (action.type === FETCH_ARTWORKS_CLEANUP) {
    return { ...state, artworks_loading: true }
  }

  if (action.type === FETCH_MORE_ARTWORKS_SUCCESS) {
    return { ...state, all_artworks: state.all_artworks.concat(action.payload) }
  }
  if (action.type === FETCH_MORE_ARTWORKS_FAIL) {
    return { ...state, has_more_artworks: false }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default artwork_reducer
