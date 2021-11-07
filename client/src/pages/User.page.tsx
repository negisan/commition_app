import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { PageHeader, UserInfoBar } from '../components'
import { UserArtworks } from '../components/UserPage'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const User: React.FC = () => {
  const {
    user: ownerUser,
    user_loading,
    userArtworks_loading,
  } = useUsersStateContext()
  const {
    fetchUser,
    fetchUserCleanup,
    fetchUserArtworks,
    fetchUserArtworksCleanup,
  } = useUsersDispatchContext()
  const { user: params_user_name }: any = useParams()

  useEffect(() => {
    fetchUser(params_user_name)
    return () => fetchUserCleanup()
  }, [params_user_name])

  useEffect(() => {
    fetchUserArtworks(ownerUser.id)
    return () => fetchUserArtworksCleanup()
  }, [ownerUser])

  if (user_loading) {
    return null
  }

  return (
    <>
      <PageHeader user={ownerUser} />
      <SectionWrapper>
        <UserInfoBar user={ownerUser} />
        {!userArtworks_loading && <UserArtworks />}
      </SectionWrapper>
    </>
  )
}

const SectionWrapper = styled.section`
  padding: 3rem 0;
  display: grid;
  gap: 1.5rem;
  @media (min-width: 768px) {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 3rem 1rem;
    grid-template-columns: 16rem auto;
    grid-auto-flow: row;
  }
`

export default User
