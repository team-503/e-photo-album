import { UrlConfig } from '@/config/url.config'
import { AlreadyAuthLayout } from '@/layouts/already-auth.layout'
import { AppLayout } from '@/layouts/app.layout'
import { AuthLayout } from '@/layouts/auth.layout'
import { MainLayout } from '@/layouts/main.layout'
import { AlbumIdPage } from '@/pages/app/albumId.page'
import { AppPage } from '@/pages/app/app.page'
import { LoginPage } from '@/pages/auth/login.page'
import { RegisterPage } from '@/pages/auth/register.page'
import { ErrorPage } from '@/pages/error.page'
import { MainPage } from '@/pages/main.page'
import { NotFoundPage } from '@/pages/not-found.page'
import { memo } from 'react'
import { useRoutes } from 'react-router-dom'

type RoutesProps = {
    location?: Parameters<typeof useRoutes>[1]
}
export const Routes: React.FC<RoutesProps> = memo(({ location }) => {
    return useRoutes(
        [
            {
                path: UrlConfig.main.url,
                element: <MainLayout />,
                children: [
                    {
                        element: <AuthLayout />,
                        children: [
                            {
                                element: <AppLayout />,
                                children: [
                                    { path: UrlConfig.app.url, element: <AppPage /> },
                                    { path: UrlConfig.albumId.url, element: <AlbumIdPage /> },
                                ],
                            },
                        ],
                    },
                    {
                        path: UrlConfig.auth.url,
                        element: <AlreadyAuthLayout />,
                        children: [
                            { path: UrlConfig.login.url, element: <LoginPage /> },
                            { path: UrlConfig.register.url, element: <RegisterPage /> },
                        ],
                    },
                    { path: UrlConfig.main.url, element: <MainPage /> },
                    { path: UrlConfig.error.url, element: <ErrorPage /> },
                    { path: '*', element: <NotFoundPage /> },
                ],
            },
        ],
        location,
    )
})
Routes.displayName = Routes.name
