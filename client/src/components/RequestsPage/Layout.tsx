import React from 'react'
import styled from 'styled-components'

const Layout: React.FC<any> = ({ children }) => {
  return (
    <Wrapper>
      <Section className='section-wrapper'>{children}</Section>
    </Wrapper>
  )
}

const Section = styled.section`
  padding: 3rem 2rem;
`

const Wrapper = styled.div`
  padding: 3rem 0;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 3rem;
    max-width: 1124px;
  }
`

export default Layout
