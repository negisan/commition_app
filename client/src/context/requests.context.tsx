import React, { useContext, useReducer, useState } from 'react'
import { useHistory } from 'react-router'

import { sleep } from '../helper/sleep'
import reducer from '../reducers/requests.reducer'
import { errorMessage } from '../helper/handleErrorMessage'
import { useUIContext } from './UI.context'
import requestsService from '../services/requestsService'
import {
  CLIENT_FETCH_CANCEL_REQUESTS,
  CLIENT_FETCH_DEFAULT_REQUESTS,
  CLIENT_FETCH_DONE_REQUESTS,
  CLIENT_FETCH_PROGRESSING_REQUESTS,
  CLIENT_FETCH_SUBMITTED_REQUESTS,
  CLIENT_REQUESTS_CLEANUP,
  CREATOR_FETCH_CANCEL_REQUESTS,
  CREATOR_FETCH_DEFAULT_REQUESTS,
  CREATOR_FETCH_DONE_REQUESTS,
  CREATOR_FETCH_PROGRESSING_REQUESTS,
  CREATOR_FETCH_SUBMITTED_REQUESTS,
  CREATOR_REQUESTS_CLEANUP,
} from '../constants/requests.constat'

const RequestsStateContext = React.createContext<any | null>({})
const RequestsDispatchContext = React.createContext<any | null>({})

const initialState = {
  requests: [],
}

type FilterState =
  | 'all'
  | 'default'
  | 'progressing'
  | 'submitted'
  | 'done'
  | 'canceled'
type Role = 'client' | 'creator'

export const RequestsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { toastError, toastSuccess } = useUIContext()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [filterState, setFilterState] = useState<FilterState>('default')
  const [role, setRole] = useState<Role>('client')

  const history = useHistory()

  // client fetch data ====================================================
  const clientFetchDefaultRequests = async () => {
    setIsLoading(true)
    await sleep(1000)
    await requestsService
      .clientFetchDefaultRequests()
      .then((requests) => {
        dispatch({ type: CLIENT_FETCH_DEFAULT_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  const clientFetchProgressingRequests = async () => {
    setIsLoading(true)
    await sleep(1000)
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

  const clientFetchSubmittedRequests = async () => {
    setIsLoading(true)
    await sleep(1000)
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

  const clientFetchDoneRequests = async () => {
    setIsLoading(true)
    await sleep(1000)
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

  const clientFetchCancelRequests = async () => {
    setIsLoading(true)
    await sleep(1000)
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

  // creator fetch data ====================================================
  const creatorFetchDefaultRequests = async () => {
    setIsLoading(true)
    await sleep(1000)
    await requestsService
      .creatorFetchDefaultRequests()
      .then((requests) => {
        dispatch({ type: CREATOR_FETCH_DEFAULT_REQUESTS, payload: requests })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  const creatorFetchProgressingRequests = async () => {
    setIsLoading(true)
    await sleep(1000)
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

  const creatorFetchSubmittedRequests = async () => {
    setIsLoading(true)
    await sleep(1000)
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

  const creatorFetchDoneRequests = async () => {
    setIsLoading(true)
    await sleep(1000)
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

  const creatorFetchCancelRequests = async () => {
    setIsLoading(true)
    await sleep(1000)
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

  // =======================================================================
  // cancelRequest
  const cancelRequest = async (request: any) => {
    setIsLoading(true)
    await sleep(1000)
    await requestsService
      .cancelRequest(request)
      .then(() => {
        toastSuccess('正常にキャンセルされました')
        history.push('/')
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // acceptRequest
  const acceptRequest = async (request: any) => {
    setIsLoading(true)
    await sleep(1000)
    await requestsService
      .acceptRequest(request)
      .then(() => {
        toastSuccess('リクエストを承認しました')
        history.push('/')
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // submitRequest
  const submitRequest = async (request: any, artwork: any) => {
    setIsLoading(true)
    await sleep(1000)
    await requestsService
      .submitRequest(request, artwork)
      .then(() => {
        toastSuccess('正常に送信されました')
        history.push('/')
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // completeRequest
  const completeRequest = async (request: any, comment: string) => {
    setIsLoading(true)
    await sleep(1000)
    await requestsService
      .completeRequest(request, comment)
      .then(() => {
        history.push('/')
        toastSuccess('正常に送信されました')
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  // filter ====================================================================
  const changeFilterToAll = () => {
    setFilterState('all')
  }

  const changeFilterToDefault = () => {
    setFilterState('default')
  }

  const changeFilterToProgressing = () => {
    setFilterState('progressing')
  }

  const changeFilterToSubmitted = () => {
    setFilterState('submitted')
  }

  const changeFilterToDone = () => {
    setFilterState('done')
  }

  const changeFilterToCanceled = () => {
    setFilterState('canceled')
  }

  // role ======================================================================
  const isClientPage = () => {
    setRole('client')
  }

  const isCreatorPage = () => {
    setRole('creator')
  }

  // =============================================================================
  const clientPageCleanup = () => {
    dispatch({ type: CLIENT_REQUESTS_CLEANUP })
    setIsLoading(true)
  }

  const creatorPageCleanup = () => {
    dispatch({ type: CREATOR_REQUESTS_CLEANUP })
    setIsLoading(true)
  }

  return (
    <RequestsStateContext.Provider
      value={{ ...state, filterState, role, isLoading }}
    >
      <RequestsDispatchContext.Provider
        value={{
          clientFetchDefaultRequests,
          clientFetchProgressingRequests,
          clientFetchSubmittedRequests,
          clientFetchDoneRequests,
          clientFetchCancelRequests,
          creatorFetchDefaultRequests,
          creatorFetchProgressingRequests,
          creatorFetchSubmittedRequests,
          creatorFetchDoneRequests,
          creatorFetchCancelRequests,
          changeFilterToAll,
          changeFilterToDefault,
          changeFilterToCanceled,
          changeFilterToProgressing,
          changeFilterToSubmitted,
          changeFilterToDone,
          isClientPage,
          isCreatorPage,
          acceptRequest,
          cancelRequest,
          submitRequest,
          completeRequest,
          creatorPageCleanup,
          clientPageCleanup,
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
