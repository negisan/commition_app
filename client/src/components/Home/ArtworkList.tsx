import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useArtworksStateContext } from '../../context/artworks.context'
import { ItemsLayout } from './common'

const ArtworkList: React.FC = () => {
  const { artworks, isLoading: isLoadingArtworks } = useArtworksStateContext()

  return (
    <div className='section-wrapper'>
      <HeaderContainer>
        <h2>新着作品</h2>
        <div className='divider' style={{ marginTop: 0 }}></div>
      </HeaderContainer>
      {artworks ? (
        <ItemsLayout>
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
        </ItemsLayout>
      ) : (
        ''
      )}
    </div>
  )
}

const HeaderContainer = styled.div`
  padding: 3rem 1rem 0;
  h2 {
    color: var(--clr-grey-5);
    letter-spacing: -1px;
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

export default ArtworkList
