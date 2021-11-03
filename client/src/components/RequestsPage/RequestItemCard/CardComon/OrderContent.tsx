import React from 'react'
import styled from 'styled-components'

const OrderContent: React.FC<{ order_content: string }> = ({
  order_content,
}) => {
  return (
    <Wrapper>
      <h3>リクエスト内容</h3>
      <div className='divider' style={{ marginTop: 0 }}></div>
      <p>{order_content}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 2rem;
  color: var(--clr-grey-5);
  h3 {
    letter-spacing: -1px;
  }
  p {
    font-weight: 600;
  }
`

export default OrderContent
