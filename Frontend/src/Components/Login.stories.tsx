import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

const meta: Meta<typeof Login> = {
  title: 'Components/Login',
  component: Login,
  parameters: {
    layout: 'centered',
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
type Story = StoryObj<typeof Login>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: 'Nieprawidłowy email lub hasło',
  },
};
