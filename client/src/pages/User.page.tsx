import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { PageHeader } from '../components'

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
        <div></div>
        {/* artwork */}
        <div></div>
      </SectionWrapper>
    </>
  )
}

const SectionWrapper = styled.div`
  height: 100vh;
`

export default User
