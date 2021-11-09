import React from 'react'
import styled from 'styled-components'
import { useAuthStateContext } from '../../context/auth.context'

const Withdrawal = () => {
  const { myuser } = useAuthStateContext()

  return (
    <Wrapper>
      <div>
        <p>￥{myuser.cash}</p>
      </div>
      <button
        className='account_config-submit_btn'
        onClick={() => window.alert('この機能は実装されていません')}
      >
        口座入金
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    color: var(--clr-grey-6);
    font-size: 1rem;
    font-weight: 600;
  }
`

export default Withdrawal
