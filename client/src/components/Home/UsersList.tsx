import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useUsersStateContext } from '../../context/users.context'
import { ItemsLayout } from './common'
import default_icon from '../../statics/images/default_icon.jpg'

const UsersList = () => {
  const { users } = useUsersStateContext()

  return (
    <div className='section-wrapper' style={{ marginTop: '3rem' }}>
      <HeaderContainer>
        <h2>新着ユーザー</h2>
        <div className='divider' style={{ marginTop: 0 }}></div>
      </HeaderContainer>
      <ItemsLayout>
        {users
          ? users?.map((user: any) => {
              return (
                <Link to={`/user/${user.name}`}>
                  <UserContainer>
                    <div className='user-cover'></div>
                    <img
                      src={
                        user.icon
                          ? `data:image/jpeg;base64,${user.icon}`
                          : default_icon
                      }
                      alt='user_icon'
                    />
                    <div className='user-body'>
                      <p>{user.name}</p>
                    </div>
                  </UserContainer>
                </Link>
              )
            })
          : ''}
      </ItemsLayout>
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

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 1px solid var(--clr-grey-9);
  border-radius: var(--radius);
  .user-cover {
    background: var(--clr-primary-9);
    width: 100%;
    height: 60%;
  }
  .user-body {
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-weight: 600;
      font-size: 1rem;
      color: var(--clr-grey-6);
    }
  }
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid var(--clr-white);
    width: 65px;
    height: 65px;
  }
`

export default UsersList
