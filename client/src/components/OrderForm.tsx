import React from 'react'
import styled from 'styled-components'

const OrderForm:React.FC<any> = ({client, creator}) => {
  console.log('client',client);
  console.log('creator',creator);

  return (
    <Wrapper>
      OrderForm
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 95vw;
  height: 40rem;
  background: var(--clr-white);
  margin: 0 auto;
  @media(min-width: 768px) {
    width: 100%;
  }
`

export default OrderForm
