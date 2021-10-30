import React from 'react'
import { useAuthDispatchContext } from '../context/auth.context'
import { useUsersDispatchContext } from '../context/users.context'

const Account: React.FC = () => {
  const { logout } = useAuthDispatchContext()
  const { getNewUserIcon, submitNewUserIcon } = useUsersDispatchContext()
  return (
    <div>
      <h1>account_config</h1>
      <button onClick={logout}>サインアウト</button>
      <hr />
      <form>
        <input
          id='img'
          type='file'
          accept='image/*,.png,.jpg,.jpeg,.gif'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            getNewUserIcon(e)
          }
        />
        <input type='button' value='保存' onClick={submitNewUserIcon} />
      </form>
    </div>
  )
}

export default Account
