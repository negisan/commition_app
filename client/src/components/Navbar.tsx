import React from 'react'
import { useAuthStateContext } from '../context/auth.context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { SiCheckio } from 'react-icons/si'
import { HiPaperAirplane } from 'react-icons/hi'
import { GrConfigure } from 'react-icons/gr'
import { FiUser } from 'react-icons/fi'

const Navbar = () => {
  const { user, isLoggedin } = useAuthStateContext()

  return (
    <Wrapper>
      <Logo>
        <SiCheckio size={24} />
        <Link to={'/'}>Commition</Link>
      </Logo>
      <NavItemsRight>
        {isLoggedin() ? (
          <>
            <LinkContainer>
              <Link to={'/requests'}>
                <HiPaperAirplane />
                <small>リクエスト</small>
              </Link>
            </LinkContainer>
            <LinkContainer>
              <Link to={'/account'}>
                <GrConfigure size={13} />
                <small>設定</small>
              </Link>
            </LinkContainer>
            <LinkContainer>
              <Link to={`/user/${user.name}`}>
                <FiUser size={15} />
                {user?.name}
              </Link>
            </LinkContainer>
          </>
        ) : (
          <LoginLinkContainer>
            <Link to={'/login'}>
              <p>ログイン</p>
            </Link>
          </LoginLinkContainer>
        )}
      </NavItemsRight>
    </Wrapper>
  )
}

const Logo = styled.div`
  display: flex;
  a {
    font-family: cursive;
    color: var(--clr-grey-1);
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -1px;
  }
  svg {
    align-self: center;
    margin-right: 0.5rem;
  }
`
const LoginLinkContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    cursor: pointer;
    background: var(--clr-primary-5);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
    color: var(--clr-white);
    font-weight: 600;
    font-size: 1.1rem;
    letter-spacing: -2px;
  }
`

const LinkContainer = styled.div`
  :hover {
    background: var(--clr-grey-10);
  }
  cursor: pointer;
  display: flex;
  align-items: center;
  a {
    padding: 0.5rem 1rem;
    display: flex;
    font-weight: 600;
    letter-spacing: -1px;
    svg {
      align-self: center;
      margin-right: 0.25rem;
    }
  }
`

const NavItemsRight = styled.div`
  display: flex;
  height: 100%;
  a {
    color: var(--clr-grey-5);
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
  background: var(--clr-white);
`

export default Navbar
