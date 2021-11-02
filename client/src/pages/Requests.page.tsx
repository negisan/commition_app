import React, { useState } from 'react'
import styled from 'styled-components'

import { Layout, PageHeader, RequestList } from '../components/RequestsPage'

type FilterState = 'all' | 'progressing' | 'submitted' | 'done' | 'canceled'

const Requests: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterState>('all')
  // client_id = user.id の全てのリクエストを取得

  return (
    <Layout>
      <PageHeader role='client' />
      <FilterBar>
        <div
          onClick={() => setFilterState('all')}
          className={`${
            filterState === 'all' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          全て
        </div>
        <div
          onClick={() => setFilterState('progressing')}
          className={`${
            filterState === 'progressing' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          進行中
        </div>
        <div
          onClick={() => setFilterState('submitted')}
          className={`${
            filterState === 'submitted' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          納品済み
        </div>
        <div
          onClick={() => setFilterState('done')}
          className={`${
            filterState === 'done' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          完了
        </div>
        <div
          onClick={() => setFilterState('canceled')}
          className={`${
            filterState === 'canceled' ? 'selected filter_btn' : 'filter_btn'
          }`}
        >
          キャンセル
        </div>
      </FilterBar>
      <div className='divider'></div>
      {filterState}
      <RequestList />
      <p>requestsClient</p>
    </Layout>
  )
}

const FilterBar = styled.div`
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

export default Requests
