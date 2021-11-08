import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { CustomLoader, ItemsLayout } from '../components/common'
import {
  useArtworksDispatchContext,
  useArtworksStateContext,
} from '../context/artworks.context'

const AllArtworks = () => {
  const { all_artworks, has_more_artworks } = useArtworksStateContext()
  const { loadMoreArtworks } = useArtworksDispatchContext()

  const items = (
    <>
      {all_artworks ? (
        <ItemsLayout>
          {all_artworks?.map((artwork: any) => {
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
    </>
  )

  return (
    <Wrapper>
      <div className='section-wrapper'>
        <HeaderContainer>
          <h2>全ての新着作品</h2>
          <div className='divider' style={{ marginTop: 0 }}></div>
        </HeaderContainer>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreArtworks}
          hasMore={has_more_artworks}
          loader={<CustomLoader />}
        >
          {items}
        </InfiniteScroll>
      </div>
    </Wrapper>
  )
}

const HeaderContainer = styled.div`
  padding: 3rem 1rem 0;
  h2 {
    color: var(--clr-grey-5);
    letter-spacing: -2px;
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

const Wrapper = styled.div`
  width: 95vw;
  max-width: var(--max-width);
  padding: 3rem 0;
  margin: 0 auto;
`

export default AllArtworks
