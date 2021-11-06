import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ArtworkList, UsersList } from '../components/Home'
import {
  useArtworksDispatchContext,
  useArtworksStateContext,
} from '../context/artworks.context'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const Home: React.FC = () => {
  const { artworks } = useArtworksStateContext()
  const { fetchArtworks } = useArtworksDispatchContext()
  const { fetchUsers } = useUsersDispatchContext()
  const { users } = useUsersStateContext()

  useEffect(() => {
    fetchArtworks()
    fetchUsers()
  }, [])

  console.log(artworks)
  console.log(users)

  return (
    <Wrapper>
      {artworks ? (
        <>
          <ArtworkList />
          <UsersList />
        </>
      ) : (
        ''
      )}
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
