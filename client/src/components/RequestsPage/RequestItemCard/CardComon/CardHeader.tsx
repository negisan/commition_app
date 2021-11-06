import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useRequestsStateContext } from '../../../../context/requests.context'

interface CardHeaderProps {
  userName: string
  orderPrice: number
  createdAt: string
  request: any
}

const CardHeader: React.FC<CardHeaderProps> = ({
  userName,
  orderPrice,
  createdAt,
  request,
}) => {
  const { role } = useRequestsStateContext()

  let title = ''
  if (role === 'client') {
    title = '受注者名：'
  }
  if (role === 'creator') {
    title = '発注者名：'
  }

  let requestState = ''
  if (request?.state_default) {
    requestState = '未受注'
  }
  if (request?.cancel) {
    requestState = 'キャンセル'
  }
  if (request?.progressing) {
    requestState = '進行中'
  }
  if (request?.submitted) {
    requestState = '納品済み'
  }
  if (request?.done) {
    requestState = '完了'
  }

  const createdDate = () => {
    const yyyymmdd = createdAt?.split('T')[0]
    const year = yyyymmdd.split('-')[0]
    const month = yyyymmdd.split('-')[1]
    const day = yyyymmdd.split('-')[2]
    return `${year}/${month}/${day}`
  }

  return (
    <Wrapper>
      <h2>
        {title}
        <Link to={`/user/${userName}`}>{userName}</Link>
      </h2>
      <div className='divider' style={{ marginTop: 0 }}></div>
      <Container>
        <h3>状態：</h3>
        <p>{requestState}</p>
      </Container>
      <Container>
        <h3>金額：</h3>
        <p>¥{orderPrice}</p>
      </Container>
      <Container>
        <h3>作成日：</h3>
        <p>{createdDate()}</p>
      </Container>
    </Wrapper>
  )
}

const Container = styled.div`
  h3 {
    display: inline-block;
    margin-right: 0.5rem;
  }
  p {
    display: inline-block;
    font-weight: 600;
    font-size: 1rem;
  }
`

const Wrapper = styled.div`
  color: var(--clr-grey-5);
  font-size: 0.75rem;
  a {
    color: var(--clr-primary-4);
  }
`

export default CardHeader
