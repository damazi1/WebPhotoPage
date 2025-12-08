// src/Components/UserList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import UserList from './UserList';
import '../Styles/UserList.css';

const mockUsers = [
    {
        userId: 1,
        email: 'jan.kowalski@example.com',
        name: 'Jan Kowalski',
        password: 'securepassword',
        accountCreateDate: '2024-01-15',
        roles: 'USER',
        avatar: {
            id: 1,
            url: '/photo/1',
            uploadDate: '2024-01-15',
        },
    },
    {
        userId: 2,
        email: 'anna.nowak@example.com',
        name: 'Anna Nowak',
        password: 'securepassword',
        accountCreateDate: '2024-02-10',
        roles: 'USER',
        avatar: {
            id: 2,
            url: '/photo/2',
            uploadDate: '2024-02-10',
        },
    },
    {
        userId: 3,
        email: 'admin@picnest.com',
        name: 'Administrator',
        password: 'securepassword',
        accountCreateDate: '2023-12-01',
        roles: 'ADMIN',
        avatar: null,
    },
    {
        userId: 4,
        email: 'maria.wisniewska@example.com',
        name: 'Maria Wiśniewska',
        password: 'securepassword',
        accountCreateDate: '2024-03-05',
        roles: 'USER',
        avatar: {
            id: 3,
            url: '/photo/3',
            uploadDate: '2024-03-05',
        },
    },
];

const meta: Meta<typeof UserList> = {
    title: 'Components/UserList',
    component: UserList,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Lista użytkowników z avatarami i możliwością wyszukiwania.',
            },
        },
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof UserList>;

export const WithUsers: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('http://localhost:8080/user/', () => {
                    return HttpResponse.json(mockUsers);
                }),
                http.get('http://localhost:8080/photo/:id', ({ params }) => {
                    const { id } = params;
                    return HttpResponse.redirect(`https://picsum.photos/seed/user${id}/100/100`);
                }),
            ],
        },
    },
};

export const EmptyList: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('http://localhost:8080/user/', () => {
                    return HttpResponse.json([]);
                }),
            ],
        },
    },
};

export const SingleUser: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('http://localhost:8080/user/', () => {
                    return HttpResponse.json([mockUsers[0]]);
                }),
                http.get('http://localhost:8080/photo/:id', ({ params }) => {
                    const { id } = params;
                    return HttpResponse.redirect(`https://picsum.photos/seed/user${id}/100/100`);
                }),
            ],
        },
    },
};

export const Loading: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('http://localhost:8080/user/', async () => {
                    await new Promise(resolve => setTimeout(resolve, 999999));
                    return HttpResponse.json([]);
                }),
            ],
        },
    },
};

export const Error: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('http://localhost:8080/user/', () => {
                    return HttpResponse.error();
                }),
            ],
        },
    },
};
