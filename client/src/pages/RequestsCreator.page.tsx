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

const RequestsCreator: React.FC = () => {
  const {
    creatorFetchAllRequests,
    creatorFetchDefaultRequests,
    creatorFetchProgressingRequests,
    creatorFetchSubmittedRequests,
    creatorFetchDoneRequests,
    creatorFetchCancelRequests,
    isCreatorPage,
  } = useRequestsDispatchContext()
  const { filterState } = useRequestsStateContext()

  useEffect(() => {
    isCreatorPage()
  }, [])

  useEffect(() => {
    if (filterState === 'all') {
      creatorFetchAllRequests()
    }
    if (filterState === 'default') {
      creatorFetchDefaultRequests()
    }
    if (filterState === 'progressing') {
      creatorFetchProgressingRequests()
    }
    if (filterState === 'submitted') {
      creatorFetchSubmittedRequests()
    }
    if (filterState === 'done') {
      creatorFetchDoneRequests()
    }
    if (filterState === 'canceled') {
      creatorFetchCancelRequests()
    }
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

export default RequestsCreator
