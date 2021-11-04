import React from 'react'
import styled from 'styled-components'
import { useRequestsStateContext } from '../../../context/requests.context'
import {
  CardWrapper,
  CardHeader,
  OrderPrice,
  OrderContent,
  ArtworkContainer,
  ClientCommentContainer,
} from './CardComon'

const RequestDoneCard: React.FC<any> = ({ item }) => {
  const { role } = useRequestsStateContext()

  console.log(item)

  if (role === 'client') {
    return (
      <CardWrapper>
        <CardHeader user_name={item.creator.name} />
        <OrderPrice order_price={item.order_price} />
        <OrderContent order_content={item.order_content} />
        <ArtworkContainer imgSource={item.Artwork?.content} />
        <ClientCommentContainer clientComment={item.thanks_comment} />
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
        <ClientCommentContainer clientComment={item.thanks_comment} />
      </CardWrapper>
    )
  }

  return <></>
}

export default RequestDoneCard
