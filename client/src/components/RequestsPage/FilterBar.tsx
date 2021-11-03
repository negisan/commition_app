import React from 'react'
import styled from 'styled-components'
import {
  useRequestsDispatchContext,
  useRequestsStateContext,
} from '../../context/requests.context'

const FilterBar:React.FC = () => {
  const {
    changeFilterToAll,
    changeFilterToCanceled,
    changeFilterToProgressing,
    changeFilterToSubmitted,
    changeFilterToDone,
  } = useRequestsDispatchContext()
  const { filterState } = useRequestsStateContext()

  return (
    <div>
      <Wrapper>
        <div
          onClick={changeFilterToAll}
          className={`${
            filterState === 'all' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          全て
        </div>
        <div
          onClick={changeFilterToProgressing}
          className={`${
            filterState === 'progressing' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          進行中
        </div>
        <div
          onClick={changeFilterToSubmitted}
          className={`${
            filterState === 'submitted' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          納品済み
        </div>
        <div
          onClick={changeFilterToDone}
          className={`${
            filterState === 'done' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          完了
        </div>
        <div
          onClick={changeFilterToCanceled}
          className={`${
            filterState === 'canceled' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          キャンセル
        </div>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 3rem;
  .filter_btn {
    cursor: pointer;
    font-weight: 600;
    color: var(--clr-grey-5);
    padding: 0.75rem 1rem;
    border-radius: var(--radius);
    transition: var(--transition);
    :hover {
      background: var(--clr-grey-10);
    }
  }
  .selected {
    background: var(--clr-grey-10);
  }
`

export default FilterBar
