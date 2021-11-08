import React, { useContext, useState, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router'

import reducer from '../reducers/auth.reducer'
import AuthService from '../services/auth.service'
import { LOGOUT, FETCH_USER_SUCCESS } from '../constants/auth.constant'
import { useUIContext } from './UI.context'
import { errorMessage } from '../helper/handleErrorMessage'

const AuthStateContext = React.createContext<any | null>({})
const AuthDispatchContext = React.createContext<any | null>({})

const initialState = {
  user: {},
}

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const { toastSuccess, toastError } = useUIContext()
  const history = useHistory()

  interface RegisterCredentials {
    name: string
    email: string
    password: string
  }

  const register = async (credentials: RegisterCredentials) => {
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

  interface LoginCredentials {
    email: string
    password: string
  }

  const login = async (Credentials: LoginCredentials) => {
    setIsLoading(true)
    await AuthService.login(Credentials)
      .then(() => {
        AuthService.fetchUser()
          .then((user_info) => {
            dispatch({ type: FETCH_USER_SUCCESS, payload: user_info })
            toastSuccess('ログインしました')
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

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: LOGOUT })
    history.push('/')
  }

  const isLoggedin = () => {
    return localStorage.getItem('user') ? true : false
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLoading(true)
      AuthService.fetchUser().then(
        (user_info) => {
          dispatch({ type: FETCH_USER_SUCCESS, payload: user_info })
          setIsLoading(false)
          return Promise.resolve()
        },
        (err) => {
          toastError(errorMessage(err))
          setIsLoading(false)
          return Promise.reject()
        }
      )
    }
    setIsLoading(false)
    // eslint-disable-next-line
  }, [])

  return (
    <AuthStateContext.Provider value={{ ...state, isLoading, isLoggedin }}>
      <AuthDispatchContext.Provider value={{ register, login, logout }}>
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
