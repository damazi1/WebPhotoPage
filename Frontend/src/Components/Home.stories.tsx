// src/Components/Home.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Home from './Home';
import '../Styles/Home.css';

const meta: Meta<typeof Home> = {
    title: 'Components/Home',
    component: Home,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Strona główna z animowanym hero, sekcjami scroll-reveal i formularzem rejestracji.',
            },
        },
    },
    argTypes: {
        isLoggedIn: {
            control: 'boolean',
            description: 'Określa czy użytkownik jest zalogowany',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Home>;

// Niezalogowany użytkownik - widzi formularz rejestracji
export const NotLoggedIn: Story = {
    args: {
        isLoggedIn: false,
    },
};

// Zalogowany użytkownik - widzi dashboard z tablicami
export const LoggedIn: Story = {
    args: {
        isLoggedIn: true,
    },
};

// Domyślny widok
export const Default: Story = {};