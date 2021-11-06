import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ArtworkList } from '../components/Home'
import {
  useArtworksDispatchContext,
  useArtworksStateContext,
} from '../context/artworks.context'

const Home: React.FC = () => {
  const { artworks } = useArtworksStateContext()
  const { fetchArtworks } = useArtworksDispatchContext()

  useEffect(() => {
    fetchArtworks()
  }, [])

  console.log(artworks)

  return (
    <Wrapper>
      <ArtworkList />
      <div>users</div>
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
