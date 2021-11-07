import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import { NotFound, UserInfoBar } from '../components'
import {
  useArtworksDispatchContext,
  useArtworksStateContext,
} from '../context/artworks.context'
import { UserBar } from '../components/common'

const ArtworkDetails: React.FC = () => {
  const {
    artwork,
    artwork_creator,
    artwork_loading: isLoading,
  } = useArtworksStateContext()
  const { fetchArtwork, fetchArtworkCleanup } = useArtworksDispatchContext()
  const { id }: any = useParams()

  useEffect(() => {
    fetchArtwork(id)
    return () => fetchArtworkCleanup()
  }, [id])

  if (isLoading) {
    return <div></div>
  }

  const { artwork_image, order_content, thanks_comment } = artwork

  return (
    <Wrapper>
      <ArtworkContainer>
        <img src={`data:image/jpeg;base64,` + artwork_image} alt='artwork' />
      </ArtworkContainer>
      <div>
        <RequestInfoContainer>
          <UserBar user={artwork_creator} />
          <div className='divider' />
          <ContentContainer>
            <h3>リクエスト</h3>
            <p>{order_content}</p>
          </ContentContainer>
          <div className='divider'></div>
          <ContentContainer>
            <h3>クライアントのコメント</h3>
            <p>{thanks_comment}</p>
          </ContentContainer>
        </RequestInfoContainer>
        <UserInfoBar user={artwork_creator} />
      </div>
    </Wrapper>
  )
}

const ContentContainer = styled.div`
  h3 {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    color: var(--clr-grey-5);
    letter-spacing: -1px;
  }
  p {
    padding: 0 0.5rem;
    font-weight: 600;
    color: var(--clr-grey-6);
  }
`

const ArtworkContainer = styled.div`
  width: 95vw;
  margin: 0 auto;
  img {
    width: 100%;
    object-fit: contain;
  }
  @media (min-width: 768px) {
    max-width: 55vw;
  }
`

const RequestInfoContainer = styled.div`
  width: 95vw;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  padding: 1.5rem 0.5rem;
  background: var(--clr-white);
  border-radius: var(--radius);
  @media (min-width: 768px) {
    max-width: 16rem;
  }
`

const Wrapper = styled.div`
  padding: 3rem 0;
  display: grid;
  gap: 1.5rem;
  @media (min-width: 768px) {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 3rem 1rem;
    grid-template-columns: auto 16rem;
    grid-auto-flow: row;
  }
`

export default ArtworkDetails
