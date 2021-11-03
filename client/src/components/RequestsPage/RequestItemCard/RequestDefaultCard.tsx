import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useRequestsStateContext } from '../../../context/requests.context'
import {
  CardWrapper,
  CardHeader,
  OrderContent,
  ButtonContainer,
  OrderPrice,
} from './CardComon'

const RequestDefaultCard: React.FC<any> = ({ item }) => {
  const { role } = useRequestsStateContext()
  if (role === 'client') {
    return (
      <CardWrapper>
        <CardHeader user_name={item.creator.name} />
        <OrderPrice order_price={item.order_price} />
        <OrderContent order_content={item.order_content} />
        <ButtonContainer>
          <button className='btn_primary'>受注する</button>
          <button className='btn_danger'>お断りする</button>
        </ButtonContainer>
      </CardWrapper>
    )
  }

  if (role === 'creator') {
    return (
      <CardWrapper>
        <CardHeader user_name={item.client.name} />
        <OrderPrice order_price={item.order_price} />
        <OrderContent order_content={item.order_content} />
        <ButtonContainer>
          <button className='btn_danger'>キャンセルする</button>
        </ButtonContainer>
      </CardWrapper>
    )
  }
  return <></>
}

export default RequestDefaultCard
