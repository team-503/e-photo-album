import { Large } from '@/components/typography/large'
import { UrlConfig } from '@/config/url.config'
import { ThemeSelector } from '@/modules/theme/components/theme-selector'
import { memo } from 'react'
import { Link } from 'react-router-dom'

type HeaderProps = unknown
export const Header: React.FC<HeaderProps> = memo(() => {
    return (
        <header className="flex justify-center border-b-2 py-5">
            <div className="container flex items-center justify-between">
                <Link to={UrlConfig.main.url}>
                    <Large className='uppercase'>E-photo-album</Large>
                </Link>
                <ThemeSelector variant="outline" />
            </div>
        </header>
    )
})
Header.displayName = 'Header'
