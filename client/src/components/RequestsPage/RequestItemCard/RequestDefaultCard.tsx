import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  useRequestsDispatchContext,
  useRequestsStateContext,
} from '../../../context/requests.context'
import {
  CardWrapper,
  CardHeader,
  OrderContent,
  ButtonContainer,
  OrderPrice,
} from './CardComon'

const RequestDefaultCard: React.FC<any> = ({ item }) => {
  const { role } = useRequestsStateContext()
  const { cancelRequest, acceptRequest } = useRequestsDispatchContext()
  if (role === 'client') {
    return (
      <CardWrapper>
        <CardHeader
          userName={item.creator.name}
          orderPrice={item.order_price}
          createdAt={item.createdAt}
          request={item}
        />
        <OrderContent order_content={item.order_content} />
        <ButtonContainer>
          <button className='btn_danger' onClick={() => cancelRequest(item)}>
            キャンセルする
          </button>
        </ButtonContainer>
      </CardWrapper>
    )
  }

  if (role === 'creator') {
    return (
      <CardWrapper>
        <CardHeader
          userName={item.client.name}
          orderPrice={item.order_price}
          createdAt={item.createdAt}
          request={item}
        />
        <OrderContent order_content={item.order_content} />
        <ButtonContainer>
          <button className='btn_primary' onClick={() => acceptRequest(item)}>
            受注する
          </button>
          <button className='btn_danger' onClick={() => cancelRequest(item)}>
            お断りする
          </button>
        </ButtonContainer>
      </CardWrapper>
    )
  }
  return <></>
}

export default RequestDefaultCard
