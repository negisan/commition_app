import React, { useEffect } from 'react'
import styled from 'styled-components'
import { CustomLoader } from '../components/common'

import { ArtworkList, CreatorList, ClientList } from '../components/Home'
import {
  useArtworksDispatchContext,
  useArtworksStateContext,
} from '../context/artworks.context'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const Home: React.FC = () => {
  const { artworks_loading } = useArtworksStateContext()
  const { fetchArtworks, fetchArtworksCleanup } = useArtworksDispatchContext()
  const { fetchCreators, fetchClients } = useUsersDispatchContext()
  const { creators_loading, clients_loading } = useUsersStateContext()

  useEffect(() => {
    fetchArtworks()
    fetchCreators()
    fetchClients()
    return () => fetchArtworksCleanup()
    // eslint-disable-next-line
  }, [])

  if (artworks_loading) {
    return <CustomLoader />
  }

  return (
    <Wrapper>
      <ArtworkList />
      {!creators_loading && <CreatorList />}
      {!clients_loading && <ClientList />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 95vw;
  max-width: var(--max-width);
  padding: 3rem 0;
  margin: 0 auto;
`

export default Home
