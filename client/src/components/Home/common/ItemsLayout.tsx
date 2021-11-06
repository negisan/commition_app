import React from 'react'
import styled from 'styled-components'

const ItemsLayout: React.FC<any> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(auto, 200px);
  gap: 1.5rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(auto, 150px);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(auto, 150px);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(auto, 140px);
  }
`

export default ItemsLayout
