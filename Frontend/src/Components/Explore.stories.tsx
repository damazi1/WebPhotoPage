// src/Components/Explore.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import Explore from './Explore';
import '../Styles/Explore.css';
import '../Styles/Profile.css';

const mockPosts = [
    {
        id: 1,
        description: 'Zimowa inspiracja',
        imageUrl: '/photo/1',
        postCreationDate: '2024-01-15',
    },
    {
        id: 2,
        description: 'Domowe studio',
        imageUrl: '/photo/2',
        postCreationDate: '2024-01-14',
    },
    {
        id: 3,
        description: 'Comfort food',
        imageUrl: '/photo/3',
        postCreationDate: '2024-01-13',
    },
];

const mockUser = {
    userId: 1,
    email: 'test@example.com',
    name: 'Test User',
    avatar: {
        id: 1,
        url: '/uploads/avatars/avatar1.jpg',
        uploadDate: '2024-01-01',
    },
};

const meta: Meta<typeof Explore> = {
    title: 'Components/Explore',
    component: Explore,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Strona eksploracji z galerią postów w układzie masonry, wyszukiwarką i modalem szczegółów.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Explore>;

export const LoggedInWithPosts: Story = {
    parameters: {
        msw: {
            handlers: [
                // Posty - sprawdź FetchAllPosts.ts
                http.get('http://localhost:8080/post', () => {
                    return HttpResponse.json(mockPosts);
                }),
                // Zalogowany user - błąd mówi że to /user/me
                http.get('http://localhost:8080/user/me', () => {
                    return HttpResponse.json(mockUser);
                }),
                // Lajki - sprawdź FetchLikes.ts
                http.get('http://localhost:8080/post/:id/likes', () => {
                    return HttpResponse.json(42);
                }),
                // Status lajka - sprawdź LikeStatus.ts
                http.get('http://localhost:8080/post/:id/like-status', () => {
                    return HttpResponse.json(true);
                }),
                // Komentarze - sprawdź Comments.ts
                http.get('http://localhost:8080/post/:id/comments', () => {
                    return HttpResponse.json([
                        { id: 1, content: 'Super!', authorEmail: 'user@test.com', authorName: 'Jan', creationDate: '2024-01-15' },
                    ]);
                }),
                // Obrazki
                http.get('http://localhost:8080/photo/:id', ({ params }) => {
                    const { id } = params;
                    const width = 400;
                    const height = 300 + Number(id) * 100;
                    return HttpResponse.redirect(`https://picsum.photos/seed/${id}/${width}/${height}`);
                }),
            ],
        },
    },
};

export const EmptyState: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('http://localhost:8080/post', () => {
                    return HttpResponse.json([]);
                }),
                http.get('http://localhost:8080/user/me', () => {
                    return HttpResponse.json(mockUser);
                }),
            ],
        },
    },
};

export const Loading: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('http://localhost:8080/post', async () => {
                    await new Promise(resolve => setTimeout(resolve, 999999));
                    return HttpResponse.json([]);
                }),
                http.get('http://localhost:8080/user/me', () => {
                    return HttpResponse.json(mockUser);
                }),
            ],
        },
    },
};