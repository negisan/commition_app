import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuthStateContext } from '../../context/auth.context'
import { useUsersDispatchContext } from '../../context/users.context'

const EditDefaultOrderPrice: React.FC = () => {
  const { user } = useAuthStateContext()
  const { updateDefaultOrderPrice } = useUsersDispatchContext()
  const [value, setValue] = useState(user.default_order_price)

  return (
    <>
      <DefaultOrderPriceForm
        onSubmit={() => updateDefaultOrderPrice(user.id, value)}
      >
        <input
          type='number'
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
        />
        <button type='submit'>変更を保存する</button>
      </DefaultOrderPriceForm>
    </>
  )
}

const DefaultOrderPriceForm = styled.form`
  display: flex;
  justify-content: space-between;
  input {
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    border: none;
    border-bottom: 2px solid var(--clr-grey-9);
    color: var(--clr-grey-5);
    :focus {
      outline: none;
    }
  }
  button {
    border: none;
    border-radius: var(--radius);
    padding: 0.5rem 0.75rem;
    background: var(--clr-primary-4);
    color: var(--clr-white);
  }
`

export default EditDefaultOrderPrice
