import Togglable from './Togglable.jsx'
import axios from 'axios'
import blogService from '../services/blogs.js'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, handleLike }) => {
    console.log(blogs)
  const update = async () => {
    try {
      const returnedBlog = await handleLike(blog); // Await the function
      console.log("Updated blog:", returnedBlog);

      setBlogs(blogs.map(b => (b.id !== blog.id ? b : returnedBlog))); // Fix reference
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  }

  const deleteBlog = async () => {
    if (!blog) {
      console.log('Blog is undefined')
      return
    }

    if (window.confirm('Remove blog' + blog.title + blog.author)) {
      const deletedBlog = await blogService.deleteBlog(blog)
      setBlogs([...(blogs.filter(b => b.id !== blog.id))])
    }
  }

  const DeleteBlog = ({ blog }) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
    if (loggedUser === null) {
      return
    }
    if (loggedUser.username === blog.user.username) {
      return (
          <button style={{ color: 'black', backgroundColor: 'lightslategray', borderRadius: 10, }} onClick={deleteBlog}>delete</button>
      )
    }
    return null
  }

  return (
      <div className='blog'>
        {blog.title} {blog.author}
        <Togglable buttonLabel="view">
          <div >
            <p>{blog.url}</p>
            <p>likes {blog.likes}
              <button onClick={update}>like</button>
            </p>
            <p>{blog.user ? blog.user.username : 'No user'}</p>
            <DeleteBlog blog={blog} />
          </div>
        </Togglable>
      </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.any.isRequired,
  blogs: PropTypes.any.isRequired,
  setBlogs: PropTypes.any.isRequired
}


export default Blog