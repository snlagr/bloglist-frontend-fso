import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component, likePost

  beforeEach(() => {
    const blog = {
      title: 'test Blog',
      author: 'test author',
      likes: 1,
      url: 'test url',
      user: {
        name: 'test user',
        username: 'test username'
      }
    }
    const loggedUser = {
      username: 'test username'
    }
    likePost = jest.fn()
    component = render(
      <Blog blog={blog} loggedUser={loggedUser} likePost={likePost}/>
    )
  })

  test('renders title & author but not url & likes by default', () => {
    const titleAuthor = component.container.querySelector('#titleAuthor')
    const urlLikesExpanded = component.container.querySelector('#urlLikesExpanded')

    expect(titleAuthor).not.toHaveStyle('display: none')
    expect(urlLikesExpanded).toHaveStyle('display: none')
  })

  test('url & likes shown after clicking button', () => {
    const viewButton = component.getByText('view')
    const urlLikesExpanded = component.container.querySelector('#urlLikesExpanded')
    fireEvent.click(viewButton)
    expect(urlLikesExpanded).not.toHaveStyle('display: none')
  })

  test('event handler for like button called twice', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likePost.mock.calls).toHaveLength(2)
  })

  // test('at start the children are not displayed', () => {
  //   const div = component.container.querySelector('.togglableContent')

  //   expect(div).toHaveStyle('display: none')
  // })

  // test('after clicking the button, children are displayed', () => {
  //   const button = component.getByText('show...')
  //   fireEvent.click(button)

  //   const div = component.container.querySelector('.togglableContent')
  //   expect(div).not.toHaveStyle('display: none')
  // })

  // test('toggled content can be closed', () => {
  //   const button = component.getByText('show...')
  //   fireEvent.click(button)

  //   const closeButton = component.getByText('cancel')
  //   fireEvent.click(closeButton)

  //   const div = component.container.querySelector('.togglableContent')
  //   expect(div).toHaveStyle('display: none')
  // })

})