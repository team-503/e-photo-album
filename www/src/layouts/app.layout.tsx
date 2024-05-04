import { Sidebar } from '@/pages/app/components/sidebar'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'

type AppLayoutProps = unknown
export const AppLayout: React.FC<AppLayoutProps> = memo(() => {
    return (
        <div className="flex h-full w-full gap-5 px-5 relative flex-1">
            <Sidebar className="h-fit w-[300px] top-[80px] sticky" />
            <Outlet />
        </div>
    )
})
AppLayout.displayName = 'AppLayout'
