import type { Meta, StoryObj } from '@storybook/react';
import Profile from './Profile';

const meta: Meta<typeof Profile> = {
  title: 'Components/Profile',
  component: Profile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const Default: Story = {};

export const WithUser: Story = {
  args: {
    user: {
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      avatar: 'https://picsum.photos/100/100',
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

