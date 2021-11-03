import React from 'react'
import styled from 'styled-components'

const ButtonContainer: React.FC<any> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: end;
  gap: 1.5rem;
`

export default ButtonContainer
