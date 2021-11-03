import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

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
    clientFetchAllRequests,
    clientFetchProgressingRequests,
    clientFetchSubmittedRequests,
    clientFetchDoneRequests,
    clientFetchCancelRequests,
  } = useRequestsDispatchContext()
  const { filterState } = useRequestsStateContext()

  console.log(filterState)

  useEffect(() => {
    if (filterState === 'all') {
      clientFetchAllRequests()
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
  }, [filterState])

  return (
    <Layout>
      <PageHeader role='client' />
      <FilterBar />
      <div className='divider'></div>
      {filterState}
      <RequestList />
    </Layout>
  )
}

export default Requests
