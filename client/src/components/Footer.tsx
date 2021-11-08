import React from 'react'
import styled from 'styled-components'

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()}
        <span>Commition App</span>
      </h5>
      <h5>All right reserved</h5>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h5 {
    color: var(--clr-grey-1);
  }
  span {
    color: var(--clr-primary-5);
  }
`

export default Footer
