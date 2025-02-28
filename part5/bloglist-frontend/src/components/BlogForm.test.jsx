import { render, screen } from '@testing-library/react'
import BlogForm from "./BlogForm.jsx";
import userEvent from '@testing-library/user-event'

test('blogform props works correctly', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()
  render(<BlogForm createBlog={addBlog} />)

  const create = screen.getByText('create')
  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  await user.type(title, 'Maailmanmestaruus')
  await user.type(author, 'Kris')
  await user.type(url, 'google.com')
  await user.click(create)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Maailmanmestaruus')
  expect(addBlog.mock.calls[0][0].author).toBe('Kris')
  expect(addBlog.mock.calls[0][0].url).toBe('google.com')
})