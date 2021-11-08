import React, { useContext, useState, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router'

import reducer from '../reducers/auth.reducer'
import AuthService from '../services/auth.service'
import {
  LOGOUT,
  FETCH_USER_SUCCESS,
  UPDATE_USER_ICON_BEGIN,
  UPDATE_USER_ICON_SUCCESS,
  UPDATE_USER_ICON_FAIL,
  UPDATE_ACCEPTING_ORDER_BEGIN,
  UPDATE_ACCEPTING_ORDER_SUCCESS,
  UPDATE_ACCEPTING_ORDER_FAIL,
  UPDATE_DEFAULT_ORDER_PRICE_BEGIN,
  UPDATE_DEFAULT_ORDER_PRICE_SUCCESS,
  UPDATE_DEFAULT_ORDER_PRICE_FAIL,
} from '../constants/auth.constant'
import { useUIContext } from './UI.context'
import { errorMessage } from '../helper/handleErrorMessage'

const AuthStateContext = React.createContext<any | null>({})
const AuthDispatchContext = React.createContext<any | null>({})

const initialState = {
  myuser: {},
  update_user_loading: false,
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

  // update user =======================================================================

  const submitNewUserIcon = async (user_id: number, newUserIcon: File) => {
    dispatch({ type: UPDATE_USER_ICON_BEGIN })
    await AuthService.updateUserIcon(user_id, newUserIcon)
      .then((user) => {
        dispatch({ type: UPDATE_USER_ICON_SUCCESS, payload: user })
        toastSuccess('ユーザーアイコンを更新しました')
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: UPDATE_USER_ICON_FAIL })
      })
  }

  const setAcceptingOrderToFalse = async (user_id: number) => {
    dispatch({ type: UPDATE_ACCEPTING_ORDER_BEGIN })
    await AuthService.setAcceptingOrderToFalse(user_id)
      .then((user) => {
        dispatch({ type: UPDATE_ACCEPTING_ORDER_SUCCESS, payload: user })
        history.go(0)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: UPDATE_ACCEPTING_ORDER_FAIL })
      })
  }

  const setAcceptingOrderToTrue = async (user_id: number) => {
    dispatch({ type: UPDATE_ACCEPTING_ORDER_BEGIN })
    await AuthService.setAcceptingOrderToTrue(user_id)
      .then((user) => {
        dispatch({ type: UPDATE_ACCEPTING_ORDER_SUCCESS, payload: user })
        history.go(0)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: UPDATE_ACCEPTING_ORDER_FAIL })
      })
  }

  const updateDefaultOrderPrice = async (user_id: number, price: number) => {
    dispatch({ type: UPDATE_DEFAULT_ORDER_PRICE_BEGIN })
    await AuthService.updateDefaultOrderPrice(user_id, price)
      .then((user) => {
        dispatch({ type: UPDATE_DEFAULT_ORDER_PRICE_SUCCESS, payload: user })
        history.go(0)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: UPDATE_DEFAULT_ORDER_PRICE_FAIL })
      })
  }

  return (
    <AuthStateContext.Provider value={{ ...state, isLoading, isLoggedin }}>
      <AuthDispatchContext.Provider
        value={{
          register,
          login,
          logout,
          submitNewUserIcon,
          setAcceptingOrderToTrue,
          setAcceptingOrderToFalse,
          updateDefaultOrderPrice,
        }}
      >
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
