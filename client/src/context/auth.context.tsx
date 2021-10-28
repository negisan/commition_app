import React, { useContext, useState, useEffect, useReducer } from 'react'
import reducer from '../reducers/auth.reducer'
import AuthService from '../services/auth.service'
import { LOGOUT, FETCH_USER_SUCCESS } from '../constants/auth.constant'

const AuthStateContext = React.createContext<any | null>({})
const AuthDispatchContext = React.createContext<any | null>({})

const initialState = {
  user: '',
}

export const AuthProvider = ({ children }: any) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  interface registerCredentials {
    name: string
    email: string
    password: string
  }

  const register = async (credentials: registerCredentials) => {
    // ローディング
    // バックエンドに登録内容を送信
    // then
    // ステートの更新
    // 通知を表示
    // リダイレクト
    // ローディング終了
    // catch
    // エラーを通知
    // ローディング終了
  }

  return (
    <AuthStateContext.Provider value={{}}>
      <AuthDispatchContext.Provider value={{}}>
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
