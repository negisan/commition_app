import React, { useContext, useReducer, useState } from 'react'
import { useHistory } from 'react-router'

import { sleep } from '../helper/sleep'
import reducer from '../reducers/requests.reducer'
import { errorMessage } from '../helper/handleErrorMessage'
import { useUIContext } from './UI.context'
import requestsService from '../services/requestsService'
import {
  FETCH_REQUESTS_BEGIN,
  FETCH_REQUESTS_FAIL,
  FETCH_REQUESTS_SUCCESS,
  FETCH_REQUESTS_CLEANUP,
} from '../constants/requests.constat'

const RequestsStateContext = React.createContext<any | null>({})
const RequestsDispatchContext = React.createContext<any | null>({})

const initialState = {
  requests: [],
  requests_loading: true,
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
  const [isUpdatingRequest, setIsUpdatingRequest] = useState<boolean>(false)
  const [filterState, setFilterState] = useState<FilterState>('default')
  const [role, setRole] = useState<Role>('client')

  const history = useHistory()

  // client fetch data ====================================================
  const clientFetchDefaultRequests = async () => {
    dispatch({ type: FETCH_REQUESTS_BEGIN })
    await sleep(300)
    await requestsService
      .clientFetchRequests('state_default')
      .then((requests) => {
        dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: requests })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_REQUESTS_FAIL })
      })
  }

  const clientFetchProgressingRequests = async () => {
    dispatch({ type: FETCH_REQUESTS_BEGIN })
    await sleep(300)
    await requestsService
      .clientFetchRequests('progressing')
      .then((requests) => {
        dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: requests })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_REQUESTS_FAIL })
      })
  }

  const clientFetchSubmittedRequests = async () => {
    dispatch({ type: FETCH_REQUESTS_BEGIN })
    await sleep(300)
    await requestsService
      .clientFetchRequests('submitted')
      .then((requests) => {
        dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: requests })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_REQUESTS_FAIL })
      })
  }

  const clientFetchDoneRequests = async () => {
    dispatch({ type: FETCH_REQUESTS_BEGIN })
    await sleep(300)
    await requestsService
      .clientFetchRequests('done')
      .then((requests) => {
        dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: requests })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_REQUESTS_FAIL })
      })
  }

  const clientFetchCancelRequests = async () => {
    dispatch({ type: FETCH_REQUESTS_BEGIN })
    await sleep(300)
    await requestsService
      .clientFetchRequests('cancel')
      .then((requests) => {
        dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: requests })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_REQUESTS_FAIL })
      })
  }

  // creator fetch data ====================================================
  const creatorFetchDefaultRequests = async () => {
    dispatch({ type: FETCH_REQUESTS_BEGIN })
    await sleep(300)
    await requestsService
      .creatorFetchRequests('state_default')
      .then((requests) => {
        dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: requests })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_REQUESTS_FAIL })
      })
  }

  const creatorFetchProgressingRequests = async () => {
    dispatch({ type: FETCH_REQUESTS_BEGIN })
    await sleep(300)
    await requestsService
      .creatorFetchRequests('progressing')
      .then((requests) => {
        dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: requests })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_REQUESTS_FAIL })
      })
  }

  const creatorFetchSubmittedRequests = async () => {
    dispatch({ type: FETCH_REQUESTS_BEGIN })
    await sleep(300)
    await requestsService
      .creatorFetchRequests('submitted')
      .then((requests) => {
        dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: requests })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_REQUESTS_FAIL })
      })
  }

  const creatorFetchDoneRequests = async () => {
    dispatch({ type: FETCH_REQUESTS_BEGIN })
    await sleep(300)
    await requestsService
      .creatorFetchRequests('done')
      .then((requests) => {
        dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: requests })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_REQUESTS_FAIL })
      })
  }

  const creatorFetchCancelRequests = async () => {
    dispatch({ type: FETCH_REQUESTS_BEGIN })
    await sleep(200)
    await requestsService
      .creatorFetchRequests('cancel')
      .then((requests) => {
        dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: requests })
      })
      .catch((err) => {
        toastError(errorMessage(err))
        dispatch({ type: FETCH_REQUESTS_FAIL })
      })
  }

  // update request =======================================================================
  const cancelRequest = async (request: any) => {
    setIsUpdatingRequest(true)
    await requestsService
      .cancelRequest(request)
      .then(() => {
        setIsUpdatingRequest(false)
        history.push('/')
        toastSuccess('正常にキャンセルされました')
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsUpdatingRequest(false)
      })
  }
  const acceptRequest = async (request: any) => {
    setIsUpdatingRequest(true)
    await requestsService
      .acceptRequest(request)
      .then(() => {
        toastSuccess('リクエストを承認しました')
        history.push('/')
        setIsUpdatingRequest(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsUpdatingRequest(false)
      })
  }

  const submitRequest = async (request: any, artwork: any) => {
    setIsUpdatingRequest(true)
    await requestsService
      .submitRequest(request, artwork)
      .then(() => {
        toastSuccess('正常に送信されました')
        history.push('/')
        setIsUpdatingRequest(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsUpdatingRequest(false)
      })
  }

  const completeRequest = async (request: any, comment: string) => {
    setIsUpdatingRequest(true)
    await requestsService
      .completeRequest(request, comment)
      .then(() => {
        history.push('/')
        toastSuccess('正常に送信されました')
        setIsUpdatingRequest(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsUpdatingRequest(false)
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
  const fetchRequestsCleanup = () => {
    dispatch({ type: FETCH_REQUESTS_CLEANUP })
  }

  return (
    <RequestsStateContext.Provider
      value={{ ...state, filterState, role, isUpdatingRequest }}
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
          fetchRequestsCleanup,
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
