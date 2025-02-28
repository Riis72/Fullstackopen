import React from "react";
import '@testing-library/jest-dom'
import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog.jsx";

test('renders blog title and author ', async () => {
    const blog = {
      title: 'Testing blog rendering',
      author: 'Kris',
      url: 'google.com',
      likes: 2
    }

    const { container } = render(<Blog blog={blog}/>)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Testing blog rendering')
  expect(div).toHaveTextContent('Kris')
  expect(div).not.toHaveTextContent('google.com')
  
})
test('clicking button renders url and likes', async () => {
  const blog = {
    title: 'Testing blog rendering',
    author: 'Kris',
    url: 'google.com',
    likes: 2
  }
    const { container } = render(<Blog blog={blog}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('google.com')
  expect(div).toHaveTextContent('2')
})
test('clicking like button twice calls it twice', async () => {
  const mockHandler = vi.fn()
  const blog = {
    title: 'Testing blog rendering',
    author: 'Kris',
    url: 'google.com',
    likes: 2
  }
  const { container } = render(<Blog blog={blog}  handleLike={mockHandler}/>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const like = screen.getByText('like')
  await user.click(like)
  await user.click(like)
  console.log(mockHandler.mock.calls)
  expect(mockHandler.mock.calls).toHaveLength(2)

})