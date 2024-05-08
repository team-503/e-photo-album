import { Sidebar } from '@/pages/app/components/sidebar'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'

type AppLayoutProps = unknown
export const AppLayout: React.FC<AppLayoutProps> = memo(() => {
    return (
        <div className="relative flex h-full w-full flex-1 gap-5 px-5">
            <Sidebar className="sticky top-[80px] h-fit w-[300px]" />
            <Outlet />
        </div>
    )
})
AppLayout.displayName = 'AppLayout'
