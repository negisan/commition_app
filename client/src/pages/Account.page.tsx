import React from 'react'
import styled from 'styled-components'

import { useAuthDispatchContext } from '../context/auth.context'
import {
  UserIconForm,
  SwitchAcceptingOrder,
  EditDefaultOrderPrice,
} from '../components/AccountPage'

const Account: React.FC = () => {
  const { logout } = useAuthDispatchContext()

  return (
    <PageLayout>
      <SectionWrapper className='section-wrapper'>
        <HeaderContainer>
          <div className='account_config-page_title'>
            <h1>アカウント設定</h1>
          </div>
          <div className='account_config-signout_btn'>
            <button onClick={logout}>サインアウト</button>
          </div>
        </HeaderContainer>
        <div className='divider' />
        <TitleContainer>
          <h3>リクエスト受付</h3>
        </TitleContainer>
        <SwitchAcceptingOrder />
        <div className='divider' />
        <TitleContainer>
          <h3>おまかせ金額の編集</h3>
        </TitleContainer>
        <EditDefaultOrderPrice />
        <div className='divider' />
        <TitleContainer>
          <h3>ユーザーアイコンの編集</h3>
        </TitleContainer>
        <UserIconForm />
        <div className='divider' />
        <TitleContainer>
          <h3>売上</h3>
        </TitleContainer>
      </SectionWrapper>
    </PageLayout>
  )
}

const TitleContainer = styled.div`
  margin-top: 3rem;
  margin-bottom: 0.5rem;
  h3 {
    color: var(--clr-grey-3);
  }
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  .account_config-page_title {
    h1 {
      color: var(--clr-grey-3);
      letter-spacing: -3px;
    }
  }
  .account_config-signout_btn {
    display: flex;
    margin-right: 1rem;
    button {
      align-self: center;
      background: var(--clr-red);
      border: none;
      border-radius: var(--radius);
      padding: 0.5rem 0.75rem;
      color: var(--clr-white);
      cursor: pointer;
      transition: var(--transition);
      box-shadow: var(--dark-shadow);
    }
    button:hover {
      opacity: 0.7;
    }
  }
`

const SectionWrapper = styled.div`
  padding: 3rem 2rem;
`

const PageLayout = styled.div`
  margin: 0 auto;
  padding: 3rem 0;
  @media (min-width: 768px) {
    max-width: 1124px;
    padding: 3rem;
  }
`

export default Account
