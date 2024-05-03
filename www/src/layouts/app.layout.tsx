import { Sidebar } from '@/pages/app/components/sidebar'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'

type AppLayoutProps = unknown
export const AppLayout: React.FC<AppLayoutProps> = memo(() => {
    return (
        <div className="flex h-full w-full gap-4">
            <Sidebar />
            <Outlet />
        </div>
    )
})
AppLayout.displayName = 'AppLayout'
