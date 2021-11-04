import React from 'react'
import styled from 'styled-components'

import { useRequestsStateContext } from '../../../context/requests.context'
import { CardHeader, CardWrapper, OrderPrice, OrderContent } from './CardComon'

const RequestCancelCard: React.FC<any> = ({ item }) => {
  const { role } = useRequestsStateContext()

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
      </CardWrapper>
    )
  }

  return <></>
}

export default RequestCancelCard
