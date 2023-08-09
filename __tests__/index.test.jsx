import '@testing-library/jest-dom';
import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import Home from '../pages';

const fakePostsResponse = [
  {
    userId: 1,
    id: 1,
    title: 'post1-title',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'post2-title',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    userId: 1,
    id: 3,
    title: 'post-3',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
  },
];

const server = setupServer(
  rest.get('/api/posts', (req, res, ctx) => {
    return res(ctx.json(fakePostsResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

test('show posts successfully', async () => {
  render(<Home />);

  const title1 = await screen.findByTestId('title-1');

  expect(title1).toBeInTheDocument(/post1-title/i);

  const title2 = await screen.findByTestId('title-2');

  expect(title2).toHaveTextContent(/post2-title/i);
});
