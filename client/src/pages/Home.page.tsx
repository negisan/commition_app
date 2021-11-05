import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  useArtworksDispatchContext,
  useArtworksStateContext,
} from '../context/artworks.context'

const Home: React.FC = () => {
  const { artworks, isLoading } = useArtworksStateContext()
  const { fetchArtworks } = useArtworksDispatchContext()

  useEffect(() => {
    fetchArtworks()
  }, [])

  console.log(artworks)

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <Wrapper>
      <div className='section-wrapper'>
        <HeaderContainer>
          <h2>新着</h2>
          <div className='divider' style={{ marginTop: 0 }}></div>
        </HeaderContainer>
        <ArtworksContainer>
          {artworks?.map((artwork: any) => {
            return (
              <ArtworkContainer key={artwork.id}>
                <Link to={`/artworks/${artwork.id}`}>
                <img
                  src={`data:image/jpg;base64,` + artwork.content}
                  alt='artwork'
                />
                </Link>
              </ArtworkContainer>
            )
          })}
        </ArtworksContainer>
      </div>
      <div>users</div>
    </Wrapper>
  )
}

const HeaderContainer = styled.div`
  padding: 3rem 1rem 0;
  h2 {
    color: var(--clr-grey-5);
  }
`

const ArtworkContainer = styled.div`
  border: 1px solid var(--clr-grey-9);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ArtworksContainer = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(auto, 200px);
  gap: 1.5rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(auto, 150px);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(auto, 120px);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(auto, 120px);
  }
`

const Wrapper = styled.div`
  width: 95vw;
  max-width: var(--max-width);
  padding: 3rem 0;
  margin: 0 auto;
`

export default Home
