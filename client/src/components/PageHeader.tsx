import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import default_icon from '../statics/images/default_icon.jpg'

const PageHeader: React.FC<any> = ({ user }) => {
  return (
    <>
      <Hero />
      <UserIcon>
        <img
          src={`${
            user?.icon ? 'data:image/jpeg;base64,' + user?.icon : default_icon
          }`}
          alt='user icon'
        />
      </UserIcon>
      <InfoBar>
        <Link to={`/user/${user.name}`}>
          <h3 className='user_name'>{user?.name}</h3>
        </Link>
      </InfoBar>
    </>
  )
}

const Hero = styled.div`
  width: 100vw;
  height: 18rem;
  background: var(--clr-primary-9);
  @media (min-width: 768px) {
    height: 10rem;
  }
`
const UserIcon = styled.div`
  width: 12rem;
  margin: 0 auto;
  position: relative;
  img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 50%;
    border: 5px solid var(--clr-white);
    position: absolute;
    top: -14rem;
  }
  @media (min-width: 768px) {
    margin: 0;
    margin-right: auto;
    padding-left: 4.5rem;
    img {
      top: -6rem;
    }
  }
`
const InfoBar = styled.div`
  width: 100vw;
  height: 5rem;
  background: var(--clr-white);
  padding: 2rem;
  h3 {
    text-align: center;
    color: var(--clr-grey-4);
  }
  @media (min-width: 768px) {
    padding-left: 17rem;
    h3 {
      text-align: left;
    }
  }
`

export default PageHeader
