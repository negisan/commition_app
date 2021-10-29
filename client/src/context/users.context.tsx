import React, { useContext, useReducer, useState } from 'react'
import { FETCH_USER_SUCCESS } from '../constants/users.constant'
import reducer from '../reducers/users.reducer'
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
  const { toastError } = useUIContext()

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

  return (
    <UsersStateContext.Provider value={{ ...state }}>
      <UsersDispatchContext.Provider value={{ fetchUser }}>
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
