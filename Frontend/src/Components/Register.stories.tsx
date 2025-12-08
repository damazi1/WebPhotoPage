import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';

const meta: Meta<typeof Register> = {
  title: 'Components/Register',
  component: Register,
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
type Story = StoryObj<typeof Register>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: 'Email jest już zajęty',
  },
};

export const WithValidationErrors: Story = {
  args: {
    validationErrors: {
      email: 'Nieprawidłowy format email',
      password: 'Hasło musi mieć min. 8 znaków',
    },
  },
};
