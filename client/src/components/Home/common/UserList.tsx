import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { RoleTag } from '.'
import { ItemsLayout } from '../../common'
import default_icon from '../../../statics/images/default_icon.jpg'

const UserList: React.FC<{ users: any }> = ({ users }) => {
  return (
    <ItemsLayout>
      {users
        ? users?.map((user: any) => {
            return (
              <Link to={`/user/${user.name}`} key={user.id}>
                <UserContainer>
                  <div className='user-cover'>
                    {user.isCreator && <RoleTag role={'クリエイター'} />}
                    {user.isClient && <RoleTag role={'クライアント'} />}
                  </div>
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
  )
}

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
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid var(--clr-white);
    width: 65px;
    height: 65px;
    object-fit: cover;
  }
`

export default UserList
