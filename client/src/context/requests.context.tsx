import React, { useContext, useReducer, useState } from 'react'

import reducer from '../reducers/requests.reducer'
import { errorMessage } from '../helper/handleErrorMessage'
import { useUIContext } from './UI.context'
import requestsService from '../services/requestsService'
import {
  CLIENT_FETCH_ALL_REQUESTS,
  CLIENT_FETCH_CANCEL_REQUESTS,
  CLIENT_FETCH_DONE_REQUESTS,
  CLIENT_FETCH_PROGRESSING_REQUESTS,
  CLIENT_FETCH_SUBMITTED_REQUESTS,
  CREATOR_FETCH_ALL_REQUESTS,
  CREATOR_FETCH_CANCEL_REQUESTS,
  CREATOR_FETCH_DONE_REQUESTS,
  CREATOR_FETCH_PROGRESSING_REQUESTS,
  CREATOR_FETCH_SUBMITTED_REQUESTS,
} from '../constants/requests.constat'

const RequestsStateContext = React.createContext<any | null>({})
const RequestsDispatchContext = React.createContext<any | null>({})

const initialState = {
  requests: '',
}

export const RequestsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { toastError, toastSuccess } = useUIContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // client fetch data =============================================
  // clientFetchAllRequests
  const clientFetchAllRequests = async () => {
    setIsLoading(true)
    await requestsService
      .clientFetchAllRequests()
      .then((requests) => {
        dispatch({ type: CLIENT_FETCH_ALL_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // clientFetchProgressingRequests
  const clientFetchProgressingRequests = async () => {
    setIsLoading(true)
    await requestsService
      .clientFetchProgressingRequests()
      .then((requests) => {
        dispatch({ type: CLIENT_FETCH_PROGRESSING_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // clientFetchSubmittedRequests
  const clientFetchSubmittedRequests = async () => {
    setIsLoading(true)
    await requestsService
      .clientFetchSubmittedRequests()
      .then((requests) => {
        dispatch({ type: CLIENT_FETCH_SUBMITTED_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // clientFetchDoneRequests
  const clientFetchDoneRequests = async () => {
    setIsLoading(true)
    await requestsService
      .clientFetchDoneRequests()
      .then((requests) => {
        dispatch({ type: CLIENT_FETCH_DONE_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // clientFetchCancelRequests
  const clientFetchCancelRequests = async () => {
    setIsLoading(true)
    await requestsService
      .clientFetchCancelRequests()
      .then((requests) => {
        dispatch({ type: CLIENT_FETCH_CANCEL_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // creator fetch data ================================================
  // creatorFetchAllRequests
  const creatorFetchAllRequests = async () => {
    setIsLoading(true)
    await requestsService
      .creatorFetchAllRequests()
      .then((requests) => {
        dispatch({ type: CREATOR_FETCH_ALL_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // creatorFetchProgressingRequests
  const creatorFetchProgressingRequests = async () => {
    setIsLoading(true)
    await requestsService
      .creatorFetchProgressingRequests()
      .then((requests) => {
        dispatch({
          type: CREATOR_FETCH_PROGRESSING_REQUESTS,
          payload: requests,
        })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // creatorFetchSubmittedRequests
  const creatorFetchSubmittedRequests = async () => {
    setIsLoading(true)
    await requestsService
      .creatorFetchSubmittedRequests()
      .then((requests) => {
        dispatch({ type: CREATOR_FETCH_SUBMITTED_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // creatorFetchDoneRequests
  const creatorFetchDoneRequests = async () => {
    setIsLoading(true)
    await requestsService
      .creatorFetchDoneRequests()
      .then((requests) => {
        dispatch({ type: CREATOR_FETCH_DONE_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // creatorFetchCancelRequests
  const creatorFetchCancelRequests = async () => {
    setIsLoading(true)
    await requestsService
      .creatorFetchCancelRequests()
      .then((requests) => {
        dispatch({ type: CREATOR_FETCH_CANCEL_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // ==================================================================
  // cancelRequest
  // order_priceをclientの残高に加算してcancelフラグをtrueにする

  // accepptRequest
  // progフラグをtrueにする

  // submitRequest
  // ArtWorkを作成してsubmitフラグをtrueにする

  // completeTransaction
  // clientのthanks_commentを保存、order_priceをcreatorの残高に加算してdoneフラグをtrueにする

  return (
    <RequestsStateContext.Provider value={{ ...state }}>
      <RequestsDispatchContext.Provider
        value={{
          clientFetchAllRequests,
          clientFetchProgressingRequests,
          clientFetchSubmittedRequests,
          clientFetchDoneRequests,
          clientFetchCancelRequests,
          creatorFetchAllRequests,
          creatorFetchProgressingRequests,
          creatorFetchSubmittedRequests,
          creatorFetchDoneRequests,
          creatorFetchCancelRequests
        }}
      >
        {children}
      </RequestsDispatchContext.Provider>
    </RequestsStateContext.Provider>
  )
}

export const useRequestsStateContext = () => {
  return useContext(RequestsStateContext)
}

export const useRequestsDispatchContext = () => {
  return useContext(RequestsDispatchContext)
}
