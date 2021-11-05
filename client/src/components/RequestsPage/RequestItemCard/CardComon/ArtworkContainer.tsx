import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ArtworkContainer: React.FC<{ imgSource: string; artworkId: number }> = ({
  imgSource,
  artworkId,
}) => {
  return (
    <Wrapper>
      <h3>作品</h3>
      <div className='divider' style={{ marginTop: 0 }}></div>
      <ImageContainer>
        <Link to={`/artworks/` + artworkId}>
          <img
            src={`${imgSource ? 'data:image/jpeg;base64,' + imgSource : ''}`}
            alt='artwork'
          />
        </Link>
      </ImageContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 3rem;
  h3 {
    font-weight: 600;
    color: var(--clr-grey-4);
  }
`
const ImageContainer = styled.div`
  margin: 0 auto;
  max-width: 760px;
  img {
    width: 100%;
    object-fit: obtain;
    border-radius: var(--radius);
  }
`

export default ArtworkContainer
