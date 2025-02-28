import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}
const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data

}
export const handleLike = async blog => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user }
    const response = await axios.put(`${baseUrl}/${likedBlog.id}`, likedBlog)
    return response.data
}




export default { getAll, setToken, create, deleteBlog, handleLike }