import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { PageHeader, UserInfoBar } from '../components'
import { CustomLoader } from '../components/common'
import { UserArtworks } from '../components/UserPage'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const User: React.FC = () => {
  const { user: ownerUser, user_page_loading } = useUsersStateContext()
  const { loadUserPage, loadUserPageCleanup } = useUsersDispatchContext()
  const { user: params_user_name }: any = useParams()

  useEffect(() => {
    loadUserPage(params_user_name)
    return () => loadUserPageCleanup()
    // eslint-disable-next-line
  }, [params_user_name])

  if (user_page_loading) {
    return <CustomLoader />
  }

  return (
    <>
      {ownerUser ? (
        <>
          <PageHeader user={ownerUser} />
          <SectionWrapper>
            <UserInfoBar user={ownerUser} />
            <UserArtworks />
          </SectionWrapper>
        </>
      ) : (
        ''
      )}
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
