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
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input id="titleInput" type="text" value={newBlogTitle} name="Username"
            onChange={({ target }) => setNewBlogTitle(target.value)} />
        </div>
        <div>
          author:
          <input id="authorInput" type="text" value={newBlogAuthor} name="Username"
            onChange={({ target }) => setNewBlogAuthor(target.value)} />
        </div>
        <div>
          url:
          <input id="urlInput" type="text" value={newBlogUrl} name="Username"
            onChange={({ target }) => setNewBlogUrl(target.value)} />
        </div>
        <button id="createBlogButton" type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm