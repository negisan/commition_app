import React from 'react'
import styled from 'styled-components'

const UserArtworks = () => {
  return <Wrapper>userArtworks</Wrapper>
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

export default UserArtworks
