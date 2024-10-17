import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { pdfjs } from 'react-pdf';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { Button, createTheme, CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

createInertiaApp({
    // Get all React components from resources/js/pages folder
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const theme = createTheme();
        createRoot(el).render(
            <>
                <CssBaseline />
                <SnackbarProvider
                    action={(snackbarId) => (
                        <Button color='white' onClick={() => closeSnackbar(snackbarId)}>
                            OK
                        </Button>
                    )}
                >
                    <App {...props} />
                </SnackbarProvider>
            </>


        )
    },
})