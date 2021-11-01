import React from 'react'
import styled from 'styled-components'
import { HiPaperAirplane } from 'react-icons/hi'
import { useHistory } from 'react-router'

import { useAuthStateContext } from '../context/auth.context'

const UserInfoBar: React.FC<any> = ({ user }) => {
  const { user: logedinUser } = useAuthStateContext()
  const history = useHistory()
  const onClickNewOrder = () => {
    if (user.accepting_order) {
      return history.push(`/user/${user.name}/order`)
    }
  }

  return (
    <Wrapper>
      {user.id === logedinUser.id ? (
        <></>
      ) : (
        <>
          <ButtonContainer>
            <button
              className={
                user.accepting_order
                  ? 'request_button'
                  : 'request_button forbidden'
              }
              onClick={onClickNewOrder}
            >
              <HiPaperAirplane size={16} />
              新規リクエスト
            </button>
          </ButtonContainer>
          <div className='divider' />
        </>
      )}
      <UserInfoTableContainer>
        <table>
          <tbody>
            <tr>
              <td>金額</td>
              <td>{user.default_order_price}</td>
            </tr>
            <tr>
              <td>リクエスト受付</td>
              <td>{user.accepting_order ? '受付中' : '休止中'}</td>
            </tr>
          </tbody>
        </table>
      </UserInfoTableContainer>
    </Wrapper>
  )
}

const UserInfoTableContainer = styled.div`
  margin: 1.25rem 0;
  margin-bottom: 3rem;
  padding: 0 1rem;
  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    td {
      border: solid var(--clr-grey-8);
      border-width: 0 0 1px;
      height: 2.5rem;
      padding-top: 0.5rem;
      font-weight: 600;
      color: var(--clr-grey-4);
      letter-spacing: -1px;
    }
  }
`

const ButtonContainer = styled.div`
  display: flex;
  padding: 1rem;
  margin-bottom: 3rem;
  .request_button {
    width: 100em;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius);
    background: var(--clr-primary-4);
    color: var(--clr-white);
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
  .request_button svg {
    align-self: center;
    margin-right: 0.25rem;
    padding-bottom: 2px;
  }
  .forbidden {
    background: var(--clr-primary-9);
    cursor: not-allowed;
  }
`

const Wrapper = styled.div`
  width: 95vw;
  margin: 0 auto;
  padding: 1.5rem 0.5rem;
  background: var(--clr-white);
  border-radius: var(--radius);
  @media (min-width: 768px) {
    max-width: 16rem;
    height: 20rem;
  }
`

export default UserInfoBar
