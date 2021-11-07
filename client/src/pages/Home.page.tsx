import React, { useEffect } from 'react'
import styled from 'styled-components'

import { ArtworkList, CreatorList } from '../components/Home'
import {
  useArtworksDispatchContext,
} from '../context/artworks.context'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const Home: React.FC = () => {
  const { fetchArtworks, artworks_loading } = useArtworksDispatchContext()
  const { fetchCreators } = useUsersDispatchContext()
  const { creators_loading } = useUsersStateContext()

  useEffect(() => {
    fetchArtworks()
    fetchCreators()
  }, [])

  if (artworks_loading) {
    return null
  }

  return (
    <Wrapper>
      <ArtworkList />
      {!creators_loading && <CreatorList />}
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
