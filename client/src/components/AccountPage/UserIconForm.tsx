import React, { useState } from 'react'
import styled from 'styled-components'

import {
  useAuthDispatchContext,
  useAuthStateContext,
} from '../../context/auth.context'

const UserIconForm: React.FC = () => {
  const { submitNewUserIcon } = useAuthDispatchContext()
  const { myuser } = useAuthStateContext()
  const [newUserIcon, setNewUserIcon] = useState<File>()

  const getNewUserIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const img: File = e.target.files[0]
    setNewUserIcon(img)
  }

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
          onClick={() => submitNewUserIcon(myuser.id, newUserIcon)}
          className='account_config-submit_btn'
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    gap: 1rem;
    flex-direction: column;
    .account_config-usericon_submit {
      margin-left: auto;
    }
  }
`

export default UserIconForm
