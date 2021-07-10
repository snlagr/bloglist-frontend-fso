import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">{message}</div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogformRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log(blogs)
      setBlogs( blogs.sort((e1, e2) => e2.likes - e1.likes) )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong Credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async blogObject => {
    const returnedBlog = await blogService.create(blogObject)
    console.log(returnedBlog)
    setBlogs(blogs.concat(returnedBlog))
    setErrorMessage(`new blog ${returnedBlog.title} by ${returnedBlog.author} added!`)
    setTimeout(() => { setErrorMessage(null) }, 5000)
    blogformRef.current.toggleVisibility()
  }

  const likePost = postId => {
    const retFunc = async () => {
      const post = blogs.filter(blog => blog.id === postId)[0]
      post.likes++
      const postCopy = { ...post }
      postCopy.user = postCopy.user.id
      await blogService.update(postId, postCopy)
      setBlogs([...blogs])
    }
    return retFunc
  }

  const removeBlog = postId => {
    const retFunc = async () => {
      const post = blogs.filter(blog => blog.id === postId)[0]
      const isconfirm = window.confirm(`Remove blog ${post.title} by ${post.author}`)
      if (isconfirm) {
        await blogService.remove(postId)
        setBlogs(blogs.filter(blog => blog.id !== postId))
      }
    }

    return retFunc
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input type="text" value={username} name="Username"
              onChange={({ target }) => setUsername(target.value)} />
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
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <br />

      <Togglable buttonLabel="create new blog" ref={blogformRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <br />
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likePost={likePost(blog.id)}
          removeBlog={removeBlog(blog.id)}
          loggedUser={user}
        />
      )}
    </div>
  )
}

export default App