import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppRouter } from './router/AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

const queryClient = new QueryClient()

export const GitIssuesApp: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </QueryClientProvider>
    )
}