import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import defaultIcon from '../../statics/images/default_icon.jpg'

const UserBar: React.FC<{ user: any }> = ({ user }) => {
  const username = user?.name
  const icon = user?.icon

  const userIcon = () => {
    if (user?.icon) {
      return `data:image/jpeg;base64,` + user?.icon
    } else {
      return defaultIcon
    }
  }

  return (
    <Wrapper>
      <Link to={`/user/${user?.name}`}>
        <IconContainer>
          <img src={userIcon()} alt='user_icon' />
        </IconContainer>
      </Link>
      <Link to={`/user/${user?.name}`}>
        <UserNameContainer>
          <p>{user?.name}</p>
        </UserNameContainer>
      </Link>
    </Wrapper>
  )
}

const UserNameContainer = styled.div`
  p {
    color: var(--clr-grey-5);
    font-size: 1rem;
    font-weight: 600;
  }
`

const IconContainer = styled.div`
  display: flex;
  align-item: center;
  img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
`

export default UserBar
