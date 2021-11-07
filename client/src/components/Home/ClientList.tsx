import React from 'react'
import styled from 'styled-components'
import { useUsersStateContext } from '../../context/users.context'
import { UserList } from './common'

const ClientList = () => {
  const { clients } = useUsersStateContext()

  return (
    <div className='section-wrapper' style={{ marginTop: '3rem' }}>
      <HeaderContainer>
        <h2>新着クライアント</h2>
        <div className='divider' style={{ marginTop: 0 }}></div>
      </HeaderContainer>
      <UserList users={clients} />
    </div>
  )
}

const HeaderContainer = styled.div`
  padding: 3rem 1rem 0;
  h2 {
    color: var(--clr-grey-5);
    letter-spacing: -2px;
  }
`

export default ClientList
