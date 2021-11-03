import React from 'react'
import styled from 'styled-components'
import { useRequestsStateContext } from '../../../context/requests.context'
import { CardWrapper, CardHeader, OrderPrice, OrderContent } from './CardComon'

const RequestProgressingCard:React.FC<any> = ({ item }) => {
  const { role } = useRequestsStateContext()

  if (role === 'client') {
    return (
      <CardWrapper>
        <CardHeader user_name={item.creator.name} />
        <OrderPrice order_price={item.order_price} />
        <OrderContent order_content={item.order_content} />
        <MessageContainer>
          <p>受注されました！投稿をお待ちください。</p>
        </MessageContainer>
      </CardWrapper>
    )
  }

  if (role === 'creator') {
    return (
      <CardWrapper>
        <CardHeader user_name={item.client.name} />
        <OrderPrice order_price={item.order_price} />
        <OrderContent order_content={item.order_content} />
      </CardWrapper>
    )
  }

  return <></>
}

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  p {
    font-weight: 600;
    color: var(--clr-grey-4);
  }
`

export default RequestProgressingCard
