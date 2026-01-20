// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

const preview: Preview = {
    tags: ['autodocs'],
    loaders: [mswLoader],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;