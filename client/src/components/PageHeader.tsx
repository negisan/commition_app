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
        <Link to={`/user/${user.name}`}>{user?.name}</Link>
        {/* <p>自己紹介実装したらここに表示</p> */}
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
  min-height: 5rem;
  max-height: 12rem;
  background: var(--clr-white);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  a {
    color: var(--clr-grey-5);
    font-size: 1.25rem;
    font-weight: 600;
  }
  p {
    font-size: 1rem;
    color: var(--clr-grey-6);
  }
  @media (min-width: 768px) {
    padding-left: 17rem;
    align-items: start;
    justify-content: start;
  }
`

export default PageHeader
