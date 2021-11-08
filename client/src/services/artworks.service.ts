import axios from 'axios'
import { BASE_API_URL } from '../helper/constants'

type Sort = 'new_date' | 'old_date'

const fetchArtworks = async (page: number, sort: Sort) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + `/artworks/?page=${page}&sort=${sort}`,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const fetchArtwork = async (artworkId: any) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + `/artworks/` + artworkId,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

// eslint-disable-next-line
export default {
  fetchArtwork,
  fetchArtworks,
}
