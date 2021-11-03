import React from 'react'
import styled from 'styled-components'

import { useRequestsStateContext } from '../../../context/requests.context'
import { CardHeader, CardWrapper, OrderPrice, OrderContent } from './CardComon'

const RequestCancelCard: React.FC<any> = ({ item }) => {
  const { role } = useRequestsStateContext()

  if (role === 'client') {
    return (
      <CardWrapper>
        <CardHeader user_name={item.creator.name} />
        <OrderPrice order_price={item.order_price} />
        <OrderContent order_content={item.order_content} />
        <CancelMessageContainer>
          <p>キャンセルされました</p>
        </CancelMessageContainer>
      </CardWrapper>
    )
  }
  if (role === 'creator') {
    return (
      <CardWrapper>
        <CardHeader user_name={item.client.name} />
        <OrderPrice order_price={item.order_price} />
        <OrderContent order_content={item.order_content} />
        <CancelMessageContainer>
          <p>キャンセルされました</p>
        </CancelMessageContainer>
      </CardWrapper>
    )
  }

  return <></>
}

const CancelMessageContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  p {
    font-weight: 600;
    font-size: 1.25rem;
    color: var(--clr-red);
  }
`

export default RequestCancelCard
