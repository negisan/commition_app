import React from 'react'
import styled from 'styled-components'

const CardWrapper:React.FC<any> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--clr-grey-10);
  border-radius: var(--radius);
  margin-bottom: 5rem;
  padding: 1.75rem 1.5rem;
  box-shadow: var(--dark-shadow);
`

export default CardWrapper
