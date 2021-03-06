import React from 'react'
import styled from 'styled-components'
import { useAuthDispatchContext, useAuthStateContext } from '../../context/auth.context'

const SwitchAcceptingOrder: React.FC = () => {
  const { myuser } = useAuthStateContext()
  const { setAcceptingOrderToFalse, setAcceptingOrderToTrue } = useAuthDispatchContext()

  return (
    <Wrapper>
      <ButtonLeft
        className={myuser.accepting_order ? 'selected' : ''}
        onClick={() => setAcceptingOrderToTrue(myuser.id)}
      >
        受付
      </ButtonLeft>
      <ButtonRight
        className={myuser.accepting_order ? '' : 'selected'}
        onClick={() => setAcceptingOrderToFalse(myuser.id)}
      >
        休止
      </ButtonRight>
    </Wrapper>
  )
}

const Button = styled.div`
  border: 1px solid var(--clr-primary-6);
  padding: 0.5rem;
  font-weight: 600;
  color: var(--clr-grey-4);
  cursor: pointer;
`

const ButtonLeft = styled(Button)`
  border-radius: var(--radius) 0 0 var(--radius);
`

const ButtonRight = styled(Button)`
  border-radius: 0 var(--radius) var(--radius) 0;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  .selected {
    background: var(--clr-primary-4);
    color: var(--clr-white);
    border: none;
  }
`

export default SwitchAcceptingOrder
