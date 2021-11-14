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
  LOAD_USER_PAGE_BEGIN,
  LOAD_USER_PAGE_SUCCESS,
  LOAD_USER_PAGE_FAIL,
  LOAD_USER_PAGE_CLEANUP,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_CLEANUP,
} from '../constants/users.constant'
import reducer from '../reducers/users.reducer'
import UsersService from '../services/users.service'
import { useUIContext } from './UI.context'
import { errorMessage } from '../helper/handleErrorMessage'
// import { sleep } from '../helper/sleep'

const UsersStateContext = React.createContext<any | null>({})
const UsersDispatchContext = React.createContext<any | null>({})

const initialState = {
  creators: [],
  creators_loading: true,
  clients: [],
  clients_loading: true,
  user: {},
  user_loading: true,
  userArtworks: [],
  userArtworks_loading: true,
  user_page_loading: true,
  search_results: [],
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
    // await sleep(400)
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

  const loadUserPage = async (user_name: string) => {
    dispatch({ type: LOAD_USER_PAGE_BEGIN })
    // await sleep(200)
    await UsersService.fetchUser(user_name)
      .then(async (user) => {
        const artworks = await UsersService.fetchUserArtworks(user.id, 1)
        dispatch({
          type: LOAD_USER_PAGE_SUCCESS,
          payload: { user: user, userArtworks: artworks },
        })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: LOAD_USER_PAGE_FAIL })
      })
  }

  const loadUserPageCleanup = () => {
    dispatch({ type: LOAD_USER_PAGE_CLEANUP })
  }

  const searchUser = async (userName: string) => {
    if (userName === '') return
    await UsersService.searchUser(userName)
      .then((users) => {
        dispatch({ type: SEARCH_USER_SUCCESS, payload: users })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const searchUserCleanup = () => {
    dispatch({ type: SEARCH_USER_CLEANUP })
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
          loadUserPage,
          loadUserPageCleanup,
          searchUser,
          searchUserCleanup,
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
