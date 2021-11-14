import React, { useContext, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router'

import reducer from '../reducers/auth.reducer'
import AuthService from '../services/auth.service'
import {
  LOGOUT,
  FETCH_MYUSER_SUCCESS,
  UPDATE_USER_ICON_SUCCESS,
  UPDATE_USER_ICON_FAIL,
  UPDATE_ACCEPTING_ORDER_BEGIN,
  UPDATE_ACCEPTING_ORDER_SUCCESS,
  UPDATE_ACCEPTING_ORDER_FAIL,
  UPDATE_DEFAULT_ORDER_PRICE_BEGIN,
  UPDATE_DEFAULT_ORDER_PRICE_SUCCESS,
  UPDATE_DEFAULT_ORDER_PRICE_FAIL,
  LOAD_MYUSER_FAIL,
  LOAD_MYUSER_SUCCESS,
  LOAD_MYUSER_BEGIN,
  LOAD_MYUSER_CLEANUP,
} from '../constants/auth.constant'
import { useUIContext } from './UI.context'
import { errorMessage } from '../helper/handleErrorMessage'
import { sleep } from '../helper/sleep'

const AuthStateContext = React.createContext<any | null>({})
const AuthDispatchContext = React.createContext<any | null>({})

const initialState = {
  myuser: {},
  myuser_loading: true,
  update_user_loading: false,
}

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { toastSuccess, toastError } = useUIContext()
  const history = useHistory()

  interface RegisterCredentials {
    name: string
    email: string
    password: string
  }

  const register = async (credentials: RegisterCredentials) => {
    await AuthService.register(credentials)
      .then(() => {
        AuthService.fetchUser()
          .then((user_info) => {
            dispatch({ type: FETCH_MYUSER_SUCCESS, payload: user_info })
            toastSuccess('ようこそ ' + user_info.name + ' さん')
            history.push('/')
          })
          .catch((err) => {
            toastError(errorMessage(err))
          })
      })
      .catch((err) => {
        toastError(errorMessage(err))
      })
  }

  interface LoginCredentials {
    email: string
    password: string
  }

  const login = async (Credentials: LoginCredentials) => {
    await AuthService.login(Credentials)
      .then(() => {
        AuthService.fetchUser()
          .then((user_info) => {
            dispatch({ type: FETCH_MYUSER_SUCCESS, payload: user_info })
            toastSuccess('ログインしました')
            history.push('/')
          })
          .catch((err) => {
            toastError(errorMessage(err))
          })
      })
      .catch((err) => {
        toastError(errorMessage(err))
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

  const loadMyUser = async () => {
    dispatch({ type: LOAD_MYUSER_BEGIN })
    await sleep(200)
    AuthService.fetchUser()
      .then((user_info) => {
        dispatch({ type: LOAD_MYUSER_SUCCESS, payload: user_info })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: LOAD_MYUSER_FAIL })
      })
  }

  const loadMyUserCleanup = () => {
    dispatch({ type: LOAD_MYUSER_CLEANUP })
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      AuthService.fetchUser()
        .then((user_info) => {
          dispatch({ type: FETCH_MYUSER_SUCCESS, payload: user_info })
        })
        .catch((err) => {
          toastError(errorMessage(err))
        })
    } else {
      logout()
    }
    // eslint-disable-next-line
  }, [localStorage.getItem('user')])

  // update user =======================================================================

  const submitNewUserIcon = async (user_id: number, newUserIcon: File) => {
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
    await sleep(200)
    await AuthService.setAcceptingOrderToFalse(user_id)
      .then((user) => {
        dispatch({ type: UPDATE_ACCEPTING_ORDER_SUCCESS, payload: user })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: UPDATE_ACCEPTING_ORDER_FAIL })
      })
  }

  const setAcceptingOrderToTrue = async (user_id: number) => {
    dispatch({ type: UPDATE_ACCEPTING_ORDER_BEGIN })
    await sleep(200)
    await AuthService.setAcceptingOrderToTrue(user_id)
      .then((user) => {
        dispatch({ type: UPDATE_ACCEPTING_ORDER_SUCCESS, payload: user })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: UPDATE_ACCEPTING_ORDER_FAIL })
      })
  }

  const updateDefaultOrderPrice = async (user_id: number, price: number) => {
    dispatch({ type: UPDATE_DEFAULT_ORDER_PRICE_BEGIN })
    await sleep(200)
    await AuthService.updateDefaultOrderPrice(user_id, price)
      .then((user) => {
        dispatch({ type: UPDATE_DEFAULT_ORDER_PRICE_SUCCESS, payload: user })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: UPDATE_DEFAULT_ORDER_PRICE_FAIL })
      })
  }

  return (
    <AuthStateContext.Provider value={{ ...state, isLoggedin }}>
      <AuthDispatchContext.Provider
        value={{
          register,
          login,
          logout,
          loadMyUser,
          loadMyUserCleanup,
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
