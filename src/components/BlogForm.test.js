import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component, addBlog

  beforeEach(() => {
    addBlog = jest.fn()
    component = render(
      <BlogForm addBlog={addBlog}/>
    )
  })

  test('eventhandler called with right details', () => {
    const titleInput = component.container.querySelector('#titleInput')
    fireEvent.change(titleInput, {
      target: { value: 'titleInput' }
    })

    const authorInput = component.container.querySelector('#authorInput')
    fireEvent.change(authorInput, {
      target: { value: 'authorInput' }
    })

    const urlInput = component.container.querySelector('#urlInput')
    fireEvent.change(urlInput, {
      target: { value: 'urlInput' }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    const expectedValue = {
      title: 'titleInput',
      author: 'authorInput',
      url: 'urlInput'
    }

    expect(addBlog.mock.calls[0][0]).toEqual(expectedValue)

  })

})