import React, { useContext, useReducer, useState } from 'react'
import {
  FETCH_USER_SUCCESS,
  UPDATE_USER_ICON_SUCCESS,
} from '../constants/users.constant'
import reducer from '../reducers/users.reducer'
import usersService from '../services/users.service'
import UsersService from '../services/users.service'
import { useUIContext } from './UI.context'

const UsersStateContext = React.createContext<any | null>({})
const UsersDispatchContext = React.createContext<any | null>({})

const errorMessage = (err: any): string => {
  return (
    err.response?.data?.ErrorMessageJP ||
    err.response?.data?.ErrorMessageEN ||
    err.response?.data?.message ||
    err.toString()
  )
}

const initialState = {
  user: '',
}

export const UsersProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsloading] = useState(false)
  const { toastError, toastSuccess } = useUIContext()

  const fetchUser = async (user_name: string) => {
    setIsloading(true)
    await UsersService.fetchUser(user_name)
      .then((user) => {
        dispatch({ type: FETCH_USER_SUCCESS, payload: user })
        setIsloading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsloading(false)
      })
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
    <UsersStateContext.Provider value={{ ...state }}>
      <UsersDispatchContext.Provider
        value={{ fetchUser, submitNewUserIcon, getNewUserIcon }}
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
