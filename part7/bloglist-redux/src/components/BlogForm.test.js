import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm> creates note correctly', () => {
  const createBlog = jest.fn()
  const component = render(<BlogForm createBlog={createBlog} />)
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'this is a test' } })
  fireEvent.change(author, { target: { value: 'test' } })
  fireEvent.change(url, { target: { value: 'www.test.com' } })
  fireEvent.submit(form)

  console.log(createBlog.mock.calls[0][0].title)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('this is a test')
})
