import React from 'react'
import styled from 'styled-components'

const OrderPrice: React.FC<{ order_price: string }> = ({ order_price }) => {
  return (
    <Wrapper>
      <p>金額：{order_price}円</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 2rem;
  font-weight: 600;
  color: var(--clr-grey-5);
`

export default OrderPrice
