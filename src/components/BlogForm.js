import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const createBlog = async e => {
    e.preventDefault()
    addBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
    // const returnedBlog = await blogService.create(blogObject)
    // setBlogs(blogs.concat(returnedBlog))
    // setErrorMessage(`new blog ${newBlogTitle} by ${newBlogAuthor} added!`)
    // setTimeout(() => { setErrorMessage(null) }, 5000)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    // blogformRef.current.toggleVisibility()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input type="text" value={newBlogTitle} name="Username"
            onChange={({ target }) => setNewBlogTitle(target.value)} />
        </div>
        <div>
          author:
          <input type="text" value={newBlogAuthor} name="Username"
            onChange={({ target }) => setNewBlogAuthor(target.value)} />
        </div>
        <div>
          url:
          <input type="text" value={newBlogUrl} name="Username"
            onChange={({ target }) => setNewBlogUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm