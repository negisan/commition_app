import React, { useContext, useReducer, useState } from 'react'

import reducer from '../reducers/artworks.reducer'
import { FETCH_ARTWORK_SUCCESS } from '../constants/artworks.constant'
import artworksService from '../services/artworks.service'
import { useUIContext } from './UI.context'
import { errorMessage } from '../helper/handleErrorMessage'

const ArtworksStateContext = React.createContext<any | null>({})
const ArtworksDispatchContext = React.createContext<any | null>({})

const initialState = {
  artwork: '',
}

export const ArtworksProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const { toastError } = useUIContext()

  const fetchArtwork = async (artworkId: any) => {
    setIsLoading(true)
    await artworksService
      .fetchArtwork(artworkId)
      .then((requestWithArtwork) => {
        dispatch({ type: FETCH_ARTWORK_SUCCESS, payload: requestWithArtwork })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  return (
    <ArtworksStateContext.Provider value={{ ...state }}>
      <ArtworksDispatchContext.Provider value={{fetchArtwork}}>
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
