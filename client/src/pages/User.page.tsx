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
  const { fetchUser, getNewUserIcon, submitNewUserIcon } =
    useUsersDispatchContext()
  const { user: params_user_name }: any = useParams()

  console.log(ownerUser)

  useEffect(() => {
    fetchUser(params_user_name)
  }, [])

  return (
    <div>
      <h1>userpage</h1>
      <p>{ownerUser?.name}</p>
      {ownerUser?.icon ? (
        <img src={'data:image/jpeg;base64,' + ownerUser.icon} />
      ) : (
        ''
      )}
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

export default User
