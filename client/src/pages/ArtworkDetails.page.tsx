import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import {
  useArtworksDispatchContext,
  useArtworksStateContext,
} from '../context/artworks.context'

const ArtworkDetails: React.FC = () => {
  const { artwork } = useArtworksStateContext()
  const { fetchArtwork } = useArtworksDispatchContext()
  const { id }: any = useParams()

  useEffect(() => {
    fetchArtwork(id)
  }, [])
  console.log(artwork)

  return (
    <div>
      <h1>user/works/:id</h1>
    </div>
  )
}

export default ArtworkDetails
