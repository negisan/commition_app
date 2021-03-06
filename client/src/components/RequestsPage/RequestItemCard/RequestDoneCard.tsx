import React from 'react'
import { useRequestsStateContext } from '../../../context/requests.context'
import {
  CardWrapper,
  CardHeader,
  OrderContent,
  ArtworkContainer,
  ClientCommentContainer,
} from './CardComon'

const RequestDoneCard: React.FC<any> = ({ item }) => {
  const { role } = useRequestsStateContext()

  if (role === 'client') {
    return (
      <CardWrapper>
        <CardHeader
          userName={item?.creator.name}
          orderPrice={item?.order_price}
          createdAt={item?.createdAt}
          request={item}
        />
        <OrderContent order_content={item?.order_content} />
        <ArtworkContainer
          imgSource={item?.Artwork?.content}
          artworkId={item?.Artwork?.id}
        />
        <ClientCommentContainer clientComment={item?.thanks_comment} />
      </CardWrapper>
    )
  }
  if (role === 'creator') {
    return (
      <CardWrapper>
        <CardHeader
          userName={item?.client.name}
          orderPrice={item?.order_price}
          createdAt={item?.createdAt}
          request={item}
        />
        <OrderContent order_content={item?.order_content} />
        <ArtworkContainer
          imgSource={item?.Artwork?.content}
          artworkId={item?.Artwork?.id}
        />
        <ClientCommentContainer clientComment={item?.thanks_comment} />
      </CardWrapper>
    )
  }

  return <></>
}

export default RequestDoneCard
