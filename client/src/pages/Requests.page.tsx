import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Layout, PageHeader, RequestList } from '../components/RequestsPage'
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
    changeFilterToAll,
    changeFilterToCanceled,
    changeFilterToProgressing,
    changeFilterToSubmitted,
    changeFilterToDone
  } = useRequestsDispatchContext()
  const {filterState} = useRequestsStateContext();

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
      <FilterBar>
        <div
          onClick={changeFilterToAll()}
          className={`${
            filterState === 'all' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          全て
        </div>
        <div
          onClick={changeFilterToProgressing}
          className={`${
            filterState === 'progressing' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          進行中
        </div>
        <div
          onClick={changeFilterToSubmitted}
          className={`${
            filterState === 'submitted' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          納品済み
        </div>
        <div
          onClick={changeFilterToDone}
          className={`${
            filterState === 'done' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          完了
        </div>
        <div
          onClick={changeFilterToCanceled}
          className={`${
            filterState === 'canceled' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          キャンセル
        </div>
      </FilterBar>
      <div className='divider'></div>
      {filterState}
      <RequestList />
    </Layout>
  )
}

const FilterBar = styled.div`
  display: flex;
  gap: 3rem;
  .filter_btn {
    cursor: pointer;
    font-weight: 600;
    color: var(--clr-grey-5);
    padding: 0.75rem 1rem;
    border-radius: var(--radius);
    transition: var(--transition);
    :hover {
      background: var(--clr-grey-10);
    }
  }
  .selected {
    background: var(--clr-grey-10);
  }
`

export default Requests
