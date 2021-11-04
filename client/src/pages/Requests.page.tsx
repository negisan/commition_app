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
    clientFetchDefaultRequests,
    clientFetchProgressingRequests,
    clientFetchSubmittedRequests,
    clientFetchDoneRequests,
    clientFetchCancelRequests,
    isClientPage,
  } = useRequestsDispatchContext()
  const { filterState } = useRequestsStateContext()

  console.log(filterState)

  useEffect(() => {
    isClientPage()
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
