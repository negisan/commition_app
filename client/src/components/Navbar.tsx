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
        <RequestLinkContainer>
          <Link to={'/requests'}>
            <HiPaperAirplane />
            リクエスト
          </Link>
        </RequestLinkContainer>
        <Link to={'/account'}>account</Link>
        <p>{user?.name}</p>
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
