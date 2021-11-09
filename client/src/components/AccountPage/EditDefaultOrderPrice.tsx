// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  useAuthDispatchContext,
  useAuthStateContext,
} from '../../context/auth.context'

const EditDefaultOrderPrice: React.FC = () => {
  const { myuser } = useAuthStateContext()
  const { updateDefaultOrderPrice } = useAuthDispatchContext()
  const inputRef = useRef(null!)

  useEffect(() => {
    inputRef.current.value = myuser.default_order_price
  }, [myuser])

  return (
    <>
      <DefaultOrderPriceForm
        onSubmit={() =>
          updateDefaultOrderPrice(myuser.id, inputRef.current.value)
        }
      >
        <input type='number' ref={inputRef} />
        <button type='submit' className="account_config-submit_btn">変更を保存する</button>
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
`

export default EditDefaultOrderPrice
