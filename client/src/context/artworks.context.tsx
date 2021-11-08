import React, { useContext, useReducer } from 'react'

import reducer from '../reducers/artworks.reducer'
import {
  FETCH_ARTWORKS_BEGIN,
  FETCH_ARTWORKS_SUCCESS,
  FETCH_ARTWORKS_FAIL,
  FETCH_ARTWORK_BEGIN,
  FETCH_ARTWORK_CLEANUP,
  FETCH_ARTWORK_FAIL,
  FETCH_ARTWORK_SUCCESS,
  FETCH_MORE_ARTWORKS_FAIL,
  FETCH_MORE_ARTWORKS_SUCCESS,
} from '../constants/artworks.constant'
import artworksService from '../services/artworks.service'
import { useUIContext } from './UI.context'
import { errorMessage } from '../helper/handleErrorMessage'

const ArtworksStateContext = React.createContext<any | null>({})
const ArtworksDispatchContext = React.createContext<any | null>({})

const initialState = {
  artwork: {},
  artwork_creator: {},
  artwork_loading: false,
  artworks: [],
  artworks_loading: false,
  all_artworks: [],
  has_more_artworks: true,
}

type SortType = 'new_date' | 'old_date'

export const ArtworksProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { toastError } = useUIContext()

  const fetchArtworks = async (
    page: number = 1,
    sort: SortType = 'new_date'
  ) => {
    dispatch({ type: FETCH_ARTWORKS_BEGIN })
    await artworksService
      .fetchArtworks(page, sort)
      .then((artworks) => {
        dispatch({ type: FETCH_ARTWORKS_SUCCESS, payload: artworks })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_ARTWORKS_FAIL })
      })
  }

  const loadMoreArtworks = async (page: any) => {
    console.log(page)
    await artworksService
      .fetchArtworks(page, 'new_date')
      .then((artworks) => {
        if (artworks.length < 1) {
          dispatch({ type: FETCH_MORE_ARTWORKS_FAIL })
          return
        }
        dispatch({ type: FETCH_MORE_ARTWORKS_SUCCESS, payload: artworks })
      })
      .catch((err) => {
        toastError(errorMessage(err))
      })
  }

  const fetchArtwork = async (artworkId: any) => {
    dispatch({ type: FETCH_ARTWORK_BEGIN })
    await artworksService
      .fetchArtwork(artworkId)
      .then((requestWithArtwork) => {
        dispatch({ type: FETCH_ARTWORK_SUCCESS, payload: requestWithArtwork })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_ARTWORK_FAIL })
      })
  }

  const fetchArtworkCleanup = () => {
    dispatch({ type: FETCH_ARTWORK_CLEANUP })
  }

  return (
    <ArtworksStateContext.Provider value={{ ...state }}>
      <ArtworksDispatchContext.Provider
        value={{
          fetchArtwork,
          fetchArtworkCleanup,
          fetchArtworks,
          loadMoreArtworks,
        }}
      >
        {children}
      </ArtworksDispatchContext.Provider>
    </ArtworksStateContext.Provider>
  )
}

export const useArtworksStateContext = () => {
  return useContext(ArtworksStateContext)
}

export const useArtworksDispatchContext = () => {
  return useContext(ArtworksDispatchContext)
}
