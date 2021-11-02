import React, {useContext} from 'react'

const RequestsStateContext = React.createContext<any|null>({})
const RequestsDispatchContext = React.createContext<any|null>({})

export const RequestsProvider = ({children}: any) => {

  // client fetch data =======================
  // clientFetchAllRequests
  // clientFetchProgressingRequests
  // clientFetchSubmittedRequests
  // clientFetchDoneRequests
  // clientFetchCanceledRequests

  // creator fetch data =====================
  // creatorFetchAllRequests
  // creatorFetchProgressingRequests
  // creatorFetchSubmittedRequests
  // creatorFetchDoneRequests
  // creatorFetchCanceledRequests


  // ===========================
  // cancelRequest
  // order_priceをclientの残高に加算してcancelフラグをtrueにする

  // accepptRequest
  // progフラグをtrueにする

  // submitRequest
  // ArtWorkを作成してsubmitフラグをtrueにする

  // completeTransaction
  // clientのthanks_commentを保存、order_priceをcreatorの残高に加算してdoneフラグをtrueにする


  return (
    <RequestsStateContext.Provider value={{}}>
      <RequestsDispatchContext.Provider value={{}}>
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