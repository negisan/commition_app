import React from 'react'
import styled from 'styled-components'

const ClientCommentContainer: React.FC<{ clientComment: string }> = ({clientComment}) => {
  return (
    <Wrapper>
      <h3>クライアントのコメント</h3>
      <div className='divider' style={{ marginTop: 0 }}></div>

      <p>{clientComment}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 3rem;
  h3 {
    letter-spacing: -2px;
    color: var(--clr-grey-5);
  }
  p {
    color: var(--clr-grey-5);
    font-size: 1rem;
    font-weight: 600;
  }
`

export default ClientCommentContainer
