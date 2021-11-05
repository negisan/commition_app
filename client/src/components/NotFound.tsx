import React from 'react'
import styled from 'styled-components'

const NotFound = () => {
  return (
    <Wrapper>
      <h1>404 NotFound</h1>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6rem;
  h1 {
    color: var(--clr-grey-4);
  }
`

export default NotFound
