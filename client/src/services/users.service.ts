import axios from 'axios'

const BASE_API_URL = 'http://localhost:4000'

const fetchUser = async (user_name: string) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/public/user/' + user_name,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export default {
  fetchUser,
}
