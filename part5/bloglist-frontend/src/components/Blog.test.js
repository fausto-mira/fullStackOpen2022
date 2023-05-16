import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('renders', () => {
  const blog = {
    title: 'this is a test',
    author: 'author',
    url: 'https://test.com',
    likes: 5
  }

  const token = 'Bearer thisIsATest'

  test('correct content', () => {
    const component = render(
      <Blog blog={blog} validUser={token} message={() => {}} />
    )

    expect(component.container).toHaveTextContent('this is a test')
    expect(component.container).toHaveTextContent('author')

    // component.debug()

    const p = component.container.querySelector('p')
    console.log(prettyDOM(p))

    expect(p).not.toHaveTextContent('https://test.com')
    expect(p).not.toHaveTextContent('5')
  })

  test('clicks on view works', () => {
    const component = render(
      <Blog blog={blog} validUser={token} message={() => {}} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('https://test.com')
  })

  test('likes click fire event', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} validUser={token} message={() => {}} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
