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
        <div>
          <span　className="currency">￥</span>
          <input type='number' ref={inputRef} />
        </div>
        <button type='submit' className='account_config-submit_btn'>
          変更を保存する
        </button>
      </DefaultOrderPriceForm>
    </>
  )
}

const DefaultOrderPriceForm = styled.form`
  display: flex;
  justify-content: space-between;
  input {
    padding: 0.25rem 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-bottom: 2px solid var(--clr-grey-9);
    color: var(--clr-grey-6);
    :focus {
      outline: none;
    }
  }
  .currency {
    font-size: 1.1rem;
    color: var(--clr-grey-6);
    font-weight: 600;
  }
`

export default EditDefaultOrderPrice
