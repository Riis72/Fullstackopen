import { useState } from 'react'
import blogService from '../services/blogs.js'

const BlogForm = ({ createBlog, }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {

    event.preventDefault()
    createBlog({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')

  }


  return(
    <form onSubmit={addBlog}>
      <div>
      title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder='title'
        />
      </div>
      <div>
      author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='author'

        />
      </div>
      <div>
      url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url'

        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}
export default BlogForm