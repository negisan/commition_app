import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useRequestsStateContext } from '../../../../context/requests.context'

const CardHeader: React.FC<{user_name: string}> = ({ user_name }) => {
  const { role } = useRequestsStateContext()

  let title = ''
  if (role === 'client') {
    title = '受注者名：'
  }
  if (role === 'creator') {
    title = '発注者名：'
  }

  return (
    <Wrapper>
      <h2>
        {title}
        <Link to={`/user/${user_name}`}>{user_name}</Link>
      </h2>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  color: var(--clr-grey-5);
  font-size: 0.75rem;
  a {
    color: var(--clr-primary-4);
  }
`

export default CardHeader
