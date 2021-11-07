import React, { useEffect } from 'react'
import styled from 'styled-components'

import { ArtworkList, CreatorList, ClientList } from '../components/Home'
import { useArtworksDispatchContext } from '../context/artworks.context'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const Home: React.FC = () => {
  const { fetchArtworks, artworks_loading } = useArtworksDispatchContext()
  const { fetchCreators, fetchClients } = useUsersDispatchContext()
  const { creators_loading, clients_loading } = useUsersStateContext()

  useEffect(() => {
    fetchArtworks()
    fetchCreators()
    fetchClients()
  }, [])

  if (artworks_loading) {
    return null
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
