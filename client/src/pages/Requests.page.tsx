import React, { useEffect } from 'react'

import {
  FilterBar,
  Layout,
  PageHeader,
  RequestList,
} from '../components/RequestsPage'
import {
  useRequestsDispatchContext,
  useRequestsStateContext,
} from '../context/requests.context'

const Requests: React.FC = () => {
  const {
    clientFetchDefaultRequests,
    clientFetchProgressingRequests,
    clientFetchSubmittedRequests,
    clientFetchDoneRequests,
    clientFetchCancelRequests,
    isClientPage,
    clientPageCleanup,
  } = useRequestsDispatchContext()
  const { filterState } = useRequestsStateContext()

  useEffect(() => {
    isClientPage()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (filterState === 'default') {
      clientFetchDefaultRequests()
    }
    if (filterState === 'progressing') {
      clientFetchProgressingRequests()
    }
    if (filterState === 'submitted') {
      clientFetchSubmittedRequests()
    }
    if (filterState === 'done') {
      clientFetchDoneRequests()
    }
    if (filterState === 'canceled') {
      clientFetchCancelRequests()
    }
    return () => clientPageCleanup()
    // eslint-disable-next-line
  }, [filterState])

  return (
    <Layout>
      <PageHeader />
      <FilterBar />
      <div className='divider'></div>
      <RequestList />
    </Layout>
  )
}

export default Requests
