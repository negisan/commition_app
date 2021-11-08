import React, { useContext, useReducer } from 'react'

import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FETCH_USER_CLEANUP,
  FETCH_USER_ARTWORKS_BEGIN,
  FETCH_USER_ARTWORKS_SUCCESS,
  FETCH_USER_ARTWORKS_FAIL,
  FETCH_USER_ARTWORKS_CLEANUP,
  FETCH_CREATORS_BEGIN,
  FETCH_CREATORS_SUCCESS,
  FETCH_CREATORS_FAIL,
  FETCH_CLIENTS_BEGIN,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAIL,
} from '../constants/users.constant'
import reducer from '../reducers/users.reducer'
import UsersService from '../services/users.service'
import { useUIContext } from './UI.context'
import { errorMessage } from '../helper/handleErrorMessage'

const UsersStateContext = React.createContext<any | null>({})
const UsersDispatchContext = React.createContext<any | null>({})

const initialState = {
  creators: [],
  creators_loading: false,
  clients: [],
  clients_loading: false,
  user: {},
  user_loading: false,
  userArtworks: [],
  userArtworks_loading: false,
}

export const UsersProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { toastError } = useUIContext()

  const fetchCreators = async (page: number = 1) => {
    dispatch({ type: FETCH_CREATORS_BEGIN })
    await UsersService.fetchUsers('creator', page)
      .then((users) => {
        dispatch({ type: FETCH_CREATORS_SUCCESS, payload: users })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_CREATORS_FAIL })
      })
  }

  const fetchClients = async (page: number = 1) => {
    dispatch({ type: FETCH_CLIENTS_BEGIN })
    await UsersService.fetchUsers('client', page)
      .then((users) => {
        dispatch({ type: FETCH_CLIENTS_SUCCESS, payload: users })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_CLIENTS_FAIL })
      })
  }

  const fetchUser = async (user_name: string) => {
    dispatch({ type: FETCH_USER_BEGIN })
    await UsersService.fetchUser(user_name)
      .then((user) => {
        dispatch({ type: FETCH_USER_SUCCESS, payload: user })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_USER_FAIL })
      })
  }

  const fetchUserCleanup = () => {
    dispatch({ type: FETCH_USER_CLEANUP })
  }

  const fetchUserArtworks = async (user_id: number, page: number = 1) => {
    dispatch({ type: FETCH_USER_ARTWORKS_BEGIN })
    await UsersService.fetchUserArtworks(user_id, page)
      .then((artworks) => {
        dispatch({ type: FETCH_USER_ARTWORKS_SUCCESS, payload: artworks })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_USER_ARTWORKS_FAIL })
      })
  }

  const fetchUserArtworksCleanup = () => {
    dispatch({ type: FETCH_USER_ARTWORKS_CLEANUP })
  }

  return (
    <UsersStateContext.Provider value={{ ...state }}>
      <UsersDispatchContext.Provider
        value={{
          fetchCreators,
          fetchClients,
          fetchUser,
          fetchUserCleanup,
          fetchUserArtworks,
          fetchUserArtworksCleanup,
        }}
      >
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  )
}

export const useUsersStateContext = () => {
  return useContext(UsersStateContext)
}

export const useUsersDispatchContext = () => {
  return useContext(UsersDispatchContext)
}
