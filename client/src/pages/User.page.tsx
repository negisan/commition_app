import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useAuthStateContext } from '../context/auth.context'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const User: React.FC = () => {
  const { user } = useAuthStateContext()
  const { user: ownerUser } = useUsersStateContext()
  const { fetchUser } = useUsersDispatchContext()
  const { user: params_user_name }: any = useParams()

  useEffect(() => {
    fetchUser(params_user_name)
  }, [])

  return (
    <div>
      <h1>userpage</h1>
      <p>{ownerUser?.name}</p>
    </div>
  )
}

export default User
