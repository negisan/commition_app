import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useRequestsStateContext } from '../../context/requests.context'

const PageHeader: React.FC = () => {
  const {role} = useRequestsStateContext()

  const pagetitle = (): string => {
    if (role === 'creator') {
      return '受信したリクエスト'
    }
    if (role === 'client') {
      return '送信したリクエスト'
    }
    return ''
  }

  return (
    <Wrapper>
      <h1>{pagetitle()}</h1>
      <Links>
        <Link
          to='/requests'
          className={`${role === 'client' ? 'selected' : ''}`}
        >
          送信したリクエスト
        </Link>
        <Link
          to='/requests/creator'
          className={`${role === 'creator' ? 'selected' : ''}`}
        >
          受信したリクエスト
        </Link>
      </Links>
      <div className='divider'></div>
    </Wrapper>
  )
}

const Links = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 3rem;
  a {
    margin-right: 1.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius);
    color: var(--clr-grey-4);
    font-weight: 600;
    transition: var(--transition);
    :hover {
      background: var(--clr-grey-10);
    }
  }
  .selected {
    background: var(--clr-grey-10);
  }
  @media (max-width: 500px) {
    justify-content: center;
    font-size: 10px;
  }

`

const Wrapper = styled.div`
  h1 {
    color: var(--clr-grey-3);
  }
`

export default PageHeader
