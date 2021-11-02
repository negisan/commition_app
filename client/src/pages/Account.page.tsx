import React from 'react'
import styled from 'styled-components'

import { useAuthDispatchContext } from '../context/auth.context'
import { useUsersDispatchContext } from '../context/users.context'

const Account: React.FC = () => {
  const { logout } = useAuthDispatchContext()
  const { getNewUserIcon, submitNewUserIcon } = useUsersDispatchContext()
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
        <UserIconForm>
          <input
            id='img'
            type='file'
            accept='image/*,.png,.jpg,.jpeg,.gif'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              getNewUserIcon(e)
            }
          />
          <div className='account_config-usericon_submit'>
            <input
              type='button'
              value='変更を保存する'
              onClick={submitNewUserIcon}
              className='account_config-submit_btn'
            />
          </div>
        </UserIconForm>
        <div className="divider" />
      </SectionWrapper>
    </PageLayout>
  )
}

const UserIconForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
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
