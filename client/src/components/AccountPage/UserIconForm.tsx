import React from 'react'
import styled from 'styled-components'

import { useUsersDispatchContext } from '../../context/users.context'

const UserIconForm: React.FC = () => {
  const { getNewUserIcon, submitNewUserIcon } = useUsersDispatchContext()

  return (
    <Wrapper>
      <input
        id='img'
        type='file'
        accept='image/*,.png,.jpg,.jpeg,.gif'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => getNewUserIcon(e)}
      />
      <div className='account_config-usericon_submit'>
        <input
          type='button'
          value='変更を保存する'
          onClick={submitNewUserIcon}
          className='account_config-submit_btn'
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  display: flex;
  justify-content: space-between;
`

export default UserIconForm
