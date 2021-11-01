import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { PageHeader, UserInfoBar, OrderForm } from '../components'
import { useAuthStateContext } from '../context/auth.context'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const Order: React.FC = () => {
  const { user } = useAuthStateContext()
  const { user: params_user_name }: any = useParams()
  const { fetchUser } = useUsersDispatchContext()
  const { user: ownerUser } = useUsersStateContext()

  useEffect(() => {
    fetchUser(params_user_name)
  }, [])
  return (
    <>
      <PageHeader user={ownerUser} />
      <SectionWrapper>
        <UserInfoBar user={ownerUser} />
        {/* orderForm */}
        <OrderForm client={user} creator={ownerUser} />
      </SectionWrapper>
    </>
  )
}

const SectionWrapper = styled.section`
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

export default Order
