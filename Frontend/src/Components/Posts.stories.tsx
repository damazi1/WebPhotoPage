import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Posts from './Posts';

const meta: Meta<typeof Posts> = {
  title: 'Components/Posts',
  component: Posts,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Posts>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    posts: [],
  },
};

export const WithPosts: Story = {
  args: {
    posts: [
      { id: 1, title: 'Post 1', imageUrl: 'https://picsum.photos/300/400' },
      { id: 2, title: 'Post 2', imageUrl: 'https://picsum.photos/300/500' },
      { id: 3, title: 'Post 3', imageUrl: 'https://picsum.photos/300/350' },
    ],
  },
};
