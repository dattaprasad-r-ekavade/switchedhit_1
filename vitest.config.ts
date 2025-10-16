import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./resources/js/setupTests.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/**',
                'resources/js/setupTests.ts',
                '**/*.d.ts',
                '**/*.config.*',
                '**/dist/**',
            ],
        },
    },
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});