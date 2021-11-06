import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../../context/users.context'

const UserArtworks: React.FC<any> = ({ user }) => {
  const { userArtworks } = useUsersStateContext()
  const { fetchUserArtworks } = useUsersDispatchContext()

  useEffect(() => {
    fetchUserArtworks(user.id)
  }, [user])

  console.log(userArtworks)

  return (
    <div className='section-wrapper'>
      <HeaderContainer>
        <h2>作品</h2>
        <div className='divider' style={{ marginTop: 0 }}></div>
      </HeaderContainer>
      <Layout>
        {userArtworks
          ? userArtworks?.map((artwork: any) => {
              return (
                <Link to={`/artworks/${artwork.id}`}>
                  <ArtworkContainer key={artwork.id}>
                    {artwork.content ? (
                      <img
                        src={`data:image/jpeg;base64,${artwork.content}`}
                        alt='artwork'
                      />
                    ) : (
                      ''
                    )}
                  </ArtworkContainer>
                </Link>
              )
            })
          : ''}
      </Layout>
    </div>
  )
}

const HeaderContainer = styled.div`
  padding: 1.5rem 1rem 0;
  h2 {
    color: var(--clr-grey-6);
  }
`

const ArtworkContainer = styled.div`
  border: 1px solid var(--clr-grey-9);
  height: 100%;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Layout = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(auto, 140px);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(auto, 140px);
  }
  @media (max-width: 880px) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(auto, 120px);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(auto, 140px);
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(auto, 130px);
  }
  @media (max-width: 376px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(auto, 130px);
  }
`

export default UserArtworks
