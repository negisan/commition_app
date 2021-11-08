import React from 'react'
import styled from 'styled-components'

import { useRequestsStateContext } from '../../context/requests.context'
import { CustomLoader } from '../common'

import {
  RequestDefaultCard,
  RequestCancelCard,
  RequestProgressingCard,
  RequestsubmittedCard,
  RequestDoneCard,
} from './RequestItemCard'

const RequestList: React.FC = () => {
  const { requests, filterState, isLoading } = useRequestsStateContext()

  if (isLoading) {
    return <CustomLoader/>
  }

  if (requests === []) {
    return (
      <NoItemsMessage>
        <small>何もありません</small>
      </NoItemsMessage>
    )
  }

  if (filterState === 'default') {
    return requests?.map((request: any, index: number) => {
      return <RequestDefaultCard item={request} key={index} />
    })
  }

  if (filterState === 'canceled') {
    return requests?.map((request: any, index: number) => {
      return <RequestCancelCard item={request} key={index} />
    })
  }

  if (filterState === 'progressing') {
    return requests?.map((request: any, index: number) => {
      return <RequestProgressingCard item={request} key={index} />
    })
  }

  if (filterState === 'submitted') {
    return requests?.map((request: any, index: number) => {
      return <RequestsubmittedCard item={request} key={index} />
    })
  }

  if (filterState === 'done') {
    return requests?.map((request: any, index: number) => {
      return <RequestDoneCard item={request} key={index} />
    })
  }
}

const NoItemsMessage = styled.div`
  display: flex;
  justify-content: center;
  color: var(--clr-grey-5);
  font-weight: 600;
`

export default RequestList
