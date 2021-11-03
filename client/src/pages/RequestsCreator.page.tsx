import React, { useEffect } from 'react'
import { Layout, PageHeader } from '../components/RequestsPage'
import { useRequestsDispatchContext } from '../context/requests.context'

const RequestsCreator: React.FC = () => {
  const { isCreatorPage } = useRequestsDispatchContext()

  useEffect(() => {
    isCreatorPage()
  }, [])

  return (
    <Layout>
      <PageHeader />
      <p>RequestsCreator</p>
    </Layout>
  )
}

export default RequestsCreator
