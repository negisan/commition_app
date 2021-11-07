import React, { useContext, useReducer, useState } from 'react'

import {
  FETCH_USERS_SUCCESS,
  FETCH_USER_ARTWORKS_SUCCESS,
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FETCH_USER_CLEANUP,
  UPDATE_USER_ICON_SUCCESS,
  FETCH_USER_ARTWORKS_BEGIN,
  FETCH_USER_ARTWORKS_FAIL,
  FETCH_USER_ARTWORKS_CLEANUP,
} from '../constants/users.constant'
import reducer from '../reducers/users.reducer'
import usersService from '../services/users.service'
import UsersService from '../services/users.service'
import { useUIContext } from './UI.context'
import { errorMessage } from '../helper/handleErrorMessage'

const UsersStateContext = React.createContext<any | null>({})
const UsersDispatchContext = React.createContext<any | null>({})

const initialState = {
  users: [],
  user: {},
  user_loading: false,
  userArtworks: [],
  userArtworks_loading: false,
}

export const UsersProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsloading] = useState<boolean>(true)
  const { toastError, toastSuccess } = useUIContext()

  const fetchUsers = async (page: number = 1) => {
    setIsloading(true)
    await UsersService.fetchUsers(page)
      .then((users) => {
        dispatch({ type: FETCH_USERS_SUCCESS, payload: users })
        setIsloading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsloading(false)
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

  const [newUserIcon, setNewUserIcon] = useState<File>()

  const getNewUserIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const img: File = e.target.files[0]
    setNewUserIcon(img)
  }

  const submitNewUserIcon = async () => {
    setIsloading(true)
    await usersService
      .updateUserIcon(newUserIcon)
      .then((user) => {
        dispatch({ type: UPDATE_USER_ICON_SUCCESS, payload: user })
        toastSuccess('ユーザーアイコンを更新しました')
        setIsloading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsloading(false)
      })
  }

  return (
    <UsersStateContext.Provider value={{ ...state, isLoading }}>
      <UsersDispatchContext.Provider
        value={{
          fetchUsers,
          fetchUser,
          fetchUserCleanup,
          fetchUserArtworks,
          fetchUserArtworksCleanup,
          submitNewUserIcon,
          getNewUserIcon,
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
