// src/Components/Informacje.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Informacje from './Informacje';
import '../Styles/Informacje.css';

const meta: Meta<typeof Informacje> = {
    title: 'Components/Informacje',
    component: Informacje,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Strona informacyjna "O Picnest" z sekcją hero, statystykami, aktualnościami, wartościami i zespołem.',
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
type Story = StoryObj<typeof Informacje>;

export const Default: Story = {};