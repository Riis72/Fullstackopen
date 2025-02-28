import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'

import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import { handleLike } from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [style, setStyle] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs) // Updates state
      console.log('Fetched blogs:', blogs) // Logs after state is updated
    })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])


  const blogFormRef = useRef()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      console.log(error)
      setMessage('invalid credentials')
      setStyle('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      console.log(returnedBlog)
      setMessage(`${blogObject.title} added by ${blogObject.author}`)
      setStyle('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (error) {
      setMessage('error when  adding blog')
      setStyle('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog)  => {
    console.log(blog)
  }


  const handleLogout = event => {
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
    setUser(null)
  }



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )




  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification style={style} message={message}/>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification style={style} message={message}/>

      <p>{user.username} logged in<button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>


      {blogs.length > 0 && blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
              <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} handleLike={handleLike} />
          ))
      }
    </div>
  )
}

export default App