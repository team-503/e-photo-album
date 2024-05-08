import { Large } from '@/components/typography/large'
import { UrlConfig } from '@/config/url.config'
import { ThemeSelector } from '@/modules/theme/components/theme-selector'
import { UserMenuButton } from '@/modules/user/components/user-menu-button'
import { memo } from 'react'
import { Link } from 'react-router-dom'

type HeaderProps = unknown
export const Header: React.FC<HeaderProps> = memo(() => {
    return (
        <header className="sticky top-0 z-50 flex h-[80px] justify-center border-b bg-background/95 backdrop-blur">
            <div className="container flex items-center justify-between">
                <Link to={UrlConfig.main.url}>
                    <Large className="uppercase">E-photo-album</Large>
                </Link>
                <div className="flex items-center justify-end gap-3">
                    <ThemeSelector variant="outline" />
                    <UserMenuButton variant="outline" align="end" />
                </div>
            </div>
        </header>
    )
})
Header.displayName = 'Header'
