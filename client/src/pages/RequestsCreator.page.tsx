import React from 'react'
import { Layout, PageHeader } from '../components/RequestsPage'

const RequestsCreator: React.FC = () => {
  return (
    <Layout>
      <PageHeader role='creator' />
      <p>RequestsCreator</p>
    </Layout>
  )
}

export default RequestsCreator
