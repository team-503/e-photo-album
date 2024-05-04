import { PageWrapper } from '@/components/page-wrapper'
import { H1 } from '@/components/typography/h1'
import { UrlConfig } from '@/config/url.config'
import { AlbumsLoadErrorALert } from '@/pages/app/components/alerts/albums-load-error-alert'
import { ImagesLoadErrorALert } from '@/pages/app/components/alerts/images-load-error-alert'
import { ImageGallery } from '@/pages/app/components/image-gallery'
import { memo } from 'react'

type AppPageProps = unknown
export const AppPage: React.FC<AppPageProps> = memo(() => {
    return (
        <PageWrapper
            breadcrumbs={[UrlConfig.main, UrlConfig.app, { ...UrlConfig.app, label: 'All photos' }]}
            container={false}
            className="space-y-3"
        >
            <AlbumsLoadErrorALert />
            <ImagesLoadErrorALert />
            <ImageGallery className='overflow-y-hidden pb-5' />
        </PageWrapper>
    )
})
AppPage.displayName = 'AppPage'
