import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { PageHeader, UserArtworks, UserInfoBar } from '../components'

import { useAuthStateContext } from '../context/auth.context'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const User: React.FC = () => {
  const { user } = useAuthStateContext()
  const { user: ownerUser } = useUsersStateContext()
  const { fetchUser } = useUsersDispatchContext()
  const { user: params_user_name }: any = useParams()

  console.log(ownerUser)

  useEffect(() => {
    fetchUser(params_user_name)
  }, [])

  return (
    <>
      {/* header */}
      {/* @ts-ignore */}
      <PageHeader user={ownerUser} />
      {/* section */}
      <SectionWrapper>
        {/* user_info */}
        <UserInfoBar user={ownerUser}/>
        {/* artwork */}
        <UserArtworks/>
      </SectionWrapper>
    </>
  )
}

const SectionWrapper = styled.div`
  padding: 3rem 0;
  display: grid;
  gap: 3rem;
@media (min-width: 768px) {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 3rem 1rem;
  gap: 1.5rem;
  grid-template-columns: 16rem auto;
  grid-auto-flow: row;
}
`

export default User
