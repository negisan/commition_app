import React, { useContext, useState, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router'
import reducer from '../reducers/auth.reducer'
import AuthService from '../services/auth.service'
import { LOGOUT, FETCH_USER_SUCCESS } from '../constants/auth.constant'
import { useUIContext } from './UI.context'

const AuthStateContext = React.createContext<any | null>({})
const AuthDispatchContext = React.createContext<any | null>({})

const initialState = {
  user: {},
}

const errorMessage = (err: any): string => {
  return (
    err.response?.data?.ErrorMessageJP ||
    err.response?.data?.ErrorMessageEN ||
    err.message ||
    err.toString()
  )
}

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const { toastSuccess, toastError } = useUIContext()
  const history = useHistory()

  interface registerCredentials {
    name: string
    email: string
    password: string
  }

  const register = async (credentials: registerCredentials) => {
    setIsLoading(true)
    await AuthService.register(credentials)
      .then(() => {
        AuthService.fetchUser()
          .then((user_info) => {
            dispatch({ type: FETCH_USER_SUCCESS, payload: user_info })
            toastSuccess('ようこそ ' + user_info.name + ' さん')
            history.push('/')
            setIsLoading(false)
          })
          .catch((err) => {
            toastError(errorMessage(err))
            setIsLoading(false)
          })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  return (
    <AuthStateContext.Provider value={{ ...state, isLoading }}>
      <AuthDispatchContext.Provider value={{ register }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

export const useAuthStateContext = () => {
  return useContext(AuthStateContext)
}

export const useAuthDispatchContext = () => {
  return useContext(AuthDispatchContext)
}
