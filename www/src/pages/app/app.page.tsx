import { PageWrapper } from '@/components/page-wrapper'
import { UrlConfig } from '@/config/url.config'
import { AlbumsLoadErrorALert } from '@/pages/app/components/albums-load-error-alert'
import { memo } from 'react'

type AppPageProps = unknown
export const AppPage: React.FC<AppPageProps> = memo(() => {
    return (
        <PageWrapper breadcrumbs={[UrlConfig.main, UrlConfig.app, { ...UrlConfig.app, label: 'All photos' }]} container={false}>
            <AlbumsLoadErrorALert />
            <div className="flex flex-wrap gap-3"></div>
        </PageWrapper>
    )
})
AppPage.displayName = 'AppPage'
