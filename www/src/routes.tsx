import { UrlConfig } from '@/config/url.config'
import { AuthLayout } from '@/layouts/auth.layout'
import { MainLayout } from '@/layouts/main.layout'
import { LoginPage } from '@/pages/auth/login.page'
import { RegisterPage } from '@/pages/auth/register.page'
import { ErrorPage } from '@/pages/error.page'
import { MainPage } from '@/pages/main.page'
import { NotFoundPage } from '@/pages/not-found.page'
import { memo } from 'react'
import { useRoutes } from 'react-router-dom'

export interface RoutesProps {}
export const Routes: React.FC<RoutesProps> = memo(() => {
    return useRoutes([
        {
            path: UrlConfig.main.url,
            element: <MainLayout />,
            children: [
                {
                    path: UrlConfig.app.url,
                    element: <AuthLayout />,
                    children: [
                        // authenticated
                    ],
                },
                // non-authenticated
                {
                    path: UrlConfig.main.url,
                    element: <MainPage />,
                },
                {
                    path: UrlConfig.auth.login.url,
                    element: <LoginPage />,
                },
                {
                    path: UrlConfig.auth.register.url,
                    element: <RegisterPage />,
                },
                // other
                {
                    path: UrlConfig.error.url,
                    element: <ErrorPage />,
                },
                {
                    path: '*',
                    element: <NotFoundPage />,
                },
            ],
        },
    ])
})
Routes.displayName = Routes.name
