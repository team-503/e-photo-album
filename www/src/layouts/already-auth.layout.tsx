import { UrlConfig } from '@/config/url.config'
import { useUserStore } from '@/modules/user/stores/user.store'
import { memo } from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'

type AlreadyAuthLayoutProps = unknown
export const AlreadyAuthLayout: React.FC<AlreadyAuthLayoutProps> = memo(() => {
    const isAuth = useIsAuthenticated()
    const user = useUserStore(state => state.user)

    if (isAuth) {
        // TODO change destination page
        return <Navigate to={UrlConfig.main.url} />
    }

    return <Outlet />
})
AlreadyAuthLayout.displayName = 'AlreadyAuthLayout'
