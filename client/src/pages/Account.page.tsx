import React from 'react'
import { useAuthDispatchContext } from '../context/auth.context'

const Account: React.FC = () => {
  const { logout } = useAuthDispatchContext()
  return (
    <div>
      <h1>account_config</h1>
      <button onClick={logout}>サインアウト</button>
    </div>
  )
}

export default Account
