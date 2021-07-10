import React, { useState } from 'react'

const Blog = ({ blog, likePost, removeBlog, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  let RemoveBlogButton
  if (blog.user.username === loggedUser.username) {
    RemoveBlogButton = <div><button onClick={removeBlog}>remove</button></div>
  } else {
    RemoveBlogButton = <div></div>
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={likePost}>like</button></div>
        <div>{blog.user.name}</div>
        {RemoveBlogButton}
      </div>
    </div>
  )
}


export default Blog