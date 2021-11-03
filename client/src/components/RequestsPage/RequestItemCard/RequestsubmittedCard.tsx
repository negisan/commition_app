import React from 'react'
import styled from 'styled-components'

import { useRequestsStateContext } from '../../../context/requests.context'
import {
  CardWrapper,
  CardHeader,
  OrderPrice,
  OrderContent,
  ArtworkContainer,
} from './CardComon'
import ClientCommentForm from './ClientCommentForm'

const RequestsubmittedCard: React.FC<any> = ({ item }) => {
  const { role } = useRequestsStateContext()
  console.log(item)

  if (role === 'client') {
    return (
      <CardWrapper>
        <CardHeader user_name={item.creator.name} />
        <OrderPrice order_price={item.order_price} />
        <OrderContent order_content={item.order_content} />
        <ArtworkContainer imgSource={item.Artwork?.content} />
        <ClientCommentForm request={item} />
      </CardWrapper>
    )
  }

  if (role === 'creator') {
    return (
      <CardWrapper>
        <CardHeader user_name={item.client.name} />
        <OrderPrice order_price={item.order_price} />
        <OrderContent order_content={item.order_content} />
        <ArtworkContainer imgSource={item.Artwork?.content} />
        <MessageContainer>
          <p>納品済みです。料金は発注者が確認後に残高に加算されます。</p>
        </MessageContainer>
      </CardWrapper>
    )
  }

  return <></>
}

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  font-weight: 600;
  color: var(--clr-grey-6);
`

export default RequestsubmittedCard
