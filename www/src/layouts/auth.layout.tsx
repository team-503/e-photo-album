import { UrlConfig } from '@/config/url.config'
import { useUserStore } from '@/modules/user/stores/user.store'
import { memo } from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'

type AuthLayoutProps = unknown
export const AuthLayout: React.FC<AuthLayoutProps> = memo(() => {
    const isAuth = useIsAuthenticated()
    const user = useUserStore(state => state.user)

    if (!isAuth) {
        return <Navigate to={UrlConfig.auth.login.url} />
    }

    return <Outlet />
})
AuthLayout.displayName = 'AuthLayout'
