import React from 'react'
import { useAuthStateContext } from '../context/auth.context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SiCheckio } from 'react-icons/si'
import { HiPaperAirplane } from 'react-icons/hi'

const Navbar = () => {
  const { user } = useAuthStateContext()
  return (
    <Wrapper>
      <Logo>
        <SiCheckio size={24} />
        <Link to={'/'}>Commition</Link>
      </Logo>
      <NavItemsRight>
        {user ? (
          <>
            <RequestLinkContainer>
              <Link to={'/requests'}>
                <HiPaperAirplane />
                リクエスト
              </Link>
            </RequestLinkContainer>
            <Link to={'/account'}>account</Link>
            <Link to={`/user/${user.name}`}>{user?.name}</Link>
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
  cursor: pointer;
  background: var(--clr-primary-5);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius);
  p {
    color: var(--clr-white);
    font-weight: 600;
    font-size: 1.1rem;
    letter-spacing: -2px;
  }
`

const RequestLinkContainer = styled.div`
  a {
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
  gap: 1rem;
  a {
    color: var(--clr-grey-1);
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
