import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'

import { PageHeader, UserInfoBar, OrderForm } from '../components'
import { useAuthStateContext } from '../context/auth.context'
import { useOrderStateContext } from '../context/order.context'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const Order: React.FC = () => {
  const { myuser } = useAuthStateContext()
  const { user: ownerUser, user_loading } = useUsersStateContext()
  const { fetchUser, fetchUserCleanup } = useUsersDispatchContext()
  const { isProcessing } = useOrderStateContext()
  const history = useHistory()
  const { user: user_name }: any = useParams()

  useEffect(() => {
    fetchUser(user_name)
    return () => fetchUserCleanup()
    // eslint-disable-next-line
  }, [user_name])

  if (user_loading) {
    return null
  }

  if (ownerUser.id === myuser.id) {
    history.replace('/')
  }

  return (
    <>
      <BlockUi tag='div' blocking={isProcessing}>
        <PageHeader user={ownerUser} />
        <SectionWrapper>
          <UserInfoBar user={ownerUser} />
          <OrderForm client={myuser} creator={ownerUser} />
        </SectionWrapper>
      </BlockUi>
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
